import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Package, Truck, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Order } from '../../data/mock';

export function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const orderRef = doc(db, 'orders', trackingCode.trim());
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        setOrder({ id: orderSnap.id, ...orderSnap.data() } as Order);
      } else {
        setError('Pedido não encontrado. Verifique o código e tente novamente.');
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError('Erro ao buscar o pedido. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Pendente': return 1;
      case 'Pago': return 2;
      case 'Enviado': return 3;
      case 'Cancelado': return 0;
      default: return 1;
    }
  };

  return (
    <section id="rastreio" className="py-32 bg-dark-900 min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Rastrear Pedido</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400">
            Acompanhe o status da sua compra em tempo real.
          </p>
        </div>

        <div className="bg-dark-800 border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Digite o código do pedido (Ex: PED-12345)"
                className="w-full bg-dark-900 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !trackingCode}
              className="bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-dark-900 px-8 py-4 rounded-sm font-medium transition-colors whitespace-nowrap"
            >
              {loading ? 'Buscando...' : 'Rastrear'}
            </button>
          </form>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-sm text-center mb-8"
            >
              {error}
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-dark-900 rounded-sm border border-white/5 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Pedido</p>
                  <p className="text-white font-bold text-lg">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Data</p>
                  <p className="text-white font-medium">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-gold-500 font-bold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                  </p>
                </div>
              </div>

              {order.status === 'Cancelado' ? (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-sm text-center">
                  <X className="mx-auto text-red-500 mb-2" size={32} />
                  <h3 className="text-red-500 font-bold text-lg">Pedido Cancelado</h3>
                  <p className="text-gray-400 mt-2">Este pedido foi cancelado. Entre em contato com o suporte para mais informações.</p>
                </div>
              ) : (
                <div className="relative pt-8 pb-4">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-dark-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gold-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(getStatusStep(order.status) - 1) * 50}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="relative flex justify-between">
                    {/* Step 1: Pendente */}
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${getStatusStep(order.status) >= 1 ? 'bg-gold-500 border-dark-800 text-dark-900' : 'bg-dark-900 border-dark-800 text-gray-500'}`}>
                        <Clock size={20} />
                      </div>
                      <span className={`text-sm font-medium ${getStatusStep(order.status) >= 1 ? 'text-white' : 'text-gray-500'}`}>Pendente</span>
                    </div>

                    {/* Step 2: Pago */}
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${getStatusStep(order.status) >= 2 ? 'bg-gold-500 border-dark-800 text-dark-900' : 'bg-dark-900 border-dark-800 text-gray-500'}`}>
                        <CheckCircle size={20} />
                      </div>
                      <span className={`text-sm font-medium ${getStatusStep(order.status) >= 2 ? 'text-white' : 'text-gray-500'}`}>Pago</span>
                    </div>

                    {/* Step 3: Enviado */}
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${getStatusStep(order.status) >= 3 ? 'bg-gold-500 border-dark-800 text-dark-900' : 'bg-dark-900 border-dark-800 text-gray-500'}`}>
                        <Truck size={20} />
                      </div>
                      <span className={`text-sm font-medium ${getStatusStep(order.status) >= 3 ? 'text-white' : 'text-gray-500'}`}>Enviado</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="text-white font-medium mb-4">Itens do Pedido</h4>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-400">
                      <Package size={16} className="text-gold-500" />
                      <span>{item.quantity}x {item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.status === 'Enviado' && order.trackingCode && (
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="bg-dark-900 border border-gold-500/30 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-1 flex items-center gap-2">
                        <Truck size={18} className="text-gold-500" />
                        Código de Rastreio dos Correios
                      </h4>
                      <p className="text-gray-400 text-sm">Use este código para acompanhar a entrega no site dos Correios.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <code className="bg-dark-800 text-gold-500 px-4 py-2 rounded-sm font-mono text-lg border border-white/10 flex-1 md:flex-none text-center">
                        {order.trackingCode}
                      </code>
                      <a 
                        href={`https://rastreamento.correios.com.br/app/index.php`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gold-500 hover:bg-gold-600 text-dark-900 p-2.5 rounded-sm transition-colors"
                        title="Rastrear nos Correios"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
