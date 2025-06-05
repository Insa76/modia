"use client";

import { useEffect, useState } from "react";

export default function DemoPage() {
  const [step, setStep] = useState(0);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const steps = [
      () => console.log("Iniciando demo..."),
      async () => {
        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ content: "¿Qué me puedo poner hoy?" }] }),
        });
        const data = await res.json();
        setRecommendation(data);
      },
      () => {
        if (recommendation?.suggestions?.length) {
          setSelected(recommendation.suggestions[0]); // selecciona el primero
        }
      },
      async () => {
        if (recommendation) {
          await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: "¿Qué me puedo poner hoy?",
              response: recommendation.text,
            }),
          });
        }
      },
      () => {
        console.log("Demo finalizada, reiniciando...");
        setTimeout(() => {
          setStep(0);
          setRecommendation(null);
          setSelected(null);
        }, 3000);
      },
    ];

    if (step < steps.length) {
      const timer = setTimeout(() => {
        steps[step]();
        setStep(step + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, recommendation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">🎬 Modo Demo de ModIA</h1>

      {!recommendation && <p>🤖 Esperando respuesta de la IA...</p>}

      {recommendation && !selected && (
        <div>
          <p className="mb-2">🧠 Respuesta de la IA:</p>
          <p className="italic text-gray-700">{recommendation.text}</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {Array.isArray(recommendation) && recommendation.map((p: any) => (
              <div
                key={p.title}
                className="border p-2 rounded shadow cursor-pointer"
                onClick={() => setSelected(p)}
              >
                <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-600">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <div className="mt-6 border p-4 rounded shadow w-full max-w-md">
          <h2 className="text-xl font-bold">{selected.title}</h2>
          <img src={selected.image} alt={selected.title} className="w-full h-60 object-cover my-2" />
          <p>{selected.description}</p>
          <p className="mt-2 font-semibold text-green-700">{selected.price}</p>
        </div>
      )}
    </div>
  );
}
