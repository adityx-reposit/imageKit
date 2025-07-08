import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import bcrypt from 'bcrypt'

import { ConnectData } from "./db";
import user from "../models/User";
import { error, log } from "console";
import { Session } from "inspector/promises";

export const authOptions:NextAuthOptions={
 
   providers:[
    GithubProvider({
        clientId:process.env.GITHUB_ID!,
        clientSecret:process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
    CredentialsProvider({
        name:"Credentials",
        credentials: {
            Email: { label: "Email", type: "text", placeholder: "Aditya Yadav" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
                if(!credentials?.Email || !credentials.password){
                    throw new Error("Missing Email or password")
                }
                try{
                  await ConnectData()
                  const User=await user.findOne({
                    email:credentials.Email

                  })
                  if(!User){
                    throw new Error("No User Found")
                  }

                 const Isvalid= await bcrypt.compare(
                    credentials.password,
                    User.password
                  )

                  if(!Isvalid){
                    throw new Error("Invalid Password");
                  }

                  return {
                    id:User._id.toString(),
                    email:User.Email
                  }
                }
                catch(Error){
                    console.log("Auth Error ");
                    throw error
                    
                }
          }
    })  
    
   ],
   callbacks:{
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token }) {
            if (session.user) {
               session.user.id= token.id 
            }
            return session;
        }
   },
   pages:{
    signIn:"/login",
    error:"/login"
   },
   session:{
    strategy:"jwt",
    maxAge:30*24*60*60
   },
   secret:process.env.NEXTAUTH_SECRET

};