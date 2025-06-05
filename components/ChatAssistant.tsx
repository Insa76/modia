"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatResponse from "@/components/ChatResponse";

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

type ChatEntry = {
  user: string;
  ai: AIResponse;
};

export default function ChatAssistant() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: input }] }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Error en la API:", text);
        return;
      }

      const data: AIResponse = await response.json();

      setChatHistory((prev) => [...prev, { user: userMessage, ai: data }]);

      // 👉 Guardamos en feedback
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userMessage, ai: data.text }),
      });

    } catch (err) {
      console.error("❌ Error en la respuesta:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setChatHistory([]);
    setInput("");
  };

  const isEmpty = chatHistory.length === 0;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {isEmpty && (
        <div className="bg-muted p-4 rounded-xl text-sm border border-border">
          🎉 <strong>¡Bienvenido a ModIA!</strong> <br />
          Contame qué tipo de prenda, ocasión o estilo buscás y te armo un look a medida.
        </div>
      )}

      {chatHistory.map((entry, i) => (
        <div key={i} className="space-y-2">
          <div className="bg-primary text-white p-3 rounded-xl w-fit max-w-[80%]">
            {entry.user}
          </div>
          <ChatResponse text={entry.ai.text} suggestions={entry.ai.suggestions} />
        </div>
      ))}

      <div className="flex items-center gap-2 pt-4">
        <Input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="¿Qué tipo de prenda o look buscás?"
          disabled={loading}
        />
        <Button onClick={handleSend} disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-sm text-muted-foreground">
          {chatHistory.length > 0 && "Conversación activa"}
        </span>
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={loading || chatHistory.length === 0}
        >
          Reiniciar conversación
        </Button>
      </div>
    </div>
  );
}
