"use client";

import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from './providers';
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";


const metadata: Metadata = {
  title: "ModIA",
  description: "Asistente de moda impulsado por IA",
};

export function AuthButton() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-end p-2">
      {session ? (
        <div className="flex items-center gap-2">
          <span className="text-sm">Hola, {session.user?.name}</span>
          <Button variant="outline" onClick={() => signOut()}>Cerrar sesión</Button>
        </div>
      ) : (
        <Button onClick={() => signIn("google")}>Iniciar sesión</Button>
      )}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <AuthButton />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
