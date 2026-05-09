import Image from "next/image";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex h-dvh bg-[#fef8f8] items-center justify-center p-4 sm:p-8">
      <div className="w-full h-full 2xl:px-40 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-0 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-25 items-stretch">
        {/* Left Side: Image */}
        <div className="relative hidden md:block w-full h-full rounded-2xl overflow-hidden shadow-sm">
          <Image
            src="/auth/leftImage.svg"
            alt="Style City Register Background"
            fill
            className="object-cover object-center scale-[1.02]"
            priority
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full h-full overflow-y-auto mx-auto md:mx-0 pr-2 md:pr-6 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <div className="flex min-h-full flex-col justify-center py-6">
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="Style City Beauty Bar"
                width={80}
                height={80}
                className="mb-8 object-contain"
              />
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
