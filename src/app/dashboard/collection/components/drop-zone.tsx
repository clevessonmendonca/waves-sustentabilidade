// Dropzone component
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { FolderDownIcon } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onFileUpload: (files: File[]) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
  const [files, setFiles] = useState<any>([]);

  const handleFileUpload = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      onFileUpload(acceptedFiles);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 2,
    accept: {
      "image/png": [".png", "jpg", "jpeg"],
    },
    onDrop: handleFileUpload,
  });

  const Preview = files.map((file: any) => (
    <div key={file.name}>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="h-full max-h-40 w-full"
        src={file.preview}
        title={file.name}
        alt={file.name}
      />
    </div>
  ));

  return (
    <Card
      {...getRootProps({
        className:
          "flex h-48 w-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300",
      })}
    >
      <input {...getInputProps()} />
      {acceptedFiles.length === 0 ? (
        <p className="flex flex-col items-center gap-4 text-sm text-gray-600 opacity-75">
          <FolderDownIcon size={32} className="text-gray-400" />
          Drop some files here ...
        </p>
      ) : (
        <div>{Preview}</div>
      )}
    </Card>
  );
};
