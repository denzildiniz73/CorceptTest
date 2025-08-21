import React from 'react'
import Image from 'next/image'
import H1 from '../Typography/H1'
import H4 from '../Typography/H4'
import P from '../Typography/P'

const IconFeatureBlock = ({iconFeatureBlockContent}) => {
    const {
    icon,
    title,
    bodyTitle,
    desc,
    desc2='',
    titleSectionClasses='',
} = iconFeatureBlockContent
    return (
        <div className="px-5 ">
            <div className="max-w-[720px] lg:max-w-[1095px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-[153px] justify-start items-center">
                <div className={`flex gap-6 w-full justify-start lg:justify-center items-center ${titleSectionClasses || ''}`}>
                    <div className="w-[86px] h-[86px]">
                        <Image src={icon} alt="Reserch Icon" className="w-full h-full object-cover" />
                    </div>
                    <H1>
                        {title}
                    </H1>
                </div>
                <div className="flex flex-col justify-start items-center gap-7 max-w-[720px] lg:max-w-[599px]">
                    <H4 className="text-[35px] font-ptSansPro font-semibold text-green w-full">
                        {bodyTitle}
                    </H4>
                    <div>
                        <P className="font-mundial font-light text-brown text-lg text-left">
                        {desc}
                    </P>
                    {
                        desc2 !== '' ? ( <P className="font-mundial font-light text-brown text-lg text-left pt-3">
                        {desc2}
                    </P>) : ''
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IconFeatureBlock
