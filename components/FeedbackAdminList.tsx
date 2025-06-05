"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Feedback {
  id: string;
  message: string;
  response: string;
  createdAt: string;
}

export default function FeedbackAdminList() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        setFeedback(data);
      } catch (err) {
        console.error("Error cargando feedback:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="p-4">Cargando feedback...</p>;

  return (
    <ScrollArea className="max-h-[80vh] p-4">
      {feedback.length === 0 ? (
        <p>No hay feedback registrado aún.</p>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <Card key={item.id} className="bg-muted">
              <CardContent className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p><strong>Usuario:</strong> {item.message}</p>
                <p><strong>IA:</strong> {item.response}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
