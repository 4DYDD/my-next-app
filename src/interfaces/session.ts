export interface Session {
  data: {
    accessToken?: string;
    expires?: string;
    user?: {
      id?: string;
      email?: string;
      fullname?: string;
      name?: string;
      image?: string;
    };
  } | null;
  status: "loading" | "authenticated" | "unauthenticated";
}
