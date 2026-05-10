"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

import { Sidebar } from "./sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isHydrated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isHydrated) {
    return (
      <div className='flex min-h-screen bg-slate-50'>
        <div className='hidden md:block md:w-80 border-r border-slate-200 bg-white'>
          <div className='h-full animate-pulse bg-linear-to-b from-white to-slate-50' />
        </div>
        <main className='flex-1 p-4 sm:p-6 lg:p-8'>
          <div className='mx-auto w-full max-w-5xl space-y-4'>
            <div className='h-16 rounded-3xl border border-slate-200 bg-white animate-pulse' />
            <div className='h-96 rounded-3xl border border-slate-200 bg-white animate-pulse' />
          </div>
        </main>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className='min-h-screen bg-(--primary-background) md:flex'>
      <Sidebar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />

      <main className='flex-1 flex flex-col min-w-0'>
        <header className="sticky top-0 z-30 flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-100">
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='md:hidden shrink-0'
            onClick={() => setMobileOpen(true)}
            aria-label='Open sidebar'>
            <Menu className='h-5 w-5' />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Welcome, {user.name}</h1>
            <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening today</p>
          </div>
        </header>

        <div className='flex-1 p-4 sm:p-6 lg:p-8'>
          {children}
        </div>
      </main>
    </div>
  );
}
