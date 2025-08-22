import Image from "next/image";
import HeroSection from "@/components/HeroSection/Herosection";
import LayoutWrapper from "@/components/LayoutWrapper";
import Cards from "@/components/homePage/Cards";
import homeTopBg from "@/public/images/home/homeTopBg.svg";
import homeBgBottom from "@/public/images/home/homeBgBottom.svg";
import Link from "next/link";
import H2 from "@/components/Typography/H2";
import P from "@/components/Typography/P";
import IconFeatureBlock from "@/components/homePage/IconFeatureBlock";
import { iconFeatureBlockContent } from "@/utils/home-page";
import IconWithText from "@/components/homePage/IconWithText";
import Quote from "@/components/Quote";
import H3 from "@/components/Typography/H3";
import H4 from "@/components/Typography/H4";
import Button from "@/components/Buttons/Button";
import TwoColumnSection from "@/components/homePage/TwoColumnSection";
import QuoteSection from "@/components/homePage/QuoteSection";

export default function Home() {
  const quoteData = {
    title: "You are not alone",
    quote: (
      <>
        “Because of all the progress that
        <br /> continues to be made, we have a renewed
        <br /> hope for our patients. ”
      </>
    ),
    author: (
      <>
        —Dr. Joyce Barlin, an oncologist treating women
        <br /> with platinum-resistant ovarian cancer
      </>
    ),
    imageDesktopBg: "/images/home/Images/joyceBg.png",
    imageMobileBg: "/images/quote-mobile.svg",
    image: "/images/home/Images/joyceScale.png",
  };
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-linen overflow-hidden">
        <HeroSection />
        <div className="">
          <div className="flex flex-col w-full relative pt-14 mb-[132px]">
            <div className="absolute -right-2 -top-2 pointer-events-none hidden lg:block">
              <Image
                src={homeTopBg}
                alt="background"
                className="w-full h-full object-cover z-0 pointer-events-none"
              />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-3 lg:px-0 z-10">
              <H2 className="text-center text-[60px]">You are not alone</H2>
              <Cards />
              <IconWithText />
            </div>
            <div className="z-10 w-full">
              <IconFeatureBlock
                iconFeatureBlockContent={iconFeatureBlockContent[0]}
              />
            </div>
          </div>

          <QuoteSection data={quoteData} />

          <div className="flex flex-col w-full relative my-[120px]">
            <div className="absolute -left-2 -top-[41px] pointer-events-none hidden lg:block">
              <Image
                src={homeBgBottom}
                alt="background"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-3 lg:px-0 z-10"></div>
            <div className="z-10 w-full">
              <IconFeatureBlock
                iconFeatureBlockContent={iconFeatureBlockContent[1]}
              />
            </div>
            <TwoColumnSection />
          </div>

          <div className="flex flex-col w-full relative pt-14 mb-[132px]">
            <div className="absolute -right-2 -top-2 pointer-events-none hidden lg:block">
              <Image src={homeTopBg} alt="background" className="w-full h-full object-cover z-0 pointer-events-none" />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-3 lg:px-0 z-10">
              <H1 className='text-center text-[60px]'>
                You are not alone
              </H1>
             
            </div>
          </div>




        </div>
      </main>
    </LayoutWrapper>
  );
}
