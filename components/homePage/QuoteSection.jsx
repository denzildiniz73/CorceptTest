import React from 'react'
import Image from 'next/image'
import H3 from '../Typography/H3'
import P from '../Typography/P'
import joyceBg from "@/public/images/home/Images/joyceBg.png"
import joyceScale from "@/public/images/home/Images/joyceScale.png"
import quoteDesktop from "@/public/images/home/quoteDesktop.svg"
import quoteGlow from "@/public/images/home/quoteGlow.svg"
import { cn } from '@/lib/utils'

const QuoteSection = ({data, mainImageClass}) => {
    return (
        <div className="max-w-[1096px] mx-auto relative">
            <div className="customGlow">
            </div>
            <div className="w-full rounded-lg bg-white/60 backdrop-blur-[40px] flex relative my-20 z-10 flex-col lg:flex-row">
                <div className="absolute pointer-events-none">
                    <Image src={quoteDesktop} alt="background" className="w-full h-full object-cover z-0 pointer-events-none" width={100} height={100} />
                </div>
                <div className="lg:w-[380px] w-full h-[311px] z-10 relative">
                    <Image src={data?.imageDesktopBg} alt="" className="w-full h-full object-cover -bottom-0.5 absolute left-0.5 hidden lg:block" width={100} height={100} />
                    
                    <Image src={data?.imageMobileBg} alt="" className="w-full h-full object-cover -bottom-0.5 absolute left-0.5 block lg:hidden" width={100} height={100} />

                    <Image src={data?.image} alt="" className={cn("w-[290px] h-[362px] object-cover absolute bottom-0 right-[10px] hidden lg:block", mainImageClass)} width={100} height={100} />

                    <Image src={data?.image} alt="" className="w-[290px] h-[362px] object-cover absolute bottom-0 left-[10px] block lg:hidden" width={100} height={100} />
                </div>
                <div className="flex flex-1 max-w-[714px] flex-col py-8 px-8 justify-between items-center z-10">
                    <H3 className="font-nicholas font-bold text-[34px] leading-[140%] text-center text-rouge w-full">
                        {data?.quote}
                    </H3>
                    <P className="text-brown font-mundial font-light text-xl leading-[150%] ">
                        {data?.author}
                    </P>
                </div>
            </div>
        </div>
    )
}

export default QuoteSection
