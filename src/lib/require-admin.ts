import "server-only";

import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// I require an active administrator session.
export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache: true,
    },
  });

  // I send visitors without a session to the login page.
  if (!session) {
    redirect("/login");
  }

  // I only allow accounts with the admin role.
  if (session.user.role !== "admin") {
    notFound();
  }

  return session;
}