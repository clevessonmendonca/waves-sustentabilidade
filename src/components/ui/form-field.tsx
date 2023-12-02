import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import InputMask from "react-input-mask";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { Input } from "./input";

interface RecyclerFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  checkboxLabel?: string;
  form: {
    formState: any;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
  };
  error?: string;
}

export const FormField: React.FC<RecyclerFormFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  checkboxLabel,
  form,
  error,
}) => {
  const { register } = form;

  return (
    <FormItem>
      {type === "checkbox" ? (
        <div className="flex items-start gap-4">
          <Label>{checkboxLabel}</Label>
          <FormControl>
            <Checkbox
              {...register(name)}
              onCheckedChange={(value) => form.setValue(name, value)}
              name={name}
            />
          </FormControl>
        </div>
      ) : (
        <>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "tel" ||
            (type === "text" && name === "cpfCnpj") ||
            name === "cep" ? (
              <InputMask
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                mask={
                  type === "tel"
                    ? "(99) 99999-9999"
                    : name === "cpfCnpj"
                    ? "999.999.999-99"
                    : "99999-999"
                }
                maskChar=" "
                placeholder={placeholder}
                {...register(name)}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...register(name)}
                type={type}
              />
            )}
          </FormControl>
          <FormMessage>{error}</FormMessage>
        </>
      )}
    </FormItem>
  );
};
