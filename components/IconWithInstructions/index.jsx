import Image from 'next/image'
import React from 'react'
import H6 from '../Typography/H6'
import P from '../Typography/P'

const IconWithInstructions = ({ data, direction = 'right' }) => {
  return (
    direction === 'left' ? (
      <article className='flex flex-row gap-[46px] items-center'>
        <div className='max-w-[130px] max-h-[130px] w-full h-full'>
          <Image className='w-full h-full' src={data?.icon} alt="Easing the burden" width={100} height={100} />
        </div>
        <div className='pl-[37px] relative w-full'>
          <div className='pt-[31px] pl-[35px] pr-[97px] pb-[46px] border-[1.5px] border-green'>
            <H6>{data?.title}</H6>
            <P className='mt-[14px] text-base font-mundial leading-[22.4px] tracking-[0.48px] text-start'>{data?.description}</P>
          </div>
          <Image className='absolute top-1/2 -translate-y-1/2 left-0.5 max-w-[37px]' src="/images/icons/instruction-line-left.svg" alt="Easing the burden" width={100} height={100} />
        </div>
      </article>
    ) : (
      <article className='flex flex-row gap-[40px] items-center'>
        <div className='pr-[27px] relative w-full'>
          <div className='pt-[31px] pl-[35px] pr-[97px] pb-[46px] border-[1.5px] border-green'>
            <H6>{data?.title}</H6>
            <P className='mt-[14px] text-base font-mundial leading-[22.4px] tracking-[0.48px] text-start'>{data?.description}</P>
          </div>
          <Image className='absolute top-1/2 -translate-y-1/2 -right-2 max-w-[37px]' src="/images/icons/instruction-line-right.svg" alt="Easing the burden" width={100} height={100} />
        </div>
        <div className='max-w-[130px] max-h-[130px] w-full h-full'>
          <Image className='w-full h-full' src={data?.icon} alt="Easing the burden" width={100} height={100} />
        </div>
      </article>
    )
  )
}

export default IconWithInstructions
