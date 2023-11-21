// import { NextApiRequest, NextApiResponse } from "next";
// import { sendEmail } from "@/lib/email";

// interface RequestWithBody extends NextApiRequest {
//   body: {
//     name: string;
//     email: string;
//     message: string;
//   };
// }

// export async function POST(req: RequestWithBody, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const { name, email, message } = req.body;

//       await sendEmail(name, email, message);
//       res.status(200).json({ message: "Email enviado com sucesso" });
//     } catch (error) {
//       res.status(500).json({ message: "Erro ao enviar o email" });
//     }
//   } else {
//     res.status(405).json({ message: "Método não permitido" });
//   }
// }
