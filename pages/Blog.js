import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import Blogcard from "@/components/Blogcard";
import connectMongo from "@/database/conn";
import UserBlogImage from "@/models/userBlogImageSchema";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const Blog = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <Navbar />
      <div>
        <h1 className={`${playfair.className} text-2xl py-20 text-center`}>
          "Unleash the Explorer Within: Discover Captivating Stories, Inspiring
          Ideas, and Endless Possibilities"
        </h1>
        <div className="Blogs flex flex-wrap gap-x-24">
          {blogs.map((item) => {
            return (
              <Blogcard
                key={item._id}
                id={item._id}
                username={item.username}
                title={item.title}
                highlight={item.highlight}
                category={item.category}
                blog={item.blog}
                image={item.image}
                date={item.createdAt}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async () => {
  connectMongo();
  let blogs = await UserBlogImage.find();
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
};

export default Blog;
