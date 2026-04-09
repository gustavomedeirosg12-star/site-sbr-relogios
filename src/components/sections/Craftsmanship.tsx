import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Craftsmanship() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations for the background image
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.8, 0.4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Text 1: Maquinário
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15, 0.3], [50, 0, -50]);

  // Text 2: Vidro de Safira
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [50, 0, -50]);

  // Text 3: Aço 904L
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.7, 0.85, 1], [50, 0, -50]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-dark-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Image that scales and moves */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ scale, y, opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/20 to-dark-900 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-dark-900 z-10"></div>
          <img 
            src="https://i.ibb.co/YBTGFJ4z/2423.png" 
            alt="Rolex Craftsmanship" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Text Overlays */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Feature 1 */}
          <motion.div 
            className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 max-w-lg"
            style={{ opacity: text1Opacity, y: text1Y }}
          >
            <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block">A Arte do Tempo</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Maquinário <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Suíço 1:1</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Cada engrenagem é montada com precisão milimétrica. O movimento contínuo do ponteiro é a assinatura da verdadeira alta relojoaria.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 max-w-lg text-right"
            style={{ opacity: text2Opacity, y: text2Y }}
          >
            <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block">Resistência Absoluta</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Vidro de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Safira</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              À prova de riscos e com tratamento antirreflexo. A clareza perfeita que o seu mostrador merece, mantendo a beleza intacta por gerações.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl text-center w-full px-4"
            style={{ opacity: text3Opacity, y: text3Y }}
          >
            <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block">Construção Impecável</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Aço Inoxidável <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Maciço</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              O peso exato. O brilho inconfundível. Utilizamos as mesmas ligas metálicas das grandes grifes para garantir uma experiência tátil idêntica ao original.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
