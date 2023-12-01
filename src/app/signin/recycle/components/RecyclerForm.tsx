"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/ui/form-field";
import { createRecycler } from "@/app/actions/createRecycler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format, getYear } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SelectSingleEventHandler } from "react-day-picker";
import axios from "axios";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  phone: z
    .string()
    .min(10, { message: "Telefone deve ter pelo menos 10 caracteres." })
    .regex(/^\d{10,}$/i, { message: "Telefone inválido." }),
  cpfCnpj: z
    .string()
    .min(11, { message: "CPF/CNPJ deve ter pelo menos 11 caracteres." })
    .regex(/^\d{11,}$/i, { message: "CPF/CNPJ inválido." }),
  cep: z.string().min(8, { message: "CEP inválido." }),
  uf: z.string().min(2, { message: "UF inválido." }),
  city: z
    .string()
    .min(2, { message: "Cidade deve ter pelo menos 2 caracteres." }),
  birthDate: z.date(),
  sex: z.string(),
  timeInMarket: z.string(),
  recyclingServiceDescription: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }),
});

export interface RecycleFormValues {
  name: string;
  phone: string;
  cpfCnpj: string;
  cep: string;
  city: string;
  uf: string;
  birthDate: Date;
  sex: string;
  timeInMarket: string;
  recyclingServiceDescription: string;
  kgRecycled: string;
  socialDonations?: boolean;
  donationDetails?: string;
  currentStep: number;
}

export const RecyclerForm = () => {
  const form = useForm<RecycleFormValues>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, setValue, watch } = form;
  const currentStep = watch("currentStep", 0);

  const { data: Session } = useSession();

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const validateCEP = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        return "CEP não encontrado.";
      } else {
        setValue("city", data.localidade);
        setValue("uf", data.uf);

        return undefined; // CEP válido
      }
    } catch (error) {
      console.error("Erro ao validar CEP:", error);
      return "Erro ao validar CEP.";
    }
  };

  const handleNextStep = async () => {
    let fieldsToValidate: Array<keyof RecycleFormValues> = [];

    if (currentStep === 0) {
      fieldsToValidate = ["name", "phone", "cpfCnpj", "sex", "birthDate"];
    } else if (currentStep === 1) {
      fieldsToValidate = ["cep", "city", "uf"];

      if (fieldsToValidate.includes("cep")) {
        const isValidCEP = await validateCEP(watch("cep"));

        if (isValidCEP) {
          toast({
            title: "Erro no CEP",
            description: isValidCEP,
          });
          return;
        }
      }
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "timeInMarket",
        "recyclingServiceDescription",
        "kgRecycled",
      ];
    }

    const isValidStep = await form.trigger(fieldsToValidate);

    if (!isValidStep) return;

    setValue("currentStep", currentStep + 1);
  };

  const onSubmit: SubmitHandler<RecycleFormValues> = async (data) => {
    if (currentStep < 2) return handleNextStep();

    if (!Session?.user?.id) return;

    try {
      setIsLoading(true);

      toast({
        title: "Cadastrando reciclador.",
        description: "Seus dados estão sendo válidados, por favor aguarde!",
      });

      await createRecycler(data, Session?.user?.id);

      toast({
        title: "Cadastrado com Sucesso!",
        description: "Seus dados de reciclador foram válidados.",
      });

      return router.push("/dashboard");
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

  const handlePreviousStep = () => {
    setValue("currentStep", currentStep - 1);
  };

  const handleDateSelect: SelectSingleEventHandler = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      form.setValue("birthDate", selectedDate);
    }
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
              name="phone"
              label="Telefone"
              type="tel"
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

            <RadioGroup
              defaultChecked={false}
              className="flex flex-col gap-2"
              onValueChange={(value) => setValue("sex", value)}
            >
              <span className="text-sm text-red-700">
                {form.formState.errors.sex?.message}
              </span>
              <span>Sexo</span>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Feminino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Outro</Label>
                </div>
              </div>
            </RadioGroup>

            <FormItem className="flex flex-col">
              <FormLabel>Data de nascimento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span>Data de nascimento</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    fromYear={1960}
                    toYear={new Date(Date.now()).getFullYear()}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
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
            <FormField
              name="city"
              label="Cidade"
              placeholder="Sua Cidade"
              form={form}
              error={form.formState?.errors?.city?.message}
              checkboxLabel={undefined}
            />
            <FormField
              name="uf"
              label="UF"
              placeholder="Seu Estado"
              form={form}
              error={form.formState?.errors?.uf?.message}
              checkboxLabel={undefined}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <FormField
              name="timeInMarket"
              label="Tempo de Atuação no Mercado"
              placeholder="Tempo de Atuação no Mercado"
              form={form}
              type="number"
              error={form.formState?.errors?.timeInMarket?.message}
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
          </>
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
            <Button type="submit" disabled={form.formState?.isSubmitting}>
              {isLoading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Enviando
                </>
              ) : (
                "Cadastar"
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
