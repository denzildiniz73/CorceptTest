import Image from 'next/image'
import React from 'react'
import H4 from '@/components/Typography/H4'
import P from '@/components/Typography/P'
import Button from '@/components/Buttons/Button'
import { IoIosArrowRoundForward } from 'react-icons/io'
import GlassCard from '../GlassCard'
import { cn } from '@/lib/utils'

const  IconWithDescriptionGradientBackground = ({data, className}) => {
  return (
    <GlassCard className={cn('flex lg:flex-row flex-col justify-center lg:items-center items-start lg:gap-[87px] gap-[63px] lg:max-h-[290px] lg:p-[24px_67px] md:p-[42px_50px] p-[42px_24px] flex-shrink-0', className)}>
      <div className='max-w-[130px] h-full flex items-center lg:justify-center justify-start'>
        <Image src={data.icon} alt={data.title} width={100} height={100} />
      </div> 
      <div className='flex-1'>
        <H4 className='text-green'>{data.title}</H4>
        <div className='mt-[22px]'>
          <P className='text-start text-xl leading-[30px] text-[#1f1f1f]'>
          {data.description}
          </P>
        </div>
        {data.cta &&  <div className='mt-[30px] text-start'>
          <Button variant="ghost" className="text-[20px] leading-[28px] text-start font-ofeliaText text-popstar p-0 font-medium">{data.cta} <IoIosArrowRoundForward className="w-7 h-7" /></Button>
        </div>}
      </div>
    </GlassCard>
  )
}

export default IconWithDescriptionGradientBackground