import { cn } from '@/lib/utils'
import React from 'react'

const GlassCard = ({children, className}) => {
  return (
    <div className={cn('rounded-[8.03px] border border-white bg-white/65 backdrop-blur-[22.08px]', className)}>
      {children}
    </div>
  )
}

export default GlassCard
