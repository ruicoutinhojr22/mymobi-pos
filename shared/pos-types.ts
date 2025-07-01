/**
 * MyMobiPOS System Types
 * Point of Sale system for Mozambique market
 */

export interface POSSystem {
  systemName: string;
  version: string;
  currency: string;
  location: string;
  languages: string[];
  offlineSupport: boolean;
  multiDeviceSupport: boolean;
  cloudBackup: boolean;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export type UserRole = "admin" | "manager" | "cashier" | "viewer";

export type Permission =
  | "sales_create"
  | "sales_view"
  | "sales_delete"
  | "products_create"
  | "products_edit"
  | "products_delete"
  | "products_view"
  | "clients_create"
  | "clients_edit"
  | "clients_delete"
  | "clients_view"
  | "inventory_manage"
  | "inventory_view"
  | "reports_view"
  | "reports_export"
  | "users_manage"
  | "settings_manage";

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  price: number;
  cost: number;
  category: ProductCategory;
  variants: ProductVariant[];
  stockLevel: number;
  minStockLevel: number;
  taxRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: "size" | "color" | "style";
  value: string;
  priceModifier: number;
  stockLevel: number;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  taxNumber?: string;
  loyaltyPoints: number;
  creditLimit: number;
  currentBalance: number;
  purchaseHistory: Sale[];
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  saleNumber: string;
  clientId?: string;
  cashierId: string;
  items: SaleItem[];
  subtotal: number;
  discountAmount: number;
  discountPercentage: number;
  taxAmount: number;
  total: number;
  payments: Payment[];
  status: SaleStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  discountAmount: number;
  discountPercentage: number;
  taxRate: number;
  subtotal: number;
}

export type SaleStatus =
  | "draft"
  | "completed"
  | "cancelled"
  | "on_hold"
  | "refunded";

export interface Payment {
  id: string;
  method: PaymentMethod;
  amount: number;
  reference?: string;
  status: PaymentStatus;
  processedAt: string;
}

export type PaymentMethod =
  | "cash"
  | "card"
  | "m-pesa"
  | "e-mola"
  | "credit"
  | "mixed";
export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export interface InventoryMovement {
  id: string;
  productId: string;
  variantId?: string;
  type: MovementType;
  quantity: number;
  reason: string;
  reference?: string;
  userId: string;
  createdAt: string;
}

export type MovementType = "stock_in" | "stock_out" | "adjustment" | "transfer";

export interface StockAdjustment {
  id: string;
  productId: string;
  variantId?: string;
  currentStock: number;
  newStock: number;
  reason: string;
  userId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  dateRange: {
    from: string;
    to: string;
  };
  filters?: Record<string, any>;
  data: any;
  generatedAt: string;
  generatedBy: string;
}

export type ReportType =
  | "daily_sales"
  | "monthly_sales"
  | "top_products"
  | "cashier_report"
  | "profit_margin"
  | "inventory_audit"
  | "client_report"
  | "payment_methods";

export interface POSSettings {
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    taxNumber: string;
    logo?: string;
  };
  currency: {
    code: string;
    symbol: string;
    decimalPlaces: number;
  };
  tax: {
    defaultRate: number;
    inclusive: boolean;
  };
  receipt: {
    header: string;
    footer: string;
    logo?: string;
  };
  printer: {
    name: string;
    type: "thermal" | "inkjet" | "laser";
    paperSize: "58mm" | "80mm" | "A4";
  };
  locale: {
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SalesResponse {
  sales: Sale[];
  total: number;
  totalAmount: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  categories: ProductCategory[];
}

export interface ClientsResponse {
  clients: Client[];
  total: number;
}

export interface ReportsResponse {
  reports: Report[];
  total: number;
}

// Dashboard stats
export interface DashboardStats {
  today: {
    sales: number;
    revenue: number;
    transactions: number;
  };
  thisMonth: {
    sales: number;
    revenue: number;
    transactions: number;
  };
  topProducts: Array<{
    product: Product;
    quantity: number;
    revenue: number;
  }>;
  lowStock: Product[];
  recentSales: Sale[];
}
