
import React, { useCallback, useState, useEffect } from 'react';

interface ImageUploaderProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageFile, setImageFile }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);
  
  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  return (
    <div 
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`relative w-full h-64 border-2 border-dashed rounded-lg flex flex-col justify-center items-center transition-all duration-300 cursor-pointer 
      ${isDragging ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-600 hover:border-gray-500 bg-gray-700/50'}`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
        className="absolute w-full h-full opacity-0 cursor-pointer"
        id="image-upload"
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="object-contain h-full w-full rounded-lg" />
      ) : (
        <div className="text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2">
            <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
