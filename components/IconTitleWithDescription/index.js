import Image from "next/image";
import React from "react";
import H2 from "@/components/Typography/H2";
import H3 from "@/components/Typography/H3";
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "@/components/Buttons/Button";
import { cn } from "@/lib/utils";
import P from "../Typography/P";

const  IconTitleWithDescription = ({ data, cta, className, glow = false }) => {
  return (
    <section className={cn("flex items-start lg:gap-[132px] gap-[48px] mt-[100px] lg:flex-row flex-col relative title-with-description-container", className)}>
      <div className="flex items-center gap-[24px] max-w-[372px] lg:w-full md:w-1/2">
        <div className="max-w-[104px] max-h-[104px] w-full h-full">
        <Image
          className="max-w-[104px] max-h-[104px] object-contain"
          src={data.icon}
          alt={data.title}
          width={100} 
          height={100}
        />
        </div>
        {glow && <div className="absolute md:left-1/2 md:translate-x-[-50%] -top-6 lg:left-[80px] lg:-translate-x-0 -z-[0]">
          <Image className="w-[431px] h-[402px]" src={"/images/glow/glow.svg"} alt="glow" width={100} height={100} />
        </div>}
       {data.title && <H2 className={"z-[1]"}>{data.title}</H2>}
      </div>
      <div className="z-10 lg:min-w-[539px]">
        {data.subtitle && <H3 className="mb-[23px] md:max-w-[498px] ">{data.subtitle}</H3>}
        {data.description && <P className="text-[#231D06] font-mundial font-light tracking-[0.6 px] text-start text-xl tracking-[0.6px]">{data.description}</P>}
      {cta && <Button variant="ghost" className="text-popstar font-ofelia font-medium leading-[140%] p-0">
        {cta} <IoIosArrowRoundForward className="w-7 h-7" />
      </Button>}
      </div>
    </section>
  );
};

export default IconTitleWithDescription;