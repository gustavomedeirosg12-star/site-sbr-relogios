import React, { useState } from 'react';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'customers'>('products');
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-dark-800 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <span className="font-serif text-xl font-bold tracking-wider text-white block">
            SBR <span className="text-gold-500">ADMIN</span>
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-widest mt-1 block">Painel de Controle</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
              activeTab === 'products' 
                ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Package size={18} />
            Produtos
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
              activeTab === 'orders' 
                ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <ShoppingCart size={18} />
            Pedidos
          </button>

          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
              activeTab === 'customers' 
                ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Users size={18} />
            Clientes
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent"
          >
            <LogOut size={18} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'customers' && <AdminCustomers />}
      </main>
    </div>
  );
}
