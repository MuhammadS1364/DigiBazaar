import React, { useState } from 'react';
import { 
  UserRole, 
  ActiveTab, 
  Product, 
  CartItem, 
  SellerOrder, 
  InventoryItem, 
  SellerApplication, 
  SystemAlert, 
  AuditLog 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_INVENTORY, 
  INITIAL_APPLICATIONS, 
  INITIAL_ALERTS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { AuthGateway } from './components/AuthGateway';
import { CustomerShop } from './components/CustomerShop';
import { SellerHub } from './components/SellerHub';
import { AdminPortal } from './components/AdminPortal';
import { OrdersView } from './components/OrdersView';
import { ProfileView } from './components/ProfileView';
import { CartDrawer } from './components/CartDrawer';
import { 
  ShippingLabelModal, 
  HandoverScanModal, 
  RestockModal, 
  PriceAnomalyModal, 
  DisputeModal, 
  ProductDetailModal 
} from './components/Modals';
import { 
  Smartphone, 
  Monitor, 
  Columns, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  Info
} from 'lucide-react';

export default function App() {
  // Navigation & Role states
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [activeTab, setActiveTab] = useState<ActiveTab>('shop');
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive' | 'sidebyside'>('mobile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }, // Saffron ₹1,299
    { product: INITIAL_PRODUCTS[1], quantity: 1 }, // Brass Diya ₹749 -> Total = ₹2,048 (matches screenshot!)
  ]);
  const [orders, setOrders] = useState<SellerOrder[]>(INITIAL_ORDERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [applications, setApplications] = useState<SellerApplication[]>(INITIAL_APPLICATIONS);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrderForLabel, setActiveOrderForLabel] = useState<SellerOrder | null>(null);
  const [activeOrderForHandover, setActiveOrderForHandover] = useState<SellerOrder | null>(null);
  const [activeItemForRestock, setActiveItemForRestock] = useState<InventoryItem | null>(null);
  const [activeAlertForReview, setActiveAlertForReview] = useState<SystemAlert | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Role resolution from Gateway
  const handleGatewaySuccess = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'customer') setActiveTab('shop');
    else if (role === 'merchant') setActiveTab('seller_hub');
    else if (role === 'admin') setActiveTab('admin');
    showToast(`Access granted: Logged in as ${role.toUpperCase()}`);
  };

  // Switch role anywhere
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'customer') setActiveTab('shop');
    else if (role === 'merchant') setActiveTab('seller_hub');
    else if (role === 'admin') setActiveTab('admin');
    showToast(`Switched active portal to ${role.toUpperCase()}`);
  };

  // Tab change
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'shop') setCurrentRole('customer');
    else if (tab === 'seller_hub') setCurrentRole('merchant');
    else if (tab === 'admin') setCurrentRole('admin');
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to consolidated cart`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    showToast('Single payment approved! Order split into regional fulfillment nodes.');
    setActiveTab('orders');
    // Add audit log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      type: 'hub_dispatch',
      description: `Consolidated checkout completed (2 vendor packages created)`,
      user: 'Priya Sharma (Buyer)',
      timeAgo: 'Just now',
      timestamp: 'Just now',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Seller operations
  const handleConfirmDispatch = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'ready_for_pickup',
              courier: 'BlueDart Express',
              trackingId: '#BLU882104',
            }
          : ord
      )
    );
    showToast('Airway bill generated! Package marked ready for courier pickup.');
  };

  const handleConfirmHandover = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, status: 'in_transit' }
          : ord
      )
    );
    showToast('Delhivery pickup scan verified! Package is now in transit.');
  };

  const handleConfirmRestock = (sku: string, addedUnits: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.sku === sku
          ? {
              ...item,
              unitsAvailable: item.unitsAvailable + addedUnits,
              status: item.unitsAvailable + addedUnits > item.safetyThreshold ? 'healthy' : 'low_stock',
            }
          : item
      )
    );
    showToast(`SKU ${sku} restocked with +${addedUnits} units!`);
  };

  // Admin operations
  const handleApproveApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'approved' } : app))
    );
    showToast('Merchant store approved & activated on DigiBazar!');
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      type: 'kyc_approved',
      description: `Admin validated and approved merchant store #${appId}`,
      user: 'Superadmin [P. Sharma]',
      timeAgo: 'Just now',
      timestamp: 'Just now',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleRequestInfoApplication = (appId: string) => {
    showToast('Compliance inquiry dispatched to seller for warehouse audit.');
  };

  const handleRejectApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'rejected' } : app))
    );
    showToast('Seller application rejected due to documentation mismatch.');
  };

  const handleResolveAlert = () => {
    showToast('Escalation resolved! Audit record logged to immutable ledger.');
    setActiveAlertForReview(null);
  };

  // Reset Demo
  const handleResetData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCart([
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[1], quantity: 1 },
    ]);
    setOrders(INITIAL_ORDERS);
    setInventory(INITIAL_INVENTORY);
    setApplications(INITIAL_APPLICATIONS);
    setAlerts(INITIAL_ALERTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    showToast('Demo data restored to initial state.');
  };

  // Render current screen content
  const renderScreen = (screenTab: ActiveTab) => {
    if (screenTab === 'gateway') {
      return (
        <AuthGateway
          onSuccess={handleGatewaySuccess}
          initialRole={currentRole}
        />
      );
    }
    if (screenTab === 'shop') {
      return (
        <CustomerShop
          products={products}
          cart={cart}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectProduct={(p) => setSelectedProductDetail(p)}
        />
      );
    }
    if (screenTab === 'seller_hub') {
      return (
        <SellerHub
          orders={orders}
          inventory={inventory}
          onGenerateLabel={(order) => setActiveOrderForLabel(order)}
          onHandoverScan={(order) => setActiveOrderForHandover(order)}
          onRestock={(item) => setActiveItemForRestock(item)}
          onSwitchRole={() => handleRoleChange('customer')}
        />
      );
    }
    if (screenTab === 'admin') {
      return (
        <AdminPortal
          applications={applications}
          alerts={alerts}
          auditLogs={auditLogs}
          onApproveApplication={handleApproveApplication}
          onRequestInfoApplication={handleRequestInfoApplication}
          onRejectApplication={handleRejectApplication}
          onReviewAlert={(alert) => setActiveAlertForReview(alert)}
          onSwitchToRole={(role) => handleRoleChange(role)}
        />
      );
    }
    if (screenTab === 'orders') {
      return <OrdersView onBackToShop={() => setActiveTab('shop')} />;
    }
    if (screenTab === 'profile') {
      return (
        <ProfileView
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          onLogout={() => setActiveTab('gateway')}
        />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F1F4F9] text-[#0B1C30] flex flex-col font-sans">
      {/* Presentation & Showcase Control Bar */}
      <div className="bg-[#0F172A] text-white px-3 sm:px-6 py-2.5 shadow-md z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Brand + Screen Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E64A19] animate-pulse"></span>
            <span className="font-display font-extrabold tracking-tight text-white text-sm">
              DigiBazar
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              Multi-Sided Modern Marketplace
            </span>
          </div>

          {/* Quick Role & Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveTab('gateway')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                activeTab === 'gateway'
                  ? 'bg-[#E64A19] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🔐 Auth Gateway
            </button>
            <button
              onClick={() => handleTabChange('shop')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                activeTab === 'shop'
                  ? 'bg-[#E64A19] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🛍️ Customer
            </button>
            <button
              onClick={() => handleTabChange('seller_hub')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                activeTab === 'seller_hub'
                  ? 'bg-[#E64A19] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🏪 Seller Hub
            </button>
            <button
              onClick={() => handleTabChange('admin')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                activeTab === 'admin'
                  ? 'bg-[#E64A19] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🛡️ Superadmin
            </button>
          </div>

          {/* View Modes */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setViewMode('mobile')}
                title="Mobile Frame View (matches screenshots)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'mobile'
                    ? 'bg-[#E64A19] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('responsive')}
                title="Fluid Responsive View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'responsive'
                    ? 'bg-[#E64A19] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('sidebyside')}
                title="Side-by-Side 4-Screen Comparison"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'sidebyside'
                    ? 'bg-[#E64A19] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleResetData}
              title="Reset Demo Data"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 flex justify-center items-start p-2 sm:p-6 overflow-x-auto">
        {/* MODE 1: MOBILE FRAME (Pixel-perfect replicate of Image 4, 6, 8, 10) */}
        {viewMode === 'mobile' && (
          <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden flex flex-col relative my-2">
            {/* Phone speaker notch */}
            <div className="bg-slate-900 pt-3 pb-1.5 flex justify-center items-center">
              <div className="w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
              </div>
            </div>

            {/* App TopBar */}
            <TopBar
              currentRole={currentRole}
              onRoleChange={handleRoleChange}
              onOpenProfile={() => setActiveTab('profile')}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isGateway={activeTab === 'gateway'}
            />

            {/* App Screen Content */}
            <div className="flex-1 overflow-y-auto bg-[#F8F9FF] min-h-[750px]">
              {renderScreen(activeTab)}
            </div>

            {/* App Bottom Navigation */}
            {activeTab !== 'gateway' && (
              <BottomNav
                activeTab={activeTab}
                onTabChange={handleTabChange}
                pendingAlertsCount={alerts.filter((a) => !a.resolved).length}
                ordersCount={orders.length}
              />
            )}

            {/* Phone home indicator */}
            <div className="bg-white py-1 flex justify-center">
              <div className="w-28 h-1 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        )}

        {/* MODE 2: FLUID RESPONSIVE VIEW */}
        {viewMode === 'responsive' && (
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col my-2">
            <TopBar
              currentRole={currentRole}
              onRoleChange={handleRoleChange}
              onOpenProfile={() => setActiveTab('profile')}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isGateway={activeTab === 'gateway'}
            />

            <div className="flex-1 overflow-y-auto bg-[#F8F9FF] min-h-[750px]">
              {renderScreen(activeTab)}
            </div>

            {activeTab !== 'gateway' && (
              <BottomNav
                activeTab={activeTab}
                onTabChange={handleTabChange}
                pendingAlertsCount={alerts.filter((a) => !a.resolved).length}
                ordersCount={orders.length}
              />
            )}
          </div>
        )}

        {/* MODE 3: SIDE-BY-SIDE 4-SCREEN SHOWCASE CANVAS */}
        {viewMode === 'sidebyside' && (
          <div className="w-full py-4 space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-extrabold text-slate-900">
                DigiBazar Complete Experience Flow
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl mx-auto">
                Compare all four screens side-by-side: Supabase Passwordless Gateway, Customer Storefront, Merchant Seller Hub, and Platform Superadmin Governance Portal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
              {/* Screen 1: Auth */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-slate-900 text-white p-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                  <span>Screen 1:</span>
                  <span className="text-[#FF5722]">Passwordless Gateway</span>
                </div>
                <div className="p-2 bg-[#F8F9FF]">
                  <AuthGateway
                    onSuccess={handleGatewaySuccess}
                    initialRole="customer"
                  />
                </div>
              </div>

              {/* Screen 2: Customer */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-slate-900 text-white p-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                  <span>Screen 2:</span>
                  <span className="text-[#FF5722]">Customer Storefront</span>
                </div>
                <div className="bg-[#F8F9FF]">
                  <CustomerShop
                    products={products}
                    cart={cart}
                    onAddToCart={handleAddToCart}
                    onOpenCart={() => setIsCartOpen(true)}
                    onSelectProduct={(p) => setSelectedProductDetail(p)}
                  />
                </div>
              </div>

              {/* Screen 3: Seller */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-slate-900 text-white p-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                  <span>Screen 3:</span>
                  <span className="text-[#FF5722]">Merchant Seller Hub</span>
                </div>
                <div className="bg-[#F8F9FF]">
                  <SellerHub
                    orders={orders}
                    inventory={inventory}
                    onGenerateLabel={(order) => setActiveOrderForLabel(order)}
                    onHandoverScan={(order) => setActiveOrderForHandover(order)}
                    onRestock={(item) => setActiveItemForRestock(item)}
                    onSwitchRole={() => handleRoleChange('customer')}
                  />
                </div>
              </div>

              {/* Screen 4: Admin */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-slate-900 text-white p-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                  <span>Screen 4:</span>
                  <span className="text-[#FF5722]">Governance Portal</span>
                </div>
                <div className="bg-[#F8F9FF]">
                  <AdminPortal
                    applications={applications}
                    alerts={alerts}
                    auditLogs={auditLogs}
                    onApproveApplication={handleApproveApplication}
                    onRequestInfoApplication={handleRequestInfoApplication}
                    onRejectApplication={handleRejectApplication}
                    onReviewAlert={(alert) => setActiveAlertForReview(alert)}
                    onSwitchToRole={(role) => handleRoleChange(role)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Interactive Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckout}
      />

      <ShippingLabelModal
        order={activeOrderForLabel}
        onClose={() => setActiveOrderForLabel(null)}
        onConfirmDispatch={handleConfirmDispatch}
      />

      <HandoverScanModal
        order={activeOrderForHandover}
        onClose={() => setActiveOrderForHandover(null)}
        onConfirmHandover={handleConfirmHandover}
      />

      <RestockModal
        item={activeItemForRestock}
        onClose={() => setActiveItemForRestock(null)}
        onConfirmRestock={handleConfirmRestock}
      />

      {activeAlertForReview?.type === 'price_surge' && (
        <PriceAnomalyModal
          alert={activeAlertForReview}
          onClose={() => setActiveAlertForReview(null)}
          onResolve={handleResolveAlert}
        />
      )}

      {activeAlertForReview?.type === 'dispute_escalation' && (
        <DisputeModal
          alert={activeAlertForReview}
          onClose={() => setActiveAlertForReview(null)}
          onResolve={handleResolveAlert}
        />
      )}

      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
