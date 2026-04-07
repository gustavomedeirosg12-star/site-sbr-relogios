import React from 'react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-serif text-2xl font-bold tracking-wider text-white block mb-4">
              SBR <span className="text-gold-500">RELÓGIOS</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Especialistas em relógios de luxo. Trabalhamos com as melhores linhas do mercado, desde modelos de entrada até superclones com maquinário suíço.
            </p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 uppercase tracking-widest text-sm">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#categorias" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Categorias</a></li>
              <li><a href="#catalogo" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Catálogo</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Dúvidas Frequentes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 uppercase tracking-widest text-sm">Atendimento</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Segunda a Sexta: 09h às 18h</li>
              <li className="text-gray-400 text-sm">Sábado: 09h às 13h</li>
              <li><a href="#" className="text-gold-500 hover:text-gold-400 text-sm transition-colors">Suporte via WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SBR Relógios. Todos os direitos reservados.
          </p>
          <a href="#/admin" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
            Acesso Restrito
          </a>
        </div>
      </div>
    </footer>
  );
}
