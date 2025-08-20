import { cn } from '@/lib/utils'
import React from 'react'

const H1 = ({ children, className }) => {
  return (
    <h1 className={cn("text-[#027373] text-shadow-[0_0_7.304px_#76E4BC] font-ptSansPro !font-black text-[60px] leading-[120%] tracking-[1.8px]", className)}>{children}</h1>
  )
}

export default H1