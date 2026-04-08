import React from 'react';

const brands = [
  "ROLEX", 
  "PATEK PHILIPPE", 
  "AUDEMARS PIGUET", 
  "RICHARD MILLE", 
  "OMEGA", 
  "CARTIER", 
  "HUBLOT", 
  "BREITLING",
  "TAG HEUER"
];

export function BrandTicker() {
  return (
    <div className="w-full bg-dark-900 border-y border-white/5 py-8 overflow-hidden flex relative z-20">
      {/* Gradient Fades for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div key={index} className="flex items-center justify-center px-12">
            <span className="text-gray-500 font-serif text-xl md:text-2xl tracking-[0.2em] uppercase hover:text-gold-500 transition-colors duration-500 cursor-default">
              {brand}
            </span>
            <span className="mx-12 text-gold-500/20 text-2xl">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
