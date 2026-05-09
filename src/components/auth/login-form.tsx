"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/providers/auth-provider";
import { USERS } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      
      const userKey = values.email.toLowerCase().split('@')[0] as keyof typeof USERS;
      const userDetails = USERS[userKey];

      if (userDetails && userDetails.password === values.password && userDetails.email === values.email.toLowerCase()) {
        toast.success("Successfully logged in");
        login({
          email: userDetails.email,
          role: userDetails.role,
          name: userDetails.name
        });
      } else {
        toast.error("Invalid credentials. Please use demo details.");
      }
    }, 500);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your demo credentials to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="employee / manager / admin" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground border-t pt-4">
        <p className="font-semibold text-foreground">Demo Credentials:</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full text-xs">
          <div><span className="font-medium">Email:</span> employee@gmail.com</div>
          <div><span className="font-medium">Pass:</span> employee@123</div>
          <div><span className="font-medium">Email:</span> manager@gmail.com</div>
          <div><span className="font-medium">Pass:</span> manager@123</div>
          <div><span className="font-medium">Email:</span> admin@gmail.com</div>
          <div><span className="font-medium">Pass:</span> admin@123</div>
        </div>
      </CardFooter>
    </Card>
  );
}