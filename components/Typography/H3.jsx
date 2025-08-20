import { cn } from '@/lib/utils'
import React from 'react'

const H3 = ({ children, className }) => {
  return (
    <h3 className={cn("text-[#017473] font-ptSansPro !font-semibold !text-[35px] leading-[45.5px] tracking-[1.05px]", className)}>{children}</h3>
  )
}

export default H3