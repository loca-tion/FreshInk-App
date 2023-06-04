import React from "react";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import styles from "../styles/components.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const Footer = () => {
  const { data: session } = useSession();
  return (
    <div className={`${styles.bg} Footer text-white py-10 rounded-md`}>
      <div className="text-center ">
        <h2 className={`${playfair.className} md:text-4xl text-xl`}>
          Let's get sarted on something great
        </h2>
        <p className={`${nunito.className} italic py-4 px-4 md:px-0`}>
          Join over 4,000 + startups already growing with FreshInk.
        </p>
        {session ? (
          <Link href={"/Blog"}>
            <button className={`${styles.button_footer}`}>Explore</button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <button className={`${styles.button_footer}`}>
              Start by Sign in
            </button>
          </Link>
        )}
      </div>
      <div className="flex md:flex-row md:justify-between items-center md:px-8 flex-col justify-center py-4 md:py-0">
        <Link href={"/"}>FreshInk.</Link>
        <p>© 2023 FreshInk , All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
