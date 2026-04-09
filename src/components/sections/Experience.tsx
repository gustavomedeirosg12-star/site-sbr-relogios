import React from 'react';
import { motion } from 'motion/react';
import { Package, Shield, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Experience() {
  const { siteSettings } = useStore();

  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">A Experiência SBR</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Mais do que um relógio, entregamos uma experiência de luxo completa desde o momento em que você abre a caixa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group"
          >
            <img 
              src={siteSettings.experienceBgUrl} 
              alt="Unboxing Experience" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="bg-dark-900/80 backdrop-blur-md border border-white/10 p-6 rounded-sm">
                <h3 className="text-xl font-serif text-white mb-2">O Unboxing Perfeito</h3>
                <p className="text-gray-400 text-sm">Cada detalhe é pensado para surpreender. Você escolhe como quer receber sua joia.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                <Package className="text-gold-500" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Opções de Estojo</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Por padrão, enviamos a peça super protegida. Mas você pode elevar a experiência adicionando caixas de papelão, velcro, pressão ou até mesmo a caixa original da marca com certificados.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                <Shield className="text-gold-500" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Proteção Total</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Todos os envios possuem seguro total contra roubo ou extravio. Sua peça viaja em embalagem discreta e altamente resistente.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                <Star className="text-gold-500" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Pronto para Presentear</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Seja para você ou para alguém especial, a apresentação ao abrir a embalagem transmite o verdadeiro valor da alta relojoaria.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
