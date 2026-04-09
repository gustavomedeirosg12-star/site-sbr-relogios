import React, { createContext, useContext, useState } from 'react';
import { products } from '../data/mock';

export type Product = typeof products[0];

export interface BoxOption {
  id: string;
  name: string;
  price: number;
}

export const boxOptions: BoxOption[] = [
  { id: 'none', name: 'Sem Caixa (Apenas Relógio)', price: 0 },
  { id: 'papelao', name: 'Caixa de Papelão', price: 6.00 },
  { id: 'velcro', name: 'Caixa de Velcro', price: 6.50 },
  { id: 'pressao', name: 'Caixa de Pressão', price: 25.00 },
  { id: 'original', name: 'Caixa Original da Marca (Consultar)', price: 150.00 },
];

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
  box: BoxOption;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, box: BoxOption) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, box: BoxOption) => {
    setItems((prev) => {
      const cartItemId = `${product.id}-${box.id}`;
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, cartItemId, quantity: 1, box }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const total = items.reduce((acc, item) => acc + (item.price + item.box.price) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
