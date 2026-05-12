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
import { ArrowLeft, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, { message: "This field is required." })
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^\+?[\d\s\-()]{7,}$/.test(val),
      { message: "Enter a valid email or phone number." },
    ),
});

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Verification code sent to ${values.emailOrPhone}`);
      form.reset({ emailOrPhone: "" });
    }, 500);
  }

  return (
    <div className='flex min-h-screen bg-[#fdf5f7] items-center justify-center p-4 sm:p-8'>
      <div className='w-full 2xl:px-40 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center '>
        {/* Left Side: Image */}
        <div className='relative hidden md:block w-full rounded-2xl overflow-hidden shadow-md h-180'>
          <Image
            src='/auth/leftImage.svg'
            alt='Hair salon background'
            fill
            className='object-cover object-center scale-[1.02]'
            priority
          />
        </div>

        {/* Right Side: Form */}
        <div className='flex flex-col items-center justify-center px-4 sm:px-10 py-12'>
          {/* Lock Icon */}
          <div className='mb-5'>
            <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#FEF1F8]'>
              <Lock className='w-7 h-7 text-[#D13C92]' strokeWidth={1.8} />
            </div>
          </div>

          {/* Heading */}
          <h1 className='text-2xl font-medium text-[#171717] mb-2 text-center'>
            Forgot Password?
          </h1>
          <p className='text-sm text-[#494551] text-center mb-8 '>
            Enter your email or phone number to receive a verification code.
          </p>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-4 max-w-lg'>
              <FormField
                control={form.control}
                name='emailOrPhone'
                render={({ field }) => (
                  <FormItem className='space-y-1.5'>
                    <FormLabel className='text-sm font-medium text-slate-700'>
                      Email or Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email or phone'
                        className='rounded-lg border border-gray-200 bg-white px-4 py-5 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#D6449A] focus-visible:border-[#D6449A]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />

              {/* Send Code Button */}
              <Button
                type='submit'
                className='w-full rounded-lg bg-[#D6449A] hover:bg-[#B8368A] text-white font-medium py-5 text-sm transition-colors'
                disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Code"}
              </Button>
            </form>
          </Form>

          {/* Back to Login */}
          <Link
            href='/login'
            className='mt-5 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors'>
            <ArrowLeft className='w-4 h-4' />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
