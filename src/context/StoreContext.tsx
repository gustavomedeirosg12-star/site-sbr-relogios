import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, query, orderBy, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { products as initialProducts, mockOrders, mockCustomers, mockReviews, Product, Order, Customer, Review } from '../data/mock';

export interface SiteSettings {
  heroBgUrl: string;
  experienceBgUrl: string;
  craftsmanshipBgUrl: string;
  categorySuperCloneBgUrl: string;
  categoryPremiumBgUrl: string;
  categoryAcoBgUrl: string;
}

const defaultSettings: SiteSettings = {
  heroBgUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000',
  experienceBgUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000',
  craftsmanshipBgUrl: 'https://i.ibb.co/YBTGFJ4z/2423.png',
  categorySuperCloneBgUrl: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
  categoryPremiumBgUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
  categoryAcoBgUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
};

interface StoreContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  reviews: Review[];
  siteSettings: SiteSettings;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  addReview: (review: Omit<Review, 'id'>) => Promise<void>;
  updateReview: (id: number, review: Partial<Review>) => Promise<void>;
  deleteReview: (id: number) => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const ADMIN_EMAILS = ['gustavomedeirosg12@gmail.com', 'enriquegustavo816@gmail.com'];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
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
    const qProducts = query(collection(db, 'products'));
    const unsubProducts = onSnapshot(qProducts, (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((doc) => {
        prods.push({ id: Number(doc.id), ...doc.data() } as Product);
      });
      // Sort in memory to avoid missing products that don't have the 'order' field yet
      prods.sort((a, b) => (a.order || 0) - (b.order || 0));
      setProducts(prods);
    }, (error) => {
      // Ignore permission errors silently for public viewers if any
    });

    // Listen to Reviews (Public)
    const qReviews = query(collection(db, 'reviews'));
    const unsubReviews = onSnapshot(qReviews, (snapshot) => {
      const revs: Review[] = [];
      snapshot.forEach((doc) => {
        revs.push({ id: Number(doc.id), ...doc.data() } as Review);
      });
      setReviews(revs);
    }, (error) => {
      // Ignore permission errors silently
    });

    // Listen to Site Settings (Public)
    const unsubSettings = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteSettings({ ...defaultSettings, ...docSnap.data() } as SiteSettings);
      } else {
        setSiteSettings(defaultSettings);
      }
    }, (error) => {
      // Ignore permission errors silently
    });

    return () => {
      unsubProducts();
      unsubReviews();
      unsubSettings();
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

        const reviewsSnap = await getDocs(collection(db, 'reviews'));
        if (reviewsSnap.empty) {
          for (const r of mockReviews) {
            await setDoc(doc(db, 'reviews', r.id.toString()), r);
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

  const addReview = async (review: Omit<Review, 'id'>) => {
    try {
      const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
      await setDoc(doc(db, 'reviews', newId.toString()), review);
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  };

  const updateReview = async (id: number, updatedReview: Partial<Review>) => {
    try {
      await updateDoc(doc(db, 'reviews', id.toString()), updatedReview);
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  };

  const deleteReview = async (id: number) => {
    try {
      await deleteDoc(doc(db, 'reviews', id.toString()));
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  };

  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    try {
      const settingsRef = doc(db, 'settings', 'general');
      await setDoc(settingsRef, settings, { merge: true });
    } catch (error) {
      console.error("Error updating site settings:", error);
      throw error;
    }
  };

  return (
    <StoreContext.Provider value={{ products, orders, customers, reviews, siteSettings, addProduct, updateProduct, deleteProduct, updateOrder, deleteOrder, addReview, updateReview, deleteReview, updateSiteSettings }}>
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
