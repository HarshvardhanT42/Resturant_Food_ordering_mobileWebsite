import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { RESTAURANT_INFO } from '../data/menu'

export function WelcomeScreen() {
  const { setSession } = useApp()
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!tableNumber.trim()) {
      setError('Please enter your table number')
      return
    }
    if (!customerName.trim()) {
      setError('Please enter your name')
      return
    }
    setSession({
      tableNumber: tableNumber.trim(),
      customerName: customerName.trim(),
      seatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="welcome">
      <div className="welcome__hero">
        <div className="welcome__logo">SG</div>
        <h1 className="welcome__title">{RESTAURANT_INFO.name}</h1>
        <p className="welcome__tagline">{RESTAURANT_INFO.tagline}</p>
      </div>

      <form className="welcome__form" onSubmit={handleSubmit}>
        <h2>Welcome!</h2>
        <p className="welcome__subtitle">Scan & order from your table — no waiter needed</p>

        <label className="field">
          <span>Table Number</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 12"
            value={tableNumber}
            onChange={e => { setTableNumber(e.target.value); setError('') }}
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span>Your Name</span>
          <input
            type="text"
            placeholder="e.g. Sarah Mitchell"
            value={customerName}
            onChange={e => { setCustomerName(e.target.value); setError('') }}
            autoComplete="name"
          />
        </label>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn btn--primary btn--full">
          View Menu & Order
        </button>
      </form>

      <div className="welcome__footer">
        <p>Open daily: {RESTAURANT_INFO.openHours}</p>
        <p className="welcome__note">Food served directly to your table</p>
      </div>
    </div>
  )
}
