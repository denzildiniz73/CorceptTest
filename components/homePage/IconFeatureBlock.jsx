import React from 'react'
import Image from 'next/image'

const IconFeatureBlock = ({iconFeatureBlockContent}) => {
    const {
    icon,
    title,
    bodyTitle,
    desc,
} = iconFeatureBlockContent
    return (
        <div className="px-5 ">
            <div className="max-w-[1062px] mx-auto flex flex-col md:flex-row gap-[153px] justify-start items-center">
                <div className="flex gap-6 justify-center items-center">
                    <div className="w-[86px] h-[86px]">
                        <Image src={icon} alt="Reserch Icon" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-green font-black text-6xl font-ptSansPro blur-shadow text-center">
                        {title}
                    </h3>
                </div>
                <div className="flex flex-col justify-start items-center gap-7 max-w-[566px]">
                    <h4 className="text-[35px] font-ptSansPro font-semibold text-green w-full">
                        {bodyTitle}
                    </h4>
                    <p className="font-mundial font-light text-brown text-lg">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default IconFeatureBlock
