import React, { useState } from "react";
import styles from "../styles/components.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import { useSession, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${nunito.className} Navbar md:flex md:justify-between md:items-center md:font-bold `}
    >
      <div className=" flex flex-col gap-4 md:flex md:flex-row md:items-center md:gap-6">
        {/* Logo */}
        <div className="flex items-center justify-between cursor-pointer">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="FreshInk" width={100} height={100} />
          </Link>
          <span
            className="text-3xl cursor-pointer md:hidden block"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdClose /> : <BiMenu />}
          </span>
        </div>

        {/* Nav-links */}
        <nav
          className={`transition-all ease-in duration-500 ${
            open ? "opacity-100" : "hidden"
          } md:opacity-100 md:transition-none md:block`}
        >
          <ul className={`flex flex-col gap-4  md:flex md:flex-row md:gap-6`}>
            <Link href={"/"}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link href={"/aboutus"}>
              <li className="cursor-pointer">About us</li>
            </Link>
            <Link href={"/Blog"}>
              <li className="cursor-pointer">Blogs</li>
            </Link>
            <Link href={"/contact"}>
              <li className="cursor-pointer">Contact</li>
            </Link>
          </ul>
        </nav>
      </div>
      {/* Login and Create option */}
      <div
        className={`flex flex-col gap-4 pt-3 ${
          open ? "opacity-100" : "hidden"
        } md:opacity-100 md:transition-none md:block md:flex md:flex-row md:gap-5 md:pt-0`}
      >
        {session ? (
          <button
            className={`${styles.button} text-left md:text-center`}
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
          >
            Sign out
          </button>
        ) : (
          <Link href={"/login"}>
            <button
              className={`${styles.button} w-full text-left md:text-center`}
            >
              Sign in
            </button>
          </Link>
        )}
        <Link href={"/createblog"}>
          <button
            className={`${styles.button} flex md:justify-center md:items-center gap-2 w-full`}
          >
            <span>
              <MdAdd size={20} />
            </span>
            Create a blog
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
