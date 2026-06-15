import { useApp } from '../context/AppContext'
import { RESTAURANT_INFO } from '../data/menu'
import { formatCurrency, formatDate, formatTime } from '../utils/format'

const PAYMENT_LABELS: Record<string, string> = {
  card: '💳 Card',
  upi: '📱 UPI',
  cash: '💵 Cash',
}

export function BillView() {
  const {
    orders, payments, billSubtotal, serviceFee, tax, billTotal,
    amountDue, setShowPayment, session,
  } = useApp()

  const isPaid = amountDue <= 0 && orders.length > 0

  if (orders.length === 0) {
    return (
      <div className="empty-page">
        <span className="empty-page__icon">💳</span>
        <h2>No charges yet</h2>
        <p>Your bill will appear here after you place an order</p>
      </div>
    )
  }

  return (
    <div className="bill-view">
      <h2 className="page-title">Your Bill</h2>

      <div className="bill-card">
        <div className="bill-card__header">
          <div>
            <span className="bill-card__guest">{session?.customerName}</span>
            <span className="bill-card__room">Table {session?.tableNumber}</span>
          </div>
          {isPaid && <span className="paid-badge">Paid ✓</span>}
        </div>

        <div className="bill-card__items">
          {orders.map(order => (
            <div key={order.id} className="bill-order-group">
              <div className="bill-order-group__header">
                <span>Order · {formatDate(order.createdAt)} {formatTime(order.createdAt)}</span>
              </div>
              {order.items.map(item => (
                <div key={`${order.id}-${item.menuItem.id}`} className="bill-line">
                  <span>{item.menuItem.name} ×{item.quantity}</span>
                  <span>{formatCurrency(item.menuItem.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="bill-card__summary">
          <div className="bill-line">
            <span>Subtotal</span>
            <span>{formatCurrency(billSubtotal)}</span>
          </div>
          <div className="bill-line">
            <span>Service charge ({(RESTAURANT_INFO.serviceFee * 100).toFixed(0)}%)</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>
          <div className="bill-line">
            <span>Tax ({(RESTAURANT_INFO.taxRate * 100).toFixed(0)}%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="bill-line bill-line--total">
            <span>Total</span>
            <strong>{formatCurrency(billTotal)}</strong>
          </div>
        </div>

        {payments.length > 0 && (
          <div className="bill-card__payments">
            <h3>Payments</h3>
            {payments.map(p => (
              <div key={p.id} className="bill-line bill-line--payment">
                <span>
                  {PAYMENT_LABELS[p.method]}
                  {p.tip > 0 && ` + ${formatCurrency(p.tip)} tip`}
                </span>
                <span>−{formatCurrency(p.amount)}</span>
              </div>
            ))}
          </div>
        )}

        {!isPaid && (
          <div className="bill-card__due">
            <span>Amount Due</span>
            <strong>{formatCurrency(amountDue)}</strong>
          </div>
        )}
      </div>

      {!isPaid && (
        <button className="btn btn--primary btn--full btn--pay" onClick={() => setShowPayment(true)}>
          Pay Bill · {formatCurrency(amountDue)}
        </button>
      )}

      {isPaid && (
        <div className="bill-success">
          <span>🎉</span>
          <p>Thank you for dining with us!</p>
        </div>
      )}
    </div>
  )
}
