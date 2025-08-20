import { cn } from '@/lib/utils'
import React from 'react'

const H4 = ({ children, className }) => {
  return (
    <h4 className={cn("text-[#017473] font-ptSansPro font-bold text-[34px] leading-[46.58px] tracking-[1.02px]", className)}>{children}</h4>
  )
}

export default H4