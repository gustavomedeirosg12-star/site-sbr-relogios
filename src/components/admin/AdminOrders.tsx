import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ExternalLink } from 'lucide-react';

export function AdminOrders() {
  const { orders } = useStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Pendente': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Enviado': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Pedidos</h2>
        <p className="text-gray-400 text-sm">Acompanhe as vendas e faturamento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800 border border-white/5 p-6 rounded-sm">
          <p className="text-gray-400 text-sm mb-1">Faturamento Total</p>
          <p className="text-3xl font-serif text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              orders.reduce((acc, order) => acc + order.total, 0)
            )}
          </p>
        </div>
        <div className="bg-dark-800 border border-white/5 p-6 rounded-sm">
          <p className="text-gray-400 text-sm mb-1">Pedidos Realizados</p>
          <p className="text-3xl font-serif text-white">{orders.length}</p>
        </div>
        <div className="bg-dark-800 border border-white/5 p-6 rounded-sm">
          <p className="text-gray-400 text-sm mb-1">Ticket Médio</p>
          <p className="text-3xl font-serif text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              orders.reduce((acc, order) => acc + order.total, 0) / (orders.length || 1)
            )}
          </p>
        </div>
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-900/50 border-b border-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">ID Pedido</th>
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Data</th>
                <th className="p-4 font-medium">Itens</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Pagamento</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-white font-mono text-sm">{order.id}</td>
                  <td className="p-4 text-white">{order.customerName}</td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(order.date).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </td>
                  <td className="p-4 text-white font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{order.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gold-500 hover:text-gold-400 transition-colors p-2">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
