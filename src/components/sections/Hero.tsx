import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Hero() {
  const { siteSettings } = useStore();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full animate-slow-zoom">
          <img 
            src={siteSettings.heroBgUrl} 
            alt="Luxury Watch Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-gold-500 uppercase text-sm md:text-base font-medium mb-6 block"
          >
            A Excelência no seu Pulso
          </motion.span>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            O Tempo com <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-600 animate-pulse">
              Exclusividade
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide"
          >
            Descubra nossa coleção de relógios premium. Do aço cirúrgico aos superclones com maquinário suíço.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <a 
              href="#catalogo"
              className="hover-shine w-full sm:w-auto bg-gradient-to-r from-gold-600 to-gold-500 text-dark-900 px-10 py-4 rounded-sm font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-1"
            >
              Comprar Agora
            </a>
            <a 
              href="#categorias"
              className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-gold-500 hover:text-gold-500 text-white px-10 py-4 rounded-sm font-medium transition-all duration-500 flex items-center justify-center gap-2"
            >
              Ver Modelos <ChevronRight size={18} />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center justify-center gap-3 text-sm text-gray-400"
          >
            <div className="flex text-gold-500 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="tracking-wider">Mais de <strong className="text-white font-medium">500 clientes</strong> satisfeitos</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
