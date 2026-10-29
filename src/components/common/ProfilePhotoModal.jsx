import React, { useState, useRef } from 'react';
import { Camera, Upload, Trash2, X, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabase/supabaseClient';
import { toast } from 'sonner';

export default function ProfilePhotoModal({
  isOpen,
  onClose,
  currentImageUrl,
  onImageChange,
  bucketName = 'avatars',
  title = 'Update Profile Photo'
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile && previewUrl === currentImageUrl) {
      onClose();
      return;
    }

    setUploading(true);
    setProgress(20);

    try {
      let finalUrl = previewUrl;

      // Upload to Supabase Storage if configured and file is selected
      if (selectedFile && isSupabaseConfigured && supabase) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${bucketName}/${fileName}`;

        setProgress(50);

        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) {
          console.warn("Supabase storage error (falling back to data URL):", error);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          if (publicUrlData?.publicUrl) {
            finalUrl = publicUrlData.publicUrl;
          }
        }
      }

      // If offline or data URL preview, convert selectedFile to compressed Data URL so it persists!
      if (selectedFile && (!isSupabaseConfigured || finalUrl.startsWith('blob:'))) {
        finalUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(selectedFile);
        });
      }

      setProgress(100);
      onImageChange(finalUrl);
      toast.success('Image updated successfully');
      onClose();
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    setSelectedFile(null);
    onImageChange('');
    toast.success('Image removed');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-10 overflow-hidden space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Circular Preview Container */}
        <div className="flex flex-col items-center justify-center space-y-4 py-2">
          <div className="relative group w-32 h-32">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-slate-200/80 flex items-center justify-center text-slate-400 font-bold text-2xl">
                <ImageIcon className="w-10 h-10 text-slate-300" />
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-transform hover:scale-105"
              title="Select image"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          <p className="text-xs text-slate-500 text-center">
            Supports JPG, PNG or WebP. Recommended max 5MB.
          </p>
        </div>

        {/* Upload Progress Bar */}
        {uploading && (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-blue-600">
              <span>Uploading to Supabase...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {currentImageUrl || previewUrl ? (
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="px-3.5 py-2 text-red-600 hover:bg-red-50 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove Photo</span>
            </button>
          ) : <div />}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Photo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
