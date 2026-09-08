import { redirect, data } from "react-router";
import type { Route } from "./+types/bekreftelse";
import { ConfirmationPage } from "../features/purchase/ConfirmationPage";
import { getSession, destroySession } from "../sessions.server";
import type { Dekningstype } from "../features/purchase/dekningstype";

type BekreftelseData = {
  avtalenummer: string;
  dekningstype: Dekningstype;
  startdato: string;
  arspremie: string;
};

export function meta({}: Route.MetaArgs) {
  return [{ title: "Bekreftelse – Kjøp Bilforsikring" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const bekreftelse = session.get("bekreftelse") as BekreftelseData | undefined;

  if (!bekreftelse?.avtalenummer) {
    return redirect("/");
  }

  return data(bekreftelse, {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

export default function Bekreftelse({ loaderData }: Route.ComponentProps) {
  return <ConfirmationPage {...loaderData} />;
}
