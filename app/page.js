import Image from "next/image";
import HeroSection from "@/components/HeroSection/Herosection";
import LayoutWrapper from "@/components/LayoutWrapper";
import Cards from "@/components/homePage/Cards"
import homeTopBg from "@/public/images/home/homeTopBg.svg"
import Link from "next/link";
import H1 from "@/components/Typography/H1";
import P from "@/components/Typography/P";
import IconFeatureBlock from "@/components/homePage/IconFeatureBlock";
import {iconFeatureBlockContent} from "@/utils/home-page"

export default function Home() {
  return (
    <LayoutWrapper >
      <main className="min-h-screen bg-linen overflow-hidden">
        <HeroSection />
        <div className="">
          <div className="flex flex-col w-full relative pt-14">
            <div className="absolute -right-2 -top-2">
              <Image src={homeTopBg} alt="background" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-5 lg:px-0 z-10">
              <H1 className='text-center'>
                You are not alone
              </H1>
              <Cards />
              <div className="mt-8 max-w-[1067px] bg-white/65 backdrop-blur-[22.08px] border-white border mb-[132px] px-5">
                <P className="font-ptSansPro font-semibold text-[22px] leading-6 text-green text-center py-4">
                  Facing resistance to platinum-based chemotherapy is a<br /> challenging reality for many women with ovarian cancer
                </P>
              </div>
            </div>
            <div className="z-10 w-full">
              <IconFeatureBlock iconFeatureBlockContent={iconFeatureBlockContent[0]} />
            </div>
          </div>

          {/* women image and glass section  */}

          <div className="flex flex-col w-full relative pt-14">
            <div className="absolute -right-2 -top-2">
              <Image src={homeTopBg} alt="background" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-5 lg:px-0 z-10">
            </div>
            <div className="z-10 w-full">
              <IconFeatureBlock iconFeatureBlockContent={iconFeatureBlockContent[0]} />
            </div>
          </div>
        </div>
      </main>
    </LayoutWrapper>
  );
}