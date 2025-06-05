"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Feedback = {
  id: number;
  user: string;
  ai: string;
  createdAt: string;
};

export default function FeedbackAdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await fetch("/api/feedbacks");
      const data = await res.json();
      setFeedbacks(data);
      setLoading(false);
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Feedback del Asistente</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ScrollArea className="h-[70vh] rounded-md border p-2">
          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <Card key={fb.id}>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Hace {formatDistanceToNow(new Date(fb.createdAt), { locale: es })}
                  </p>
                  <p className="font-medium">🧑 Usuario:</p>
                  <p className="mb-2">{fb.user}</p>
                  <p className="font-medium">🤖 IA:</p>
                  <p>{fb.ai}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
