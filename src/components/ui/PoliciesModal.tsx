import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Truck, Clock, Package, Droplets } from 'lucide-react';

export function PoliciesModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openPolicies', handleOpen);
    return () => window.removeEventListener('openPolicies', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-dark-900 border border-white/10 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-dark-800">
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="text-gold-500" />
            Políticas e Garantias SBR
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-gold-500" size={20} />
              <h3 className="text-xl font-medium text-white uppercase tracking-wider">Envios e Prazos</h3>
            </div>
            <ul className="space-y-3 text-gray-400 text-sm leading-relaxed list-disc pl-5">
              <li>Nossos envios são realizados <strong className="text-white">exclusivamente através dos Correios</strong>.</li>
              <li>O prazo para postagem é de <strong className="text-white">até 3 dias úteis</strong> após a confirmação do pagamento. Pedimos a gentileza de aguardar dentro deste prazo.</li>
              <li className="text-red-400 font-medium">Atenção: Não cobrimos avarias, roubos, taxas, extravios, retenções ou qualquer situação que ocorra enquanto a mercadoria estiver em posse dos Correios.</li>
              <li><strong className="text-white">Pronta Entrega:</strong> Possuímos algumas exceções de produtos a pronta entrega com estoque na cidade de Uberlândia-MG. Consulte a disponibilidade com nosso atendimento.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-gold-500" size={20} />
              <h3 className="text-xl font-medium text-white uppercase tracking-wider">Recebimento e Garantia</h3>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm mb-4">
              <p className="text-red-400 text-sm font-bold uppercase tracking-wider text-center">
                ⚠️ Conferir a mercadoria no ato do recebimento ⚠️
              </p>
            </div>
            <ul className="space-y-3 text-gray-400 text-sm leading-relaxed list-disc pl-5">
              <li>É obrigatório conferir peça por peça no ato da entrega. Se houver alguma intercorrência, informe <strong className="text-white">DE IMEDIATO</strong> a um de nossos atendentes.</li>
              <li>Se não formos sinalizados no mesmo dia do recebimento, nossa garantia não irá cobrir.</li>
              <li><strong className="text-white">Maquinário:</strong> Disponibilizamos garantia de 7 dias para o maquinário dos relógios da Linha Premium.</li>
              <li><strong className="text-white">Exclusões:</strong> Não disponibilizamos garantia para bateria descarregada ou perda de cor do banho dos relógios, pois se tratam de réplicas.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="text-gold-500" size={20} />
              <h3 className="text-xl font-medium text-white uppercase tracking-wider">Resistência à Água</h3>
            </div>
            <ul className="space-y-3 text-gray-400 text-sm leading-relaxed list-disc pl-5">
              <li>Todos os relógios postados são resistentes à água.</li>
              <li className="text-gold-500 font-medium">A garantia na vedação só é válida se o produto for testado na água no mesmo dia em que chegar ao cliente, com devida comprovação.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-gold-500" size={20} />
              <h3 className="text-xl font-medium text-white uppercase tracking-wider">Apresentação e Caixas</h3>
            </div>
            <ul className="space-y-3 text-gray-400 text-sm leading-relaxed list-disc pl-5">
              <li><strong className="text-white">Nenhuma peça acompanha caixa por padrão.</strong></li>
              <li>Para elevar sua experiência, oferecemos opções de estojos que podem ser adicionados no momento da compra:
                <ul className="mt-2 space-y-1 pl-4 text-gray-500">
                  <li>» Caixa de Papelão (+ R$ 6,00)</li>
                  <li>» Caixa de Velcro (+ R$ 6,50)</li>
                  <li>» Caixa de Pressão (+ R$ 25,00)</li>
                  <li>» Caixas Originais da Marca (Sob consulta)</li>
                </ul>
              </li>
            </ul>
          </section>

        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-dark-800 text-center">
          <p className="text-gold-500 text-sm font-medium uppercase tracking-widest mb-4">
            Se atente a tudo para evitar problemas futuros.
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-white text-dark-900 px-8 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Estou Ciente
          </button>
        </div>
      </motion.div>
    </div>
  );
}
