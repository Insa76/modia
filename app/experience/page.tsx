"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ChatResponse from "@/components/ChatResponse";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { useInactivityRedirect } from "@/lib/useInactivityRedirect";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
};

type AIResponse = {
  text: string;
  suggestions: Product[];
};

const OPTIONS = [
  "Look casual",
  "Algo elegante",
  "Para salir de noche",
  "Ropa cómoda",
  "Tendencias actuales",
];

export default function ExperiencePage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  useInactivityRedirect(60000);


useEffect(() => {
    // 🔒 Bloquea scroll en modo kiosco
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOption = async (option: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: option }] }),
      });

      const data: AIResponse = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background px-4 py-6 space-y-6">
      {!response ? (
        <>
          <h1 className="text-2xl font-bold text-center max-w-md">
            ¿Qué tipo de look te gustaría explorar?
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            {OPTIONS.map((option, i) => (
              <Button
                key={i}
                onClick={() => handleOption(option)}
                className="text-lg py-6"
                disabled={loading}
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full max-w-3xl">
          <ChatResponse text={response.text} suggestions={response.suggestions} />
          <div className="pt-6 flex justify-center">
            <Button variant="outline" onClick={handleReset}>
              Elegir otra opción
            </Button>
          </div>
        </div>
      )}

       <BackToHomeButton />
    </div>
  );
}
