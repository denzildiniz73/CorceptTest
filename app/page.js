import Image from "next/image";
import Header from "@/components/Header/header";
import HeroSection from "@/components/HeroSection/Herosection";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function Home() {
  return (
    <LayoutWrapper >
      <main className="min-h-screen">
        <div className="bg-green h-screen ">
          <HeroSection />


          {/*
     <div className="pt-[120px]">
     <h1 className="text-MidnightGreen font-mundial text-4xl">
     Hello world
     </h1>
     <h5 className="text-Buff font-ofeliaText text-4xl">
     Hello world
     </h5>
     <p className="text-grey font-nicholas text-4xl">
     Hello world
     </p>
     
     <h3 className="text-green font-black text-[64px] blur-shadow">
     Illuminations from women like you
     </h3>
     </div> */}



        </div>
      </main>
    </LayoutWrapper>
  );
}