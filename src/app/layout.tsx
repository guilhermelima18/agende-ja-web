import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/toaster";

import "../styles/globals.css";
import { Contexts } from "@/contexts";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agende Já!",
  description: "Sistema de gerenciamento de agendamentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased w-full h-screen max-h-screen`}
      >
        <Contexts>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </Contexts>
      </body>
    </html>
  );
}
