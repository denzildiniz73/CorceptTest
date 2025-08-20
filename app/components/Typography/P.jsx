import React from 'react'
import { cn } from '../../lib/utils'

const P = ({ children, className }) => {
  return (
    <p className={cn("text-xl font-mundial font-light leading-[150%] tracking-[0.54px] text-corceptBlack text-center ", className)}>
      {children}
    </p>
  )
}

export default P
