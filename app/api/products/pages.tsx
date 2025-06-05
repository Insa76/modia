import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProductFormCloudinary = dynamic(() => import('@/components/ProductListAdmin'), {
  ssr: false,
  loading: () => <div>Cargando productos...</div>,
});

export default function ProductsPage() {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Gestión de Productos</h1>
      <Suspense fallback={<p>Cargando formulario...</p>}>
        <ProductFormCloudinary />
      </Suspense>
    </div>
  );
}
