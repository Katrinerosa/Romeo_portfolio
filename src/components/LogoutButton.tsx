"use client";

import { useActionState } from "react";
import { authClient } from "@/lib/auth-client";

// I end the session before returning to the login page.
async function logout() {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      return "Kunne ikke logge ud. Prøv igen.";
    }
  } catch {
    return "Kunne ikke kontakte serveren. Prøv igen.";
  }

  window.location.assign("/login");
  return "";
}

export default function LogoutButton() {
  const [error, logoutAction, pending] = useActionState(logout, "");

  return (
    <form action={logoutAction}>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        {pending ? "Logger ud..." : "Log ud"}
      </button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}