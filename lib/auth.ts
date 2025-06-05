import { cookies } from 'next/headers';
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import { getServerSession } from "next-auth";

export async function auth() {
  const session = await getServerSession(authOptions);
  return session;
}


export async function isAuthenticated() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('modia_admin');
  return cookie?.value === 'true';
}

export async function setAuthCookie() {
  (await cookies()).set('modia_admin', 'true', { path: '/', httpOnly: true });
}

export async function clearAuthCookie() {
  (await cookies()).set('modia_admin', 'false', { path: '/', httpOnly: true });
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Usuario no encontrado");

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Contraseña incorrecta");

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role; // Agregamos el rol a la sesión
      return session;
    },
  },

  pages: {
    signIn: "/login", // Página personalizada
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };