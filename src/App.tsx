import { AppProvider, useApp } from './context/AppContext'
import { WelcomeScreen } from './components/WelcomeScreen'
import { Header } from './components/Header'
import { BottomNav } from './components/BottomNav'
import { MenuView } from './components/MenuView'
import { OrdersView } from './components/OrdersView'
import { BillView } from './components/BillView'
import { ProfileView } from './components/ProfileView'
import { CartDrawer } from './components/CartDrawer'
import { PaymentModal } from './components/PaymentModal'

function MainApp() {
  const { session, activeTab } = useApp()

  if (!session) return <WelcomeScreen />

  return (
    <div className="app">
      <Header />
      <main className="app__content">
        {activeTab === 'menu' && <MenuView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'bill' && <BillView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>
      <BottomNav />
      <CartDrawer />
      <PaymentModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  )
}
