"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

type Feedback = {
  id: string;
  message: string;
  response: string;
  createdAt: string;
};

export default function FeedbackHistory() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedbacks(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Historial de Interacciones</h2>
      {feedbacks.length === 0 ? (
        <p>No hay interacciones registradas.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="border rounded p-4 bg-white shadow">
              <p className="text-sm text-muted-foreground">
                {format(new Date(fb.createdAt), "dd/MM/yyyy HH:mm")}
              </p>
              <p className="mt-2"><strong>Usuario:</strong> {fb.message}</p>
              <p className="mt-1"><strong>Respuesta IA:</strong> {fb.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
