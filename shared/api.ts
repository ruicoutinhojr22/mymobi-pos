/**
 * MyMobiPOS API Types
 * Shared code between client and server for POS system
 */

import {
  User,
  Product,
  Client,
  Sale,
  Report,
  POSSettings,
  DashboardStats,
  ProductsResponse,
  ClientsResponse,
  SalesResponse,
  ReportsResponse,
} from "./pos-types";

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

/**
 * Authentication types
 */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: number;
}

/**
 * Sales API types
 */
export interface CreateSaleRequest {
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    price?: number;
    discountPercentage?: number;
  }>;
  clientId?: string;
  discountPercentage?: number;
  notes?: string;
}

export interface UpdateSaleRequest {
  status?: "completed" | "cancelled" | "on_hold";
  notes?: string;
}

/**
 * Product API types
 */
export interface CreateProductRequest {
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  price: number;
  cost: number;
  categoryId: string;
  taxRate?: number;
  stockLevel?: number;
  minStockLevel?: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  cost?: number;
  categoryId?: string;
  taxRate?: number;
  stockLevel?: number;
  minStockLevel?: number;
  isActive?: boolean;
}

/**
 * Client API types
 */
export interface CreateClientRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  taxNumber?: string;
  creditLimit?: number;
}

export interface UpdateClientRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxNumber?: string;
  creditLimit?: number;
}

/**
 * Inventory API types
 */
export interface StockMovementRequest {
  productId: string;
  variantId?: string;
  type: "stock_in" | "stock_out" | "adjustment";
  quantity: number;
  reason: string;
  reference?: string;
}

/**
 * Report API types
 */
export interface GenerateReportRequest {
  type:
    | "daily_sales"
    | "monthly_sales"
    | "top_products"
    | "cashier_report"
    | "profit_margin"
    | "inventory_audit";
  dateRange: {
    from: string;
    to: string;
  };
  filters?: Record<string, any>;
}

/**
 * Settings API types
 */
export interface UpdateSettingsRequest {
  company?: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    taxNumber?: string;
  };
  currency?: {
    code?: string;
    symbol?: string;
    decimalPlaces?: number;
  };
  tax?: {
    defaultRate?: number;
    inclusive?: boolean;
  };
  receipt?: {
    header?: string;
    footer?: string;
  };
  printer?: {
    name?: string;
    type?: "thermal" | "inkjet" | "laser";
    paperSize?: "58mm" | "80mm" | "A4";
  };
  locale?: {
    language?: string;
    timezone?: string;
    dateFormat?: string;
    timeFormat?: string;
  };
}

/**
 * Export all POS types
 */
export type {
  User,
  Product,
  Client,
  Sale,
  Report,
  POSSettings,
  DashboardStats,
  ProductsResponse,
  ClientsResponse,
  SalesResponse,
  ReportsResponse,
};
