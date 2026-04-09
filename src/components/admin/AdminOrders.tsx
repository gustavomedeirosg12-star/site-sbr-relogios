import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Edit2, Trash2, X } from 'lucide-react';
import { Order } from '../../data/mock';

export function AdminOrders() {
  const { orders, updateOrder, deleteOrder } = useStore();
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState('');
  const [trackingCode, setTrackingCode] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Pendente': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Enviado': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setStatus(order.status);
    setTrackingCode(order.trackingCode || '');
  };

  const handleSave = () => {
    if (editingOrder) {
      updateOrder(editingOrder.id, { status, trackingCode });
      setEditingOrder(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este pedido?')) {
      deleteOrder(id);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Pedidos</h2>
        <p className="text-gray-400 text-sm">Acompanhe e gerencie as vendas (Edite ou remova pedidos)</p>
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
                <th className="p-4 font-medium text-right">Ações (Editar/Remover)</th>
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
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(order)}
                        className="p-2 text-gray-400 hover:text-white bg-dark-900 rounded-sm transition-colors"
                        title="Editar Status"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-gray-400 hover:text-red-400 bg-dark-900 rounded-sm transition-colors"
                        title="Remover Pedido"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edição de Pedido */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-white/10 rounded-sm w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Editar Pedido {editingOrder.id}</h3>
              <button onClick={() => setEditingOrder(null)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status do Pedido</label>
                <select 
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Pago">Pago</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              {status === 'Enviado' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Código de Rastreio (Correios/Transportadora)</label>
                  <input 
                    type="text"
                    value={trackingCode}
                    onChange={e => setTrackingCode(e.target.value)}
                    placeholder="Ex: NL123456789BR"
                    className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Este código será exibido para o cliente na página de rastreio.</p>
                </div>
              )}

              <div className="pt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setEditingOrder(null)}
                  className="px-6 py-2.5 rounded-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-6 py-2.5 rounded-sm font-medium transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
