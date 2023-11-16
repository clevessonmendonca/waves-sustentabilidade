import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(name: string, email: string, message: string) {
  const msg = {
    to: "clevesson.contato@gmail.com",
    from: "clevesson.contato@gmail.com", // Use o endereço de e-mail verificado aqui
    subject: "Contato do formulário",
    text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
  };

  try {
    await sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      },
    );
  } catch (error) {
    throw new Error("Erro ao enviar o email");
  }
}
