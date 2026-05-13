import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const sofiaPro = localFont({
  src: [
    {
      path: "../../public/sofia-pro/Sofia Pro UltraLight Az.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro UltraLight Italic Az.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro ExtraLight Az.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro ExtraLight Italic Az.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Light Az.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Light Italic Az.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Regular Az.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Regular Italic Az.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Medium Az.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Medium Italic Az.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Semi Bold Az.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Semi Bold Italic Az.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Bold Az.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Bold Italic Az.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Black Az.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/sofia-pro/Sofia Pro Black Italic Az.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sofia-pro",
});

export const metadata: Metadata = {
  title: "Style City",
  description: "Style City Beauty Bar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${sofiaPro.className} ${sofiaPro.variable} antialiased`}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Toaster position='top-right' richColors />
      </body>
    </html>
  );
}
