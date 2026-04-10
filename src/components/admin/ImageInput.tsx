import React, { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  folder?: string;
}

export function ImageInput({ value, onChange, placeholder, folder = 'images' }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      onChange(downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Erro ao fazer upload da imagem. Verifique se o Firebase Storage está ativado.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
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
  );
}
