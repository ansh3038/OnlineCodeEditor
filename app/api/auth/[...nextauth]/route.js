import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/app/lib/mongodb"
import User from "@/app/models/user"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        // Add logic here to look up the user from the credentials supplied
        // Assuming this code is inside an asynchronous function
        try {
          await connectMongoDB();
          const user = await User.findOne({ username });
          if (!user) {
            return null;
          }
          const encrypt = password;
          if (encrypt !== password) {
            return null;
          }
          // Now you can use the 'user' data as needed
          // console.log(user);
          // Any object returned will be saved in `user` property of the JWT
          return user;
          // If you return null then an error will be displayed advising the user to check their details.
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        } catch (error) {
          // Handle any errors that occurred during the fetch
          console.error("Fetch error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log(profile);
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    }
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
