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
      width: "120px"
    },
  ]
  return (
    <section className='section-padding'>
      <H3 className="text-center">Facing the burdens of platinum-resistant ovarian cancer</H3>
      <div className="flex flex-col gap-[18px] mt-[18px] px-[0px] lg:max-w-[943px] mx-auto">
        <P className='text-xl leading-[30px] tracking-[0.6px] wrap-break-word'>It is important to be realistic about the many personal and practical challenges that come with platinum-resistant ovarian cancer. Be sure to talk openly with your care team about how you are feeling and if you need help coping with challenges, such as:</P>
      </div>

      <GlassCard
        className="px-[50px] py-[35px] mt-[54px]"
        style={{ minHeight: '199px' }}
      >
        {/* Mobile layout - stacked vertically */}
       {/* Mobile layout - 1 column with separators */}
       <div className="flex flex-col md:hidden">
              {data?.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="flex flex-col items-center text-center py-6">
                    <h3 className="text-[#075454] text-center font-ofelia text-lg font-semibold leading-normal tracking-[0.54px]">
                      {item.title}
                    </h3>
                    <p className="font-mundial text-base font-light text-[#231D06] leading-[140%] tracking-[0.48px]">
                      {item.description}
                    </p>
                  </div>
                  {/* Separator line - only show for first 3 items */}
                  {index < 3 && (
                    <div className="w-[237px] h-[2px] bg-white mx-auto"></div>
                  )}
                </React.Fragment>
              ))}
            </div>


        <div className="hidden lg:grid grid-cols-[170px_auto_185px_auto_171px_auto_120px] gap-x-[95px_1px_95px_1px_141px] items-start">
          {data?.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-ofelia text-lg font-semibold text-[#231D06] mb-4 tracking-[0.54px] leading-normal">
                  {item.title}
                </h3>
                <p
                  className="font-mundial text-base font-light text-[#231D06] leading-[140%] tracking-[0.48px]"
                  style={{ width: item.width }}
                >
                  {item.description}
                </p>
              </div>
              {/* Separator line - only show for first 3 items */}
              {index < 3 && (
                <div className="w-[2px] bg-white h-[103px] justify-self-center"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </GlassCard>
    </section>
  )
}

export default PlatinumResistant
