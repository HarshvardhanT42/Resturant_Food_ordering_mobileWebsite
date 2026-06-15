import type { Tab } from '../types'
import { useApp } from '../context/AppContext'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'menu', label: 'Menu', icon: '🍽️' },
  { id: 'orders', label: 'Orders', icon: '📋' },
  { id: 'bill', label: 'Bill', icon: '💳' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export function BottomNav() {
  const { activeTab, setActiveTab, orders } = useApp()
  const activeOrders = orders.filter(o => o.status !== 'delivered').length

  return (
    <nav className="bottom-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`bottom-nav__item ${activeTab === tab.id ? 'bottom-nav__item--active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="bottom-nav__icon">{tab.icon}</span>
          <span className="bottom-nav__label">{tab.label}</span>
          {tab.id === 'orders' && activeOrders > 0 && (
            <span className="bottom-nav__dot">{activeOrders}</span>
          )}
        </button>
      ))}
    </nav>
  )
}
