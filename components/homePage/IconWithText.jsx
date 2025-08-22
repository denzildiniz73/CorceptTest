import React from "react";
import Image from "next/image";
import P from "../Typography/P";
import people from "@/public/images/icons/people.svg"

const IconWithText = () => {
  return (
    <div className="mt-8 max-w-[1067px] bg-white/50 backdrop-blur-[4px] border-white border mb-[132px] px-3">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center px-6 md:px-10 py-4">
        <div className="w-[130px] h-[130px]">
          <Image
            src={people}
            alt="People icon"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-1">
          <P className="text-green font-ptSansPro text-[32px] leading-[130%] font-semibold">
            Facing resistance to platinum-based chemotherapy is a challenging
            reality for many women with ovarian cancer
          </P>
        </div>
      </div>
    </div>
  );
};

export default IconWithText;
