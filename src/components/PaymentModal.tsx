import { useState } from 'react'
import type { PaymentMethod } from '../types'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const METHODS: { id: PaymentMethod; label: string; icon: string; desc: string }[] = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
  { id: 'upi', label: 'UPI / Mobile Pay', icon: '📱', desc: 'Google Pay, Apple Pay, PhonePe' },
  { id: 'cash', label: 'Pay at Counter', icon: '💵', desc: 'Pay cash to staff when you\'re done' },
]

const TIP_OPTIONS = [0, 5, 10, 15]

export function PaymentModal() {
  const { showPayment, setShowPayment, amountDue, processPayment } = useApp()
  const [method, setMethod] = useState<PaymentMethod>('card')
  const [tip, setTip] = useState(10)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [upiId, setUpiId] = useState('')

  if (!showPayment) return null

  const totalWithTip = amountDue + tip

  async function handlePay() {
    setProcessing(true)
    await new Promise(r => setTimeout(r, 1800))
    processPayment(method, tip)
    setProcessing(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setShowPayment(false)
      setCardNumber('')
      setUpiId('')
    }, 2000)
  }

  const canPay =
    method === 'cash' ||
    (method === 'card' && cardNumber.replace(/\s/g, '').length >= 16) ||
    (method === 'upi' && upiId.includes('@'))

  return (
    <div className="drawer-overlay" onClick={() => !processing && setShowPayment(false)}>
      <div className="payment-modal" onClick={e => e.stopPropagation()}>
        {success ? (
          <div className="payment-success">
            <div className="payment-success__check">✓</div>
            <h2>Payment Successful</h2>
            <p>{formatCurrency(totalWithTip)} paid</p>
          </div>
        ) : (
          <>
            <div className="drawer__header">
              <h2>Pay Bill</h2>
              <button
                className="drawer__close"
                onClick={() => setShowPayment(false)}
                disabled={processing}
                aria-label="Close"
              >×</button>
            </div>

            <div className="payment-amount">
              <span>Amount due</span>
              <strong>{formatCurrency(amountDue)}</strong>
            </div>

            <div className="payment-section">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    className={`payment-method ${method === m.id ? 'payment-method--active' : ''}`}
                    onClick={() => setMethod(m.id)}
                  >
                    <span className="payment-method__icon">{m.icon}</span>
                    <div>
                      <span className="payment-method__label">{m.label}</span>
                      <span className="payment-method__desc">{m.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {method === 'card' && (
              <div className="payment-form">
                <label className="field">
                  <span>Card Number</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </label>
                <div className="payment-form__row">
                  <label className="field">
                    <span>Expiry</span>
                    <input type="text" placeholder="MM/YY" maxLength={5} />
                  </label>
                  <label className="field">
                    <span>CVV</span>
                    <input type="text" inputMode="numeric" placeholder="123" maxLength={4} />
                  </label>
                </div>
              </div>
            )}

            {method === 'upi' && (
              <div className="payment-form">
                <label className="field">
                  <span>UPI ID</span>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                  />
                </label>
              </div>
            )}

            {method === 'cash' && (
              <div className="payment-note">
                <p>Confirm your bill and pay at the counter. A staff member will collect payment from your table.</p>
              </div>
            )}

            <div className="payment-section">
              <h3>Add a Tip</h3>
              <div className="tip-options">
                {TIP_OPTIONS.map(t => (
                  <button
                    key={t}
                    className={`tip-btn ${tip === t ? 'tip-btn--active' : ''}`}
                    onClick={() => setTip(t)}
                  >
                    {t === 0 ? 'No tip' : formatCurrency(t)}
                  </button>
                ))}
              </div>
            </div>

            <div className="payment-footer">
              <div className="payment-footer__total">
                <span>Total with tip</span>
                <strong>{formatCurrency(totalWithTip)}</strong>
              </div>
              <button
                className="btn btn--primary btn--full"
                onClick={handlePay}
                disabled={!canPay || processing}
              >
                {processing ? (
                  <span className="btn__spinner">Processing...</span>
                ) : (
                  `Pay ${formatCurrency(totalWithTip)}`
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
