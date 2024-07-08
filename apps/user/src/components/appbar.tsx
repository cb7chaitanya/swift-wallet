"use client"
import Link from "next/link"
import Button from "./button"

const AppBar = () => {
    return (
        <div className="flex w-full justify-between p-8">
            <h1 className="text-3xl font-bold">Swift Wallet</h1>
            <Link href={'/api/auth/signin'}><Button label="Login"/></Link>
        </div>
    )
}

export default AppBar