import Image from "next/image";
import HeroSection from "@/components/HeroSection/Herosection";
import LayoutWrapper from "@/components/LayoutWrapper";
import Cards from "@/components/homePage/Cards"
import homeTopBg from "@/public/images/home/homeTopBg.svg"
import reserchIcon from "@/public/images/home/reserchIcon.svg"

export default function Home() {
  return (
    <LayoutWrapper >
      <main className="min-h-screen bg-linen overflow-hidden">
        <HeroSection />
        <div className="">
          <div className="flex flex-col w-full relative pt-4 customTopBg">
            <div className="absolute -right-2">
              <Image src={homeTopBg} alt="background" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col max-w-[1095px] mx-auto px-5 lg:px-0 z-10">
              <h1 className="text-green font-black text-6xl font-ptSansPro blur-shadow text-center">
                You are not alone
              </h1>
              <Cards />

              <div className="mt-8 max-w-[1067px] bg-white border-white border mb-[132px] px-5">
                <p className="font-ptSansPro font-semibold text-[22px] leading-6 text-green text-center py-4">
                  Facing resistance to platinum-based chemotherapy is a<br /> challenging reality for many women with ovarian cancer
                </p>
              </div>

            </div>

            {/* 2nd div  */}
            <div className="z-10 w-full">
              <div className="px-5 ">
                <div className="max-w-[1062px] mx-auto flex gap-[116px] justify-start items-center border border-amber-600">
                  <div className="flex gap-6 justify-center items-center">
                    <div className="w-[86px] h-[86px]">
                      <Image src={reserchIcon} alt="Reserch Icon" className="w-full h-full object-cover" />
                    </div>
                   <h1 className="text-green font-black text-6xl font-ptSansPro blur-shadow text-center">
                Evolving<br /> research
              </h1>
                  </div>
                  <div>ahsfbHBK</div>
                </div>
              </div>
            </div>
          </div>





        </div>
      </main>
    </LayoutWrapper>
  );
}