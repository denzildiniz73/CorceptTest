import Image from 'next/image'
import React from 'react'
import H4 from '@/components/Typography/H4'
import P from '@/components/Typography/P'
import Button from '@/components/Buttons/Button'
import { IoIosArrowRoundForward } from 'react-icons/io'

const IconWithDescriptionGradientBackground = ({data}) => {
  return (
    <div className='flex flex-row justify-center items-start gap-[87px] max-h-[290px] p-[46.5px_67px] flex-shrink-0 rounded-[8.03px] border border-white bg-white/65 backdrop-blur-[22.08px]'>
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
          <Button variant="ghost" className="text-[20px] leading-[28px] text-start font-ofeliaText text-popstar p-0 font-medium" onClick={() => setIsWelcomeModalOpen(true)}>{data.cta} <IoIosArrowRoundForward className="w-7 h-7" /></Button>
        </div>}
      </div>
    </div>
  )
}

export default IconWithDescriptionGradientBackground