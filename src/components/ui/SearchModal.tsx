import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../data/mock';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const results = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (product: Product) => {
    onClose();
    window.location.hash = '#catalogo';
    // Pequeno delay para garantir que a rolagem aconteceu antes de abrir o modal
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('openQuickView', { detail: product }));
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-900/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-dark-800 border border-white/10 shadow-2xl rounded-sm overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="text-gold-500 mr-3" size={24} />
              <input 
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar por marca, modelo ou categoria..."
                className="flex-1 bg-transparent border-none text-white text-lg focus:outline-none placeholder-gray-500"
              />
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-white p-1 rounded-sm transition-colors ml-2"
              >
                <X size={20} />
              </button>
            </div>

            {query.trim() !== '' && (
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => handleSelect(product)}
                        className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-sm cursor-pointer transition-colors group"
                      >
                        <div className="w-12 h-12 bg-dark-900 rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium group-hover:text-gold-400 transition-colors">{product.name}</h4>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">{product.brand} • {product.category}</span>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <span className="text-gold-500 font-medium">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                          </span>
                          <ArrowRight size={16} className="text-gray-600 group-hover:text-gold-500 transition-colors transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Nenhum relógio encontrado para "{query}".
                  </div>
                )}
              </div>
            )}
            
            {query.trim() === '' && (
              <div className="p-6 bg-dark-900/50">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Buscas Populares</p>
                <div className="flex flex-wrap gap-2">
                  {['Rolex Daytona', 'Patek Philippe', 'Super Clone', 'Aço 316L'].map(term => (
                    <button 
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-dark-800 border border-white/5 hover:border-gold-500/50 text-gray-300 hover:text-gold-400 text-sm rounded-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
