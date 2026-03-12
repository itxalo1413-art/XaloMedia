import React, { useState } from 'react';
import { uploadImage } from '../../lib/api';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      // We pass the file to our common API helper
      const res = await uploadImage(file);
      if (res.url) {
        onChange(res.url);
      }
    } catch (err: any) {
      setError('Tải ảnh thất bại: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    const fileInput = document.getElementById(
      `upload-${folder}`,
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative group rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center w-40 h-32">
            <img
              src={value}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <button
                type="button"
                onClick={handleRemove}
                className="text-white bg-red-600 hover:bg-red-700 font-medium px-3 py-1 rounded-md text-sm shadow"
              >
                Xóa ảnh
              </button>
            </div>
          </div>
        ) : (
          <div className="w-40 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 bg-gray-50 text-sm">
            <span>Chưa có ảnh</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <input
            id={`upload-${folder}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-digital-blue
              hover:file:bg-blue-100 transition-all cursor-pointer"
          />
          {uploading && (
            <span className="text-sm text-blue-600 font-medium">
              Đang tải lên...
            </span>
          )}
          {error && (
            <span className="text-sm text-red-500 font-medium">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
}
