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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  salon: z.string().min(1, { message: "Salon is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(1, { message: "Please confirm password." }),
  role: z.enum(["employee", "manager"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"employee" | "manager">("employee");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      salon: "",
      password: "",
      confirmPassword: "",
      role: "employee",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      router.push("/login");
    }, 1000);
  }

  const roleTabHandler = (value: string) => {
    setRole(value as "employee" | "manager");
    form.setValue("role", value as "employee" | "manager");
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="employee" className="w-full mb-8" onValueChange={roleTabHandler}>
        <TabsList className="w-80 flex justify-start bg-transparent p-0 h-auto rounded-none">
          <TabsTrigger 
            value="employee" 
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
            className="justify-start rounded-none border-b-2 px-1 pb-3 pt-2 text-base font-medium text-gray-500 hover:text-gray-700 data-active:border-b-[#D13C92] data-active:text-[#D13C92] data-[state=active]:border-[#D13C92] data-[state=active]:text-[#D13C92]"
          >
            Employee
          </TabsTrigger>
          <TabsTrigger 
            value="manager" 
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
            className="justify-start rounded-none border-b-2 border-transparent px-1 pb-3 pt-2 text-base font-medium text-gray-500 hover:text-gray-700 data-active:border-b-[#D13C92] data-active:text-[#D13C92] data-[state=active]:border-[#D13C92] data-[state=active]:text-[#D13C92]"
          >
            Manager
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1F2937] mb-2">
          Sign up
        </h1>
        <p className="text-sm text-[#4A5568] mb-6">
          Make changes to your account here. Click save when you&apos;re done.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex flex-col min-h-0">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1.5 flex-none">
                  <FormLabel className="text-sm font-semibold text-[#020617]">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Pedro Duarte" 
                      className="rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1.5 flex-none">
                  <FormLabel className="text-sm font-semibold text-[#020617]">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Pedro Duarte" 
                      className="rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5 flex-none">
                  <FormLabel className="text-sm font-semibold text-[#020617]">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="@peduarte" 
                      className="rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salon"
              render={({ field }) => (
                <FormItem className="space-y-1.5 flex-none w-full">
                  <FormLabel className="text-sm font-semibold text-[#020617]">Salon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-md px-3 py-5 border-gray-200 focus:ring-[#D13C92] text-gray-500">
                        <SelectValue placeholder="Salon Name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="salon1">Downtown Elegance</SelectItem>
                      <SelectItem value="salon2">Uptown Glamour</SelectItem>
                      <SelectItem value="salon3">Suburban Style</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1.5 flex-none">
                  <FormLabel className="text-sm font-semibold text-[#020617]">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className="rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92] pr-10" 
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1.5 flex-none">
                  <FormLabel className="text-sm font-semibold text-[#020617]">Confirm password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirm Password" 
                        className="rounded-md px-3 py-5 border-gray-200 focus-visible:ring-[#D13C92] pr-10" 
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between pt-4 pb-4">
              <p className="text-sm text-gray-600">
                Already have an account? <Link href="/login" className="text-[#D13C92] font-medium hover:underline ml-1">Login</Link>
              </p>
              <Button 
                type="submit" 
                className="bg-[#D13C92] hover:bg-[#A62D73] text-white rounded-md px-8 py-5 transition-all" 
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Sign up"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}