import Image from "next/image";
import React from "react";
import H1 from "../Typography/H1";
import H3 from "../Typography/H3";
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "../Buttons/Button";
import { cn } from "../../lib/utils";

const IconTitleWithDescription = ({ data, cta, className }) => {
  return (
    <section className={cn("flex items-start gap-[132px] !mt-[100px]", className)}>
      <div className="flex items-center gap-[20px]">
        <div className="w-full h-full">
        <Image
          className="max-w-[104px] max-h-[104px] object-contain"
          src={data.icon}
          alt={data.title}
          width={100}
          height={100}
        />
        </div>
       {data.title && <H1>{data.title}</H1>}
      </div>
      <div>
        {data.subtitle && <H3 className="mb-[23px]">{data.subtitle}</H3>}
        {data.description && <p className="text-[#231D06] text-xl font-mundial font-light leading-[27px] tracking-[0.54px]">{data.description}</p>}
      {cta && <Button variant="ghost" className="text-popstar font-ofelia text-xl font-medium leading-[140%] p-0">
        {cta} <IoIosArrowRoundForward className="w-7 h-7" />
      </Button>}
      </div>
    </section>
  );
};

export default IconTitleWithDescription;
