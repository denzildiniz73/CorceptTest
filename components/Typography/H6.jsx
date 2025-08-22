import { cn } from '@/lib/utils'
import React from 'react'

const H6 = ({ children, className }) => {
  return (
    <h6 className={cn("text-green font-ofeliaText text-[24px] font-medium leading-[34px] tracking-[0.72px]", className)}>{children}</h6>
  )
}

export default H6