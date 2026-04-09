import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SearchModal } from '../ui/SearchModal';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items, setIsCartOpen } = useCart();

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-dark-900/80 backdrop-blur-md border-b border-white/10 py-2 shadow-lg' 
        : 'bg-gradient-to-b from-dark-900/90 to-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3 group">
              <img 
                src="https://i.ibb.co/vF0ty15/logo.png" 
                alt="SBR Relógios Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback if the direct link format is slightly different
                  (e.target as HTMLImageElement).src = "https://i.ibb.co/vF0ty15/32.png";
                }}
              />
              <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-gold-400 transition-colors duration-300">
                SBR <span className="text-gold-500">RELÓGIOS</span>
              </span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#categorias" className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] relative group">
              Categorias
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#catalogo" className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] relative group">
              Catálogo
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#faq" className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] relative group">
              Dúvidas
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#/rastreio" className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] relative group">
              Rastrear Pedido
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-400 hover:text-white transition-colors"
              title="Pesquisar"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="hover-shine bg-gold-500 hover:bg-gold-400 text-dark-900 px-6 py-2.5 rounded-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
            >
              <ShoppingBag size={18} />
              <span className="text-xs uppercase tracking-wider">Carrinho {cartItemsCount > 0 && `(${cartItemsCount})`}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 hover:text-gold-500 transition-colors"
            >
              <Search size={22} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gold-500 relative"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-dark-900 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-white/10 absolute w-full shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <a href="#categorias" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-gold-500 uppercase text-sm tracking-widest font-medium">Categorias</a>
            <a href="#catalogo" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-gold-500 uppercase text-sm tracking-widest font-medium">Catálogo</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-gold-500 uppercase text-sm tracking-widest font-medium">Dúvidas</a>
            <a href="#/rastreio" onClick={() => setIsOpen(false)} className="block text-gold-500 hover:text-gold-400 uppercase text-sm tracking-widest font-medium">Rastrear Pedido</a>
          </div>
        </div>
      )}
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
