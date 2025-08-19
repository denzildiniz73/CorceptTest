"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "@/public/images/IlluminateProcLogo.svg";

const navItemsList = [
  {
    title: "Understanding PROC",
    href: "/understanding-proc",
  },
  {
    title: "Living With PROC",
    href: "/living-with-proc",
  },
  {
    title: "Support & Resources",
    href: "/support-and-resources",
  },
  {
    title: "Share Your Story",
    href: "/share-your-story",
  },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    setActiveLink(pathname);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("blur-active");
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsSidebarOpen(false);
    document.body.classList.remove("blur-active");
  };

  return (
    <>
      <header className="fixed z-50 w-full max-w-[94%] xl:max-w-[1320px] flex items-center justify-between bg-[#ffffff99] bg-opacity-60 backdrop-blur-lg px-7 py-4 lg:py-2 left-0 right-0 mx-auto top-7 rounded-[40px] border border-white">
        <div className="flex items-center">
          <Link href="/" className="lg:w-full h-full md:w-[243px] sm:w-[200px]">
            {/* LOGO */}
            <Image
              src={logo}
              alt='IlluminatePROC.com logo'
              layout="responsive"
              className="w-full h-full mb-[10px]"
            />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-6 w-full max-w-[754px]">
          <ul className={`hidden lg:flex gap-6 ${styles.navbarLinks}`}>
            {navItemsList.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`${styles.navLink} ${pathname === item.href ? styles.activeLink : ""}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/stay-informed"
            onClick={() => handleLinkClick("/stay-informed")}
            className="hidden sm:inline-block text-base text-white font-mundial font-bold bg-MidnightGreen rounded-[70px] pt-[10px] py-3 px-6 border border-white hover:border-white transition-all duration-300 hover:shadow-[0_-2px_9px_0_rgba(1,116,115,0.37)] sm:mr-4 lg:mr-0"
          >
            Stay Informed
          </Link>
        </div>

        <button
          id="burger-menu"
          className={`${styles.burgerMenu}`}
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isSidebarOpen}
        >
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
        </button>
      </header>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""
          }`}
          aria-hidden={!isSidebarOpen}
      >
        <div className={styles.sidebarFlex}>
          <Link href="/" className="">
            {/* LOGO */}
            <Image
              src={logo}
              alt='logo'
              layout="responsive"
              className="w-full h-full mb-[10px]"

            />
          </Link>
          <button
            id="close-sidebar"
            className={styles.closeSidebar}
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="p-4 space-y-4">
          {navItemsList.map((item, index) => (
            <Link key={index} href={item.href}>
              <li
                className={`py-8 ${styles.sidebarLi}`}
                onClick={() => handleLinkClick(item.href)}
              >
                <p
                  className={`${styles.sidebarLink} ${pathname === item.href ? styles.activeLink : ""
                    }`}
                >
                  {item.title}
                </p>
              </li>
            </Link>
          ))}
        </ul>
        <div className={`p-4 mt-auto`}>
          <Link
            href="/stay-informed"
            onClick={() => handleLinkClick("/stay-informed")}
            className="w-full block text-center text-sm text-white border-white font-mundial font-normal bg-green rounded-[70px] pt-[10px] py-3 px-6 border border-green hover:border-antiFlashWhite transition-all duration-300 hover:shadow-[0_-2px_9px_0_rgba(1,116,115,0.37)]"
          >
            Stay Informed
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
