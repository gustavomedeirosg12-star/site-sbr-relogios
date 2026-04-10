import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, Image as ImageIcon } from 'lucide-react';
import { ImageInput } from './ImageInput';

export function AdminSettings() {
  const { siteSettings, updateSiteSettings } = useStore();
  const [formData, setFormData] = useState(siteSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(siteSettings);
  }, [siteSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSiteSettings(formData);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Aparência do Site</h2>
          <p className="text-gray-400 text-sm">Altere as imagens principais do site usando links (Imgur, IMGBB, etc.)</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-dark-900 px-4 py-2 rounded-sm font-medium transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-sm p-6 space-y-8">
        
        {/* Hero Banner */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <ImageIcon size={20} className="text-gold-500" />
            <h3 className="text-lg font-medium text-white">Banner Principal (Topo do Site)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">URL ou Upload da Imagem</label>
              <ImageInput 
                value={formData.heroBgUrl}
                onChange={(val) => setFormData({...formData, heroBgUrl: val})}
                placeholder="https://i.imgur.com/..."
                aspectRatio={16/9}
              />
              <p className="text-xs text-gray-500 mt-2">Recomendado: Imagem escura ou com filtro, resolução 1920x1080.</p>
            </div>
            <div className="relative aspect-video bg-dark-900 rounded-sm overflow-hidden border border-white/10">
              <img src={formData.heroBgUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold drop-shadow-lg">Preview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <ImageIcon size={20} className="text-gold-500" />
            <h3 className="text-lg font-medium text-white">Imagem da Seção "A Experiência SBR"</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">URL ou Upload da Imagem</label>
              <ImageInput 
                value={formData.experienceBgUrl}
                onChange={(val) => setFormData({...formData, experienceBgUrl: val})}
                placeholder="https://i.imgur.com/..."
                aspectRatio={4/3}
              />
              <p className="text-xs text-gray-500 mt-2">Recomendado: Foto de unboxing, caixas ou detalhes. Formato quadrado ou 4:3.</p>
            </div>
            <div className="relative aspect-[4/3] w-48 bg-dark-900 rounded-sm overflow-hidden border border-white/10">
              <img src={formData.experienceBgUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Craftsmanship Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <ImageIcon size={20} className="text-gold-500" />
            <h3 className="text-lg font-medium text-white">Imagem da Seção "A Arte do Tempo"</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">URL ou Upload da Imagem</label>
              <ImageInput 
                value={formData.craftsmanshipBgUrl}
                onChange={(val) => setFormData({...formData, craftsmanshipBgUrl: val})}
                placeholder="https://i.imgur.com/..."
                aspectRatio={3/4}
              />
              <p className="text-xs text-gray-500 mt-2">Recomendado: Imagem vertical ou de alta resolução mostrando detalhes do maquinário.</p>
            </div>
            <div className="relative aspect-[3/4] w-48 bg-dark-900 rounded-sm overflow-hidden border border-white/10">
              <img src={formData.craftsmanshipBgUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <ImageIcon size={20} className="text-gold-500" />
            <h3 className="text-lg font-medium text-white">Imagens das Categorias (Nossas Linhas)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Super Clone */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-400">Super Clone</label>
              <div className="relative aspect-[4/5] w-full bg-dark-900 rounded-sm overflow-hidden border border-white/10 mb-2">
                <img src={formData.categorySuperCloneBgUrl} alt="Super Clone" className="w-full h-full object-cover" />
              </div>
              <ImageInput 
                value={formData.categorySuperCloneBgUrl}
                onChange={(val) => setFormData({...formData, categorySuperCloneBgUrl: val})}
                placeholder="URL da imagem..."
                aspectRatio={4/5}
              />
            </div>

            {/* Premium */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-400">Premium</label>
              <div className="relative aspect-[4/5] w-full bg-dark-900 rounded-sm overflow-hidden border border-white/10 mb-2">
                <img src={formData.categoryPremiumBgUrl} alt="Premium" className="w-full h-full object-cover" />
              </div>
              <ImageInput 
                value={formData.categoryPremiumBgUrl}
                onChange={(val) => setFormData({...formData, categoryPremiumBgUrl: val})}
                placeholder="URL da imagem..."
                aspectRatio={4/5}
              />
            </div>

            {/* Aço 316L */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-400">Aço Cirúrgico 316L</label>
              <div className="relative aspect-[4/5] w-full bg-dark-900 rounded-sm overflow-hidden border border-white/10 mb-2">
                <img src={formData.categoryAcoBgUrl} alt="Aço 316L" className="w-full h-full object-cover" />
              </div>
              <ImageInput 
                value={formData.categoryAcoBgUrl}
                onChange={(val) => setFormData({...formData, categoryAcoBgUrl: val})}
                placeholder="URL da imagem..."
                aspectRatio={4/5}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
