import React, { useRef, useState } from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export function InstagramSection() {
  // Substitua este link pelo link real do seu Instagram
  const instagramUrl = "https://instagram.com/sbr.relogios"; 
  
  // Imagens do feed
  const feedImages = [
    "https://69d917505386887646d2db3b.imgix.net/4343.PNG",
    "https://69d917505386887646d2db3b.imgix.net/3233.PNG",
    "https://69d917505386887646d2db3b.imgix.net/212.PNG",
    "https://69d917505386887646d2db3b.imgix.net/3121.PNG",
    "https://69d917505386887646d2db3b.imgix.net/4343.PNG", // Duplicado para preencher
    "https://69d917505386887646d2db3b.imgix.net/3233.PNG"
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade da rolagem
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

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
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto pb-8 scrollbar-hide gap-4 px-4 sm:px-6 lg:px-8 max-w-[100vw] snap-x ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
      >
        {feedImages.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0 group overflow-hidden rounded-sm snap-center border border-white/5"
          >
            <img 
              src={img} 
              alt="Instagram feed" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <a 
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0"
              onClick={(e) => {
                if (isDragging) e.preventDefault();
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                <Instagram size={24} className="text-white" />
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
