"use client";

import { useActionState } from "react";
import { authClient } from "@/lib/auth-client";

// I send the entered credentials to Better Auth.
async function login(previousError: string, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      return "Login mislykkedes. Kontrollér e-mail og adgangskode.";
    }
  } catch {
    return "Kunne ikke kontakte serveren. Prøv igen.";
  }

  // I open the library after a successful login.
  window.location.assign("/admin");
  return "";
}

export default function LoginPage() {
  // I track errors and whether the login request is running.
  const [error, loginAction, pending] = useActionState(login, "");

  return (
    <main
      className="mx-auto w-full max-w-md px-6 py-16"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <p className="mb-8 text-sm font-semibold">ROMEO NORDSTRØM</p>

      <h1 className="admin-heading">Log ind</h1>
      <p className="mb-8">Dit private mediebibliotek.</p>

      <form action={loginAction} className="space-y-6">
        <div>
          <label htmlFor="email" className="mb-2 block">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="w-full rounded-lg border bg-white/50 px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block">
            Adgangskode
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border bg-white/50 px-4 py-3"
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {pending ? "Logger ind..." : "Log ind"}
        </button>
      </form>
    </main>
  );
}