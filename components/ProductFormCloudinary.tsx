"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";



export default function ProductFormCloudinary() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [soldOut, setSoldOut] = useState(false);

  const ProductFormCloudinary = dynamic(() => import('@/components/ProductFormCloudinary'), {
  ssr: false,
  loading: () => <div>Cargando formulario...</div>,
});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleUploadImage = async () => {
    if (!image) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      setImageUrl(data.url);
    };
    reader.readAsDataURL(image);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!imageUrl && image) await handleUploadImage();
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
       title,
       price: parseFloat(price),
       tags: tags.split(",").map(t => t.trim()),
       image: imageUrl,
       featured,
       soldOut
       })
      });
      if (res.ok) {
        alert("Producto guardado con éxito");
        setTitle("");
        setPrice("");
        setTags("");
        setImage(null);
        setImageUrl("");
      } else {
        alert("Error al guardar producto");
      }
    } catch (err) {
      console.error("Error en el envío:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Nuevo producto</h2>
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
       placeholder="Etiquetas (separadas por coma)"
       value={tags}
       onChange={(e) => setTags(e.target.value)}
      />
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Vista previa"
          className="w-full h-auto rounded shadow"
        />
      )}

       <div className="flex items-center gap-2">
        <label className="flex items-center gap-1">
         <input
         type="checkbox"
         checked={featured}
         onChange={(e) => setFeatured(e.target.checked)}
          />
          Destacado
        </label>
        <label className="flex items-center gap-1">
          <input
           type="checkbox"
           checked={soldOut}
           onChange={(e) => setSoldOut(e.target.checked)}
          />
           Agotado
        </label>
      </div>


      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar producto"}
      </Button>
    </div>
  );
}
