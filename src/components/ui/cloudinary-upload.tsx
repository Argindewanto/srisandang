'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { ImageIcon, Loader2 } from 'lucide-react';
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  onError?: (error: string) => void;
  value?: string;
  loading?: boolean;
}

// Define the expected info structure from Cloudinary
interface CloudinaryInfo {
  secure_url: string;
  [key: string]: any; // for other properties we might not use
}

export function CloudinaryUpload({ 
  onUpload, 
  onError,
  value,
  loading = false 
}: CloudinaryUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="srisandang_uploads"
      onSuccess={(result: CloudinaryUploadWidgetResults) => {
        const info = result.info as CloudinaryInfo;
        if (info?.secure_url) {
          onUpload(info.secure_url);
        }
      }}
      onError={(error) => {
        console.error('Upload error:', error);
        if (error) {
          const errorMessage = typeof error === 'string' 
            ? error 
            : error.status || error.statusText || 'Upload failed';
          onError?.(errorMessage);
        }
      }}
      options={{
        maxFiles: 1,
        resourceType: "image",
        clientAllowedFormats: ["png", "jpeg", "jpg"],
        maxFileSize: 5000000, // 5MB
        folder: "srisandang", // Optional: organize uploads in folders
      }}
    >
      {({ open }) => (
        <div
          onClick={() => !loading && open()}
          className={`
            border-2 border-dashed border-neutral-200 rounded-lg p-4
            flex flex-col items-center justify-center gap-2
            cursor-pointer hover:border-brand-primary transition-colors
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            ${value ? 'aspect-video' : 'aspect-square max-w-md'}
          `}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-10 w-10 text-neutral-400 animate-spin" />
              <p className="text-body-sm text-neutral-600">Uploading...</p>
            </div>
          ) : value ? (
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Upload"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                <p className="text-white text-body-sm">Change Image</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-full bg-neutral-50">
                <ImageIcon className="h-10 w-10 text-neutral-400" />
              </div>
              <div className="text-center">
                <p className="text-body-sm text-neutral-900">
                  Click to upload image
                </p>
                <p className="text-body-sm text-neutral-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
} 