import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import connectDB from "@/pages/lib/connectDB";
import User from "@/Model/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
          const { username, password } = credentials;
          await connectDB() 
          const user = await User.findOne({ email: username });
          console.log("username",user)
          
          if (!user) {
            return Promise.resolve(null);
          }
          
          const inputHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
          if(inputHash == user.hash){
            
            return Promise.resolve(user);
          }
          else{
            return Promise.resolve("invalid user");
          }
        },
      }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      // console.log("in jwt",token)
      return token
    },
    async session({ session, token, user }) {

      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken

      return session 
    },
    async signIn({user}) {
      console.log("inside callback")
      await connectDB()
      console.log("connected",user)
      const u = await User.findOne({email:user.email})
      console.log("found",u) 
      const email = user.email;
      const name = user.name;
      if(!u){
        const newUser = new User({
          email,
          profile:{
            firstName:name
          }
        })
        await newUser.save();
      }
      return true
    }

  }

  
}

export default NextAuth(authOptions)