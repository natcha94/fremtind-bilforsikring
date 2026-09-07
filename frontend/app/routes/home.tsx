import type { Route } from "./+types/home";
import { PurchaseForm } from "../features/purchase/PurchaseForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kjøp Bilforsikring" },
    { name: "description", content: "Kjøp bilforsikring hos Fremtind" },
  ];
}

export default function Home() {
  return <PurchaseForm />;
}
