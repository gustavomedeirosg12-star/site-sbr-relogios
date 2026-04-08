/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { BrandTicker } from './components/sections/BrandTicker';
import { Categories } from './components/sections/Categories';
import { Catalog } from './components/sections/Catalog';
import { Trust } from './components/sections/Trust';
import { Reviews } from './components/sections/Reviews';
import { FAQ } from './components/sections/FAQ';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load admin components to optimize main bundle size
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));

function Storefront() {
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-gold-500 selection:text-dark-900 relative">
      <div className="noise-overlay"></div>
      <Navbar />
      <CartDrawer />
      
      <main>
        <Hero />
        <BrandTicker />
        <Trust />
        <Categories />
        <Catalog />
        <Reviews />
        <FAQ />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function AdminRoute() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-gold-500">Carregando...</div>;
  }

  if (!isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-dark-900 flex items-center justify-center text-gold-500">Carregando...</div>}>
        <AdminLogin />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-900 flex items-center justify-center text-gold-500">Carregando...</div>}>
      <AdminLayout />
    </Suspense>
  );
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('store');

  useEffect(() => {
    const checkHash = () => {
      setCurrentRoute(window.location.hash === '#/admin' ? 'admin' : 'store');
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          {currentRoute === 'admin' ? <AdminRoute /> : <Storefront />}
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
