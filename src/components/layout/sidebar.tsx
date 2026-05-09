"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, Menu, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_CONFIG } from "@/lib/nav-config";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ mobileOpen, onMobileOpenChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    onMobileOpenChange(false);
  }, [pathname, onMobileOpenChange]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const navItems = useMemo(() => {
    if (!user) return [];

    return NAV_CONFIG[user.role];
  }, [user]);

  if (!user) return null;

  const sidebarContent = (
    <>
      <div className='relative flex items-center px-5 py-5'>
        <div className='flex flex-1 items-center justify-center pb-5 border-b border-[#C7B29B] '>
          <Image
            src='/logo.svg'
            alt='Style City'
            width={100}
            height={100}
            className='h-23 w-auto mx-auto'
            priority 
          />
        </div>

        <div className='absolute right-5 flex items-center gap-1'>
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            className='hidden md:inline-flex'
            onClick={() => setIsCollapsed((value) => !value)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isCollapsed ? (
              <ChevronRight className='h-4 w-4' />
            ) : (
              <ChevronLeft className='h-4 w-4' />
            )}
          </Button>

          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            className='md:hidden'
            onClick={() => onMobileOpenChange(false)}
            aria-label='Close sidebar'>
            <X className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <nav className='flex-1 space-y-1 overflow-y-auto px-3 py-4'>
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onMobileOpenChange(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-(--primary-color) text-white "
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                isCollapsed && "md:justify-center md:px-2",
              )}>
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  active ? "text-white" : "text-current",
                )}
              />
              <span
                className={cn(
                  "truncate transition-all duration-300",
                  isCollapsed
                    ? "md:w-0 md:overflow-hidden md:opacity-0"
                    : "md:opacity-100",
                )}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className='border-t border-slate-200 p-4'>
        <Button
          type='button'
          variant='ghost'
          onClick={logout}
          className={cn(
            "w-full justify-start gap-3 rounded-2xl px-3 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600",
            isCollapsed && "md:justify-center md:px-2",
          )}>
          <LogOut className='h-5 w-5' />
          <span
            className={cn(
              isCollapsed
                ? "md:w-0 md:overflow-hidden md:opacity-0"
                : "md:opacity-100",
            )}>
            Logout
          </span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden min-h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-300 md:sticky md:top-0 md:flex",
          isCollapsed ? "md:w-20" : "md:w-80",
        )}>
        {sidebarContent}
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}>
        <button
          type='button'
          aria-label='Close sidebar backdrop'
          onClick={() => onMobileOpenChange(false)}
          className={cn(
            "absolute inset-0 bg-slate-950/40 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <aside
          className={cn(
            "absolute left-0 top-0 flex h-full w-[86vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}>
          {sidebarContent}
        </aside>
      </div>
    </>
  );
}
