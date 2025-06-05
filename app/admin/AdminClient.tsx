"use client";
import ProductFormCloudinary from "@/components/ProductFormCloudinary";
import ProductListAdmin from "@/components/ProductListAdmin";
import FeedbackAdminList from "@/components/FeedbackAdminList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <div>Cargando...</div>;

  
   
      return (
          <div className="p-6 max-w-5xl mx-auto space-y-10">
            <h1 className="text-3xl font-bold text-center">Panel de Administración</h1>
      
            <section>
              <h2 className="text-2xl font-semibold mb-4">Crear producto</h2>
              <ProductFormCloudinary />
            </section>
      
            <section>
              <h2 className="text-2xl font-semibold mb-4">Productos existentes</h2>
              <ProductListAdmin />
            </section>
      
            <section>
              <h2 className="text-2xl font-semibold mb-4">Historial de Feedback</h2>
              <FeedbackAdminList />
            </section>
          </div>
        );
      }
      

