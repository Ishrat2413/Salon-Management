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
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "At least 8 characters required." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <li className='flex items-center gap-2 text-sm text-slate-600'>
      <span
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          met ? "border-[#D13C92] bg-[#D13C92]" : "border-gray-300 bg-white"
        }`}>
        {met && (
          <svg
            className='w-2.5 h-2.5 text-white'
            viewBox='0 0 10 10'
            fill='none'>
            <path
              d='M2 5l2.5 2.5L8 3'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </span>
      {label}
    </li>
  );
}

export default function ResetPasswordPage() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const newPassword = useWatch({
    control: form.control,
    name: "newPassword",
  });

  const rules = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(newPassword) },
    { label: "One number", met: /[0-9]/.test(newPassword) },
  ];

  function onSubmit() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password updated successfully!");
      form.reset();
    }, 800);
  }

  return (
    <div className='flex min-h-screen bg-[#fdf5f7] items-center justify-center p-4 sm:p-8'>
      <div className='w-full 2xl:px-40 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        {/* Left Side: Image */}
        <div className='relative hidden md:block w-full rounded-2xl overflow-hidden shadow-md h-200'>
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
          {/* Rotate Icon */}
          <div className='mb-5'>
            <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#FEF1F8]'>
              <RotateCcw className='w-7 h-7 text-[#D13C92]' strokeWidth={1.8} />
            </div>
          </div>

          {/* Heading */}
          <h1 className='text-2xl font-medium text-[#171717] mb-2 text-center'>
            Create New Password
          </h1>
          <p className='text-sm text-[#494551] text-center mb-8 max-w-xs'>
            Your new password must be different from previous passwords.
          </p>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-4 max-w-lg'>
              {/* New Password */}
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem className='space-y-1.5'>
                    <FormLabel className='text-xs font-semibold uppercase tracking-widest text-slate-500'>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showNew ? "text" : "password"}
                          placeholder='••••••••'
                          className='rounded-lg border border-gray-200 bg-white px-4 py-5 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#D6449A] focus-visible:border-[#D6449A] pr-10'
                          {...field}
                        />
                        <button
                          type='button'
                          onClick={() => setShowNew((v) => !v)}
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                          {showNew ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='space-y-1.5'>
                    <FormLabel className='text-xs font-semibold uppercase tracking-widest text-slate-500'>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder='••••••••'
                          className='rounded-lg border border-gray-200 bg-white px-4 py-5 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#D6449A] focus-visible:border-[#D6449A] pr-10'
                          {...field}
                        />
                        <button
                          type='button'
                          onClick={() => setShowConfirm((v) => !v)}
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                          {showConfirm ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />

              {/* Password Rules */}
              <div className='rounded-xl bg-[#F8F0F9] px-5 py-4'>
                <ul className='space-y-2'>
                  {rules.map((rule) => (
                    <PasswordRule
                      key={rule.label}
                      met={rule.met}
                      label={rule.label}
                    />
                  ))}
                </ul>
              </div>

              {/* Submit */}
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full rounded-lg bg-[#D6449A] hover:bg-[#B8368A] text-white font-medium py-5 text-sm transition-colors'>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
