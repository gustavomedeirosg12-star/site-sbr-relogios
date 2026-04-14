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
                <div className="w-full h-full relative overflow-hidden">
                  <img 
                    src={review.productImage} 
                    alt={`Avaliação de cliente`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
