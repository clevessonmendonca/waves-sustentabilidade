import { FormField } from "@/components/ui/form-field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { BoxesIcon, CupSodaIcon, LayersIcon } from "lucide-react";
import React, { useState } from "react";

const materialsTypes = [
  { value: "Paper", label: "Papel", icon: <LayersIcon /> },
  { value: "Plastic", label: "Plástico", icon: <CupSodaIcon /> },
  {
    value: "Other",
    label: "Outros",
    icon: <BoxesIcon />,
    input: true,
  },
];

export const MaterialType = ({ form }: { form: any }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    form.setValue("materialType", material);
  };

  return (
    <div className="space-y-2">
      <h4 className="mb-4">Selecione o tipo de material</h4>
      <RadioGroup
        onValueChange={handleMaterialChange}
        defaultValue={selectedMaterial || ""}
        className="flex gap-4"
      >
        {materialsTypes.map(({ value, label, icon, input }) => (
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
      <p className="text-sm text-red-600 opacity-75">
        {form.formState?.errors?.materialType?.message?.toString()}
      </p>
    </div>
  );
};
