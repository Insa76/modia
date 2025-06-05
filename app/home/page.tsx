"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
        Bienvenido a <span className="text-purple-400">ModIA</span>
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-300">
        Tu asistente de estilo inteligente. Descubrí recomendaciones personalizadas usando inteligencia artificial. Ingresá y viví la experiencia.
      </p>
      <Button
        className="text-lg px-6 py-4 rounded-xl bg-purple-500 hover:bg-purple-600 transition-all"
        onClick={() => router.push("/chat")}
      >
        Empezar
      </Button>
    </main>
  );
}
