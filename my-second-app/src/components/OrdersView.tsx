<<<<<<< HEAD
import { useApp } from '../context/AppContext'
import { STATUS_LABELS } from '../types'
import { formatCurrency, formatTime } from '../utils/format'

const STATUS_PROGRESS: Record<string, number> = {
  pending: 25,
  preparing: 55,
  ready: 85,
  delivered: 100,
}

export function OrdersView() {
  const { orders } = useApp()

  if (orders.length === 0) {
    return (
      <div className="empty-page">
        <span className="empty-page__icon">📋</span>
        <h2>No orders yet</h2>
        <p>Browse the menu and place your first order</p>
      </div>
    )
  }

  return (
    <div className="orders-view">
      <h2 className="page-title">Your Orders</h2>
      {orders.map(order => (
        <article key={order.id} className={`order-card order-card--${order.status}`}>
          <div className="order-card__header">
            <div>
              <span className="order-card__id">Order #{order.id.slice(-6)}</span>
              <span className="order-card__time">{formatTime(order.createdAt)}</span>
            </div>
            <span className={`status-badge status-badge--${order.status}`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>

          <div className="order-card__progress">
            <div
              className="order-card__progress-bar"
              style={{ width: `${STATUS_PROGRESS[order.status]}%` }}
            />
          </div>

          <ul className="order-card__items">
            {order.items.map(item => (
              <li key={item.menuItem.id}>
                <span>{item.menuItem.image} {item.menuItem.name}</span>
                <span>×{item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="order-card__footer">
            <span>{order.items.reduce((s, i) => s + i.quantity, 0)} items</span>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
        </article>
      ))}
    </div>
  )
}
=======
import { useApp } from '../context/AppContext'
import { STATUS_LABELS } from '../types'
import { formatCurrency, formatTime } from '../utils/format'

const STATUS_PROGRESS: Record<string, number> = {
  pending: 25,
  preparing: 55,
  ready: 85,
  delivered: 100,
}

export function OrdersView() {
  const { orders } = useApp()

  if (orders.length === 0) {
    return (
      <div className="empty-page">
        <span className="empty-page__icon">📋</span>
        <h2>No orders yet</h2>
        <p>Browse the menu and place your first order</p>
      </div>
    )
  }

  return (
    <div className="orders-view">
      <h2 className="page-title">Your Orders</h2>
      {orders.map(order => (
        <article key={order.id} className={`order-card order-card--${order.status}`}>
          <div className="order-card__header">
            <div>
              <span className="order-card__id">Order #{order.id.slice(-6)}</span>
              <span className="order-card__time">{formatTime(order.createdAt)}</span>
            </div>
            <span className={`status-badge status-badge--${order.status}`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>

          <div className="order-card__progress">
            <div
              className="order-card__progress-bar"
              style={{ width: `${STATUS_PROGRESS[order.status]}%` }}
            />
          </div>

          <ul className="order-card__items">
            {order.items.map(item => (
              <li key={item.menuItem.id}>
                <span>{item.menuItem.image} {item.menuItem.name}</span>
                <span>×{item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="order-card__footer">
            <span>{order.items.reduce((s, i) => s + i.quantity, 0)} items</span>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
        </article>
      ))}
    </div>
  )
}
>>>>>>> 004775a4bbf75487db5ca4e973a69961bafc3967
