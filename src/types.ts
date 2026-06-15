export type Category = 'starters' | 'mains' | 'desserts' | 'beverages' | 'breakfast'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  prepTime: number
  vegetarian: boolean
  popular?: boolean
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  notes?: string
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered'

export interface Order {
  id: string
  items: CartItem[]
  status: OrderStatus
  createdAt: string
  tableNumber: string
  customerName: string
  total: number
}

export type PaymentMethod = 'card' | 'upi' | 'cash'

export interface Payment {
  id: string
  amount: number
  method: PaymentMethod
  paidAt: string
  tip: number
}

export interface DinerSession {
  tableNumber: string
  customerName: string
  seatedAt: string
}

export type Tab = 'menu' | 'orders' | 'bill' | 'profile'

export const CATEGORY_LABELS: Record<Category, string> = {
  breakfast: 'Breakfast',
  starters: 'Starters',
  mains: 'Main Course',
  desserts: 'Desserts',
  beverages: 'Beverages',
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Order Received',
  preparing: 'Being Prepared',
  ready: 'Ready to Serve',
  delivered: 'Served',
}
