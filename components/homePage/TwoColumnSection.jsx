import React from 'react'
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";
import P from '../Typography/P';
import Link from 'next/link';

const TwoColumnSection = () => {
    return (
        <div className="flex flex-col gap-14 max-w-[1095px] mx-auto px-3 lg:px-0 z-10 mt-[132px] ">
            <H2 className='text-center text-[60px]'>
                Illuminations from women like you
            </H2>
            <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-[65px]">
                <div className="w-[528px] h-[444px] bg-green order-1 lg:order-2 hidden lg:block">
                </div>
                <div className="flex flex-col justify-start items-center max-w-[498px] order-2 lg:order-1">
                    <H4 className="w-full text-left">
                        Your voice has value
                    </H4>
                    <P className="mt-[34px] mb-14 w-full text-left">
                        From personal challenges to moments of hope, you may find it helpful to hear the shared experiences of other women with platinum-resistant ovarian cancer. These stories, or "Illuminations," can go a long way in encouraging you on your own journey.
                    </P>
                    <div className="w-full flex justify-start">
                        <Link href='#' className="bg-rouge px-6 py-3 font-mundial font-normal text-xl leading-[100%] text-white rounded-3xl">
                            Share your Illumination
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TwoColumnSection
