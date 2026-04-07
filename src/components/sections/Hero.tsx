import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Watch Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-500 uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-4 block">
            A Excelência no seu Pulso
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            O Tempo com <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Exclusividade
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Descubra nossa coleção de relógios premium. Do aço cirúrgico aos superclones com maquinário suíço.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a 
              href="#catalogo"
              className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-dark-900 px-8 py-4 rounded-sm font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-1"
            >
              Comprar Agora
            </a>
            <a 
              href="#categorias"
              className="w-full sm:w-auto bg-transparent border border-white/30 hover:border-gold-500 hover:text-gold-500 text-white px-8 py-4 rounded-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              Ver Modelos <ChevronRight size={18} />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span>Mais de <strong>500 clientes</strong> satisfeitos em todo o Brasil</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
