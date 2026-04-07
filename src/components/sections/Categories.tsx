import React from 'react';
import { categories } from '../../data/mock';
import { motion } from 'motion/react';

export function Categories() {
  return (
    <section id="categorias" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Nossas Linhas</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trabalhamos com diferentes níveis de acabamento para atender a sua exigência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-sm bg-dark-800 border border-white/5 hover:border-gold-500/50 transition-colors"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-xl font-serif font-bold text-gold-500 mb-2">{category.name}</h3>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
