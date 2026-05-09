"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User as UserIcon } from "lucide-react";

export default function HomePage() {
  const { user, logout } = useAuth();

  // If user is null, AuthProvider will handle the redirect
  if (!user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <UserIcon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome back!</CardTitle>
          <CardDescription className="text-lg mt-2">
            You have successfully logged in as <span className="font-semibold text-foreground capitalize">{user.role}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Your Profile Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="font-medium">Name:</span>
              <span>{user.name}</span>
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
              <span className="font-medium">Role:</span>
              <span className="capitalize">{user.role}</span>
            </div>
          </div>
          
          <Button 
            onClick={logout} 
            variant="destructive" 
            className="w-full"
            size="lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}