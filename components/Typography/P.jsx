import React from 'react'
import { cn } from '@/lib/utils'

const  P = ({ children, className }) => {
  return (
    <p className={cn("text-lg font-mundial font-light leading-[150%] tracking-[0.6px] text-brown text-center ", className)}>
      {children}
    </p>
  )
}

export default P