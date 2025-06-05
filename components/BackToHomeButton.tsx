import { useRouter } from "next/navigation";
import { Home } from "lucide-react"; // o cualquier ícono que uses

export function BackToHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/experience")}
      className="fixed bottom-4 right-4 z-50 bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition"
    >
      <Home className="w-6 h-6" />
    </button>
  );
}
