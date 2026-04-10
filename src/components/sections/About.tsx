import React from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Award } from 'lucide-react';

export function About() {
  return (
    <section id="sobre" className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 border border-gold-500/30 translate-x-4 translate-y-4 rounded-sm"></div>
              <img 
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop" 
                alt="Relojoeiro trabalhando" 
                className="w-full h-full object-cover rounded-sm relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 bg-dark-800 p-6 border border-white/10 rounded-sm z-20 shadow-2xl hidden md:block">
                <p className="text-gold-500 font-serif text-4xl mb-1">1:1</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">Réplicas Perfeitas</p>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold-500"></div>
              <span className="text-gold-500 font-semibold tracking-[0.2em] uppercase text-xs">Sobre a SBR Relógios</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
              A Excelência do Tempo <br />
              <span className="italic font-light text-white/80">ao Seu Alcance</span>
            </h2>
            
            <div className="space-y-6 text-gray-400 font-light leading-relaxed mb-10">
              <p>
                A SBR Relógios nasceu com um propósito claro: democratizar o acesso à alta relojoaria mundial. Sabemos que o design, o peso e a precisão de um relógio de luxo são símbolos de conquista e bom gosto.
              </p>
              <p>
                Trabalhamos exclusivamente com peças <strong className="text-white font-medium">Super Clone e Premium</strong>. Isso significa que cada engrenagem, cada marcação no mostrador e o peso do aço inoxidável são recriados com precisão milimétrica para oferecer uma experiência idêntica à peça original.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <Shield className="text-gold-500" size={24} />
                <h4 className="text-white font-medium text-sm">Garantia Total</h4>
                <p className="text-xs text-gray-500">Todas as peças possuem garantia contra defeitos de maquinário.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Award className="text-gold-500" size={24} />
                <h4 className="text-white font-medium text-sm">Qualidade 1:1</h4>
                <p className="text-xs text-gray-500">Materiais premium como Vidro de Safira e Aço 904L.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Clock className="text-gold-500" size={24} />
                <h4 className="text-white font-medium text-sm">Maquinário Suíço</h4>
                <p className="text-xs text-gray-500">Movimento automático contínuo, sem saltos no ponteiro.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
