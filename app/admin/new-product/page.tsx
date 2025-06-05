// app/admin/new-product/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NewProductPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    tags: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin"); // Redirige al dashboard luego de guardar
      } else {
        const error = await res.json();
        alert("Error: " + error.message);
      }
    } catch (err) {
      console.error("❌ Error al guardar producto:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Nuevo Producto</h1>

      <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
      <Textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
      <Input name="price" placeholder="Precio" value={form.price} onChange={handleChange} />
      <Input name="image" placeholder="URL de imagen" value={form.image} onChange={handleChange} />
      <Input name="tags" placeholder="Categorías (separadas por comas)" value={form.tags} onChange={handleChange} />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar producto"}
      </Button>
    </div>
  );
}
