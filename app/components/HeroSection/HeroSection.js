"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./heroSection.module.css";
import HeaderTest from "@/public/images/HeaderTest.png";


const HeroSection = () => {
  return (
    <div>
        <Image src={HeaderTest} alt="HeaderTest" className="w-full h-[700px] object-fill" />
    </div>
  )
}

export default HeroSection
