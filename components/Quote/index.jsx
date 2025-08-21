import React from 'react'
import "./quote.css"
import Image from 'next/image'
import P from '../Typography/P'
import GlassCard from '../GlassCard'
const Quote = () => {
  return (
    <GlassCard className='quote-container flex flex-col lg:flex-row items-center justify-center'>
      <div className='quote-image-wrapper'>
        <Image src={"/images/quote-person.svg"} alt='quote' width={100} height={100} />
      </div>
      <div className='quote-content-wrapper'>
        <div className='quote-image-wrapper-inner'>
        <Image className='pattern-image' src={"/images/pattern/pattern-2-lifestyle.svg"} alt='quote' width={100} height={100} />
        </div>
        <P className='text-popstar text-center font-nicholas text-[34px] font-bold leading-[47.6px] tracking-[1.02px]'>
          “I try to tell [patients] what they might experience, but then also give them hope that there's support
          there for them. That me and my team, we're there for them. ”

        </P>
        <P className='text-black text-center font-mundial text-[18px] font-light leading-[130%] tracking-[0.54px] lg:max-w-[437.62px] lg:mx-auto mt-4'>—Dr. Dana Chase, an oncologist treating people with platinum-resistant ovarian cancer</P>
      </div>
    </GlassCard>
  )
}

export default Quote
