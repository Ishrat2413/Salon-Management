"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import type { UserRole } from "@/lib/auth";

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "demo_user";
const AUTH_CHANGE_EVENT = "demo-user-change";

let cachedStoredUserValue: string | null = null;
let cachedStoredUser: User | null = null;

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (storedUser === cachedStoredUserValue) {
    return cachedStoredUser;
  }

  cachedStoredUserValue = storedUser;

  if (!storedUser) {
    cachedStoredUser = null;
    return null;
  }

  try {
    cachedStoredUser = JSON.parse(storedUser) as User;
    return cachedStoredUser;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    cachedStoredUserValue = null;
    cachedStoredUser = null;
    return null;
  }
}

function writeStoredUser(user: User | null) {
  if (user) {
    const storedUser = JSON.stringify(user);
    window.localStorage.setItem(AUTH_STORAGE_KEY, storedUser);
    cachedStoredUserValue = storedUser;
    cachedStoredUser = user;
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  cachedStoredUserValue = null;
  cachedStoredUser = null;
}

function subscribeToAuthChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(AUTH_CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, handleChange);
  };
}

function emitAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(
    subscribeToAuthChanges,
    readStoredUser,
    () => null,
  );
  const isHydrated = useSyncExternalStore(
    subscribeToAuthChanges,
    () => true,
    () => false,
  );
  const isLoading = !isHydrated;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isHydrated) return;

    const isAuthPage = pathname === "/login";

    if (!user && !isAuthPage) {
      router.replace("/login");
    } else if (user && isAuthPage) {
      router.replace("/");
    }
  }, [user, pathname, isHydrated, router]);

  const login = (newUser: User) => {
    writeStoredUser(newUser);
    emitAuthChange();
    router.replace("/");
  };

  const logout = () => {
    writeStoredUser(null);
    emitAuthChange();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
