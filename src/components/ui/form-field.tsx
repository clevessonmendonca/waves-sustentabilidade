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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
              checked={form.watch(name)}
              onCheckedChange={(value) => form.setValue(name, value)}
              name={name}
            />
          </FormControl>
        </div>
      ) : (
        <>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...register(name)} type={type} />
          </FormControl>
          <FormMessage>{error}</FormMessage>
        </>
      )}
    </FormItem>
  );
};
