import { redirect } from "react-router";
import type { Route } from "./+types/bekreftelse";
import { ConfirmationPage } from "../features/purchase/ConfirmationPage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Bekreftelse – Kjøp Bilforsikring" }];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const avtalenummer = url.searchParams.get("avtalenummer");

  if (!avtalenummer) {
    return redirect("/");
  }

  return { avtalenummer };
}

export default function Bekreftelse({ loaderData }: Route.ComponentProps) {
  return <ConfirmationPage {...loaderData} />;
}
