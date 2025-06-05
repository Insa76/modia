import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ResetButton from "@/components/ui/ResetButton";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link href="/experience">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="mt-4 bg-primary text-white px-6 py-3 rounded-xl text-lg"
          >
            Volver
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center p-4 bg-background"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-lg font-semibold">{`$${product.price}`}</p>
          <p className="text-sm text-gray-600">{product.description}</p>

          {/* 🔙 Botón animado */}
          <Link href="/experience">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="mt-6 w-full bg-primary text-white py-3 rounded-xl text-lg"
            >
              ← Volver a las recomendaciones
            </motion.button>
          </Link>
        </div>
        <ResetButton />
      </div>
    </motion.div>
  );
}

