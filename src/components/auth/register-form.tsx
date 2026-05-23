"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { registerSchema } from "@/actions/auth/auth.schema";
import { useRegisterMutation } from "@/actions/auth/useAuth";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: register, isPending } = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "EMPLOYEE",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    const { confirmPassword, salonId, ...data } = values;
    
    // We only pass the salonId if it's a valid string, otherwise we omit it
    const payload = salonId ? { ...data, salonId } : data;
    
    register(payload);
  }

  const roleTabHandler = (value: string) => {
    form.setValue("role", value as "EMPLOYEE" | "MANAGER");
  };

  return (
    <div className='w-full'>
      <Tabs
        defaultValue='EMPLOYEE'
        className='w-full mb-8'
        onValueChange={roleTabHandler}>
        <TabsList className='w-80 flex justify-start bg-transparent p-0 h-auto rounded-none'>
          <TabsTrigger
            value='EMPLOYEE'
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
            className='justify-start rounded-none border-b-2 px-1 pb-3 pt-2 text-base font-medium text-gray-500 hover:text-gray-700 data-active:border-b-[#D13C92] data-active:text-[#D13C92] data-[state=active]:border-[#D13C92] data-[state=active]:text-[#D13C92]'>
            Employee
          </TabsTrigger>
          <TabsTrigger
            value='MANAGER'
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
            className='justify-start rounded-none border-b-2 border-transparent px-1 pb-3 pt-2 text-base font-medium text-gray-500 hover:text-gray-700 data-active:border-b-[#D13C92] data-active:text-[#D13C92] data-[state=active]:border-[#D13C92] data-[state=active]:text-[#D13C92]'>
            Manager
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        <h1 className='text-2xl font-bold tracking-tight text-[#1F2937] mb-2'>
          Sign up
        </h1>
        <p className='text-sm text-[#4A5568] mb-6'>
          Make changes to your account here. Click save when you&apos;re done.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col min-h-0'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='space-y-1.5 flex-none'>
                  <FormLabel className='text-sm font-semibold text-[#020617]'>
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Pedro Duarte'
                      className='rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1.5 flex-none'>
                  <FormLabel className='text-sm font-semibold text-[#020617]'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='email@example.com'
                      className='rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92]'
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
                <FormItem className='space-y-1.5 flex-none'>
                  <FormLabel className='text-sm font-semibold text-[#020617]'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password'
                        className='rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92] pr-10'
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

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1.5 flex-none'>
                  <FormLabel className='text-sm font-semibold text-[#020617]'>
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='Confirm Password'
                        className='rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92] pr-10'
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
                        {showConfirmPassword ? (
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

            <div className='flex items-center justify-between pt-4 pb-4'>
              <p className='text-sm text-gray-600'>
                Already have an account?{" "}
                <Link
                  href='/login'
                  className='text-[#D13C92] font-medium hover:underline ml-1'>
                  Login
                </Link>
              </p>
              <Button
                type='submit'
                className='bg-[#D13C92] hover:bg-[#A62D73] text-white rounded-md px-8 py-5 transition-all'
                disabled={isPending}>
                {isPending ? "Registering..." : "Sign up"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
