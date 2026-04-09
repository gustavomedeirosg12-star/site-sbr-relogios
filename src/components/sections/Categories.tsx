import React from 'react';
import { categories } from '../../data/mock';
import { motion } from 'motion/react';

export function Categories() {
  const handleCategoryClick = (categoryName: string) => {
    // Dispatch event to update filter in Catalog
    window.dispatchEvent(new CustomEvent('setCategoryFilter', { detail: categoryName }));
    
    // Scroll to catalog
    const catalogSection = document.getElementById('catalogo');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="py-24 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Nossas Linhas</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trabalhamos com diferentes níveis de acabamento para atender a sua exigência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCategoryClick(category.name)}
              className="group relative overflow-hidden rounded-sm bg-dark-800 border border-white/5 hover:border-gold-500/40 transition-all duration-700 cursor-pointer hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:-translate-y-2"
            >
              <div className="aspect-[4/5] overflow-hidden bg-dark-900">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-70 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent p-8 flex flex-col justify-end transition-opacity duration-700">
                <h3 className="text-2xl font-serif font-bold text-gold-500 mb-3 group-hover:text-gold-400 transition-colors">{category.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
