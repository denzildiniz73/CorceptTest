"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/Corcept_logo.svg";
import footerLogoRight from "../../../public/images/corceptFooterLogo.svg";
import styles from "./footer.module.css";
import { usePathname } from "next/navigation";

const footerLinks = {
  sectionOne: {
    // title: "Pages",
    pages: [
      {
        title: "Understanding PROC",
        href: "/",
        font: "not-italic",
      },
      { title: "Share Your Story", href: "/", font: "not-italic" },
      {
        title: "Terms of Use",
        href: "#",
        font: "not-italic",
        modal: true,
      },
    ],
  },
  sectionTwo: {
    title: "",
    pages: [
      {
        title: "Living With PROC",
        href: "/",
        font: "not-italic",
      },
      {
        title: "The Luminary",
        href: "/",
        font: "italic",
      },
      // { title: "About Corcept", href: "#", font: "not-italic" },
      {
        title: "Privacy Notice",
        href: "https://corcept.com/terms-of-use/",
        font: "not-italic",
        external: true,
      },
    ],
  },
  sectionThree: {
    title: "",
    pages: [
      { title: "Resources and Support", href: "/", font: "not-italic" },
      {
        title: "Your Privacy Choices",
        href: "#",
        font: "not-italic",
      },
    ],
  },
};

const mobileFooterLinks = {
  sectionOne: {
    // title: "Pages",
    pages: [
      {
        title: "Understanding PROC",
        href: "/",
        font: "not-italic",
      },
      {
        title: "Share Your Story",
        href: "/",
        font: "not-italic",
      },
      { title: "Terms of Use", href: "/", font: "not-italic" },
      { title: "The Signal", href: "/stay-informed", font: "italic" },
      {
        title: "Living With PROC",
        href: "/",
        font: "not-italic",
      },
      {
        title: "The Luminary",
        href: "/",
        font: "italic",
      },
      {
        title: "Privacy Notice",
        href: "#",
        font: "not-italic",
        modal: true,
      },
      {
        title: "Resources and Support",
        href: "/",
        font: "non-italic",
      },
      {
        title: "Your Privacy Choices",
        href: "#",
        font: "non-italic",
      },
    ],
  },
};

const Footer = () => {
  const [linkList, setLinkList] = useState(footerLinks);
  const [mobileLinkList, setMobileLinkList] = useState(mobileFooterLinks);

  const pathName = usePathname();

  // Helper function to render links or buttons
  const renderLink = (page) => {
    if (page.modal) {
      return (
        <button
          onClick={() => {
            if (typeof OneTrust !== "undefined") {
              OneTrust.ToggleInfoDisplay(); // Trigger the OneTrust modal
            } else {
              console.error("OneTrust is not loaded");
            }
          }}
          className={`text-codGray font-mundial font-light text-base ${page.font}`}
        >
          {page.title}
        </button>
      );
    } else if (page.external) {
      return (
        <a
          href={page.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-codGray font-mundial font-light text-base ${page.font}`}
        >
          {page.title}
        </a>
      );
    } else {
      return (
        <Link
          href={page.href}
          className={`text-codGray font-mundial font-light text-base ${page.font}`}
        >
          {page.title}
        </Link>
      );
    }
  };

  return (
    <div className="w-full bg-linen flex flex-col pt-[60px] pb-[70px] ">
        
      <div className="flex items-end justify-between w-full max-w-[1150px] mx-auto flex-wrap">
      <div className="px-3 font-mundial font-normal text-base leading-6 text-codGray mb-16">
          The information provided on this website is not a substitute for medical advice and is intended for educational purposes and for US audiences only. Talk with a healthcare professional if you have concerns about your health. This website is funded and maintained by Corcept Therapeutics.
            </div>
        {/* <div className="ml-5">
          <Image
            src={Logo}
            alt="Corcept Therapeutics logo"
            className="w-[250px] h-[120px] object-cover"
          />
        </div> */}
        <div className="flex flex-col gap-6 w-full lg:w-[70%]  order-2 lg:order-1">
          {/* <div className=" font-mundial font-normal text-base leading-6 text-codGray">
          The information provided on this website is not a substitute for medical advice and is intended for educational purposes and for US audiences only. Talk with a healthcare professional if you have concerns about your health. This website is funded and maintained by Corcept Therapeutics.
            </div> */}
          <div
            className={`${styles.customDesktoplinks} flex justify-between gap-5 sm:gap-20 flex-wrap px-3 ${styles.footerContainer}`}
          >
            {Object.values(linkList).map((section, sectionIndex) => (
              <div key={sectionIndex} className="flex flex-col gap-4">
                {section.title && (
                  <p className="text-codGray text-lg font-mundial font-medium">
                    {section.title}
                  </p>
                )}
                <ul className="space-y-2">
                  {section.pages.map((page, pageIndex) => (
                    <li key={pageIndex}>{renderLink(page)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* test  */}
          <div
            className={`${styles.customFooterLinks} flex justify-between gap-5 sm:gap-20 flex-wrap px-5 ${styles.footerContainer}`}
          >
            {Object.values(mobileLinkList).map((section, sectionIndex) => (
              <div key={sectionIndex} className="flex flex-col gap-4">
                {section.title && (
                  <p className="text-codGray text-lg font-mundial font-medium">
                    {section.title}
                  </p>
                )}
                <ul className="space-y-2">
                  {section.pages.map((page, pageIndex) => (
                    <li key={pageIndex}>{renderLink(page)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex md:items-center items-start w-full h-full md:justify-stretch gap-[52px] flex-col md:flex-row px-5 md:pl-0">
            <div className="ml-0 md:ml-3 w-[140px] h-[70px]">
              <a target="_blank" href="https://corcept.com">
                <Image
                  src={Logo}
                  alt="Corcept Therapeutics logo"
                  className="w-[162px] h-[60px] object-cover"
                />
              </a>
            </div>
            <div className="font-mundial font-light text-base leading-[22px] text-codGray">
              Copyright &copy; 2025 Corcept Therapeutics Incorporated. <br />
              All rights reserved.{" "} REL-N-00020 AUG 2025 ONC
            </div>
          </div>
        </div>
        <Image
          src={footerLogoRight}
          alt="Illuminate Hope logo"
          className="w-[248px] h-[150px] object-contain order-1 lg:order-2 p-2 pr-0 ml-0 md:ml-5 lg:ml-0"
        />
      </div>
    </div>
  );
};

export default Footer;