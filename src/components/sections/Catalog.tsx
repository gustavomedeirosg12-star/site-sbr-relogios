import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Flame, MessageCircle, X, ChevronLeft, ChevronRight, ZoomIn, Users, Package } from 'lucide-react';
import { useCart, boxOptions, BoxOption } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../data/mock';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  openQuickView: (p: Product) => void;
  handleWhatsApp: (name: string) => void;
}

function ProductCard({ product, openQuickView, handleWhatsApp }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.image, ...(product.gallery || [])].filter(Boolean);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group bg-dark-900 border rounded-sm overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-2 ${
        product.featured 
          ? 'border-gold-500/30 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] hover:border-gold-500/60' 
          : 'border-white/5 hover:border-gold-500/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
      }`}
    >
      <div 
        className="relative w-full aspect-square overflow-hidden bg-dark-800 cursor-pointer group/image"
        onClick={() => openQuickView(product)}
      >
        <img 
          src={images[currentImageIndex]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover/image:opacity-100"
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black z-20"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black z-20"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20 opacity-0 group-hover/image:opacity-100 transition-opacity">
              {images.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-gold-500' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-dark-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-sm border border-white/10 flex items-center gap-2 transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-300">
            <ZoomIn size={16} />
            <span className="text-sm font-medium">Ver Detalhes</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60 pointer-events-none"></div>
        {product.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-600 to-gold-400 text-dark-900 text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-lg pointer-events-none z-10">
            Mais Vendido
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col flex-1 relative z-10 bg-dark-900">
        <div className="flex justify-between items-start mb-3">
          <span className="text-gold-500 text-[10px] font-medium uppercase tracking-widest">
            {product.category}
          </span>
          {product.featured && (
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded-sm border border-red-500/20 animate-pulse">
              <Flame size={12} /> Últimas Unidades
            </span>
          )}
        </div>
        
        <h3 
          className="text-2xl font-serif text-white mb-4 group-hover:text-gold-400 transition-colors duration-300 cursor-pointer line-clamp-2"
          onClick={() => openQuickView(product)}
        >
          {product.name}
        </h3>
        
        <div className="mb-6">
          <span className="text-3xl font-light text-white block tracking-tight">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </span>
          <span className="text-gray-500 text-xs tracking-wide">ou 12x no cartão de crédito</span>
        </div>
        
        <div className="flex flex-col gap-3 mt-auto">
          <button 
            onClick={() => openQuickView(product)}
            className="hover-shine w-full bg-gold-500 hover:bg-gold-400 text-dark-900 py-4 rounded-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            <ShoppingBag size={16} />
            Comprar Agora
          </button>
          <button 
            onClick={() => handleWhatsApp(product.name)}
            className="w-full bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 py-4 rounded-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle size={16} />
            Dúvidas? Fale no WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Catalog() {
  const { addToCart } = useCart();
  const { products } = useStore();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [activeBrand, setActiveBrand] = useState('Todas');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedBox, setSelectedBox] = useState<BoxOption>(boxOptions[0]);

  useEffect(() => {
    const handleSetFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setActiveFilter(customEvent.detail);
    };
    
    const handleOpenQuickView = (e: Event) => {
      const customEvent = e as CustomEvent<Product>;
      openQuickView(customEvent.detail);
    };

    window.addEventListener('setCategoryFilter', handleSetFilter);
    window.addEventListener('openQuickView', handleOpenQuickView);
    
    return () => {
      window.removeEventListener('setCategoryFilter', handleSetFilter);
      window.removeEventListener('openQuickView', handleOpenQuickView);
    };
  }, []);

  const sortedProducts = [...products].sort((a, b) => a.order - b.order);
  
  const filteredProducts = sortedProducts.filter(p => {
    const matchCategory = activeFilter === 'Todos' || p.category.toLowerCase().includes(activeFilter.toLowerCase());
    const matchBrand = activeBrand === 'Todas' || p.brand === activeBrand;
    return matchCategory && matchBrand;
  });

  const handleWhatsApp = (productName: string) => {
    const text = `Olá! Tenho interesse no relógio *${productName}*. Pode me passar mais informações?`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/553484304734?text=${encoded}`, '_blank');
  };

  const filters = ['Todos', 'Super Clone', 'Premium', 'Aço Cirúrgico 316L'];
  const brands = ['Todas', 'Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega'];

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setShowVideo(false);
    setSelectedBox(boxOptions[0]); // Reset box selection
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  const getCategoryDetails = (category: string) => {
    if (category.includes('Super Clone')) {
      return [
        { label: 'Maquinário', value: 'Suíço (Idêntico ao original)' },
        { label: 'Vidro', value: 'Safira (À prova de riscos)' },
        { label: 'Material', value: 'Aço Inoxidável Maciço Especial' },
        { label: 'Acabamento', value: 'Réplica Perfeita 1:1' }
      ];
    } else if (category.includes('Premium')) {
      return [
        { label: 'Maquinário', value: 'Citizen de Alta Precisão' },
        { label: 'Vidro', value: 'Cristal Mineral' },
        { label: 'Material', value: 'Liga Metálica Antiferrugem' },
        { label: 'Acabamento', value: 'Excelente Custo-Benefício' }
      ];
    } else {
      return [
        { label: 'Material', value: 'Aço Cirúrgico 316L / Inoxidável' },
        { label: 'Durabilidade', value: 'Não perde a cor / Não enferruja' },
        { label: 'Construção', value: 'Robusta e Resistente' }
      ];
    }
  };

  return (
    <section id="catalogo" className="py-24 bg-dark-800 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Catálogo Exclusivo</h2>
            <div className="w-24 h-1 bg-gold-500 mb-6"></div>
            <p className="text-gray-400 max-w-2xl">
              Peças selecionadas a dedo com o mais alto padrão de qualidade do mercado.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`pb-1 font-medium whitespace-nowrap transition-all duration-300 ${
                    activeFilter === filter 
                      ? 'text-gold-500 border-b-2 border-gold-500' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {brands.map(brand => (
                <button 
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                    activeBrand === brand 
                      ? 'bg-white/10 text-white border border-white/20' 
                      : 'bg-transparent text-gray-500 hover:text-gray-300 border border-transparent'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              openQuickView={openQuickView} 
              handleWhatsApp={handleWhatsApp} 
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuickView}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-dark-900 border border-white/10 shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image Gallery Area */}
              <div className="w-full md:w-1/2 bg-dark-800 flex flex-col">
                <div className="relative aspect-square w-full bg-black">
                  {showVideo && selectedProduct.videoUrl ? (
                    <iframe 
                      src={selectedProduct.videoUrl.includes('youtube') ? selectedProduct.videoUrl.replace('watch?v=', 'embed/') : selectedProduct.videoUrl} 
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img 
                      src={currentImageIndex === 0 ? selectedProduct.image : (selectedProduct.gallery?.[currentImageIndex - 1] || selectedProduct.image)} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                  
                  {/* Gallery Navigation Arrows */}
                  {!showVideo && selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                    <>
                      <button 
                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? (selectedProduct.gallery?.length || 0) : prev - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => setCurrentImageIndex(prev => prev === (selectedProduct.gallery?.length || 0) ? 0 : prev + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {(selectedProduct.gallery && selectedProduct.gallery.length > 0 || selectedProduct.videoUrl) && (
                  <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-dark-900 border-t border-white/5">
                    {selectedProduct.videoUrl && (
                      <button 
                        onClick={() => setShowVideo(true)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors bg-dark-800 flex items-center justify-center ${showVideo ? 'border-gold-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      >
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                        <img src={selectedProduct.image} alt="Video Thumbnail" className="w-full h-full object-cover opacity-50" />
                      </button>
                    )}
                    <button 
                      onClick={() => { setCurrentImageIndex(0); setShowVideo(false); }}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${!showVideo && currentImageIndex === 0 ? 'border-gold-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={selectedProduct.image} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                    {selectedProduct.gallery?.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => { setCurrentImageIndex(idx + 1); setShowVideo(false); }}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${!showVideo && currentImageIndex === idx + 1 ? 'border-gold-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details Area */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-widest block">
                    {selectedProduct.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">{selectedProduct.name}</h2>
                
                <div className="mb-8">
                  <span className="text-4xl font-light text-white block tracking-tight">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProduct.price)}
                  </span>
                  <span className="text-gray-500 text-sm tracking-wide">ou 12x no cartão de crédito</span>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <h4 className="text-white font-medium border-b border-white/10 pb-2">Especificações Técnicas</h4>
                  <ul className="space-y-3">
                    {getCategoryDetails(selectedProduct.category).map((detail, idx) => (
                      <li key={idx} className="flex flex-col sm:flex-row sm:justify-between text-sm">
                        <span className="text-gray-400">{detail.label}</span>
                        <span className="text-white font-medium text-right">{detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Box Selection */}
                <div className="mb-8 bg-dark-800 p-4 rounded-sm border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={18} className="text-gold-500" />
                    <h4 className="text-white font-medium text-sm uppercase tracking-widest">Opções de Caixa</h4>
                  </div>
                  <p className="text-xs text-red-400 mb-4 font-medium uppercase tracking-wider">* Nenhuma peça acompanha caixa por padrão</p>
                  
                  <div className="space-y-2">
                    {boxOptions.map((box) => (
                      <label 
                        key={box.id} 
                        className={`flex items-center justify-between p-3 rounded-sm cursor-pointer border transition-all ${
                          selectedBox.id === box.id 
                            ? 'border-gold-500 bg-gold-500/10' 
                            : 'border-white/10 hover:border-white/30 bg-dark-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedBox.id === box.id ? 'border-gold-500' : 'border-gray-500'
                          }`}>
                            {selectedBox.id === box.id && <div className="w-2 h-2 bg-gold-500 rounded-full" />}
                          </div>
                          <span className={`text-sm ${selectedBox.id === box.id ? 'text-white font-medium' : 'text-gray-400'}`}>
                            {box.name}
                          </span>
                        </div>
                        <span className="text-gold-500 text-sm font-medium">
                          {box.price === 0 ? 'Grátis' : `+ R$ ${box.price.toFixed(2).replace('.', ',')}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct, selectedBox);
                      closeQuickView();
                    }}
                    className="hover-shine w-full bg-gold-500 hover:bg-gold-400 text-dark-900 py-4 rounded-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <ShoppingBag size={18} />
                    Adicionar ao Carrinho - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProduct.price + selectedBox.price)}
                  </button>
                  <button 
                    onClick={() => handleWhatsApp(selectedProduct.name)}
                    className="w-full bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 py-4 rounded-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Dúvidas? Fale no WhatsApp
                  </button>
                </div>

                {/* Related Products */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-widest">Você também pode gostar</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {products
                      .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                      .slice(0, 3)
                      .map(related => (
                        <div 
                          key={related.id} 
                          className="cursor-pointer group"
                          onClick={() => openQuickView(related)}
                        >
                          <div className="aspect-square bg-dark-800 rounded-sm overflow-hidden mb-2 border border-white/5 group-hover:border-gold-500/50 transition-colors">
                            <img src={related.image} alt={related.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <p className="text-xs text-gray-400 group-hover:text-gold-400 truncate transition-colors">{related.name}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
