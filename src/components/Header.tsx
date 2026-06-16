import { useApp } from '../context/AppContext'
import { RESTAURANT_INFO } from '../data/menu'

export function Header() {
  const { session, setShowCart, cartItemCount } = useApp()

  return (
    <header className="header">
      <div className="header__info">
        <span className="header__hotel">{RESTAURANT_INFO.name}</span>
        <span className="header__room">Table {session?.tableNumber}</span>
      </div>
      <button className="header__cart" onClick={() => setShowCart(true)} aria-label="Open your dishes">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {cartItemCount > 0 && <span className="header__badge">{cartItemCount}</span>}
      </button>
    </header>
  )
}
