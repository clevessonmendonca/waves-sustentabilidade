import { Card } from "@/components/ui/card";
import { FolderDownIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export const Dropzone = () => {
  const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 2,
      accept: {
        "image/png": [".png"],
        "text/html": [".html", ".htm"],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
      },
    });

  const Preview = files.map((file: any) => (
    <div key={file.name}>
      <Image width={0} height={0} sizes="100vw" className="max-h-40 w-full h-full" src={file.preview} title={file.name} alt={file.name} />
    </div>
  ));

  return (
    <Card className="flex h-48 w-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600 opacity-75 flex gap-4 items-center flex-col">
          <FolderDownIcon size={32} className="text-gray-400" />
          Drop some files here ...
        </p>
      </div>
        <div>{Preview}</div>
    </Card>
  );
};
