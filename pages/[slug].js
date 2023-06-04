import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import styles from "../styles/components.module.css";
import connectMongo from "@/database/conn";
import { useRouter } from "next/router";

const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const slug = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Navbar />
      <div className="py-20">
        <div>
          <h1 className={`${playfair.className} text-3xl`}>{data.title}</h1>
          <div className="Tags flex gap-3 py-4">
            <button className={`${styles.tags} text-sm`}>
              {data.category}
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className={`${nunito.className} italic text-center py-6`}>
            {data.highlight}
          </div>
          {data.blog}
        </div>
        <div className={`${nunito.className} py-10`}>
          Publisher Name : {data.username}
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (req, res) => {
  connectMongo();
  console.log(req.query);
  const { slug } = req.query;
  const result = await fetch(`http://localhost:3000/api/${slug}`);
  const data = await result.json();
  return { props: { data } };
};

export default slug;
