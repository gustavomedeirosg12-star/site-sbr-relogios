import React, { useState } from 'react';
import { Plus, Trash2, Star, Edit2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageInput } from './ImageInput';

export function AdminReviews() {
  const { reviews, addReview, updateReview, deleteReview } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({
    name: '',
    text: '',
    product: '',
    initials: '',
    productImage: ''
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview(newReview);
      setIsAdding(false);
      setNewReview({ name: '', text: '', product: '', initials: '', productImage: '' });
    } catch (error) {
      alert('Erro ao adicionar depoimento.');
    }
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    try {
      await updateReview(editingId, newReview);
      setEditingId(null);
      setNewReview({ name: '', text: '', product: '', initials: '', productImage: '' });
    } catch (error) {
      alert('Erro ao salvar depoimento.');
    }
  };

  const startEdit = (review: any) => {
    setNewReview({
      name: review.name,
      text: review.text,
      product: review.product,
      initials: review.initials,
      productImage: review.productImage || ''
    });
    setEditingId(review.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewReview({ name: '', text: '', product: '', initials: '', productImage: '' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este depoimento?')) {
      try {
        await deleteReview(id);
      } catch (error) {
        alert('Erro ao excluir depoimento.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-white">Depoimentos</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setNewReview({ name: '', text: '', product: '', initials: '', productImage: '' });
          }}
          className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-4 py-2 rounded-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Depoimento
        </button>
      </div>

      {(isAdding || editingId !== null) && (
        <div className="bg-dark-800 border border-white/5 p-6 rounded-sm">
          <h3 className="text-lg font-medium text-white mb-4">
            {editingId !== null ? 'Editar Depoimento' : 'Adicionar Novo Depoimento'}
          </h3>
          <form onSubmit={editingId !== null ? handleEditSave : handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-gold-500 outline-none"
                  placeholder="Ex: João S."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Iniciais (Avatar)</label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={newReview.initials}
                  onChange={(e) => setNewReview({ ...newReview, initials: e.target.value.toUpperCase() })}
                  className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-gold-500 outline-none"
                  placeholder="Ex: JS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Produto Comprado</label>
                <input
                  type="text"
                  required
                  value={newReview.product}
                  onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-gold-500 outline-none"
                  placeholder="Ex: Submariner Date"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">URL ou Upload da Imagem do Produto (Opcional)</label>
                <ImageInput 
                  value={newReview.productImage}
                  onChange={(val) => setNewReview({ ...newReview, productImage: val })}
                  placeholder="https://..."
                  folder="reviews"
                  aspectRatio={1}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={editingId !== null ? cancelEdit : () => setIsAdding(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-6 py-2 rounded-sm font-medium transition-colors"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-dark-800 border border-white/5 rounded-sm p-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => startEdit(review)}
                className="text-gray-500 hover:text-gold-500"
                title="Editar"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="text-gray-500 hover:text-red-500"
                title="Excluir"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-1 text-gold-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
              <div className="w-8 h-8 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center text-gold-500 font-serif font-bold text-xs">
                {review.initials}
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">{review.name}</h4>
                <span className="text-gray-500 text-xs">Comprou: {review.product}</span>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhum depoimento cadastrado.
          </div>
        )}
      </div>
    </div>
  );
}
