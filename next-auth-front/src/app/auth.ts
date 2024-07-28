import NextAuth, { type DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";
import { BACKEND_URL } from "./lib/Constants";

// Define a custom user type that extends the default User type
interface CustomUser {
  id: number;
  email: string;
  username: string;
  birthdate: string;
  accessToken: string;
  refreshToken: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
      birthdate: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    username: string;
    birthdate: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      Authorization: `Refresh ${token.refreshToken}`,
    },
  });

  const response = await res.json();

  // console.log("refreshed");

  return {
    ...token,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    expiresIn: response.expiresIn,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      // When an account in a given provider (Google, GitHub, etc.) is linked to a user, we verify the email by setting emailVerified to the current date
    },
  },

  callbacks: {
    async signIn({ user }) {
      return true; // Continue with sign in
    },

    async jwt({ token, user }: { token: JWT; user?: CustomUser | User }) {
      // During the initial sign-in, `user` will be defined
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.email = customUser.email ?? "";
        token.username = customUser.username ?? "";
        token.birthdate = customUser.birthdate ?? "";
        token.accessToken = customUser.accessToken ?? "";
        token.refreshToken = customUser.refreshToken ?? "";
      }

      //Acces token is not expired
      if (new Date().getTime() < token.expiresIn) return token;

      //Acces token is expired
      return await refreshToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.birthdate = token.birthdate;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },

  session: { strategy: "jwt" },

  ...authConfig,
});
