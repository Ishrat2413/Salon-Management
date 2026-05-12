"use client";

import { useAuth } from "@/components/providers/auth-provider";
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
import { USERS } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      const userKey = values.email
        .toLowerCase()
        .split("@")[0] as keyof typeof USERS;
      const userDetails = USERS[userKey];

      if (
        userDetails &&
        userDetails.password === values.password &&
        userDetails.email === values.email.toLowerCase()
      ) {
        toast.success("Successfully logged in");
        login({
          email: userDetails.email,
          role: userDetails.role,
          name: userDetails.name,
        });
      } else {
        toast.error("Invalid credentials. Please use demo details.");
      }
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#020617]'>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='@peduarte'
                  className='rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D6449A]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <div className='flex items-center justify-between'>
                <FormLabel className='text-sm font-semibold text-[#020617]'>
                  Password
                </FormLabel>
                <Link
                  href='/forgot-password'
                  className='text-xs font-medium text-[#020617] hover:text-[#1F2937] transition-colors underline'>
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    className='rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D6449A]'
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </FormControl>
              <p className='text-xs text-[#D6449A] mt-1 cursor-pointer w-fit hover:underline'>
                Remember me
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-between pt-2'>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{" "}
            <Link
              href='/register'
              className='text-[#D6449A] font-medium hover:underline ml-1'>
              Sign up
            </Link>
          </p>
          <Button
            type='submit'
            className='bg-[#D6449A] hover:bg-[#B33580] text-white rounded-md px-10 py-5 transition-all'
            disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </div>

        {/* Demo Credentials Info block removed from main view to match design perfectly. 
            Logging will still work with the demo users. */}
      </form>
    </Form>
  );
}
