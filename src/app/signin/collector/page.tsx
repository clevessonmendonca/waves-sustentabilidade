"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FormField } from "@/components/ui/form-field";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createCollector } from "@/app/actions/createCollector";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

const CollectorSchema = z.object({
  collectionServiceDescription: z.string(),
  marketTime: z.string(),
  organization: z.string(),
  bio: z.string(),
  cpfCnpj: z.string(),
  isoCertification: z.boolean(),
});

export interface CollectorFormValues {
  collectionServiceDescription: string;
  kgCollected?: number;
  marketTime: string;
  organization: string;
  cpfCnpj: string;
  isoCertification: boolean;
  purchases?: string;
  bio: string;
}

export default function CollectorForm() {
  const form = useForm<CollectorFormValues>({
    resolver: zodResolver(CollectorSchema),
  });
  const { data: Session } = useSession();

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit: SubmitHandler<CollectorFormValues> = async (data) => {
    if (!Session?.user?.id) return;

    try {
      setIsLoading(true);

      toast({
        title: "Perfil de Coletador sendo criado.",
        description: "Seus dados estão sendo válidados, por favor aguarde!",
      });

      await createCollector(data, Session?.user?.id);

      toast({
        title: "Coletador registrado com Sucesso!",
        description: "Seus dados foram válidados.",
      });

      router.push("/dashboard/collectors");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Parece que deu algo errado.",
        description:
          "Ocorreu um erro ao se cadastrar. Tente novamente mais tarde.",
      });

      console.error("Erro ao criar coletador:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="m-8 mx-auto w-full max-w-screen-md space-y-8 px-5"
      >
        <FormField
          name="organization"
          label="Organização"
          placeholder="Organização"
          form={form}
          error={form.formState.errors.organization?.message?.toString()}
        />

        <FormField
          name="cpfCnpj"
          label="CPF/CNPJ"
          placeholder="CPF/CNPJ"
          form={form}
          error={form.formState.errors.cpfCnpj?.message?.toString()}
        />

        <FormField
          name="collectionServiceDescription"
          form={form}
          label="Descrição do Serviço"
          placeholder="Descrição do Serviço"
          error={form?.formState.errors?.collectionServiceDescription?.message?.toString()}
        />

        <Separator />

        <div className="flex flex-col gap-2">
          <Label>Biografia</Label>
          <Textarea
            className="resize-none"
            onChange={(e) => form.setValue("bio", e.target.value)}
            name="bio"
            placeholder="O que você quer que as pessoas saibam sobre você ou sua empresa?"
          />
          <span className="text-sm text-destructive">
            {form?.formState.errors?.bio?.message}
          </span>
        </div>

        <FormField
          name="marketTime"
          label="Tempo de Atuação no Mercado"
          placeholder="Tempo de Atuação no Mercado"
          type="number"
          form={form}
          error={form.formState.errors.marketTime?.message}
        />

        <FormItem>
          <FormField
            name="isoCertification"
            checkboxLabel="Certificação ISO"
            form={form}
            error={form.formState?.errors?.isoCertification?.message}
            label={""}
            placeholder={""}
            type="checkbox"
          />

          <span className="max-w-xs text-xs opacity-75">
            * A certificação ISO 14000 engloba uma série de normas
            internacionais de gestão ambiental.
          </span>
        </FormItem>

        <Button type="submit" size="lg" disabled={form.formState?.isSubmitting}>
          {isLoading ? (
            <>
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              Enviando
            </>
          ) : (
            "Tornar-se Reciclador"
          )}
        </Button>
      </form>
    </Form>
  );
}
