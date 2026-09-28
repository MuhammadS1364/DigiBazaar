export type UserRole = 'customer' | 'merchant' | 'admin';

export type ActiveTab = 'shop' | 'seller_hub' | 'admin' | 'orders' | 'profile' | 'gateway';

export interface Product {
  id: string;
  name: string;
  sellerId: string;
  sellerName: string;
  sellerVerified: boolean;
  category: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  sku: string;
  hubLocation: string;
  isTopSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SellerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerCity: string;
  customerPhone: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    sku: string;
    image: string;
  }[];
  totalAmount: number;
  status: 'confirmed_pack' | 'ready_for_pickup' | 'in_transit' | 'delivered';
  hubPackageNote?: string;
  courier?: string;
  trackingId?: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  unitsAvailable: number;
  safetyThreshold: number;
  price: number;
  image: string;
  status: 'healthy' | 'low_stock' | 'out_of_stock';
}

export interface SellerApplication {
  id: string;
  appNumber: string;
  businessName: string;
  category: string;
  location: string;
  gstin: string;
  gstinStatus: 'Active' | 'Under Review' | 'Flagged';
  documents: string[];
  status: 'pending' | 'approved' | 'rejected' | 'info_requested';
  fssaiNumber?: string;
  isFssai?: boolean;
  appliedDate: string;
  image: string;
}

export interface SystemAlert {
  id: string;
  type: 'price_surge' | 'dispute_escalation' | 'kyc_flag';
  title: string;
  description: string;
  badge: string;
  severity: 'high' | 'medium' | 'critical';
  actionText: string;
  resolved: boolean;
  time: string;
}

export interface AuditLog {
  id: string;
  type: 'commission' | 'gst_validation' | 'hub_dispatch' | 'rls_policy' | 'kyc_approved';
  description: string;
  user: string;
  timeAgo: string;
  timestamp: string;
}
