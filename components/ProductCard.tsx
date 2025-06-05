// components/ProductCard.tsx

import Image from "next/image";

type ProductCardProps = {
  image: string;
  title: string;
  description: string;
  price: string;
};

export default function ProductCard({ image, title, description, price }: ProductCardProps) {
  return (
    <div className="bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition duration-300 w-full max-w-xs">
      <div className="relative h-60 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        <p className="text-purple-400 font-bold">{price}</p>
      </div>
    </div>
  );
}
