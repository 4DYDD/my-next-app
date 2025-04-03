import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserType } from "../../../types/usertype";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as UserType;

        // const user: UserType = { id: 1, email, fullname, password };
        const user: UserType | null = await signIn({ email, password });

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user as any;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOGGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOGGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      const theUser: UserType = user as UserType;

      if (account?.provider === "credentials") {
        token.email = theUser.email;
        token.fullname = theUser.fullname;
        token.type = "credential";
        token.image = theUser.image || "";
        token.role = theUser.role;
      }

      if (account?.provider === "google") {
        const data = {
          email: user.email,
          fullname: user.name,
          image: user.image,
          type: "google",
        };

        await signInWithGoogle(data, (result: any) => {
          if (result.status) {
            token.email = result.data.email;
            token.fullname = result.data.fullname;
            token.type = result.data.type;
            token.image = result.data.image;
            token.role = result.data.role;
          }
        });
      }

      return token;
    },
    async session({ session, token }: any) {
      interface mySession extends Session {
        user: {
          email: string;
          fullname: string;
          type?: string;
          image?: string;
          role: string;
        };
      }

      const theSession = session as mySession;

      if ("email" in token) theSession.user.email = token.email;
      if ("fullname" in token) theSession.user.fullname = token.fullname;
      if ("type" in token) theSession.user.type = token.type;
      if ("image" in token) theSession.user.image = token.image;
      if ("role" in token) theSession.user.role = token.role;

      return theSession;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
