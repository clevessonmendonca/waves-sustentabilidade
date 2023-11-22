import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { FolderDownIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MyDropzoneProps {
  onDrop: (files: File[]) => void;
}

export const MyDropzone: FC<MyDropzoneProps> = ({ onDrop }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const acceptedFile = acceptedFiles[0];

        if (!isValidImage(acceptedFile)) {
          toast({
            title: "Formato Inválido!",
            description:
              "Por favor, selecione uma imagem válida (PNG, JPG ou WebP)",
            variant: "destructive",
          });
          return;
        }

        const imageUrl = URL.createObjectURL(acceptedFile);
        setPreviewImage(imageUrl);
      }
      onDrop(acceptedFiles);
    },
    [onDrop, toast],
  );

  const isValidImage = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    return allowedTypes.includes(file.type);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg"],
      "image/webp": [".webp"],
    },
  });

  return (
    <Card className="h-48 w-full cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <FolderDownIcon size={32} />
          <p className="text-sm opacity-75">Arraste a imagem ou Clique aqui</p>
        </div>
      )}
    </Card>
  );
};
