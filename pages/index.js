import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";
import styles from "../styles/pages.module.css";
import Blogcard from "@/components/Blogcard";
import Link from "next/link";
import Footer from "@/components/Footer";
import connectMongo from "@/database/conn";
import Head from "next/head";
import UserBlogImage from "@/models/userBlogImageSchema";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Home({ blogs }) {
  return (
    <>
      <Head>
        <title>FreshInk</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <main>
        {/* Section for Navabr */}
        <Navbar />

        {/* Section for Hero */}
        <section className="hero-section py-20">
          <div className="text-center">
            <p className={`${nunito.className} font-bold`}>The Blog</p>
            <h1 className={`${playfair.className} text-6xl py-4 pb-8`}>
              Writings from our team
            </h1>
            <p className={`${nunito.className} italic`}>
              "Unleash Your Inner Explorer: Embark on a Journey of Inspiration,
              Knowledge, and Adventure with Our Captivating Blog."
            </p>
          </div>
        </section>

        {/* Section for Recent blog posts */}
        <section className="flex flex-wrap gap-x-24 py-4">
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
        </section>

        {/* Section for View More  */}
        <div className={`${nunito.className} text-center py-10`}>
          <Link href={"/Blog"} as={"/blogs"}>
            <button className={`${styles.viewbutton}`}>View More</button>
          </Link>
        </div>

        {/* Section for Footer */}
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  connectMongo();
  let blogs = await UserBlogImage.find();
  return { props: { blogs: JSON.parse(JSON.stringify(blogs)) } };
};
