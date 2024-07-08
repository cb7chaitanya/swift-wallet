import * as z from 'zod'

const paymentSchema = z.object({
    amount: z.number(),
    token: z.string(),
    userId: z.string()
})

export default paymentSchema