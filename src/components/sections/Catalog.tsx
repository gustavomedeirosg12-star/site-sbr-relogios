import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Flame, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

export function Catalog() {
  const { addToCart } = useCart();
  const { products } = useStore();

  const sortedProducts = [...products].sort((a, b) => a.order - b.order);

  const handleWhatsApp = (productName: string) => {
    const text = `Olá! Tenho interesse no relógio *${productName}*. Pode me passar mais informações?`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/553484304734?text=${encoded}`, '_blank');
  };

  return (
    <section id="catalogo" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Catálogo Exclusivo</h2>
            <div className="w-24 h-1 bg-gold-500 mb-6"></div>
            <p className="text-gray-400 max-w-2xl">
              Peças selecionadas a dedo com o mais alto padrão de qualidade do mercado.
            </p>
          </div>
          <div className="flex gap-4">
            {/* Filtros simples mockados para visual */}
            <button className="text-gold-500 border-b-2 border-gold-500 pb-1 font-medium">Todos</button>
            <button className="text-gray-400 hover:text-white pb-1 font-medium transition-colors">Premium</button>
            <button className="text-gray-400 hover:text-white pb-1 font-medium transition-colors">Superclone</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-dark-900 border rounded-sm overflow-hidden transition-all flex flex-col ${
                product.featured 
                  ? 'border-gold-500/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'border-white/5 hover:border-gold-500/30'
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-dark-800">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gold-500 text-dark-900 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-lg">
                    Mais Vendido
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gold-500 text-xs font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  {/* Urgency element randomly assigned for visual effect, or based on featured */}
                  {product.featured && (
                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded-sm border border-red-500/20">
                      <Flame size={12} /> Últimas Unidades
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-serif text-white mb-4">{product.name}</h3>
                
                <div className="mt-auto">
                  <div className="mb-6">
                    <span className="text-2xl font-light text-white block">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                    <span className="text-gray-500 text-xs">ou 12x no cartão de crédito</span>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-gold-500 hover:bg-gold-600 text-dark-900 py-3 rounded-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      Comprar Agora
                    </button>
                    <button 
                      onClick={() => handleWhatsApp(product.name)}
                      className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 py-3 rounded-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={18} />
                      Dúvidas? Fale no WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-dark-900 px-8 py-3 rounded-sm font-medium transition-colors uppercase tracking-widest text-sm">
            Carregar Mais Modelos
          </button>
        </div>
      </div>
    </section>
  );
}
