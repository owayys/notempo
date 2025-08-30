"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Typography,
} from "@/components/ui";
import { useRegisterMutation } from "@/shared/hooks/auth-hooks";

type RegisterFormProps = {
  onRegisterSuccess: () => Promise<void>;
};

const registerFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const registerMut = useRegisterMutation();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    await registerMut.mutateAsync(values, {
      onSuccess: async (data) => {
        if (data.data) {
          await onRegisterSuccess();
        }
      },
    });
  };

  return (
    <Card className="md:w-1/4">
      <CardHeader className="text-center">Register for notempo</CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardDescription className="w-full text-center">
        <Typography>Have an account?</Typography>
        <Link href={"/auth/login"}>
          <Typography variant="link">Login</Typography>
        </Link>
      </CardDescription>
    </Card>
  );
};
