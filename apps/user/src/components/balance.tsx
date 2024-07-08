"use client"
import React from 'react'
import { useBalance } from '@repo/store/useBalance'

const Balance = () => {
    const balance = useBalance()
  return (
    <div>{balance}</div>
  )
}

export default Balance