// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";

// export const Dropzone: React.FC = () => {
//   const [files, setFiles] = useState<any>([]);
//   const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
//     useDropzone({
//       maxFiles: 2,
//       accept: {
//         "image/png": [".png"],
//         "text/html": [".html", ".htm"],
//       },
//       onDrop: (acceptedFiles) => {
//         setFiles(
//           acceptedFiles.map((file) =>
//             Object.assign(file, {
//               preview: URL.createObjectURL(file),
//             })
//           )
//         );
//       },
//     });

//   return (
//     <div className="container">
//       <div {...getRootProps({ className: "dropzone" })}>
//         <input {...getInputProps()} />
//         <p>Drop some files here ...</p>
//       </div>
//       <div>
//       </div>
//     </div>
//   );
// };