import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany(); // Limpia antes de insertar (opcional)

  await prisma.product.createMany({
    data: [
      {
        title: "Look Nocturno",
        description: "Campera de cuero, jeans negros y botas.",
        price: 18500,
        image: "/outfits/nightlook.jpg",
        categoryId: 1,
        brandId: 1,
      },
      {
        title: "Elegante Urbano",
        description: "Blazer con pantalón chino y camisa clara.",
        price: 25000,
        image: "/outfits/elegante.jpg",
        categoryId: 2,
        brandId: 2,
      },
      {
        title: "Universidad Casual",
        description: "Remera básica, jeans y zapatillas.",
        price: 13000,
        image: "/outfits/uni.jpg",
        categoryId: 3,
        brandId: 1,
      },
      {
        title: "Look Deportivo",
        description: "Buzo oversize y joggers cómodos.",
        price: 14200,
        image: "/outfits/sport.jpg",
        categoryId: 4,
        brandId: 2,
      },
    ],
  });

  console.log("🌱 Productos cargados con éxito.");
}

main();
