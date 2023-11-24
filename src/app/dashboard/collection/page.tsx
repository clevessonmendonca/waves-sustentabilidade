"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-field";
import { useState } from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCollectionSchedule } from "@/app/actions/createCollectionSchedule";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { WeekDayRadioGroup } from "./components/weekday-radio-group";
import { MaterialType } from "./components/material-type";
import { FolderDownIcon, LoaderIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export interface FormCollectionValues {
  materialType: string;
  quantityKg: string;
  collectionTime: {
    startTime: string;
    endTime: string;
  };
  dayOfWeek: string;
  description?: string;
  image?: FileWithPath | undefined;
}

const FormCollectionSchema = z.object({
  materialType: z
    .string()
    .min(1, { message: "Tipo de Material é um campo obrigatório" }),
  quantityKg: z
    .string()
    .min(1, { message: "A quantidade deve ser maior que zero" }),
  collectionTime: z.object({
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Formato inválido para o horário de início",
    }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Formato inválido para o horário de fim",
    }),
  }),
  dayOfWeek: z
    .string()
    .min(1, { message: "Dia da Semana é um campo obrigatório" })
    .max(255, { message: "Dia da Semana deve ter no máximo 255 caracteres" }),
  description: z.string().optional(),
  image: z
    .object({
      path: z.string(),
      name: z.string(),
      lastModified: z.number(),
      lastModifiedDate: z.date(),
      webkitRelativePath: z.string(),
      size: z.number(),
      type: z.string(),
    })
    .nullable()
    .optional(),
});

export default function FormCollection() {
  const form = useForm<FormCollectionValues>({
    resolver: zodResolver(FormCollectionSchema),
  });
  const { data: Session } = useSession();

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any>([]);

  const handleFormSubmit: SubmitHandler<FormCollectionValues> = async (
    data,
  ) => {
    if (!Session?.user?.id) return;

    if (!isValidTimeRange(data.collectionTime.startTime, data.collectionTime.endTime)) {
      toast({
        title: "Erro no Horário",
        description: "O horário de início deve ser menor que o horário de fim",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      toast({
        title: "Válidando Agendamento",
        description: "Seus dados estão sendo válidados, por favor aguarde!",
      });

      await createCollectionSchedule(data, Session?.user?.id);

      toast({
        title: "Agendado com Sucesso!",
        description: "Seus dados foram válidados.",
      });

      router.push("/dashboard/collectors");
    } catch (error) {
      toast({
        title: "Uh oh! Parece que deu algo errado.",
        description:
          "Ocorreu um erro ao cadastrar seu agendamento. Tente novamente mais tarde.",
      });

      console.error("Erro ao criar agendamento de coleta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidTimeRange = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    return start < end;
  };

  const isValidImage = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    return allowedTypes.includes(file.type);
  };

  const Preview = files.map((file: any) => (
    <div key={file.name}>
      <Image
        width={0}
        height={0}
        className="h-full max-h-40 w-full"
        src={file.preview}
        alt={file.name}
      />
    </div>
  ));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="m-8 mx-auto w-full max-w-screen-md space-y-8 px-5"
      >
        <MaterialType form={form} />

        <Separator className="my-4" />

        <FormField
          name="quantityKg"
          label="Quantidade (KG)"
          placeholder="Quantidade (KG)"
          type="number"
          form={form}
          error={form.formState?.errors?.quantityKg?.message}
        />

        <FormField
          name="collectionTime.startTime"
          label="Horário da Coleta (Início)"
          placeholder="Horário da Coleta (Início)"
          type="time"
          form={form}
          error={form.formState?.errors?.collectionTime?.startTime?.message}
        />

        <FormField
          name="collectionTime.endTime"
          label="Horário da Coleta (Fim)"
          placeholder="Horário da Coleta (Fim)"
          type="time"
          form={form}
          error={form.formState?.errors?.collectionTime?.endTime?.message}
        />

        <WeekDayRadioGroup form={form} />

        <FormField
          name="description"
          label="Descrição (opcional)"
          placeholder="Descrição (opcional)"
          type="textarea"
          form={form}
          error={form.formState?.errors?.description?.message}
        />

        <Separator className="my-4" />

        <Dropzone
          onDrop={(acceptedFiles) => {
            const acceptedFile = acceptedFiles[0];

            if (!acceptedFile || !isValidImage(acceptedFile)) {
              toast({
                title: "Formato Inválido!",
                description:
                  "Por favor, selecione uma imagem válida (PNG, JPG ou JPEG)",
                variant: "destructive",
              });
              return;
            }

            setFiles(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                }),
              ),
            );

            form.setValue("image", acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <Card
                {...getRootProps()}
                className="relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-gray-300"
              >
                <input {...getInputProps()} />
                {files.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 text-sm text-gray-600 opacity-75">
                    <FolderDownIcon size={32} className="text-gray-400" />
                    <p>
                      Arraste e solte os arquivos aqui ou clique para
                      selecionar.
                    </p>
                  </div>
                ) : (
                  <div>{Preview}</div>
                )}
              </Card>
            </section>
          )}
        </Dropzone>

        <div className="flex w-full items-end justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState?.isSubmitting}
          >
            {isLoading ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Enviando
              </>
            ) : (
              "Agendar Coleta"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
