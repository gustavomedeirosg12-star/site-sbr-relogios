import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { products, faqs } from '../../data/mock';

// Initialize Gemini API
// Note: In a real production app, this should be handled by a backend to protect the API key.
// For this preview environment, we use the provided process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function Concierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o Concierge da SBR Relógios. Como posso ajudar você a encontrar a peça perfeita hoje?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateSystemPrompt = () => {
    const catalogInfo = products.map(p => `- ${p.name} (${p.brand}) - ${p.category} - R$ ${p.price}`).join('\n');
    const faqInfo = faqs.flatMap(c => c.items).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');

    return `Você é o Concierge de Luxo da "SBR Relógios", uma boutique especializada em relógios de alto padrão (Super Clones 1:1, Premium e Aço 316L).
Seu tom deve ser extremamente educado, sofisticado, prestativo e persuasivo, como um vendedor de uma grife suíça (ex: Rolex, Patek Philippe).
Responda de forma concisa e direta. Não escreva textos longos.

Catálogo atual:
${catalogInfo}

Dúvidas Frequentes:
${faqInfo}

Regras:
1. Se o cliente perguntar sobre um relógio específico, verifique se temos no catálogo e informe o preço e a categoria.
2. Se não tivermos o relógio, sugira um modelo similar do nosso catálogo.
3. Reforce sempre a qualidade dos nossos produtos (vidro de safira, maquinário suíço nos Super Clones, aço maciço).
4. O pagamento é via PIX (5% de desconto) ou até 12x no cartão.
5. Direcione o cliente para o WhatsApp se ele quiser finalizar a compra.
6. NUNCA invente produtos ou preços que não estão no catálogo.
7. OBJEÇÕES E CONFIANÇA (GOLPE/FRAUDE): Se o cliente perguntar como sabe que não é golpe, se é confiável ou se vai receber o produto, responda com extrema empatia e segurança. Destaque os seguintes pontos:
   - Pagamento 100% seguro (processado por plataformas seguras com garantia de entrega).
   - Garantia de 1 ano para o maquinário.
   - Envio de código de rastreio dos Correios em até 24h úteis.
   - Convide o cliente a ver os depoimentos reais com fotos de clientes que já receberam, disponíveis no nosso site.
   - Ofereça o atendimento humano via WhatsApp para maior tranquilidade.
   NUNCA fique na defensiva. Transmita a solidez e a transparência de uma boutique de luxo.`;
  };

  const handleSend = async () => {
    if (!input.trim() || !process.env.GEMINI_API_KEY) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Format history for Gemini
      const history = messages.map(m => ({
        role: m.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: generateSystemPrompt() }] },
          { role: 'model', parts: [{ text: 'Entendido. Agirei como o Concierge da SBR Relógios.' }] },
          ...history,
          { role: 'user', parts: [{ text: userMsg.text }] }
        ],
        config: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || 'Desculpe, não consegui processar sua solicitação no momento.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, estou enfrentando uma instabilidade no momento. Por favor, chame nossa equipe no WhatsApp para um atendimento mais rápido.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-dark-800 border border-gold-500/50 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="text-gold-500" size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
          1
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-dark-900 border border-white/10 rounded-sm shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dark-800 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-dark-900 border border-gold-500/50 flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Concierge" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-800 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-serif font-medium">Concierge SBR</h3>
                  <p className="text-gold-500 text-xs flex items-center gap-1">
                    <Sparkles size={10} /> Inteligência Artificial
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-dark-900/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-sm text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-gold-500 text-dark-900 rounded-tr-none font-medium' 
                        : 'bg-dark-800 text-gray-300 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-dark-800 border border-white/5 p-3 rounded-sm rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="text-gold-500 animate-spin" />
                    <span className="text-xs text-gray-500">Concierge digitando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-dark-800 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pergunte sobre um relógio..."
                  className="w-full bg-dark-900 border border-white/10 rounded-sm pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 text-gold-500 hover:text-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-2 text-center">
                <span className="text-[10px] text-gray-600">As respostas são geradas por IA e podem conter imprecisões.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
