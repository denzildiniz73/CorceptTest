import React from 'react'
import H3 from '@/components/Typography/H3'
import P from '@/components/Typography/P'
const PlatinumResistant = () => {
  const data = [
    {
      id: 1,
      title: "Physical",
      description: "Side effects and symptoms from your treatment or the cancer"
    },
    {
      id: 2,
      title: "Social",
      description: "Feelings of isolation, challenges with intimacy, mental fatigue"
    },
    {
      id: 3,
      title: <><span>Professional/</span> financial weight</>,
      description: "Difficulties continuing work and worry about finances"
    },
    {
      id: 4,
      title: "Emotional",
      description: "Fear, anxiety, or depression"
    },
    
  ]
  return (
    <section>
      <H3 className="text-center">Facing the burdens of platinum-resistant ovarian cancer</H3>
      <div className="flex flex-col gap-[18px] mt-[18px] px-[0px] lg:max-w-[943px] mx-auto">
        <P>It is important to be realistic about the many personal and practical challenges that come with platinum-resistant ovarian cancer. Be sure to talk openly with your care team about how you are feeling and if you need help coping with challenges, such as:</P>
      </div>

      <div className="flex flex-col gap-[18px] mt-[54px] px-[0px] lg:max-w-[943px] mx-auto">
        <ul className="platinum-resistant-card-list">
          {data.map((item) => (
            <li key={item.id} className="platinum-resistant-card-list-item">
              <p className="title">{item.title}</p>
              <p className="description">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PlatinumResistant