import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Hero() {
  const { siteSettings } = useStore();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-dark-900">
        <motion.div 
          className="w-full h-full origin-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ 
            duration: 14, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ willChange: "transform" }}
        >
          <img 
            src={siteSettings.heroBgUrl} 
            alt="Luxury Watch Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        {/* Adjusted gradients for better clarity while maintaining text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 via-transparent to-dark-900/60 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-[1px] bg-gradient-to-b from-transparent via-gold-500 to-transparent mb-6"
          />
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-gold-500 uppercase text-xs md:text-sm font-semibold tracking-[0.4em] mb-6 block"
          >
            A Arte da Alta Relojoaria
          </motion.span>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-2xl flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Elegância
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block italic font-light text-gold-500 mt-2 md:mt-4"
            >
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8], textShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 20px rgba(212,175,55,0.4)", "0px 0px 0px rgba(212,175,55,0)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Atemporal
              </motion.span>
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide"
          >
            Descubra nossa coleção exclusiva de peças premium. Do aço cirúrgico aos superclones com maquinário suíço 1:1.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <a 
              href="#catalogo"
              className="group relative overflow-hidden bg-gold-500 text-dark-900 px-10 py-4 rounded-sm font-bold text-lg transition-all flex items-center justify-center gap-2 hover:bg-gold-400"
            >
              <span className="relative z-10">Comprar Agora</span>
              <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
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
            className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-12"
          >
            <div className="flex text-gold-500 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="tracking-wider">Mais de <strong className="text-white font-medium">500 clientes</strong> satisfeitos</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <span className="text-gray-500 text-xs uppercase tracking-[0.2em]">Role para descobrir</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1"
            >
              <motion.div className="w-1 h-2 bg-gold-500 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
