
export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cookTime: string;
  ingredientCount: number;
  ingredients: string[]; // Added specific ingredient list
  priceEstimate?: number;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon?: string;
  imageUrl?: string;
}

export interface Ingredient {
  name: string;
  quantity?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  matchType: 'Exact match' | 'Similar item' | 'Best Price' | 'Premium product';
  weight: string;
  // New fields
  category?: string;
  calories?: number;
  nutrition?: {
    protein: string;
    carbs: string;
    fat: string;
    fiber?: string;
  };
  pricePerUnit?: string;
  allergens?: string[];
  dietaryType?: string[];
  // Admin fields
  stockQuantity?: number;
  isActive?: boolean;
}

export interface ReviewItem {
  id: string;
  ingredient: Ingredient;
  product: Product;
  quantity: number;
  selectedOptions?: string[];
}

export interface ExtendedReviewItem extends ReviewItem {
  isSelected: boolean;
}

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Out for delivery' | 'Preparing' | 'Cancelled' | 'Order received' | 'Ready for Pickup';
  items: ReviewItem[];
  customerName?: string; // For Admin
  deliveryPartner?: 'Uber' | 'Grab' | 'Self' | null;
}

export enum Tab {
  Home = 'Home',
  Orders = 'Orders',
  Categories = 'Categories',
  Profile = 'Profile',
}

export enum HomeView {
  Dashboard = 'Dashboard',
  Upload = 'Upload',
  Review = 'Review',
  ProductDetail = 'ProductDetail',
  CategoryDetail = 'CategoryDetail',
  RecipeDetail = 'RecipeDetail', // Added RecipeDetail view
}

export enum ShopView {
  Cart = 'Cart',
  Payment = 'Payment',
  Success = 'Success',
}

export enum ProfileView {
  Menu = 'Menu',
  Orders = 'Orders',
  Addresses = 'Addresses',
  Payments = 'Payments',
  Help = 'Help',
}

export enum AdminView {
  Dashboard = 'Dashboard',
  Products = 'Products',
  Orders = 'Orders',
  Recipes = 'Recipes',
  Stock = 'Stock',
}
