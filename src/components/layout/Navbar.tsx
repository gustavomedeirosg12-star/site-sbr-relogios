import React from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, setIsCartOpen } = useCart();

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed w-full z-50 bg-dark-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                SBR <span className="text-gold-500">RELÓGIOS</span>
              </span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#categorias" className="text-gray-300 hover:text-gold-500 transition-colors text-sm uppercase tracking-widest">Categorias</a>
            <a href="#catalogo" className="text-gray-300 hover:text-gold-500 transition-colors text-sm uppercase tracking-widest">Catálogo</a>
            <a href="#faq" className="text-gray-300 hover:text-gold-500 transition-colors text-sm uppercase tracking-widest">Dúvidas</a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-6 py-2 rounded-sm font-medium transition-colors flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              <span>Carrinho {cartItemsCount > 0 && `(${cartItemsCount})`}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gold-500 relative"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-dark-900 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark-800 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#categorias" className="block px-3 py-2 text-gray-300 hover:text-gold-500 uppercase text-sm tracking-widest">Categorias</a>
            <a href="#catalogo" className="block px-3 py-2 text-gray-300 hover:text-gold-500 uppercase text-sm tracking-widest">Catálogo</a>
            <a href="#faq" className="block px-3 py-2 text-gray-300 hover:text-gold-500 uppercase text-sm tracking-widest">Dúvidas</a>
          </div>
        </div>
      )}
    </nav>
  );
}
