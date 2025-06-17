// src/components/ui/image-cropper-dialog.tsx
import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import make from "react-image-crop";
import type {
  Crop,
  PixelCrop,
  PercentCrop,
  ReactCropProps,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Import CSS-nya

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog"; // Pastikan path ini benar ke komponen dialog shadcn/ui Anda
import { Button } from "~/components/ui/button"; // Pastikan path ini benar ke komponen button shadcn/ui Anda

interface ImageCropperDialogProps {
  imageSrc: string | null; // URL gambar yang akan di-crop
  isOpen: boolean;
  onClose: () => void;
  onImageCropped: (croppedFile: File) => void;
  aspectRatio?: number; // Default 1 (1:1)
  outputWidth?: number; // Lebar output gambar (piksel)
  outputHeight?: number; // Tinggi output gambar (piksel)
  compressionQuality?: number; // Kualitas kompresi JPEG (0-1, default 0.9)
  fileName?: string; // Nama file untuk output
}

// Fungsi helper untuk mendapatkan URL dari canvas (kompresi)
function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
  fileName: string,
  outputWidth: number,
  outputHeight: number,
  compressionQuality: number,
): Promise<File> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Set canvas dimensions to the desired output size
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context available");
  }

  // Draw the cropped image onto the new canvas, scaling it to output dimensions
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    outputWidth,
    outputHeight, // Draw into the scaled output size
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas toBlob failed"));
          return;
        }
        const file = new File([blob], fileName, { type: "image/jpeg" });
        resolve(file);
      },
      "image/jpeg",
      compressionQuality,
    );
  });
}

export const ImageCropperDialog: React.FC<ImageCropperDialogProps> = ({
  imageSrc,
  isOpen,
  onClose,
  onImageCropped,
  aspectRatio = 1, // Default 1:1
  outputWidth = 200, // Default 200px
  outputHeight = 200, // Default 200px
  compressionQuality = 0.8, // Default 80%
  fileName = "cropped_image.jpeg",
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  // Reset crop state when imageSrc or isOpen changes
  useEffect(() => {
    if (imageSrc && isOpen) {
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [imageSrc, isOpen]);

  // Handle image load to set initial crop
  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const initialCrop = centerCrop(
        makeAspectCrop(
          {
            unit: "%", // Anda bisa menggunakan % atau px
            width: 90, // Mulai dengan lebar 90%
          },
          aspectRatio, // Aspek rasio yang diinginkan (misal 1/1)
          width, // Lebar gambar asli
          height, // Tinggi gambar asli
        ),
        width,
        height,
      );
      setCrop(initialCrop);
    },
    [aspectRatio],
  );

  const handleCrop = async () => {
    if (imgRef.current && completedCrop) {
      try {
        const croppedFile = await getCroppedImg(
          imgRef.current,
          completedCrop,
          fileName,
          outputWidth,
          outputHeight,
          compressionQuality,
        );
        onImageCropped(croppedFile);
        onClose(); // Tutup dialog setelah berhasil crop
      } catch (error) {
        console.error("Error saat cropping atau kompresi:", error);
        // Anda bisa tambahkan toast.error di sini jika ingin memberitahu user
      }
    }
  };

  return (
    <Dialog open={isOpen && !!imageSrc} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Crop Gambar Anda</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center overflow-hidden">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              minWidth={50}
              minHeight={50}
            >
              <img
                ref={imgRef}
                alt="Gambar untuk di-crop"
                src={imageSrc}
                onLoad={onImageLoad}
                style={{ maxHeight: "70vh", maxWidth: "100%" }} // Batasi ukuran gambar di cropper
              />
            </ReactCrop>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
          </DialogClose>
          <Button onClick={handleCrop} disabled={!completedCrop}>
            Crop & Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
