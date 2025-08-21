import Image from "next/image";
import HeroSection from "@/components/HeroSection/Herosection";
import LayoutWrapper from "@/components/LayoutWrapper";
import Cards from "@/components/homePage/Cards"
import homeTopBg from "@/public/images/home/homeTopBg.svg"
import homeBgBottom from "@/public/images/home/homeBgBottom.svg"
import Link from "next/link";
import H1 from "@/components/Typography/H1";
import P from "@/components/Typography/P";
import IconFeatureBlock from "@/components/homePage/IconFeatureBlock";
import { iconFeatureBlockContent } from "@/utils/home-page"
import IconWithText from "@/components/homePage/IconWithText";
import Quote from "@/components/Quote";
import H3 from "@/components/Typography/H3";
import H4 from "@/components/Typography/H4";
import Button from "@/components/Buttons/Button";
import TwoColumnSection from "@/components/homePage/TwoColumnSection";
import joyceBg from "@/public/images/home/Images/joyceBg.png"
import joyceScale from "@/public/images/home/Images/joyceScale.png"
import quoteDesktop from "@/public/images/home/quoteDesktop.svg"
import quoteGlow from "@/public/images/home/quoteGlow.svg"


export default function Home() {
  return (
    <LayoutWrapper >
      <main className="min-h-screen bg-linen overflow-hidden">
        <HeroSection />
        <div className="">
          <div className="flex flex-col w-full relative pt-14 mb-[132px]">
            <div className="absolute -right-2 -top-2 pointer-events-none hidden lg:block">
              <Image src={homeTopBg} alt="background" className="w-full h-full object-cover z-0 pointer-events-none" />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-3 lg:px-0 z-10">
              <H1 className='text-center text-[60px]'>
                You are not alone
              </H1>
              <Cards />
              <IconWithText />
            </div>
            <div className="z-10 w-full">
              <IconFeatureBlock iconFeatureBlockContent={iconFeatureBlockContent[0]} />
            </div>
          </div>

          {/* women image and glass section  */}
          <div className="max-w-[1096px] mx-auto px-3 relative">
            <div className="customGlow">
            </div>
            <div className="w-full rounded-lg bg-white/60 backdrop-blur-[40px] flex relative my-20 z-10">
              <div className="absolute pointer-events-none">
                <Image src={quoteDesktop} alt="background" className="w-full h-full object-cover z-0 pointer-events-none" />
              </div>
              <div className="w-[380px] h-[311px] z-10 relative">
                <Image src={joyceBg} alt="" className="w-full h-full object-cover -bottom-0.5 absolute left-0.5" />
                <Image src={joyceScale} alt="" className="w-[290px] h-[362px] object-cover absolute bottom-0 right-[10px]" />
              </div>
              <div className="flex flex-1 max-w-[714px] flex-col py-8 px-8 justify-between items-center z-10">
                <H3 className="font-nicholas font-bold text-[34px] leading-[140%] text-center text-rouge w-full">
                  “Because of all the progress that<br /> continues to be made, we have a renewed<br /> hope for our patients. ”
                </H3>
                <P className="text-brown font-mundial font-light text-xl leading-[150%] ">
                  —Dr. Joyce Barlin, an oncologist treating women<br /> with platinum-resistant ovarian cancer
                </P>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full relative my-[132px]">
            <div className="absolute -left-2 -top-[41px] pointer-events-none hidden lg:block">
              <Image src={homeBgBottom} alt="background" className="w-full h-full object-contain pointer-events-none" />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-3 lg:px-0 z-10">
            </div>
            <div className="z-10 w-full">
              <IconFeatureBlock iconFeatureBlockContent={iconFeatureBlockContent[1]} />
            </div>
            <TwoColumnSection />
          </div>
        </div>
      </main>
    </LayoutWrapper>
  );
}