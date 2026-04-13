import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export function InstagramSection() {
  // Substitua este link pelo link real do seu Instagram
  const instagramUrl = "https://instagram.com/sbr.relogios"; 
  
  // Imagens de placeholder (você pode trocar depois ou deixar essas que combinam com o nicho)
  const feedImages = [
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1587836374828-cb4387df3eb7?auto=format&fit=crop&q=80"
  ];

  return (
    <section className="py-24 bg-dark-900 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center mb-6">
            <Instagram size={28} className="text-gold-500" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Siga nosso Instagram</h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Acompanhe os lançamentos exclusivos, bastidores e detalhes das nossas peças mais cobiçadas em primeira mão.
          </p>
          <a 
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-dark-900 rounded-sm font-medium uppercase tracking-wider transition-all duration-300"
          >
            @sbr.relogios
          </a>
        </motion.div>
      </div>

      {/* Carrossel de Imagens do Feed */}
      <div className="flex overflow-x-auto pb-8 scrollbar-hide gap-4 px-4 sm:px-6 lg:px-8 max-w-[100vw] snap-x">
        {feedImages.map((img, idx) => (
          <motion.a
            key={idx}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0 group overflow-hidden rounded-sm cursor-pointer snap-center border border-white/5"
          >
            <img 
              src={img} 
              alt="Instagram feed" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Instagram size={24} className="text-white" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
