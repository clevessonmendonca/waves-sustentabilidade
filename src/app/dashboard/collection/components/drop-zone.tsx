import { Card } from "@/components/ui/card";
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
      <iframe src={file.preview} title={file.name} />
    </div>
  ));

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>{file.name}</li>
  ));

  return (
    <Card className="flex h-48 w-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drop some files here ...</p>
      </div>

      <div>{Preview}</div>
    </Card>
  );
};
