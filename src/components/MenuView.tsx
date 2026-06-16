import { useState } from 'react'
import { MENU_ITEMS } from '../data/menu'
import { CATEGORY_LABELS, type Category } from '../types'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const CATEGORIES: (Category | 'all')[] = ['all', 'breakfast', 'starters', 'mains', 'desserts', 'beverages']

export function MenuView() {
  const { addToCart } = useApp()
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [search, setSearch] = useState('')
  const [addedId, setAddedId] = useState<string | null>(null)
  const [vegetarianOnly, setVegetarianOnly] = useState<'all' | 'veg' | 'nonveg'>('all')

  const filtered = MENU_ITEMS.filter(item => {
    const matchCat = category === 'all' || item.category === category
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
    const matchVeg =
      vegetarianOnly === 'all' ||
      (vegetarianOnly === 'veg' && item.vegetarian) ||
      (vegetarianOnly === 'nonveg' && !item.vegetarian)
    return matchCat && matchSearch && matchVeg
  })

  const popular = MENU_ITEMS.filter(i => i.popular)

  function handleAdd(id: string) {
    const item = MENU_ITEMS.find(i => i.id === id)
    if (!item) return
    addToCart(item)
    setAddedId(id)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div className="menu-view">
      <div className="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          placeholder="Search dishes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Veg / Non-Veg Segmented Filter */}
      <div className="veg-filter">
        <button
          type="button"
          className={`veg-filter__btn veg-filter__btn--all ${vegetarianOnly === 'all' ? 'veg-filter__btn--active' : ''}`}
          onClick={() => setVegetarianOnly('all')}
        >
          ALL
        </button>
        <button
          type="button"
          className={`veg-filter__btn veg-filter__btn--veg ${vegetarianOnly === 'veg' ? 'veg-filter__btn--active' : ''}`}
          onClick={() => setVegetarianOnly('veg')}
        >
          Veg
          <span className="diet-indicator diet-indicator--veg">
            <span className="diet-indicator__circle" />
          </span>
        </button>
        <button
          type="button"
          className={`veg-filter__btn veg-filter__btn--nonveg ${vegetarianOnly === 'nonveg' ? 'veg-filter__btn--active' : ''}`}
          onClick={() => setVegetarianOnly('nonveg')}
        >
          Non-Veg
          <span className="diet-indicator diet-indicator--nonveg">
            <span className="diet-indicator__circle" />
          </span>
        </button>
      </div>

      {!search && category === 'all' && (
        <section className="popular-section">
          <h2 className="section-title">Chef's Picks</h2>
          <div className="popular-scroll">
            {popular.map(item => (
              <div key={item.id} className="popular-card" onClick={() => handleAdd(item.id)}>
                <span className="popular-card__emoji">{item.image}</span>
                <span className="popular-card__name">{item.name}</span>
                <span className="popular-card__price">{formatCurrency(item.price)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="category-pills">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`pill ${category === cat ? 'pill--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filtered.map(item => (
          <article key={item.id} className="menu-card">
            <div className="menu-card__emoji">{item.image}</div>
            <div className="menu-card__body">
              <div className="menu-card__top">
                <h3>{item.name}</h3>
                <span className={`diet-indicator ${item.vegetarian ? 'diet-indicator--veg' : 'diet-indicator--nonveg'}`} title={item.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}>
                  <span className="diet-indicator__circle" />
                </span>
              </div>
              <p className="menu-card__desc">{item.description}</p>
              <div className="menu-card__meta">
                <span>{formatCurrency(item.price)}</span>
                <span className="menu-card__time">~{item.prepTime} min</span>
              </div>
            </div>
            <button
              className={`menu-card__add ${addedId === item.id ? 'menu-card__add--added' : ''}`}
              onClick={() => handleAdd(item.id)}
              aria-label={`Add ${item.name}`}
            >
              {addedId === item.id ? '✓' : '+'}
            </button>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="empty-state">No dishes found. Try a different search.</p>
        )}
      </div>
    </div>
  )
}
