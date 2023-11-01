"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AddDataByUser } from "@/app/actions/signin";
import { useRouter } from "next/navigation";
import { User } from "../page";

const formSchema = z.object({
  name: z.string(),
  organization: z.string(),
  phone: z.string(),
  cpfCnpj: z.string(),
  cep: z.string(),
  isoCertification: z.boolean(),
  marketTime: z.string(),
  recyclingServiceDescription: z.string(),
  kgRecycled: z.number(),
  socialDonations: z.boolean(),
  donationDetails: z.string().optional(),
});

export function RecyclerForm(user: User) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
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
      kgRecycled: 0,
      socialDonations: false,
      donationDetails: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;

    const registerUser = await AddDataByUser(values, user);

    if (!registerUser) return;

    router.push(`/dashboard/${registerUser.id}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-5">
        {[
          "name",
          "organization",
          "phone",
          "cpfCnpj",
          "cep",
          "marketTime",
          "recyclingServiceDescription",
        ].map((fieldName) => (
          <FormField
            control={form.control}
            name={fieldName}
            key={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input placeholder={`Your ${fieldName}`} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name="isoCertification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISO Certification</FormLabel>
              <FormControl>
                <Input type="checkbox" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socialDonations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Donations</FormLabel>
              <FormControl>
                <Input type="checkbox" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("socialDonations") && (
          <FormField
            control={form.control}
            name="donationDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Donation Details</FormLabel>
                <FormControl>
                  <Input placeholder="Donation Details" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
