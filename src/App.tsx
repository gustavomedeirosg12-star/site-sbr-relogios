/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Craftsmanship } from './components/sections/Craftsmanship';
import { BrandTicker } from './components/sections/BrandTicker';
import { Categories } from './components/sections/Categories';
import { Catalog } from './components/sections/Catalog';
import { Experience } from './components/sections/Experience';
import { Trust } from './components/sections/Trust';
import { Reviews } from './components/sections/Reviews';
import { FAQ } from './components/sections/FAQ';
import { Tracking } from './components/sections/Tracking';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { Concierge } from './components/ui/Concierge';
import { CustomCursor } from './components/ui/CustomCursor';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load admin components to optimize main bundle size
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));

function Storefront() {
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-gold-500 selection:text-dark-900 relative cursor-none md:cursor-auto">
      <CustomCursor />
      <div className="noise-overlay"></div>
      <Navbar />
      <CartDrawer />
      
      <main>
        <Hero />
        <BrandTicker />
        <Craftsmanship />
        <Trust />
        <Categories />
        <Catalog />
        <Experience />
        <Reviews />
        <FAQ />
      </main>

      <Footer />
      <WhatsAppButton />
      <Concierge />
    </div>
  );
}

function TrackingRoute() {
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-gold-500 selection:text-dark-900 relative flex flex-col cursor-none md:cursor-auto">
      <CustomCursor />
      <div className="noise-overlay"></div>
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1">
        <Tracking />
      </main>

      <Footer />
      <WhatsAppButton />
      <Concierge />
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
      if (window.location.hash === '#/admin') {
        setCurrentRoute('admin');
      } else if (window.location.hash === '#/rastreio') {
        setCurrentRoute('tracking');
      } else {
        setCurrentRoute('store');
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          {currentRoute === 'admin' ? <AdminRoute /> : currentRoute === 'tracking' ? <TrackingRoute /> : <Storefront />}
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
