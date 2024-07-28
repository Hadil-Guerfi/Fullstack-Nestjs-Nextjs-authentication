// src/auth.config.ts

import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { BACKEND_URL } from "./lib/Constants";
export default {
  providers: [
    credentials({
      //-------------------Sign in logic --------------------
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const { email, password } = credentials;
        const res = await fetch(BACKEND_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          return null;
        }

        const user = await res.json();

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
