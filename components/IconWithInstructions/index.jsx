import Image from 'next/image'
import React from 'react'
import H6 from '../Typography/H6'
import P from '../Typography/P'

const IconWithInstructions = ({ data, direction = 'right' }) => {
  return (
    direction === 'left' ? (
      <article className='flex md:flex-row flex-col lg:gap-[48px] gap-[10px] md:gap-[54px] items-center'>
        <div className='max-w-[130px] max-h-[130px] w-full h-full'>
          <Image className='w-full h-full' src={data?.icon} alt="Easing the burden" width={100} height={100} />
        </div>
        <div className='md:pl-[37px] pl-0 pt-[37px] md:pt-0 relative w-full'>
          <div className='lg:pt-[31px] lg:pl-[35px] lg:pr-[97px] lg:pb-[46px] border-[1.5px] p-6 border-[#017473] bg-linen'>
            <H6>{data?.title}</H6>
            <P className='lg:mt-[14px] mt-2 text-lg font-mundial leading-[22.4px] tracking-[0.54px] text-start' >{data?.description}</P>
          </div>
          <Image className='absolute top-1/2 -translate-y-1/2 left-0.5 max-w-[37px] hidden md:block' src="/images/icons/instruction-line-left.svg" alt="Easing the burden" width={100} height={100} />
          <Image className='absolute top-0 left-1/2 -translate-x-1/2 max-w-[37px] w-[100%] block md:hidden h-[37px]' src="/images/icons/instruction-line-top.svg" alt="Easing the burden" width={100} height={100} />
        </div>
      </article>
    ) : (
      <article className='flex md:flex-row flex-col-reverse lg:gap-[48px] gap-[10px] md:gap-[54px] items-center'>
        <div className='md:pr-[27px] pr-0 pt-[27px] md:pt-0 relative w-full'>
          <div className='lg:pt-[31px] lg:pl-[35px] lg:pr-[97px] lg:pb-[46px] p-6 border-[1.5px] border-[#017473] bg-linen'>
            <H6>{data?.title}</H6>
            <P className='lg:mt-[14px] mt-2 text-lg font-mundial leading-[22.4px] tracking-[0.54px] text-start'>{data?.description}</P>
          </div>
          <Image className='absolute top-1/2 -translate-y-1/2 -right-2 max-w-[37px] hidden md:block' src="/images/icons/instruction-line-right.svg" alt="Easing the burden" width={100} height={100} />
          <Image className='absolute -top-2 left-1/2 -translate-x-1/2 max-w-[37px] w-[100%] block md:hidden h-[37px]' src="/images/icons/instruction-line-top.svg" alt="Easing the burden" width={100} height={100} />
        </div>
        <div className='max-w-[130px] max-h-[130px] w-full h-full'>
          <Image className='w-full h-full' src={data?.icon} alt="Easing the burden" width={100} height={100} />
        </div>
      </article>
    )
  )
}

export default IconWithInstructions
