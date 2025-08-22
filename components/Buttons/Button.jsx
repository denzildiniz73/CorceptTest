'use client'
import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base classes
  'inline-flex min-h-[44px] min-w-[140px] px-6 justify-center items-center gap-2 rounded-[24px] border border-white/75 bg-MidnightGreen text-white text-center text-xl font-normal leading-normal transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex-shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-MidnightGreen text-corcept-white border-white/75',
        secondary: 'bg-popstar text-white border-white/75',
        secondaryDark: 'bg-popstar text-white border-white/75',
        tertiary: 'bg-grey text-white border-white/75',
        outline: 'border-2 border-green text-green bg-transparent',
        ghost: 'text-green bg-transparent border-transparent',
        'light-green-gradient': 'bg-gradient-to-br from-buff from-[-83%] to-magicMint to-[89%] text-green border-white/75',
        danger: 'bg-popstar text-white border-white/75',
        success: 'bg-green-600 text-white border-white/75',
        warning: 'bg-buff text-black border-white/75',
        info: 'bg-magicMint text-black border-white/75',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      loading: {
        true: 'cursor-wait',
        false: 'cursor-pointer',
      },
      shadow: {
        true: 'shadow-[0_4px_36px_0_rgba(1,116,115,0.39)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      fullWidth: false,
      loading: false,
      shadow: false,
    },
  }
)

const Button = React.forwardRef(({ 
  className, 
  variant, 
  fullWidth, 
  children, 
  shadow,
  loading, 
  ...props 
}, ref) => {
  const content = (
    <>
      {children}
    </>
  )

  return (
    <button
      className={cn(buttonVariants({ variant, fullWidth, shadow, loading, className }))}
      ref={ref}
      disabled={props.disabled}
      {...props}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'

export default Button