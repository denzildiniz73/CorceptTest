import React from "react";
import ModalWrapper from ".";
import Button from "../Buttons/Button";

const WelcomeModal = ({ isOpen, onClose, onAction }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center w-full">
        <h4 className="text-corcept-green-dark text-center text-3xl font-bold leading-[137%] tracking-[1.02px]">
          Welcome to the Illumination garden
        </h4>
        <div className="flex flex-col items-center justify-center w-full mt-[30px]">
          <p className="text-corcept-black text-center text-base font-light leading-[27px] tracking-[0.54px]">
            Lorem ipsum dolor sit amet consectetur. Tristique nunc ut et sed
            auctor. Venenatis sem nisl sed erat elementum dolor eget viverra.
            Porttitor purus habitant libero libero lectus vitae. Lorem non
            integer risus in vel faucibus tortor.
          </p>
          <p className="text-corcept-black text-center text-lg font-semibold leading-[27px] tracking-[0.54px] mt-[16px]">
            Something, something copy update something something
          </p>
        </div>

        <Button variant="secondaryDark" className="text-[20px] font-normal mt-[40px]" onClick={onAction}>
        View Illuminations
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default WelcomeModal;
