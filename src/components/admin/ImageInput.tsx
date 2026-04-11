import React, { useRef, useState, useCallback } from 'react';
import { Upload, Link as LinkIcon, Loader2, X, Check, Settings2, Crop } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/cropImage';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  folder?: string;
  aspectRatio?: number;
}

export function ImageInput({ value, onChange, placeholder, folder = 'images', aspectRatio: initialAspectRatio = 1 }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Cropper state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [currentAspectRatio, setCurrentAspectRatio] = useState<number>(initialAspectRatio);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);
    
    // Read file as data URL for the cropper
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result?.toString() || null);
    });
    reader.readAsDataURL(file);
  };

  const handleUploadCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsUploading(true);
      
      // Get cropped image blob
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedBlob) throw new Error('Failed to crop image');

      // Upload to Firebase
      const fileName = originalFile ? originalFile.name : `edited_${Date.now()}.jpg`;
      const storageRef = ref(storage, `${folder}/${Date.now()}_cropped_${fileName}`);
      const snapshot = await uploadBytes(storageRef, croppedBlob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      onChange(downloadURL);
      
      // Reset state
      setImageSrc(null);
      setOriginalFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Erro ao fazer upload da imagem. Verifique se o Firebase Storage está ativado e se a imagem permite edição.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const cancelCrop = () => {
    setImageSrc(null);
    setOriginalFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      {value && (
        <div className="relative w-32 h-32 rounded-sm overflow-hidden border border-white/10 bg-dark-900 mb-2 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button 
              type="button"
              onClick={() => setImageSrc(value)}
              className="text-white hover:text-gold-500 bg-dark-900 p-2 rounded-full transition-colors"
              title="Recortar/Editar imagem"
            >
              <Crop size={16} />
            </button>
            <button 
              type="button"
              onClick={() => onChange('')}
              className="text-red-400 hover:text-red-300 bg-dark-900 p-2 rounded-full transition-colors"
              title="Remover imagem"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon size={16} className="text-gray-500" />
          </div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "https://..."}
            className="w-full bg-dark-900 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold-500 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-dark-900 border border-white/10 hover:border-gold-500 text-gray-400 hover:text-gold-500 px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50 text-sm"
        >
          {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {isUploading ? 'Enviando...' : 'Upload'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Cropper Modal */}
      {imageSrc && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-dark-900 border border-white/10 rounded-sm w-full max-w-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-white font-medium">Recortar Imagem</h3>
              <button onClick={cancelCrop} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="bg-blue-500/10 border-b border-blue-500/20 p-3 text-blue-400 text-sm flex items-center justify-center text-center">
              💡 Dica: Clique e arraste a imagem para os lados ou para cima/baixo para ajustar o enquadramento.
            </div>

            <div className="relative w-full h-[50vh] sm:h-[60vh] bg-dark-800">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={currentAspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                classes={{ containerClassName: 'bg-dark-800' }}
              />
            </div>
            
            <div className="p-4 border-t border-white/10 flex flex-col gap-4 bg-dark-900">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full sm:w-1/2">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Zoom</span>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Settings2 size={16} className="text-gray-400" />
                  <select 
                    value={currentAspectRatio}
                    onChange={(e) => setCurrentAspectRatio(Number(e.target.value))}
                    className="bg-dark-800 border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm focus:outline-none focus:border-gold-500"
                  >
                    <option value={1}>Quadrado (1:1)</option>
                    <option value={4/3}>Padrão (4:3)</option>
                    <option value={16/9}>Widescreen (16:9)</option>
                    <option value={3/4}>Retrato (3:4)</option>
                    <option value={9/16}>Stories (9:16)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end mt-2">
                <button
                  onClick={cancelCrop}
                  className="px-4 py-2 border border-white/10 text-gray-300 rounded-sm hover:bg-white/5 transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUploadCroppedImage}
                  disabled={isUploading}
                  className="px-4 py-2 bg-gold-500 text-dark-900 rounded-sm hover:bg-gold-400 transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Cortar e Salvar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
