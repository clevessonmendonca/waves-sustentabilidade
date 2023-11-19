import { UseFormRegister } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
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
    register: UseFormRegister<any>; 
  };
  error?: string;
}

export const FormField: React.FC<RecyclerFormFieldProps> = ({ name, label, placeholder, type = 'text', checkboxLabel, form, error }) => {
  const { register } = form;

  return (
    <FormItem>
      {type === 'checkbox' ? (
        <>
          <Label>{checkboxLabel}</Label>
          <FormControl>
            <Checkbox {...register(name)} />
          </FormControl>
        </>
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
