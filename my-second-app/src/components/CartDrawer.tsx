<<<<<<< HEAD
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

export function CartDrawer() {
  const {
    showCart, setShowCart, cart, updateQuantity, removeFromCart,
    cartTotal, placeOrder, cartItemCount,
  } = useApp()

  if (!showCart) return null

  function handleOrder() {
    placeOrder()
  }

  return (
    <div className="drawer-overlay" onClick={() => setShowCart(false)}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer__header">
          <h2>Your Cart</h2>
          <button className="drawer__close" onClick={() => setShowCart(false)} aria-label="Close cart">×</button>
        </div>

        {cart.length === 0 ? (
          <div className="drawer__empty">
            <span className="drawer__empty-icon">🛒</span>
            <p>Your cart is empty</p>
            <button className="btn btn--secondary" onClick={() => setShowCart(false)}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="drawer__items">
              {cart.map(item => (
                <div key={item.menuItem.id} className="cart-item">
                  <span className="cart-item__emoji">{item.menuItem.image}</span>
                  <div className="cart-item__info">
                    <span className="cart-item__name">{item.menuItem.name}</span>
                    <span className="cart-item__price">{formatCurrency(item.menuItem.price)}</span>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}>+</button>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.menuItem.id)}
                    aria-label="Remove item"
                  >×</button>
                </div>
              ))}
            </div>

            <div className="drawer__footer">
              <div className="drawer__total">
                <span>Total ({cartItemCount} items)</span>
                <strong>{formatCurrency(cartTotal)}</strong>
              </div>
              <button className="btn btn--primary btn--full" onClick={handleOrder}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
=======
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

export function CartDrawer() {
  const {
    showCart, setShowCart, cart, updateQuantity, removeFromCart,
    cartTotal, placeOrder, cartItemCount,
  } = useApp()

  if (!showCart) return null

  function handleOrder() {
    placeOrder()
  }

  return (
    <div className="drawer-overlay" onClick={() => setShowCart(false)}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer__header">
          <h2>Your Cart</h2>
          <button className="drawer__close" onClick={() => setShowCart(false)} aria-label="Close cart">×</button>
        </div>

        {cart.length === 0 ? (
          <div className="drawer__empty">
            <span className="drawer__empty-icon">🛒</span>
            <p>Your cart is empty</p>
            <button className="btn btn--secondary" onClick={() => setShowCart(false)}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="drawer__items">
              {cart.map(item => (
                <div key={item.menuItem.id} className="cart-item">
                  <span className="cart-item__emoji">{item.menuItem.image}</span>
                  <div className="cart-item__info">
                    <span className="cart-item__name">{item.menuItem.name}</span>
                    <span className="cart-item__price">{formatCurrency(item.menuItem.price)}</span>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}>+</button>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.menuItem.id)}
                    aria-label="Remove item"
                  >×</button>
                </div>
              ))}
            </div>

            <div className="drawer__footer">
              <div className="drawer__total">
                <span>Total ({cartItemCount} items)</span>
                <strong>{formatCurrency(cartTotal)}</strong>
              </div>
              <button className="btn btn--primary btn--full" onClick={handleOrder}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
>>>>>>> 004775a4bbf75487db5ca4e973a69961bafc3967
