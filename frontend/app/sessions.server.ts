import { createCookieSessionStorage } from "react-router";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "kjop_bekreftelse",
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "fremtind-dev-secret"],
    secure: process.env.NODE_ENV === "production",
  },
});

export { getSession, commitSession, destroySession };
