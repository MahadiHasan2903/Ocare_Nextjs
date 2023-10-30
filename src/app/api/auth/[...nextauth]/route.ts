import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        otp: { label: "otp", type: "text", placeholder: "123456" },
        phone_number: {
          label: "Phone",
          type: "number",
          placeholder: "1639478824",
        },
        country_code: {
          label: "Country code",
          type: "text",
          placeholder: "+880",
        },
      },
      async authorize(credentials, req) {
        console.log("autorize");
        try {
          console.log(credentials);
          const payload = {
            otp: credentials?.otp,
            country_code: credentials?.country_code,
            phone_number: credentials?.phone_number,
          };
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const user = await res.json();

          if (!res.ok) {
            throw new Error(user.message);
          }

          if (res.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/verify",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
