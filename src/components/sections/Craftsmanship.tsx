import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useStore } from '../../context/StoreContext';

export function Craftsmanship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { siteSettings } = useStore();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations for the background image
  // Instead of scaling to 2x (which pixelates), we scale subtly to 1.15
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  // Instead of fading out to black, we keep it visible but darken it slightly
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.5, 0.3]);
  // We add a blur effect that increases as you scroll, bringing text into focus
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(4px)", "blur(8px)"]);

  // Text 1: Maquinário (0 to 0.33)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15, 0.3], [40, 0, -40]);
  const text1Blur = useTransform(scrollYProgress, [0, 0.15, 0.3], ["blur(10px)", "blur(0px)", "blur(10px)"]);

  // Text 2: Vidro de Safira (0.33 to 0.66)
  const text2Opacity = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [40, 0, -40]);
  const text2Blur = useTransform(scrollYProgress, [0.33, 0.5, 0.66], ["blur(10px)", "blur(0px)", "blur(10px)"]);

  // Text 3: Aço 904L (0.66 to 1)
  const text3Opacity = useTransform(scrollYProgress, [0.66, 0.85, 1], [0, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.66, 0.85, 1], [40, 0, -40]);
  const text3Blur = useTransform(scrollYProgress, [0.66, 0.85, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);

  // Progress Bar
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-dark-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Image that scales and blurs */}
        <motion.div 
          className="absolute inset-0 w-full h-full origin-center"
          style={{ scale, opacity, filter: blur }}
        >
          <div className="absolute inset-0 bg-dark-900/40 z-10"></div>
          <img 
            src={siteSettings.craftsmanshipBgUrl} 
            alt="Rolex Craftsmanship" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 h-1/3 w-[1px] bg-white/10 z-30 hidden md:block">
          <motion.div 
            className="w-full bg-gold-500 origin-top"
            style={{ height: progressHeight }}
          />
        </div>

        {/* Text Overlays */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
          
          {/* Feature 1 */}
          <motion.div 
            className="absolute left-4 right-4 md:left-32 md:right-auto md:w-[500px]"
            style={{ opacity: text1Opacity, y: text1Y, filter: text1Blur }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold-500 font-mono text-sm tracking-widest">01</span>
              <div className="h-[1px] w-12 bg-gold-500/50"></div>
              <span className="text-gold-500 font-semibold tracking-[0.2em] uppercase text-xs">A Arte do Tempo</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Maquinário <br/>
              <span className="italic font-light text-white/90">Suíço 1:1</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Cada engrenagem é montada com precisão milimétrica. O movimento contínuo do ponteiro é a assinatura da verdadeira alta relojoaria, replicada à perfeição.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            className="absolute left-4 right-4 md:left-32 md:right-auto md:w-[500px]"
            style={{ opacity: text2Opacity, y: text2Y, filter: text2Blur }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold-500 font-mono text-sm tracking-widest">02</span>
              <div className="h-[1px] w-12 bg-gold-500/50"></div>
              <span className="text-gold-500 font-semibold tracking-[0.2em] uppercase text-xs">Resistência Absoluta</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Vidro de <br/>
              <span className="italic font-light text-white/90">Safira</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              À prova de riscos e com tratamento antirreflexo. A clareza perfeita que o seu mostrador merece, mantendo a beleza intacta por gerações.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            className="absolute left-4 right-4 md:left-32 md:right-auto md:w-[500px]"
            style={{ opacity: text3Opacity, y: text3Y, filter: text3Blur }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold-500 font-mono text-sm tracking-widest">03</span>
              <div className="h-[1px] w-12 bg-gold-500/50"></div>
              <span className="text-gold-500 font-semibold tracking-[0.2em] uppercase text-xs">Construção Impecável</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Aço Inoxidável <br/>
              <span className="italic font-light text-white/90">Maciço</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              O peso exato. O brilho inconfundível. Utilizamos as mesmas ligas metálicas das grandes grifes para garantir uma experiência tátil idêntica ao original.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
