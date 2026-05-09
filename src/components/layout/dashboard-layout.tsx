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
    <div className='min-h-screen bg-slate-50 md:flex'>
      <Sidebar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />

      <Button
        type='button'
        variant='outline'
        size='icon'
        className='fixed left-4 top-4 z-40 md:hidden'
        onClick={() => setMobileOpen(true)}
        aria-label='Open sidebar'>
        <Menu className='h-4 w-4' />
      </Button>

      <main className='flex-1 px-4 py-16 sm:px-6 sm:py-6 lg:px-10 lg:py-8'>
        {children}
      </main>
    </div>
  );
}
