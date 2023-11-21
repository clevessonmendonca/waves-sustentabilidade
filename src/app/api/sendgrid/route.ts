import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const body = await req.body;
      const { name, email, message } = body;

      await sendEmail(name, email, message);
      res.status(200).json({ message: "Email enviado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao enviar o email" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
