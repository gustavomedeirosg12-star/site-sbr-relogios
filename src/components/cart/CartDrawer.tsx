import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck, Award } from 'lucide-react';
import { useCart } from '../../context/CartContext';

type CheckoutStep = 'cart' | 'checkout';
type PaymentMethod = 'pix' | 'cartao' | '';

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, total, isCartOpen, setIsCartOpen } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');

  const totalFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(total);

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setStep('cart');
      setName('');
      setPaymentMethod('');
    }, 300);
  };

  const handleWhatsAppCheckout = () => {
    if (!name || !paymentMethod) return;

    const itemsList = items
      .map((i) => `${i.quantity}x ${i.name}\n   ↳ ${i.box.name} (+R$ ${i.box.price.toFixed(2)})\n   Subtotal: R$ ${((i.price + i.box.price) * i.quantity).toFixed(2)}`)
      .join('\n\n');
    
    const paymentText = paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito';
    
    const text = `Olá! Gostaria de finalizar meu pedido.\n\n*Nome:* ${name}\n*Forma de Pagamento:* ${paymentText}\n\n*Pedido:*\n${itemsList}\n\n*Frete:* Grátis\n*Total:* ${totalFormatted}`;
    
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/553484304734?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div key="backdrop" className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-dark-900 border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-serif text-2xl font-bold text-white">
                {step === 'cart' ? 'Seu Carrinho' : 'Finalizar Compra'}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <p>Seu carrinho está vazio.</p>
                  <button
                    onClick={handleClose}
                    className="text-gold-500 hover:text-gold-400 font-medium"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : step === 'cart' ? (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4 bg-dark-800 p-4 rounded-sm border border-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-sm"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-white font-medium text-sm">{item.name}</h3>
                          <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 inline-block"></span>
                            {item.box.name}
                          </p>
                          <p className="text-gold-500 text-sm mt-1 font-medium">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(item.price + item.box.price)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-dark-900 rounded-sm px-2 py-1 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Ex: João Silva"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Forma de Pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod('pix')}
                        className={`p-4 rounded-sm border text-center transition-colors ${
                          paymentMethod === 'pix'
                            ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                            : 'bg-dark-800 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        PIX
                      </button>
                      <button
                        onClick={() => setPaymentMethod('cartao')}
                        className={`p-4 rounded-sm border text-center transition-colors ${
                          paymentMethod === 'cartao'
                            ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                            : 'bg-dark-800 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        Cartão
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'pix' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 border border-green-500/30 p-4 rounded-sm"
                    >
                      <p className="text-green-400 text-sm text-center font-medium">
                        Pagamento via Pix é mais rápido e garante 5% de desconto!
                      </p>
                    </motion.div>
                  )}

                  {paymentMethod === 'cartao' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-sm"
                    >
                      <p className="text-blue-400 text-sm text-center font-medium">
                        Pagamento no cartão é feito via suporte e pode levar alguns minutos.
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-dark-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-serif font-bold text-white">
                    {totalFormatted}
                  </span>
                </div>

                {step === 'cart' ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full bg-gold-500 hover:bg-gold-600 text-dark-900 py-4 rounded-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Avançar <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-full bg-dark-900 border border-white/10 hover:border-white/30 text-white py-4 rounded-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Continuar comprando
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500 text-center mb-2">
                      Ao finalizar, você concorda com nossos{' '}
                      <button 
                        onClick={() => window.dispatchEvent(new Event('openPolicies'))}
                        className="text-gold-500 underline hover:text-gold-400"
                      >
                        Termos de Compra e Garantia
                      </button>
                    </p>
                    <button
                      onClick={handleWhatsAppCheckout}
                      disabled={!name || !paymentMethod}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Finalizar no WhatsApp
                    </button>
                    <button
                      onClick={() => setStep('cart')}
                      className="w-full bg-dark-900 border border-white/10 hover:border-white/30 text-white py-4 rounded-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} /> Voltar ao carrinho
                    </button>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/5 pt-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <ShieldCheck size={24} className="text-gold-500" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Compra<br/>Segura</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Award size={24} className="text-gold-500" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">1 Ano<br/>Garantia</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Truck size={24} className="text-gold-500" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Frete<br/>Grátis</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
