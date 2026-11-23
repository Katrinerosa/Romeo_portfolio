import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// I let Better Auth handle login, logout and sessions.
export const { GET, POST } = toNextJsHandler(auth);