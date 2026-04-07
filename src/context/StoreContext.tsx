import React, { createContext, useContext, useState } from 'react';
import { products as initialProducts, mockOrders, mockCustomers, Product, Order, Customer } from '../data/mock';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  const updateProduct = (id: number, updatedProduct: Omit<Product, 'id'>) => {
    setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <StoreContext.Provider value={{ products, orders, customers, addProduct, updateProduct, deleteProduct }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
