import Image from "next/image";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { BsFillDiamondFill } from "react-icons/bs";
import styles from "../styles/components.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

function time(date) {
  let timedate = new Date(date);
  return timedate;
}
const Blogcard = ({
  id,
  username,
  title,
  highlight,
  category,
  image,
  date,
}) => {
  return (
    <div className="blog-card max-w-sm py-6">
      <Image src={image} width={500} height={500} quality={100} alt={title} />
      <div className="py-4">
        <p className={`${nunito.className} font-bold flex items-center gap-2`}>
          {username}
          <span className="flex items-center gap-2">
            <BsFillDiamondFill size={10} />
            {time(date).toDateString()}
          </span>
        </p>
        <h1
          className={`${playfair.className} text-3xl py-3 flex justify-between items-center`}
        >
          {title}
          <Link href={`/${id}`}>
            <button>
              <FiArrowUpRight />
            </button>
          </Link>
        </h1>
        <p className={`${nunito.className} italic overflow-hidden`}>
          {highlight}
        </p>
        <div className="Tags flex gap-3 py-4">
          <button className={`${styles.tags} text-sm`}>{category}</button>
        </div>
      </div>
    </div>
  );
};
export default Blogcard;
