import NextAuth, {
  AuthOptions,
  getServerSession,
  SessionStrategy,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/prisma/db";
import GoogleProvider from "next-auth/providers/google";
import { getGoogleCredentials } from "@/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const authOptions = {
  pages: {
    signIn: "/signIn",

    error: "/signin",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isValid) return user;
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phoneNumber 
      }
      console.log("token",token)
      console.log("user",user)
      return token;
    },
    async session({ session, token }: any) {     
      if (token) {
        session.user.id = token?.id;
        session.user.role = token?.role;
        session.user.phone = token?.phone;
      }
      console.log("session",session)
      return session;
     
    },
    async redirect({ url, baseUrl }:any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  // events: {
  //   async signIn(message) {
  //     // console.log("Sign in successful", message);
  //   },
  //   async session(message) {
  //     // console.log("Session created", message);
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXT_PUBLIC_ENV === "development",
};

export default NextAuth(authOptions);
export const getAuthSession = () => {
  return getServerSession(authOptions);
};
