"use client";

import { CircleCheckBig, Lock } from "lucide-react";
import Link from "next/link";

export default function SuccessReset() {
  return (
    <div className='flex min-h-screen bg-[#fdf5f7] items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-sm px-10 py-12 w-full max-w-md flex flex-col items-center text-center'>
        {/* Green Check Icon */}
        <div className='mb-6 w-16 h-16 rounded-full bg-green-50 flex items-center justify-center'>
          <CircleCheckBig className='w-9 h-9 text-green-500' strokeWidth={2} />
        </div>

        {/* Heading */}
        <h1 className='text-2xl font-semibold text-[#171717] mb-3 leading-snug'>
          Password Updated <br /> Successfully
        </h1>

        {/* Subtext */}
        <p className='text-sm text-[#494551] mb-8 leading-relaxed'>
          Your password has been reset successfully. <br />
          You can now log in with your new password.
        </p>

        {/* Back to Login Button */}
        <Link
          href='/login'
          className='w-full block text-center rounded-lg bg-[#D6449A] hover:bg-[#B8368A] text-white font-medium py-3 text-sm transition-colors'>
          Back to Login
        </Link>

        {/* Secure Transaction */}
        <div className='mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400'>
          <Lock className='w-3 h-3' />
          Secure Transaction Verified
        </div>
      </div>
    </div>
  );
}
