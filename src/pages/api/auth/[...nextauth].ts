import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserType } from "../../../types/usertype";

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
  ],
  callbacks: {
    jwt({ token, account, profile, user }: any) {
      const theUser: UserType = user as UserType;

      if (account?.provider === "credentials") {
        token.email = theUser.email;
        token.fullname = theUser.fullname;
        token.role = theUser.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      interface mySession extends Session {
        user: {
          email: string;
          fullname: string;
          role: string;
        };
      }

      const theSession = session as mySession;

      if ("email" in token) theSession.user.email = token.email;
      if ("fullname" in token) theSession.user.fullname = token.fullname;
      if ("role" in token) theSession.user.role = token.role;

      return theSession;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
