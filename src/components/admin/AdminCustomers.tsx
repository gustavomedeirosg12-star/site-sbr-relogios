import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Phone } from 'lucide-react';

export function AdminCustomers() {
  const { customers } = useStore();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Clientes</h2>
        <p className="text-gray-400 text-sm">Gerencie sua base de clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800 border border-white/5 p-6 rounded-sm">
          <p className="text-gray-400 text-sm mb-1">Total de Clientes</p>
          <p className="text-3xl font-serif text-white">{customers.length}</p>
        </div>
        <div className="bg-dark-800 border border-white/5 p-6 rounded-sm">
          <p className="text-gray-400 text-sm mb-1">Clientes Ativos</p>
          <p className="text-3xl font-serif text-white">{customers.filter(c => c.totalOrders > 0).length}</p>
        </div>
        <div className="bg-dark-800 border border-white/5 p-6 rounded-sm">
          <p className="text-gray-400 text-sm mb-1">LTV Médio</p>
          <p className="text-3xl font-serif text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              customers.reduce((acc, c) => acc + c.totalSpent, 0) / (customers.length || 1)
            )}
          </p>
        </div>
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-900/50 border-b border-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">ID Cliente</th>
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">Contato</th>
                <th className="p-4 font-medium">Total Pedidos</th>
                <th className="p-4 font-medium">Total Gasto</th>
                <th className="p-4 font-medium">Último Pedido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-white font-mono text-sm">{customer.id}</td>
                  <td className="p-4 text-white font-medium">{customer.name}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Mail size={14} />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Phone size={14} />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white">{customer.totalOrders}</td>
                  <td className="p-4 text-white font-medium text-gold-500">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(customer.totalSpent)}
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(customer.lastOrderDate).toLocaleDateString('pt-BR')}
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
