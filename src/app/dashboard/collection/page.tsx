"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-field";
import { MyDropzone } from "./components/drop-zone";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BoxesIcon, CupSodaIcon, LayersIcon } from "lucide-react";
import { FileWithPath } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCollectionSchedule } from "@/app/actions/createCollectionSchedule";
import { useSession } from "next-auth/react";

const days = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export interface FormValues {
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

export default function FormCollection({
  onSubmit,
}: {
  onSubmit: SubmitHandler<FormValues>;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormCollectionSchema),
  });
  const { data: Session } = useSession();

  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [weekDay, setWeekDay] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data submitted:", data);

    if (!Session?.user?.id) return;

    createCollectionSchedule(data, Session?.user?.id);
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    form.setValue("materialType", material);
  };

  const handleWeekDayChange = (day: string) => {
    setWeekDay(day);
    form.setValue("dayOfWeek", day);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8 px-5"
      >
        <div className="space-y-2">
          <RadioGroup
            onValueChange={handleMaterialChange}
            defaultValue={selectedMaterial || ""}
            className="flex gap-4"
          >
            {[
              { value: "Paper", label: "Papel", icon: <LayersIcon /> },
              { value: "Plastic", label: "Plástico", icon: <CupSodaIcon /> },
              {
                value: "Other",
                label: "Outros",
                icon: <BoxesIcon />,
                input: true,
              },
            ].map(({ value, label, icon, input }) => (
              <div key={value} className="flex flex-col items-center gap-2">
                <RadioGroupItem value={value} id={value} className="sr-only" />
                <label
                  className={`flex w-full max-w-[70px] cursor-pointer flex-col items-center justify-center rounded-full border-2 bg-accent p-5 ${
                    selectedMaterial === value && "bg-primary"
                  }`}
                  htmlFor={value}
                  onClick={() => handleMaterialChange(value)}
                >
                  {icon}
                </label>
                <p className="text-sm opacity-75">{label}</p>
              </div>
            ))}
          </RadioGroup>
          {selectedMaterial === "Other" && (
            <div className="flex">
              <FormField
                name="materialType"
                label="Digite o material"
                placeholder="Digite o material"
                form={form}
                error={form.formState?.errors?.materialType?.message?.toString()}
              />
            </div>
          )}
        </div>
        <p className="text-sm text-red-600 opacity-75">
          {form.formState?.errors?.materialType?.message?.toString()}
        </p>

        <FormField
          name="quantityKg"
          label="Quantidade (KG)"
          placeholder="Quantidade (KG)"
          type="number"
          form={form}
          error={form.formState?.errors?.quantityKg?.message?.toString()}
        />

        <FormField
          name="collectionTime.startTime"
          label="Horário da Coleta (Início)"
          placeholder="Horário da Coleta (Início)"
          type="time"
          form={form}
          error={form.formState?.errors?.collectionTime?.startTime?.message?.toString()}
        />

        <FormField
          name="collectionTime.endTime"
          label="Horário da Coleta (Fim)"
          placeholder="Horário da Coleta (Fim)"
          type="time"
          form={form}
          error={form.formState?.errors?.collectionTime?.endTime?.message?.toString()}
        />

        <RadioGroup
          onValueChange={handleWeekDayChange}
          defaultValue={weekDay || ""}
          className="flex flex-wrap space-y-2"
        >
          {days.map((day) => (
            <div
              key={day}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <RadioGroupItem value={day} id={day} className="sr-only" />
              <label
                className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 bg-accent p-5 ${
                  weekDay === day ? "bg-primary" : "text-gray-500"
                }`}
                htmlFor={day}
                onClick={() => handleWeekDayChange(day)}
              >
                {day}
              </label>
            </div>
          ))}
        </RadioGroup>

        <FormField
          name="description"
          label="Descrição (opcional)"
          placeholder="Descrição (opcional)"
          type="textarea"
          form={form}
          error={form.formState?.errors?.description?.message?.toString()}
        />

        <MyDropzone
          onDrop={(acceptedFiles) => {
            console.log("Imagem registrada:", acceptedFiles[0]);
            form.setValue("image", acceptedFiles[0]);
          }}
        />

        <Button type="submit" disabled={form.formState?.isSubmitting}>
          Agendar Coleta
        </Button>
      </form>
    </Form>
  );
}
