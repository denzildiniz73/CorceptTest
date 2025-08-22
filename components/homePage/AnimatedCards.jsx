import React from 'react'
import H4 from '../Typography/H4'
import P from '../Typography/P'
import Image from 'next/image'
import vectorWaves from "@/public/images/home/vectorWaves.svg"
import ArrowRight from "@/public/images/icons/ArrowRight.svg"
import Link from 'next/link'


const AnimatedCards = ({
    animatedCardsData
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-14 gap-y-9 gap-x-7">
      {animatedCardsData.map((card) => (
        <div
          key={card.id}
          className="relative min-h-[386px] rounded-sm overflow-hidden border border-white bg-white/50 backdrop-blur-[4px]"
        >
          {/* Background waves */}
          <div className="absolute left-0 w-full pointer-events-none">
            <Image
              src={vectorWaves}
              alt="Card Background"
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>

          {/* Card content */}
          <div className="flex p-8 flex-col justify-between items-center h-full">
            <div className="flex flex-col gap-4 z-10">
              {/* Icon + Title */}
              <div className="flex w-full justify-start items-center gap-6">
                <Image
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  className="w-[86px] h-[86px] object-cover"
                />
                <H4 className="text-green text-[30px] font-ptSansPro font-semibold leading-[140%]">
                  {card.title}
                </H4>
              </div>

              {/* Description */}
              <P className="text-left font-mundial font-light text-xl leading-[150%]">
                {card.desc}
              </P>
            </div>

            {/* CTA */}
            <div className="flex w-full justify-start items-center gap-[14px]">
              <Link
                href={card.ctaLink}
                className="text-rouge text-xl font-ofeliaText font-medium leading-[140%] flex justify-center items-center"
              >
                {card.ctaText}
              </Link>
              <Image src={ArrowRight} alt='Arrow Icon' className='w-[26px] h-[14px] object-cover' />
            </div>
          </div>
        </div>
      ))}
    </div>
    )
}

export default AnimatedCards
