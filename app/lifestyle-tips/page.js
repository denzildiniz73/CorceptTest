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
import QuoteSection from "@/components/homePage/QuoteSection";

const specialistData = [
  {
    id: 1,
    title: "Gynaecological",
    subtitle: "oncologist",
    // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: "/images/icons/interract.svg",
  },
  {
    id: 2,
    title: "Oncology",
    subtitle: "nurse practitioner",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    title: "Medical",
    subtitle: "oncologist",
    // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: "/images/icons/progress.svg",
  },
  {
    id: 4,
    title: "Clinical trials",
    subtitle: "nurse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    title: "Radiation",
    subtitle: "oncologist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    title: "Palliative care",
    subtitle: "specialist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 7,
    title: "Social",
    subtitle: "worker",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 8,
    title: "Dietitian",
    subtitle: "nutritionist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const quoteData = {
  title: "You are not alone",
  quote:
    "Because of all the progress that continues to be made, we have a renewed hope for our patients. ",
  author:
    "—Dr. Joyce Barlin, an oncologist treating women with platinum-resistant ovarian cancer",
  imageDesktopBg: "/images/lifestyle/quote-bg.png",
  imageMobileBg: "/images/quote-mobile.svg",
  image: "/images/lifestyle/quote-person.svg",
};
const LifestyleTips = () => {
  return (
    <LayoutWrapper>
      <main className="bg-linen">
        <HeroSection />
        <div className="relative">
          <div className="absolute left-0 top-0 max-w-[573px] max-h-[1114px] h-full hidden md:block">
            <Image
              className="w-full h-full "
              src={"/images/pattern/pattern-5-lifestyle.svg"}
              alt="quote"
              width={100}
              height={100}
            />
          </div>
          <div className="container section-padding z-10">
            <IconTitleWithDescription data={lifestyleTips} glow={true} />
            <div className="my-[132px] min-h-[444px] bg-MidnightGreen flex items-center justify-center text-white">This section will be added later</div>
          </div>
          <div className="container">
            <PlatinumResistant />
          </div>

          <div className="relative">
            <div className="absolute -top-[120px] max-w-[783.072px] max-h-[1245px] hidden md:block">
              <Image
                className="w-full h-full "
                src={"/images/pattern/pattern-3-lifestyle.svg"}
                alt="quote"
                width={100}
                height={100}
              />
            </div>
            <div className="container">
              <EasingBurden />
            </div>
          </div>
          <div className="container section-padding">
          <IconTitleWithDescription
                className="my-[132px] lg:gap-[81px]"
                glow={true}
                data={yourMindset}
                cta={"Download Care Team Discussion Guide"}
              />
          </div>
          <div className="flex flex-col gap-2 relative w-full">
            <div className="absolute lg:max-h-[1179px] max-w-[623px] right-0 pointer-events-none hidden md:block -top-[200px] lg:-top-[370px]">
              <Image
                src={"/images/pattern/pattern-4-lifestyle.svg"}
                alt="background"
                className="w-full h-full object-cover z-0 pointer-events-none"
                width={100}
                height={100}
              />
            </div>
            <div className="container section-padding">
             
              <QuoteSection data={quoteData} mainImageClass="right-[55px]" />
              <IconWithDescriptionGradientBackground
                className="mt-[48px]"
                data={supportResources}
              />
            </div>
          </div>
        </div>
      </main>
    </LayoutWrapper>
  );
};

export default LifestyleTips;
