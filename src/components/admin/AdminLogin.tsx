import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const { loginWithGoogle, user } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="bg-dark-800 border border-white/5 p-8 rounded-sm max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-900 border border-white/5 mb-6">
          <Lock size={32} className="text-gold-500" />
        </div>
        
        <h2 className="font-serif text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
        <p className="text-gray-400 text-sm mb-8">
          Faça login com sua conta de administrador para acessar o painel de controle.
        </p>

        {user ? (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm mb-6">
            <p className="text-red-400 text-sm">
              O email <strong>{user.email}</strong> não tem permissão de administrador.
            </p>
          </div>
        ) : null}

        <button
          onClick={loginWithGoogle}
          className="w-full bg-white hover:bg-gray-100 text-dark-900 px-4 py-3 rounded-sm font-medium transition-colors flex items-center justify-center gap-3"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Entrar com Google
        </button>
        
        <div className="mt-6">
          <a href="#" className="text-gold-500 hover:text-gold-400 text-sm transition-colors">
            Voltar para a loja
          </a>
        </div>
      </div>
    </div>
  );
}
