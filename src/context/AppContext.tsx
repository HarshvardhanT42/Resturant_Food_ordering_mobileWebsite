import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, DinerSession, Order, OrderStatus, Payment, PaymentMethod, Tab } from '../types'
import { RESTAURANT_INFO } from '../data/menu'

interface AppState {
  session: DinerSession | null
  cart: CartItem[]
  orders: Order[]
  payments: Payment[]
  activeTab: Tab
  showCart: boolean
  showPayment: boolean
}

interface AppContextValue extends AppState {
  setSession: (session: DinerSession) => void
  logout: () => void
  addToCart: (item: CartItem['menuItem'], notes?: string) => void
  removeFromCart: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  clearCart: () => void
  placeOrder: () => Order | null
  setActiveTab: (tab: Tab) => void
  setShowCart: (show: boolean) => void
  setShowPayment: (show: boolean) => void
  processPayment: (method: PaymentMethod, tip: number) => Payment | null
  cartTotal: number
  billTotal: number
  billSubtotal: number
  serviceFee: number
  tax: number
  amountDue: number
  cartItemCount: number
}

const STORAGE_KEY = 'spice-garden-restaurant'

const AppContext = createContext<AppContextValue | null>(null)

function loadState(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return {}
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      session: state.session,
      cart: state.cart,
      orders: state.orders,
      payments: state.payments,
    }))
  } catch { /* ignore */ }
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function calcCartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
}

function calcBillTotals(orders: Order[], payments: Payment[]) {
  const subtotal = orders.reduce((sum, o) => sum + o.total, 0)
  const paid = payments.reduce((sum, p) => sum + p.amount, 0)
  const serviceFee = subtotal * RESTAURANT_INFO.serviceFee
  const tax = (subtotal + serviceFee) * RESTAURANT_INFO.taxRate
  const total = subtotal + serviceFee + tax
  const amountDue = Math.max(0, total - paid)
  return { subtotal, serviceFee, tax, total, amountDue }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const saved = loadState()
  const [session, setSessionState] = useState<DinerSession | null>(saved.session ?? null)
  const [cart, setCart] = useState<CartItem[]>(saved.cart ?? [])
  const [orders, setOrders] = useState<Order[]>(saved.orders ?? [])
  const [payments, setPayments] = useState<Payment[]>(saved.payments ?? [])
  const [activeTab, setActiveTab] = useState<Tab>('menu')
  const [showCart, setShowCart] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    saveState({ session, cart, orders, payments, activeTab, showCart, showPayment })
  }, [session, cart, orders, payments, activeTab, showCart, showPayment])

  useEffect(() => {
    const pending = orders.filter(o => o.status !== 'delivered')
    if (pending.length === 0) return

    const timers = pending.map(order => {
      const delays: Record<OrderStatus, number | null> = {
        pending: 3000,
        preparing: 5000,
        ready: 4000,
        delivered: null,
      }
      const next: Record<OrderStatus, OrderStatus> = {
        pending: 'preparing',
        preparing: 'ready',
        ready: 'delivered',
        delivered: 'delivered',
      }
      const delay = delays[order.status]
      if (!delay) return null
      return setTimeout(() => {
        setOrders(prev => prev.map(o =>
          o.id === order.id ? { ...o, status: next[o.status] } : o
        ))
      }, delay)
    })

    return () => timers.forEach(t => t && clearTimeout(t))
  }, [orders])

  const setSession = useCallback((s: DinerSession) => {
    setSessionState(s)
  }, [])

  const logout = useCallback(() => {
    setSessionState(null)
    setCart([])
    setOrders([])
    setPayments([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const addToCart = useCallback((menuItem: CartItem['menuItem'], notes?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItem.id === menuItem.id)
      if (existing) {
        return prev.map(i =>
          i.menuItem.id === menuItem.id
            ? { ...i, quantity: i.quantity + 1, notes: notes ?? i.notes }
            : i
        )
      }
      return [...prev, { menuItem, quantity: 1, notes }]
    })
  }, [])

  const removeFromCart = useCallback((menuItemId: string) => {
    setCart(prev => prev.filter(i => i.menuItem.id !== menuItemId))
  }, [])

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i.menuItem.id !== menuItemId))
      return
    }
    setCart(prev => prev.map(i =>
      i.menuItem.id === menuItemId ? { ...i, quantity } : i
    ))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const placeOrder = useCallback((): Order | null => {
    if (!session || cart.length === 0) return null
    const total = calcCartTotal(cart)
    const order: Order = {
      id: generateId(),
      items: [...cart],
      status: 'pending',
      createdAt: new Date().toISOString(),
      tableNumber: session.tableNumber,
      customerName: session.customerName,
      total,
    }
    setOrders(prev => [order, ...prev])
    setCart([])
    setShowCart(false)
    setActiveTab('orders')
    return order
  }, [session, cart])

  const processPayment = useCallback((method: PaymentMethod, tip: number): Payment | null => {
    const { amountDue } = calcBillTotals(orders, payments)
    if (amountDue <= 0) return null
    const payment: Payment = {
      id: generateId(),
      amount: amountDue,
      method,
      paidAt: new Date().toISOString(),
      tip,
    }
    setPayments(prev => [...prev, payment])
    setShowPayment(false)
    return payment
  }, [orders, payments])

  const cartTotal = calcCartTotal(cart)
  const { subtotal: billSubtotal, serviceFee, tax, total: billTotal, amountDue } = calcBillTotals(orders, payments)
  const cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <AppContext.Provider value={{
      session, cart, orders, payments, activeTab, showCart, showPayment,
      setSession, logout, addToCart, removeFromCart, updateQuantity, clearCart,
      placeOrder, setActiveTab, setShowCart, setShowPayment, processPayment,
      cartTotal, billTotal, billSubtotal, serviceFee, tax, amountDue, cartItemCount,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
