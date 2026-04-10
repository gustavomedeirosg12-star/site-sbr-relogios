import React, { useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../data/mock';
import { Edit2, Trash2, Plus, X, Upload, Loader2, ImagePlus } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { ImageInput } from './ImageInput';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Rolex',
    category: 'Super Clone',
    price: '',
    image: '',
    gallery: [] as string[],
    videoUrl: '',
    featured: false,
    order: '1'
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        brand: product.brand || 'Rolex',
        category: product.category,
        price: product.price.toString(),
        image: product.image,
        gallery: product.gallery || [],
        videoUrl: product.videoUrl || '',
        featured: product.featured,
        order: product.order.toString()
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        brand: 'Rolex',
        category: 'Super Clone',
        price: '',
        image: '',
        gallery: [],
        videoUrl: '',
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
      alert("Erro ao fazer upload da imagem. Verifique se o Firebase Storage está ativado no seu console do Firebase.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setIsUploadingGallery(true);
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `products/gallery_${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
      });

      const urls = await Promise.all(uploadPromises);
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
    } catch (error) {
      console.error("Error uploading gallery images:", error);
      alert("Erro ao fazer upload das imagens. Verifique se o Firebase Storage está ativado.");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image,
      gallery: formData.gallery,
      videoUrl: formData.videoUrl,
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
          <div className="bg-dark-800 border border-white/10 rounded-sm w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-dark-800 z-10">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
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
                      <label className="block text-sm font-medium text-gray-300 mb-1">Ordem</label>
                      <input 
                        required
                        type="number" 
                        value={formData.order}
                        onChange={e => setFormData({...formData, order: e.target.value})}
                        className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Marca</label>
                      <select 
                        value={formData.brand}
                        onChange={e => setFormData({...formData, brand: e.target.value})}
                        className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                      >
                        <option value="Rolex">Rolex</option>
                        <option value="Patek Philippe">Patek Philippe</option>
                        <option value="Audemars Piguet">Audemars Piguet</option>
                        <option value="Omega">Omega</option>
                        <option value="Cartier">Cartier</option>
                        <option value="Tag Heuer">Tag Heuer</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
                      <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                      >
                        <option value="Super Clone">Super Clone</option>
                        <option value="Premium">Premium</option>
                        <option value="Aço Cirúrgico 316L">Aço Cirúrgico 316L</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Link do Vídeo (Opcional)</label>
                    <input 
                      type="url" 
                      placeholder="Ex: https://youtube.com/..."
                      value={formData.videoUrl}
                      onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                      className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Se preenchido, um player de vídeo aparecerá nos detalhes do produto.</p>
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
                </div>

                <div className="space-y-4">
                  {/* Main Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Imagem Principal (URL ou Upload)</label>
                    <ImageInput 
                      value={formData.image}
                      onChange={(val) => setFormData({...formData, image: val})}
                      placeholder="Cole o link do Imgur/IMGBB aqui..."
                      folder="products"
                      aspectRatio={1}
                    />
                  </div>

                  {/* Gallery Images */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center justify-between">
                      <span>Galeria de Imagens (URLs ou Upload)</span>
                      <span className="text-xs text-gray-500">{formData.gallery.length} imagens</span>
                    </label>
                    
                    <div className="flex gap-2 mb-3">
                      <input 
                        type="url" 
                        id="galleryUrlInput"
                        placeholder="Cole o link e clique em +"
                        className="flex-1 bg-dark-900 border border-white/10 rounded-sm px-4 py-2 text-white focus:outline-none focus:border-gold-500 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            if (input.value) {
                              setFormData(prev => ({ ...prev, gallery: [...prev.gallery, input.value] }));
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('galleryUrlInput') as HTMLInputElement;
                          if (input && input.value) {
                            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, input.value] }));
                            input.value = '';
                          }
                        }}
                        className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-3 rounded-sm flex items-center justify-center transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {formData.gallery.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-sm overflow-hidden border border-white/10 bg-dark-900 group">
                          <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      
                      <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={galleryInputRef}
                        onChange={handleGalleryUpload}
                      />
                      <button 
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        disabled={isUploadingGallery}
                        className="aspect-square flex flex-col items-center justify-center gap-2 bg-dark-900 border border-dashed border-white/20 hover:border-gold-500 text-gray-400 hover:text-gold-500 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploadingGallery ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}
                        <span className="text-xs text-center px-2">Upload<br/>Fotos</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isUploading || isUploadingGallery || !formData.image}
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
