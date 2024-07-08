import * as z from "zod";

export const userSchema = z.object({
    phone: z.string(),
    password: z.string(),
    email: z.string()
});