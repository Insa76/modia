import { motion } from "framer-motion";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
};

type Props = {
  text: string;
  suggestions: Product[];
};

export default function ChatResponse({
  text,
  suggestions = [],
}: {
  text: string;
  suggestions: Product[];
}) {
  return (
    <motion.div
      className="bg-muted p-6 rounded-2xl border border-border space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Respuesta de texto */}
      <motion.p
        className="text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {text}
      </motion.p>

      {/* Productos sugeridos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((product, i) => (
              <Link key={i} href={`/product/${product.id}`}>
                <div className="p-3 rounded-xl border hover:scale-105 transition cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                  <p className="font-bold">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
