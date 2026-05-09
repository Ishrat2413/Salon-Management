"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, User as UserIcon } from "lucide-react";

export default function HomePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className='mx-auto flex w-full max-w-4xl items-center justify-center'>
        <Card className='w-full max-w-lg border-slate-200 bg-white shadow-sm'>
          <CardHeader className='text-center'>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
              <UserIcon className='h-6 w-6 text-primary' />
            </div>
            <CardTitle className='text-3xl font-bold'>Welcome back!</CardTitle>
            <CardDescription className='mt-2 text-lg'>
              You have successfully logged in as{" "}
              <span className='font-semibold text-foreground capitalize'>
                {user.role}
              </span>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className='mt-4 space-y-6'>
            <div className='space-y-2 rounded-lg bg-muted p-4'>
              <h3 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                Your Profile Details
              </h3>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <span className='font-medium'>Name:</span>
                <span>{user.name}</span>
                <span className='font-medium'>Email:</span>
                <span>{user.email}</span>
                <span className='font-medium'>Role:</span>
                <span className='capitalize'>{user.role}</span>
              </div>
            </div>

            <Button
              onClick={logout}
              variant='destructive'
              className='w-full'
              size='lg'>
              <LogOut className='mr-2 h-4 w-4' />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
