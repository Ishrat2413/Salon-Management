import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className='flex min-h-screen bg-[#fef8f8] items-center justify-center p-4 sm:p-8'>
      <div className='w-full 2xl:px-40 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-0 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-25 items-stretch'>
        {/* Left Side: Image */}
        <div className='relative hidden md:block w-full h-full min-h-125 rounded-2xl overflow-hidden shadow-sm'>
          <Image
            src='/auth/leftImage.svg'
            alt='Style City Login Background'
            fill
            className='object-cover object-center scale-[1.02]'
            priority
          />
        </div>

        {/* Right Side: Form */}
        <div className='w-full mx-auto md:mx-0 flex flex-col justify-center py-6'>
          <div className='mb-8'>
            <Image
              src='/logo.svg'
              alt='Style City Beauty Bar'
              width={80}
              height={80}
              className='mb-6 object-contain'
            />
            <h1 className='text-2xl font-bold tracking-tight text-[#1F2937] mb-2'>
              Login
            </h1>
            <p className='text-sm text-[#4A5568]'>
              Enter your Info below to login to your account
            </p>
          </div>
          <LoginForm />

          {/* Demo Credentials */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <p className='text-sm font-semibold text-gray-700 mb-3'>
              Demo Credentials:
            </p>
            <div className='flex flex-col gap-2 text-sm text-gray-600 bg-white/60 p-4 rounded-md border border-gray-100 shadow-sm'>
              <div className='flex justify-between items-center'>
                <span className='font-medium text-gray-800'>Employee:</span>{" "}
                <span className='font-mono bg-white px-2 py-1 rounded text-xs'>
                  employee@gmail.com / employee@123
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='font-medium text-gray-800'>Manager:</span>{" "}
                <span className='font-mono bg-white px-2 py-1 rounded text-xs'>
                  manager@gmail.com / manager@123
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='font-medium text-gray-800'>Admin:</span>{" "}
                <span className='font-mono bg-white px-2 py-1 rounded text-xs'>
                  admin@gmail.com / admin@123
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
