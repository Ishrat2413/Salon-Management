"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/actions/auth/auth.schema";
import { useLoginMutation } from "@/actions/auth/useAuth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLoginMutation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values);
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
                  placeholder='email@example.com'
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
            disabled={isPending}>
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
