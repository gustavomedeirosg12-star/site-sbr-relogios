import React from 'react';
import { ShieldCheck, Truck, Clock, CreditCard } from 'lucide-react';

export function Trust() {
  const features = [
    {
      icon: <ShieldCheck size={32} className="text-gold-500" />,
      title: 'Garantia Total',
      description: 'Até 1 ano de garantia no maquinário para linhas Premium e Superclone.'
    },
    {
      icon: <Truck size={32} className="text-gold-500" />,
      title: 'Frete Grátis',
      description: 'Envio gratuito via Sedex para todo o território nacional.'
    },
    {
      icon: <CreditCard size={32} className="text-gold-500" />,
      title: 'Pagamento Seguro',
      description: 'Parcele em até 12x no cartão ou ganhe 5% de desconto no PIX.'
    },
    {
      icon: <Clock size={32} className="text-gold-500" />,
      title: 'Suporte Dedicado',
      description: 'Atendimento humanizado via WhatsApp antes e após a compra.'
    }
  ];

  return (
    <section className="py-20 bg-dark-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 border border-white/5 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
