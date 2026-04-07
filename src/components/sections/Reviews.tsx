import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Marcelo F.',
    text: 'Qualidade impressionante. O peso e o acabamento do Superclone são idênticos ao original. Chegou em 2 dias via Sedex.',
    product: 'Daytona Panda',
    initials: 'MF'
  },
  {
    id: 2,
    name: 'Ricardo S.',
    text: 'Atendimento impecável via WhatsApp. Tiraram todas as minhas dúvidas e o relógio superou as expectativas. Aço 904L de verdade.',
    product: 'Submariner Date',
    initials: 'RS'
  },
  {
    id: 3,
    name: 'Thiago A.',
    text: 'Comprei a linha intermediária para testar e já estou planejando o próximo. Custo-benefício excelente para o dia a dia.',
    product: 'Datejust 41mm',
    initials: 'TA'
  }
];

export function Reviews() {
  return (
    <section className="py-24 bg-dark-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">O que dizem nossos clientes</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A satisfação de quem já comprou e atestou a qualidade SBR Relógios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 p-8 rounded-sm border border-white/5 relative"
            >
              <div className="flex items-center gap-1 text-gold-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 italic leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center text-gold-500 font-serif font-bold">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-white font-medium flex items-center gap-2">
                    {review.name}
                    <CheckCircle size={14} className="text-green-500" />
                  </h4>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">
                    Comprou: {review.product}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
