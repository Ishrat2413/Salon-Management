import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#fef8f8] items-center justify-center p-4 sm:p-8">
      <div className="w-full mx-40 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-25 items-center">
        {/* Left Side: Image */}
        <div className="relative hidden md:block w-full aspect-4/5 rounded-lg overflow-hidden shadow-sm">
          <Image
            src="/auth/leftImage.svg"
            alt="Style City Login Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full mx-auto md:mx-0">
          <div className="mb-8">
            <Image
              src="/logo.svg"
              alt="Style City Beauty Bar"
              width={80}
              height={80}
              className="mb-6 object-contain"
            />
            <h1 className="text-2xl font-bold tracking-tight text-[#1F2937] mb-2">
              Login
            </h1>
            <p className="text-sm text-[#4A5568]">
              Enter your Info below to login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
