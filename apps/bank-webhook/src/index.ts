import express from "express"
import paymentSchema from "./zod/payment"
import client from "@repo/db/client"
import Payment from "./interfaces/payment"
const app = express()

app.post('/bankWebhook', async (req,res) => {
    const {success} = paymentSchema.safeParse(req.body)
    if(!success){
        return res.json({
            "msg": "Invalid Payment Structure/Information"
        })
    }
    const payment: Payment  = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    }
    try {
        await client.$transaction([
            client.balance.updateMany({
                where: {
                    userId: Number(payment.userId)
                },
                data: {
                    amount: {
                        increment: Number(payment.amount)
                    }
                }
            }),
            client.onRampTransactions.updateMany({
                where: {
                    token: payment.token
                },
                data: {
                    status: "Success"
                }
            })
        ])

        return res.status(200).json({
            "msg": "Payment Successful"
        })
    } catch (error) {
        return res.status(411).json({
            "msg": "Payment Failed"
        })
    }
})

app.listen(3002, () => console.log('Listening on port 3002'))