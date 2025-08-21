import Image from 'next/image'
import React from 'react'
import H4 from '@/components/Typography/H4'
import P from '@/components/Typography/P'
import Button from '@/components/Buttons/Button'
import { IoIosArrowRoundForward } from 'react-icons/io'
import GlassCard from '../GlassCard'

const IconWithDescriptionGradientBackground = ({data}) => {
  return (
    <GlassCard className='flex lg:flex-row flex-col justify-center items-center gap-[87px] lg:max-h-[290px] p-[46.5px_67px] flex-shrink-0'>
      <div className='max-w-[130px] h-full flex items-center justify-center'>
        <Image src={data.icon} alt={data.title} width={100} height={100} />
      </div>
      <div className='flex-1'>
        <H4>{data.title}</H4>
        <div className='mt-[22px]'>
          <P className='text-start'>
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