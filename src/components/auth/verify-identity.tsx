"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function VerifyIdentityPage() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formattedTime = `00:${String(timer).padStart(2, "0")}`;
  const fullCode = code.join("");

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...code];
    updated[index] = digit;
    setCode(updated);
    if (digit && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;
    const updated = [...code];
    pasted.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setCode(updated);
    inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleResend() {
    setTimer(RESEND_SECONDS);
    setCode(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    toast.success("Verification code resent.");
  }

  function handleSubmit() {
    if (fullCode.length < CODE_LENGTH) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Identity verified!");
    }, 800);
  }

  return (
    <div className='flex min-h-screen bg-[#fdf5f7] items-center justify-center p-4 sm:p-8'>
      <div className='w-full 2xl:px-40 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
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
          {/* Shield Icon */}
          <div className='mb-5'>
            <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#FEF1F8]'>
              <ShieldCheck
                className='w-7 h-7 text-[#D13C92]'
                strokeWidth={1.8}
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className='text-2xl font-medium text-[#171717] mb-2 text-center'>
            Verify Your Identity
          </h1>
          <p className='text-sm text-[#494551] text-center mb-8'>
            We sent a 6-digit verification code to your email or phone number.
          </p>

          <div className='w-full max-w-lg space-y-6'>
            {/* OTP Boxes */}
            <div>
              <p className='text-sm font-medium text-slate-700 text-center mb-3'>
                Enter Verification Code
              </p>
              <div className='flex justify-center gap-3'>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-12 text-center text-base font-semibold rounded-lg border bg-white text-slate-800 outline-none transition-all
                      ${
                        i === 0 && !digit
                          ? "border-[#D13C92] ring-1 ring-[#D13C92]"
                          : digit
                            ? "border-[#D13C92]"
                            : "border-gray-200"
                      }
                      focus:border-[#D13C92] focus:ring-1 focus:ring-[#D13C92]`}
                  />
                ))}
              </div>
            </div>

            {/* Resend */}
            <div className='flex justify-center text-sm'>
              {timer > 0 ? (
                <p className='text-slate-500'>
                  ✦ Resend code in{" "}
                  <span className='text-[#D13C92] font-semibold'>
                    {formattedTime}
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className='text-[#D13C92] font-semibold hover:underline'>
                  ✦ Resend code
                </button>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading || fullCode.length < CODE_LENGTH}
              className='w-full rounded-lg bg-[#D6449A] hover:bg-[#B8368A] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-5 text-sm transition-colors'>
              {isLoading ? "Verifying..." : "Enter 6-digit code"}
            </Button>

            {/* Back to Login */}
            <div className='flex justify-center'>
              <Link
                href='/login'
                className='inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors'>
                <ArrowLeft className='w-4 h-4' />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
