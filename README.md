# Spice Garden â€” Restaurant Ordering

A mobile-first web app for restaurant diners to browse the menu, order food from their table, track orders, and pay the bill.

## Features

- **Table check-in** â€” Enter table number and name (scan QR at table)
- **Menu browsing** â€” Search, filter by category, and browse popular dishes
- **Cart & ordering** â€” Add items, adjust quantities, and send orders to the kitchen
- **Live order tracking** â€” Watch orders progress: Received â†’ Preparing â†’ Ready â†’ Served
- **Bill management** â€” Itemized bill with service charge and tax
- **Payment** â€” Pay by card, UPI/mobile pay, or at the counter (with optional tip)

## Quick Start

```bash
cd hotel-dining
npm install
npm run dev
```

Open `http://localhost:5173` on your phone or use browser dev tools mobile view.

## Build for Production

```bash
npm run build
npm run preview
```

## Customization

Edit `src/data/menu.ts` to update menu items, prices, and restaurant branding.

```ts
export const RESTAURANT_INFO = {
  name: 'Spice Garden',
  tagline: 'Dine-In Ordering',
  openHours: '11:00 AM â€” 11:00 PM',
  serviceFee: 0.05,  // 5%
  taxRate: 0.08,     // 8%
}
```
