import { Button } from "@/components/ui/button";
import FeedbackHistory from "../admin/feedback/FeedbackHistory";
import ProductFormCloudinary from "../../components/ProductFormCloudinary";
import ProductListAdmin from "../../components/ProductListAdmin";
import Link from "next/link";


export const metadata = {
  title: "Panel de administración",
};

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <ProductFormCloudinary />
      <ProductListAdmin />
      <FeedbackHistory /> 
        <Link href="/demo">
          <Button variant="destructive">🎬 Modo Demo</Button>
        </Link>
    </div>
  );
}
