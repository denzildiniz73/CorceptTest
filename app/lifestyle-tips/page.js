"use client"
import React, { useState } from 'react'
import H1 from '@/components/Typography/H1'
import H3 from '@/components/Typography/H3'
import Image from 'next/image'
import { lifestyleTips, supportAndResources, supportResources, yourMindset } from '@/utils/lifestyle-tips'
import IconTitleWithDescription from '@/components/IconTitleWithDescription'
import HeroSection from '@/components/HeroSection/Herosection'
import PlatinumResistant from '@/components/lifestyleTips/platinumResistant'
import './lifestyle.css'
import WelcomeModal from '@/components/modals/WelcomeModal'
import Button from '@/components/Buttons/Button'
import IconWithDescriptionGradientBackground from '@/components/IconWithDescriptionGradientBackground'
import LayoutWrapper from '@/components/LayoutWrapper'

const LifestyleTips = () => {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)
  return (
   <LayoutWrapper>
     <main className='bg-linen'>
      <HeroSection />
      <div className="container">
        <IconTitleWithDescription className="gap-[132px]" data={lifestyleTips} />
        <div className="lg:my-[132px]">
        </div>
        <div className=''>
          <PlatinumResistant />
        </div>
        <IconTitleWithDescription className="gap-[81px]" data={yourMindset} cta={"Download Care Team Discussion Guide"} />

        <div className='flex flex-col gap-2 mt-[132px]'>
          <IconWithDescriptionGradientBackground data={supportResources} />
        </div>
      </div>
    </main>
   </LayoutWrapper>
  )

}

export default LifestyleTips