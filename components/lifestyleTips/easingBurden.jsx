import React from 'react'
import P from '../Typography/P'
import IconWithInstructions from '../IconWithInstructions'
import H3 from '../Typography/H3'

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
      icon: '/images/icons/connected.svg',
      direction: 'right'
    },
    {
      title: 'Rest and recharge',
      description: 'Chemotherapy can be hard on the body; knowing when to take a break is important.',
      icon: '/images/icons/connected.svg',
      direction: 'left'
    }
  ]
  return (
    <section className=' mt-[66px]'>
      <div>
        <H3 className="text-center">Easing the burden</H3>
        <P className="mt-5 text-lg">Lifestyle changes may make your journey with platinum-resistant ovarian cancer more manageable.</P>
      </div>
      <div className='mt-[76px] flex flex-col gap-[76px]'>
        {data.map((item, index) => (
          <IconWithInstructions key={index} data={item} direction={item?.direction} />
        ))}
      </div>

    </section>
  )
}

export default EasingBurden
