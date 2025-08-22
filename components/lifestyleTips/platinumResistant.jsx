import React from 'react'
import H3 from '../Typography/H3'
import P from '../Typography/P'
import GlassCard from '../GlassCard'
const PlatinumResistant = () => {
  const data = [
    {
      id: 1,
      title: "Physical",
      description: "Side effects and symptoms from your treatment or the cancer",
      width: "170px"
    },
    {
      id: 2,
      title: "Social",
      description: "Feelings of isolation, challenges with intimacy, mental fatigue",
      width: "185px"
    },
    {
      id: 3,
      title: <>Professional/<br />financial weight</>,
      description: "Difficulties continuing work and worry about finances",
      width: "171px"
    },
    {
      id: 4,
      title: "Emotional",
      description: "Fear, anxiety, or depression",
      width: "150px"
    },
  ]
  return (
    <section className='section-padding platinum-resistant'>
      <H3 className="text-center text-green">Facing the burdens of platinum-resistant ovarian cancer</H3>
      <div className="flex flex-col gap-[18px] mt-[18px] px-[0px] lg:max-w-[943px] mx-auto">
        <P className='text-xl leading-[30px] tracking-[0.6px] wrap-break-word'>It is important to be realistic about the many personal and practical challenges that come with platinum-resistant ovarian cancer. Be sure to talk openly with your care team about how you are feeling and if you need help coping with challenges, such as:</P>
      </div>

      <GlassCard
        className="md:px-[50px] md:py-[35px] mt-[54px] px-[12px] py-[28px] !bg-[rgba(242, 242, 242, 0.65)]"
        style={{ minHeight: '199px' }}
      >

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-y-[46px] lg:gap-y-0">
          {data?.map((item, index) => (
            <React.Fragment key={item.id} className="flex md:block flex-col">
              <div className={`flex flex-col items-center text-center relative w-[${item.width}]`}>
                <h3 className="font-ofelia text-lg font-semibold text-MidnightGreen mb-4 tracking-[0.54px] leading-normal w-[100%]">
                  {item.title}
                </h3>
                <p
                  className={`font-mundial text-lg font-light text-[#1F1F1F] leading-[140%] tracking-[0.48px] !w-[${item.width}] platinum-resistant-description`}
                  style={{ width: item.width }}
                >
                  {item.description}
                </p>
             {index < 3 && <div className="w-[2px] bg-white h-[103px] justify-self-center absolute right-0 hidden lg:block"></div>}
              {index % 2 === 0 && <div className="w-[2px] bg-white h-[103px] justify-self-center absolute right-0 hidden md:block lg:hidden top-5"></div>}
              </div>
            {index < 3 && <div className="w-[237px] bg-white h-[2px] block md:hidden my-[34px] mx-auto"></div>}
              {/* Separator line - only show for first 3 items */}
            </React.Fragment>
          ))}
        </div>
      </GlassCard>
    </section>
  )
}

export default PlatinumResistant
