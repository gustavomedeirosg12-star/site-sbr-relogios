import React from 'react';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-wider text-white block mb-4">
              SBR <span className="text-gold-500">RELÓGIOS</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Especialistas em relógios de luxo. Trabalhamos com as melhores linhas do mercado, desde modelos de entrada até superclones com maquinário suíço.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <ShieldCheck size={16} className="text-gold-500" />
              <span>Site 100% Seguro e Criptografado</span>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 uppercase tracking-widest text-sm">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#categorias" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Categorias</a></li>
              <li><a href="#catalogo" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Catálogo</a></li>
              <li><a href="#/rastreio" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Rastrear Pedido</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Dúvidas Frequentes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 uppercase tracking-widest text-sm">Políticas</h3>
            <ul className="space-y-2">
              <li><button onClick={() => window.dispatchEvent(new Event('openPolicies'))} className="text-gray-400 hover:text-gold-500 text-sm transition-colors text-left">Termos de Compra e Garantia</button></li>
              <li><button onClick={() => window.dispatchEvent(new Event('openPolicies'))} className="text-gray-400 hover:text-gold-500 text-sm transition-colors text-left">Prazos de Entrega</button></li>
              <li><button onClick={() => window.dispatchEvent(new Event('openPolicies'))} className="text-gray-400 hover:text-gold-500 text-sm transition-colors text-left">Trocas e Devoluções</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 uppercase tracking-widest text-sm">Atendimento</h3>
            <ul className="space-y-2 mb-6">
              <li className="text-gray-400 text-sm">Segunda a Sexta: 09h às 18h</li>
              <li className="text-gray-400 text-sm">Sábado: 09h às 13h</li>
              <li><a href="#" className="text-gold-500 hover:text-gold-400 text-sm transition-colors">Suporte via WhatsApp</a></li>
            </ul>
            <h3 className="text-white font-medium mb-3 uppercase tracking-widest text-sm">Pagamento Seguro</h3>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-white rounded-sm flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-800">VISA</span>
              </div>
              <div className="w-10 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="flex">
                  <div className="w-3 h-3 rounded-full bg-red-500 mix-blend-multiply"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mix-blend-multiply -ml-1"></div>
                </div>
              </div>
              <div className="w-10 h-6 bg-white rounded-sm flex items-center justify-center">
                <span className="text-[10px] font-bold text-teal-500">PIX</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm mb-1">
              &copy; {new Date().getFullYear()} SBR Relógios. Todos os direitos reservados.
            </p>
            <p className="text-gray-600 text-xs">
              CNPJ: 65.090.366/0001-44 | São Paulo, SP
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Lock size={12} />
              <span>SSL Secured</span>
            </div>
            <a href="#/admin" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              Acesso Restrito
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
