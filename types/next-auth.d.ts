import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null; // 👈 extensible
    };
  }

  interface User {
    role?: string; // 👈 para que lo acepte en authorize
  }
}
