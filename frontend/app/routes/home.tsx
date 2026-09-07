import type { Route } from "./+types/home";
import { PurchaseForm } from "../features/purchase/PurchaseForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kjøp Bilforsikring" },
    { name: "description", content: "Kjøp bilforsikring hos Fremtind" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();

  const response = await fetch(
    `${process.env.API_URL}/api/bilforsikring/kjop`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    return { error: error?.detail ?? "Noe gikk galt. Prøv igjen." };
  }

  return await response.json();
}

export default function Home() {
  return <PurchaseForm />;
}
