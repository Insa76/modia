"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";

export default function ResetButton() {
  const router = useRouter();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => router.push("/experience")}
        className="flex items-center space-x-2 bg-red-600 text-white text-lg px-4 py-2 rounded shadow-md"
      >
        <HomeIcon className="w-5 h-5" />
        <span>Volver al inicio</span>
      </Button>
    </div>
  );
}
