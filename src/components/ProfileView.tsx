import { useApp } from '../context/AppContext'
import { RESTAURANT_INFO } from '../data/menu'
import { formatCurrency } from '../utils/format'

export function ProfileView() {
  const { session, logout, orders, billTotal, payments } = useApp()

  return (
    <div className="profile-view">
      <div className="profile-card">
        <div className="profile-card__avatar">
          {session?.customerName.charAt(0).toUpperCase()}
        </div>
        <h2>{session?.customerName}</h2>
        <p className="profile-card__room">Table {session?.tableNumber}</p>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-card__value">{orders.length}</span>
          <span className="stat-card__label">Orders</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{formatCurrency(billTotal)}</span>
          <span className="stat-card__label">Total Spent</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{payments.length}</span>
          <span className="stat-card__label">Payments</span>
        </div>
      </div>

      <div className="profile-info">
        <h3>Restaurant Info</h3>
        <div className="info-row">
          <span>Restaurant</span>
          <span>{RESTAURANT_INFO.name}</span>
        </div>
        <div className="info-row">
          <span>Hours</span>
          <span>{RESTAURANT_INFO.openHours}</span>
        </div>
        <div className="info-row">
          <span>Address</span>
          <span>{RESTAURANT_INFO.address}</span>
        </div>
        <div className="info-row">
          <span>Contact</span>
          <span>{RESTAURANT_INFO.phone}</span>
        </div>
      </div>

      <button className="btn btn--outline btn--full" onClick={logout}>
        Leave Table
      </button>
    </div>
  )
}
