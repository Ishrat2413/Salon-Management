"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardPageProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function DashboardPage({
  title,
  description,
  children,
}: DashboardPageProps) {
  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-6'>
      <Card className='border-slate-200 bg-white shadow-sm'>
        <CardHeader className='border-b border-slate-200 pb-5'>
          <CardTitle className='text-2xl font-semibold text-slate-950 sm:text-3xl'>
            {title}
          </CardTitle>
          <CardDescription className='text-base text-slate-600'>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          {children ?? (
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-2xl bg-slate-50 p-4'>
                <p className='text-sm font-medium text-slate-500'>Overview</p>
                <p className='mt-2 text-sm text-slate-700'>
                  This section is wired to the shared dashboard shell.
                </p>
              </div>
              <div className='rounded-2xl bg-slate-50 p-4'>
                <p className='text-sm font-medium text-slate-500'>Status</p>
                <p className='mt-2 text-sm text-slate-700'>
                  Use the sidebar to move between role-based routes.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
