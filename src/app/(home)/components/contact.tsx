"use client";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { InputField } from "@/components/ui/input-field";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
});

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post("/api/sendgrid", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        toast({
          title: "Enviado com Sucesso!",
          description:
            "Sua mensagem de contato foi enviado com sucesso, em breve entraremos em contato!",
        });
      } else {
        toast({
          title: "Erro ao Enviar!",
          description:
            "Ocorreu um erro ao enviar sua mensagem de contato. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao Enviar!",
        description:
          "Ocorreu um erro ao enviar sua mensagem de contato. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 py-8 text-black"
    >
      <InputField
        label="Nome *"
        name="name"
        register={register}
        errors={errors}
      />
      <InputField
        label="Email *"
        name="email"
        register={register}
        errors={errors}
      />
      <InputField
        label="Mensagem *"
        name="message"
        register={register}
        errors={errors}
        textarea
      />
      <div className="flex w-full items-end justify-end">
        <Button type="submit" className="">
          Enviar mensagem
        </Button>
      </div>
    </form>
  );
}
