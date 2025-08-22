import React from 'react'
import P from '../Typography/P'
import IconWithInstructions from '../IconWithInstructions'
import H3 from '../Typography/H3'
import Image from 'next/image'

const EasingBurden = () => {
  const data = [
    {
      title: 'Stay connected',
      description: 'The people, experiences, and activities that make you feel good can have a positive impact. Digital apps and calendars can help keep track of appointments, medications, or other important moments and dates.',
      icon: '/images/icons/connected.svg',
      direction: 'left'
    },
    {
      title: 'Give space for your emotions',
      description: 'It’s common to focus on how your body feels, but you’re facing something that can strain your emotional and mental health, too. Meditation and counseling are great ways that you can show up for yourself.',
      icon: '/images/icons/emotions.svg',
      direction: 'right'
    },
    {
      title: 'Rest and recharge',
      description: 'Chemotherapy can be hard on the body; knowing when to take a break is important.', 
      icon: '/images/icons/calendar.svg',
      direction: 'left'
    }
  ]
  return (
    <section className=' mt-[66px] section-padding relative'>
      <div className='z-10'>
        <H3 className="text-center">Easing the burden</H3>
        <P className="mt-5 text-[#1F1F1F] text-xl leading-[30px]">Lifestyle changes may make your journey with platinum-resistant ovarian cancer more manageable.</P>
      </div>
      <div className='mt-[76px] flex flex-col gap-[76px] !z-[1] relative'>
        {data.map((item, index) => (
          <IconWithInstructions key={index} data={item} direction={item?.direction} />
        ))}
      </div>
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[0] md:w-[555px] md :h-[549px] w-[308px] h-[306px]'>
        <Image className='w-[100%] h-[100%]' src={"/images/glow/glow.svg"} alt="Easing the burden" width={100} height={100} />
        </div>
    </section>
  )
}

export default EasingBurden
