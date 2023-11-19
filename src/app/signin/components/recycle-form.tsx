"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-field";
import { createRecycler } from "@/app/actions/createRecycler";
import { useSession } from "next-auth/react";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  organization: z
    .string()
    .min(2, { message: "Organização deve ter pelo menos 2 caracteres." }),
  phone: z
    .string()
    .min(10, { message: "Telefone deve ter pelo menos 10 caracteres." })
    .regex(/^\d{10,}$/i, { message: "Telefone inválido." }),
  cpfCnpj: z
    .string()
    .min(11, { message: "CPF/CNPJ deve ter pelo menos 11 caracteres." })
    .regex(/^\d{11,}$/i, { message: "CPF/CNPJ inválido." }),
  cep: z.string().min(8, { message: "CEP inválido." }),
  isoCertification: z.boolean(),
  marketTime: z.string(),
  recyclingServiceDescription: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }),
  kgRecycled: z
    .string()
    .min(0, { message: "O peso reciclado deve ser um número positivo." }),
  socialDonations: z.boolean(),
  donationDetails: z.string().optional(),
});

export interface RecycleFormValues {
  name: string;
  organization: string;
  phone: string;
  cpfCnpj: string;
  cep: string;
  isoCertification: boolean;
  marketTime: string;
  recyclingServiceDescription: string;
  kgRecycled: string;
  socialDonations: boolean;
  donationDetails?: string;
  currentStep: number;
}

export const RecyclerForm = () => {
  const form = useForm<RecycleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      organization: "",
      phone: "",
      cpfCnpj: "",
      cep: "",
      isoCertification: false,
      marketTime: "",
      recyclingServiceDescription: "",
      kgRecycled: "0",
      socialDonations: false,
      donationDetails: "",
      currentStep: 0,
    },
  });

  const { handleSubmit, setValue, watch } = form;
  const currentStep = watch("currentStep", 0);

  const { data: Session } = useSession();

  const handleNextStep = async () => {
    let fieldsToValidate;

    if (currentStep === 0) {
      fieldsToValidate = ["name", "organization", "phone", "cpfCnpj"];
    } else if (currentStep === 1) {
      fieldsToValidate = ["cep"];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "isoCertification",
        "marketTime",
        "recyclingServiceDescription",
        "kgRecycled",
        "socialDonations",
      ];
    }

    const isValidStep = await form.trigger(fieldsToValidate);

    if (!isValidStep) return;

    setValue("currentStep", currentStep + 1);
  };

  const onSubmit: SubmitHandler<RecycleFormValues> = (data) => {
    if (currentStep < 2) return handleNextStep();

    if (!Session?.user?.id) return;

    createRecycler(data, Session?.user?.id);
  };

  const handlePreviousStep = () => {
    setValue("currentStep", currentStep - 1);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {currentStep === 0 && (
          <>
            <FormField
              name="name"
              label="Nome"
              placeholder="Seu Nome"
              form={form}
              error={form.formState?.errors?.name?.message}
              checkboxLabel={undefined}
            />
            <FormField
              name="organization"
              label="Organização"
              placeholder="Sua Organização"
              form={form}
              error={form.formState?.errors?.organization?.message}
              checkboxLabel={undefined}
            />
            <FormField
              name="phone"
              label="Telefone"
              placeholder="Seu Telefone"
              form={form}
              error={form.formState?.errors?.phone?.message}
              checkboxLabel={undefined}
            />
            <FormField
              name="cpfCnpj"
              label="CPF/CNPJ"
              placeholder="Seu CPF/CNPJ"
              form={form}
              error={form.formState?.errors?.cpfCnpj?.message}
              checkboxLabel={undefined}
            />
          </>
        )}

        {currentStep === 1 && (
          <>
            <FormField
              name="cep"
              label="CEP"
              placeholder="Seu CEP"
              form={form}
              error={form.formState?.errors?.cep?.message}
              checkboxLabel={undefined}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <FormField
              name="isoCertification"
              checkboxLabel="Possuo ISO"
              form={form}
              error={form.formState?.errors?.isoCertification?.message}
              label={""}
              placeholder={""}
              type="checkbox"
            />
            <FormField
              name="marketTime"
              label="Tempo de Atuação no Mercado"
              placeholder="Tempo de Atuação no Mercado"
              form={form}
              error={form.formState?.errors?.marketTime?.message}
              checkboxLabel={undefined}
            />
            <FormField
              name="recyclingServiceDescription"
              label="Descrição do Serviço de Reciclagem"
              placeholder="Descrição do Serviço de Reciclagem"
              form={form}
              error={
                form.formState?.errors?.recyclingServiceDescription?.message
              }
              checkboxLabel={undefined}
            />
            <FormField
              name="kgRecycled"
              label="Peso Reciclado (kg)"
              placeholder="Peso Reciclado (kg)"
              form={form}
              error={form.formState?.errors?.kgRecycled?.message}
              type="number"
              checkboxLabel={undefined}
            />
            <FormField
              name="socialDonations"
              checkboxLabel="Doações Sociais"
              form={form}
              error={form.formState?.errors?.socialDonations?.message}
              label={""}
              placeholder={""}
              type="checkbox"
            />
          </>
        )}

        {watch("socialDonations") && (
          <FormField
            name="donationDetails"
            label="Detalhes das Doações"
            placeholder="Detalhes das Doações"
            form={form}
            error={form.formState?.errors?.donationDetails?.message}
            checkboxLabel={undefined}
          />
        )}

        <div className="space-x-4">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
            >
              Anterior
            </Button>
          )}
          {currentStep < 2 && (
            <Button type="button" onClick={handleNextStep}>
              Próximo
            </Button>
          )}
          {currentStep === 2 && (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Enviar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
