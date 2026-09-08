import { redirect } from "react-router";
import type { Route } from "./+types/home";
import { PurchaseForm } from "../features/purchase/PurchaseForm";
import { getSession, commitSession } from "../sessions.server";

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
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    return { error: error?.detail ?? "Noe gikk galt. Prøv igjen." };
  }

  const data = await response.json();

  const session = await getSession(request.headers.get("Cookie"));
  session.set("bekreftelse", data);

  return redirect("/bekreftelse", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Home() {
  return <PurchaseForm />;
}
