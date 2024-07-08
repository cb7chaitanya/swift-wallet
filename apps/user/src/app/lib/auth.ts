import client from "@repo/db/client";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { userSchema } from "@/zod/user";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone", type: "text", placeholder: "Enter your phone" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
            },
            async authorize(credentials: any) {
                const {success} = userSchema.safeParse(credentials)
                if(!success){
                    throw new Error("Invalid credentials")
                }
                else {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const existingUser = await client.user.findFirst({
                        where: {
                            OR: [
                                { email: credentials.email },
                                { phone: credentials.phone }
                            ]
                        }
                    });
                    if(existingUser){
                        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
                        if(passwordMatch){
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.email
                            }
                        }
                        return null;
                    }

                    try{
                        const user = await client.user.create({
                            data: {
                                email: credentials.email,
                                phone: credentials.phone,
                                password: hashedPassword
                            }
                        })
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email
                        }
                    }
                    catch(e){
                        console.error(e)
                    }
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secret',
    callbacks: {
        async session({ token, session}: {token: JWT, session: any}) {
            if(session.user){
                session.user.id = token
            }
            return session
        }
    }
}