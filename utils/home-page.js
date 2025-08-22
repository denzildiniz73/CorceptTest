import reserchIcon from "@/public/images/icons/reserchIcon.svg"
import person from "@/public/images/icons/person.svg"
import Link from "next/link"
import silence from "@/public/images/icons/silence.svg"
import daily_life from "@/public/images/icons/daily_life.svg"
import resources from "@/public/images/icons/resources.svg"
import newsletter from "@/public/images/icons/newsletter.svg"

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


export const animatedCardsData = [
    {
        id:1,
        icon: silence,
        title: 'Break the silence',
        desc: 'There is power in understanding why treatment may no longer work.',
        ctaText: 'Learn about chemotherapy resistance',
        ctaLink: '#'
    },
    {
        id:2,
        icon: daily_life,
        title: 'Daily life after recurrence',
        desc: 'Learn about navigating the ups and downs of platinum-resistant ovarian cancer.',
        ctaText: 'Read about living with PROC',
        ctaLink: '#'
    },
    {
        id:3,
        icon: resources,
        title: 'Resource library',
        desc: 'Explore patient advocacy groups, see frequently asked questions, and download materials for support.',
        ctaText: 'Find resources',
        ctaLink: '#'
    },
    {
        id:4,
        icon: newsletter,
        title: 'The Luminary newsletter',
        desc: 'Sign up for more information about platinum-resistant ovarian cancer.',
        ctaText: 'Subscribe',
        ctaLink: '#'
    },

]