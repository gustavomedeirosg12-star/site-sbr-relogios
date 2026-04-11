import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Reviews() {
  const { reviews } = useStore();

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-dark-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">O que dizem nossos clientes</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A satisfação de quem já comprou e atestou a qualidade SBR Relógios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 rounded-sm border border-white/5 relative overflow-hidden group flex flex-col"
            >
              {review.productImage && (
                <div className="w-full relative overflow-hidden">
                  <img 
                    src={review.productImage} 
                    alt={`Relógio recebido por ${review.name}`} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/20 to-transparent"></div>
                </div>
              )}
              
              <div className={`p-8 flex-1 flex flex-col ${review.productImage ? 'pt-0 relative z-10 -mt-10' : ''}`}>
                <div className="flex items-center gap-1 text-gold-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic leading-relaxed text-sm">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center text-gold-500 font-serif font-bold text-sm shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-medium flex items-center gap-1.5 text-sm">
                      {review.name}
                      <CheckCircle size={14} className="text-green-500" />
                    </h4>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">
                      Comprou: {review.product}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
