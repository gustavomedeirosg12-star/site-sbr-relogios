import React, { useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../data/mock';
import { Edit2, Trash2, Plus, X, Upload, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Premium (Aço 904)',
    price: '',
    image: '',
    featured: false,
    order: '1'
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        image: product.image,
        featured: product.featured,
        order: product.order.toString()
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Premium (Aço 904)',
        price: '',
        image: '',
        featured: false,
        order: (products.length + 1).toString()
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({ ...prev, image: downloadURL }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Erro ao fazer upload da imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image,
      featured: formData.featured,
      order: parseInt(formData.order)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
  };

  const sortedProducts = [...products].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Produtos</h2>
          <p className="text-gray-400 text-sm">Gerencie o catálogo da sua loja</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-4 py-2 rounded-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Novo Produto
        </button>
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-900/50 border-b border-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">Ordem</th>
                <th className="p-4 font-medium">Produto</th>
                <th className="p-4 font-medium">Categoria</th>
                <th className="p-4 font-medium">Preço</th>
                <th className="p-4 font-medium">Destaque</th>
                <th className="p-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-gray-400">{product.order}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-sm object-cover bg-dark-900" />
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{product.category}</td>
                  <td className="p-4 text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </td>
                  <td className="p-4">
                    {product.featured ? (
                      <span className="bg-gold-500/10 text-gold-500 px-2 py-1 rounded-sm text-xs font-medium border border-gold-500/20">Sim</span>
                    ) : (
                      <span className="bg-white/5 text-gray-400 px-2 py-1 rounded-sm text-xs font-medium border border-white/10">Não</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-gray-400 hover:text-white bg-dark-900 rounded-sm transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-gray-400 hover:text-red-400 bg-dark-900 rounded-sm transition-colors"
                        title="Remover"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-white/10 rounded-sm w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-dark-800 z-10">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nome do Relógio</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Preço (R$)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Ordem de Exibição</label>
                  <input 
                    required
                    type="number" 
                    value={formData.order}
                    onChange={e => setFormData({...formData, order: e.target.value})}
                    className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                >
                  <option value="Premium (Aço 904)">Premium (Aço 904)</option>
                  <option value="Superclone">Superclone</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Entrada">Entrada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Imagem do Produto</label>
                
                {formData.image && (
                  <div className="mb-3 relative w-32 h-32 rounded-sm overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, image: ''})}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-sm hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <input 
                    type="url" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    placeholder="Cole a URL da imagem ou faça upload..."
                    className="flex-1 bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                  />
                  
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-dark-900 border border-white/10 hover:border-gold-500 text-gray-300 hover:text-gold-500 px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="featured"
                  checked={formData.featured}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4 accent-gold-500 bg-dark-900 border-white/10 rounded-sm"
                />
                <label htmlFor="featured" className="text-sm text-gray-300">
                  Destacar na vitrine (Selo Destaque)
                </label>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isUploading || !formData.image}
                  className="bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-dark-900 px-6 py-2.5 rounded-sm font-medium transition-colors"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
