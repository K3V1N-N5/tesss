import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Discord,Google],
  callbacks: {
   async redirect({ url, baseUrl }) {
      return "/dashboard";
   }
 }
})
