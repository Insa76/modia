"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  title: string;
  price: number;
  tags: string[];
  image: string;
  featured: boolean;
  soldOut: boolean;
};

export default function ProductListAdmin() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Productos cargados</h2>
      {products.length === 0 ? (
        <p>No hay productos aún.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded p-4 flex flex-col md:flex-row items-start gap-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">${product.price}</p>
                <p className="text-sm">Tags: {product.tags.join(", ")}</p>
                <div className="flex gap-2 mt-1">
                  {product.featured && (
                    <span className="text-xs bg-yellow-300 px-2 py-0.5 rounded">
                      Destacado
                    </span>
                  )}
                  {product.soldOut && (
                    <span className="text-xs bg-red-300 px-2 py-0.5 rounded">
                      Agotado
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 md:mt-0">
                <Button
                  variant="secondary"
                  onClick={() => alert("Función de edición no implementada aún")}
                >
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(product.id)}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
