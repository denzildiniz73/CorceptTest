import Image from "next/image";
import women from "@/public/images/icons/women.svg";
import diagnosed from "@/public/images/icons/diagnosed.svg";

const renderCrads = [
  {
    id: 1,
    icon: women,
    title: <>~244,000</>,
    body: (
      <>
        women are living with<br /> ovarian cancer in the 
        <br /> United States
      </>
    ),
  },
  {
    id: 2,
    icon: diagnosed,
    title: <>~21,000</>,
    body: (
      <>
        women are diagnosed <br /> with ovarian cancer in the 
        <br /> United States each year
      </>
    ),
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14">
      {renderCrads.map((card) => (
        <div
          key={card.id}
          className="flex flex-col justify-center items-center w-full min-w-[220px] lg:min-w-[500px] xl:min-w-[516px] h-full min-h-[200px] md:min-h-[334px] border border-white bg-white/50 backdrop-blur-[4px] p-4"
        >
          {/* Icon */}
          <div className="w-[130px] h-[130px] mt-[19px]">
            <Image
              src={card.icon}
              alt="Icon"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <div className="text-center w-full py-6">
            <p className="font-ptSansPro text-[56px] leading-[60px] font-black text-green subTitleGradient">
              {card.title}
            </p>
          </div>

          {/* Body */}
          <div className="w-full text-center mb-[22px]">
            <p className="font-mundial font-light text-lg text-brown leading-5">
              {card.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
