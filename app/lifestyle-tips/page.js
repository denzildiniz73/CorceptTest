"use client";
import React, { useState } from "react";
import {
  lifestyleTips,
  supportAndResources,
  supportResources,
  yourMindset,
} from "@/utils/lifestyle-tips";
import IconTitleWithDescription from "@/components/IconTitleWithDescription";
import HeroSection from "@/components/HeroSection/Herosection";
import PlatinumResistant from "@/components/lifestyleTips/platinumResistant";
import "./lifestyle.css";
import IconWithDescriptionGradientBackground from "@/components/IconWithDescriptionGradientBackground";
import LayoutWrapper from "@/components/LayoutWrapper";
import EasingBurden from "@/components/lifestyleTips/easingBurden";
import Quote from "@/components/Quote";
import Image from "next/image";
import ProgressSliderWithTitleAndDescription from "@/components/Sliders/sliderWithTitleAndDescription";

const specialistData = [
  {
    id: 1,
    title: 'Gynaecological',
    subtitle: 'oncologist',
    // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: '/images/icons/interract.svg'
  },
  {
    id: 2,
    title: 'Oncology',
    subtitle: 'nurse practitioner',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    title: 'Medical',
    subtitle: 'oncologist',
    // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: '/images/icons/progress.svg'
  },
  {
    id: 4,
    title: 'Clinical trials',
    subtitle: 'nurse',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 5,
    title: 'Radiation',
    subtitle: 'oncologist',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 6,
    title: 'Palliative care',
    subtitle: 'specialist',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 7,
    title: 'Social',
    subtitle: 'worker',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 8,
    title: 'Dietitian',
      subtitle: 'nutritionist',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

const LifestyleTips = () => {
  return (
    <LayoutWrapper>
      <main className="bg-linen">
        <HeroSection />
        <div className="">
          <div className="container">
            <IconTitleWithDescription
              className="gap-[132px]"
              data={lifestyleTips}
            />
          </div>
          <div className="lg:my-[132px]"></div>
          <div className="container">
            <PlatinumResistant />
            <EasingBurden />
            <IconTitleWithDescription
              className="gap-[81px]"
              data={yourMindset}
              cta={"Download Care Team Discussion Guide"}
            />
          </div>

          {/* <MedicalRolesSwiper /> */}
          <ProgressSliderWithTitleAndDescription data={specialistData} />

          <div className="flex flex-col gap-2 lg:pb-[132px] lg:pt-[132px] lg:mt-[58px] relative">
            <div className="absolute top-8 lg:w-[783.072px] lg:h-[783.417px] h-full">
              <Image
                className="w-full h-full object-cover"
                src={"/images/pattern/pattern-1-lifestyle.svg"}
                alt="quote"
                width={100}
                height={100}
              />
            </div>
            <div className="container">
              <Quote />
              <div className="mt-[48px]">
                <IconWithDescriptionGradientBackground
                  data={supportResources}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutWrapper>
  );
};

export default LifestyleTips;
