import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Flame, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

export function Catalog() {
  const { addToCart } = useCart();
  const { products } = useStore();
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const handleSetFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setActiveFilter(customEvent.detail);
    };
    window.addEventListener('setCategoryFilter', handleSetFilter);
    return () => window.removeEventListener('setCategoryFilter', handleSetFilter);
  }, []);

  const sortedProducts = [...products].sort((a, b) => a.order - b.order);
  
  const filteredProducts = activeFilter === 'Todos' 
    ? sortedProducts 
    : sortedProducts.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const handleWhatsApp = (productName: string) => {
    const text = `Olá! Tenho interesse no relógio *${productName}*. Pode me passar mais informações?`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/553484304734?text=${encoded}`, '_blank');
  };

  const filters = ['Todos', 'Premium', 'Superclone', 'Intermediário', 'Entrada'];

  return (
    <section id="catalogo" className="py-24 bg-dark-800 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Catálogo Exclusivo</h2>
            <div className="w-24 h-1 bg-gold-500 mb-6"></div>
            <p className="text-gray-400 max-w-2xl">
              Peças selecionadas a dedo com o mais alto padrão de qualidade do mercado.
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`pb-1 font-medium whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'text-gold-500 border-b-2 border-gold-500' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group bg-dark-900 border rounded-sm overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-2 ${
                product.featured 
                  ? 'border-gold-500/30 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] hover:border-gold-500/60' 
                  : 'border-white/5 hover:border-gold-500/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-dark-800">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-600 to-gold-400 text-dark-900 text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-lg">
                    Mais Vendido
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1 relative z-10 bg-dark-900">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gold-500 text-[10px] font-medium uppercase tracking-widest">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded-sm border border-red-500/20 animate-pulse">
                      <Flame size={12} /> Últimas Unidades
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-gold-400 transition-colors duration-300">{product.name}</h3>
                
                <div className="mt-auto">
                  <div className="mb-8">
                    <span className="text-3xl font-light text-white block tracking-tight">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                    <span className="text-gray-500 text-xs tracking-wide">ou 12x no cartão de crédito</span>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => addToCart(product)}
                      className="hover-shine w-full bg-gold-500 hover:bg-gold-400 text-dark-900 py-4 rounded-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                    >
                      <ShoppingBag size={16} />
                      Comprar Agora
                    </button>
                    <button 
                      onClick={() => handleWhatsApp(product.name)}
                      className="w-full bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 py-4 rounded-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle size={16} />
                      Dúvidas? Fale no WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
