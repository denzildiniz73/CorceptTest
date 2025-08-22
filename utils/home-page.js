import reserchIcon from "@/public/images/icons/reserchIcon.svg"
import person from "@/public/images/icons/person.svg"
import Link from "next/link"

export const iconFeatureBlockContent = [
    {
        icon: reserchIcon,
        title: <>Evolving<br /> research</>,
        bodyTitle:
            <>New science brings options for<br /> women with platinum-resistant<br /> ovarian cancer</>,
        desc: <>
            Scientists believe that by activating the <Link href='#' className="underline !text-pineGreen">glucocorticoid receptor</Link>, cortisol may help ovarian cancer grow or become resistant to your current therapy. Research to learn more about the glucocorticoid receptor pathway and the role it plays in resistance to chemotherapy is ongoing.
        </>
    },
    {
        icon: person,
        title: <>Path<br /> forward</>,
        bodyTitle:
            <>You don’t have to face chemotherapy<br /> resistance by yourself</>,
        desc: <>
            From scientists and oncologists researching why chemotherapy may not be fully working, to the advice of other patients and the help of your loved ones, there is a large community to support you. 
        </>,
        desc2:
        <>
        There are also things within your control, like mindset and lifestyle, that can have a lifestyle, that can help you better manage platinum-resistant ovarian cancer.
        </>,
        titleSectionClasses: 'mb-0 lg:mb-[89px]'
    },
]