import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, query, orderBy, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { products as initialProducts, mockOrders, mockCustomers, Product, Order, Customer } from '../data/mock';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const ADMIN_EMAILS = ['gustavomedeirosg12@gmail.com', 'enriquegustavo816@gmail.com'];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setOrders([]);
        setCustomers([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Listen to Products (Public)
    const qProducts = query(collection(db, 'products'), orderBy('order', 'asc'));
    const unsubProducts = onSnapshot(qProducts, (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((doc) => {
        prods.push({ id: Number(doc.id), ...doc.data() } as Product);
      });
      setProducts(prods);
    }, (error) => {
      // Ignore permission errors silently for public viewers if any
    });

    return () => {
      unsubProducts();
    };
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    // Seed initial data if empty (Only Admin)
    const seedData = async () => {
      try {
        const productsSnap = await getDocs(collection(db, 'products'));
        if (productsSnap.empty) {
          for (const p of initialProducts) {
            await setDoc(doc(db, 'products', p.id.toString()), p);
          }
        }
        
        const ordersSnap = await getDocs(collection(db, 'orders'));
        if (ordersSnap.empty) {
          for (const o of mockOrders) {
            await setDoc(doc(db, 'orders', o.id), o);
          }
        }

        const customersSnap = await getDocs(collection(db, 'customers'));
        if (customersSnap.empty) {
          for (const c of mockCustomers) {
            await setDoc(doc(db, 'customers', c.id), c);
          }
        }
      } catch (error) {
        // Silently fail if permission denied
      }
    };

    seedData();

    // Listen to Orders (Admin Only)
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ords: Order[] = [];
      snapshot.forEach((doc) => {
        ords.push({ id: doc.id, ...doc.data() } as Order);
      });
      // Sort orders by date descending
      ords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(ords);
    }, (error) => {
      // Silently fail
    });

    // Listen to Customers (Admin Only)
    const unsubCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
      const custs: Customer[] = [];
      snapshot.forEach((doc) => {
        custs.push({ id: doc.id, ...doc.data() } as Customer);
      });
      setCustomers(custs);
    }, (error) => {
      // Silently fail
    });

    return () => {
      unsubOrders();
      unsubCustomers();
    };
  }, [isAdmin]);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      await setDoc(doc(db, 'products', newId.toString()), {
        ...product,
        order: newId // Default order
      });
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (id: number, updatedProduct: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id.toString()), updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await deleteDoc(doc(db, 'products', id.toString()));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  const updateOrder = async (id: string, updatedOrder: Partial<Order>) => {
    try {
      await updateDoc(doc(db, 'orders', id), updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  };

  return (
    <StoreContext.Provider value={{ products, orders, customers, addProduct, updateProduct, deleteProduct, updateOrder, deleteOrder }}>
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
