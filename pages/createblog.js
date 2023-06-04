import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import { FiArrowUpRight } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { blogValidate } from "../lib/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import imageCompression from "browser-image-compression";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

async function createBlogwithimage(
  username,
  title,
  category,
  highlight,
  blog,
  image
) {
  try {
    await axios.post(`${process.env.BASE_URL}/api/addblogwithimage`, {
      username,
      title,
      category,
      highlight,
      blog,
      image,
    });
    toast.success("Your blog is published", {
      position: toast.POSITION.TOP_CENTER,
    });
  } catch (error) {
    toast.error("Your blog is not published", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

const createblog = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      title: "",
      highlight: "",
      category: "",
      blog: "",
    },
    validate: blogValidate,
    onSubmit,
  });
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setImage(e.target.result);
      };
      fileReader.readAsDataURL(compressedFile);
    } catch (error) {}
  };

  async function onSubmit(values) {
    const { username, title, category, highlight, blog } = values;
    createBlogwithimage(username, title, category, highlight, blog, image);
    formik.resetForm({
      values: {
        username: "",
        title: "",
        category: "",
        highlight: "",
        blog: "",
      },
    });
    setImage("");
  }

  return (
    <>
      <Navbar />
      {session ? (
        <div className="py-20">
          <ToastContainer autoClose={1000} />
          <h1 className={`${playfair.className} text-3xl text-center`}>
            "Empower Your Ideas {session ? `${session.user.name}` : " "}: Build
            a Blog and Make Your Mark in the Digital World"
          </h1>
          <form
            className="flex flex-col gap-8 py-20"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Publisher Name
              </label>
              {formik.errors.username && formik.touched.username ? (
                <div className={`text-rose-500 text-sm ${playfair.className}`}>
                  {formik.errors.username}
                </div>
              ) : (
                ""
              )}
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="off"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block md:w-1/4 p-2.5 outline-none w-full"
                placeholder="John Walter"
                {...formik.getFieldProps("username")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Title
              </label>
              {formik.errors.title && formik.touched.title ? (
                <div className={`text-rose-500 text-sm ${playfair.className}`}>
                  {formik.errors.title}
                </div>
              ) : (
                ""
              )}
              <input
                type="text"
                id="title"
                name="title"
                autoComplete="off"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                placeholder="The Art of Mindfulness: Tips for a Calm and Balanced Life"
                {...formik.getFieldProps("title")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Highlight of your Blog
              </label>
              {formik.errors.highlight && formik.touched.highlight ? (
                <div className={`text-rose-500 text-sm ${playfair.className}`}>
                  {formik.errors.highlight}
                </div>
              ) : (
                ""
              )}
              <textarea
                type="text"
                id="highlight"
                name="highlight"
                rows={2}
                autoComplete="off"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                placeholder="Nature's Power Unleashed: Tap into the Beauty, Serenity, and Healing Energy of the Natural World to Rejuvenate Your Body, Mind, and Soul."
                {...formik.getFieldProps("highlight")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Add category
              </label>
              <input
                id="category"
                name="category"
                autoComplete="off"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                placeholder="The Art of Mindfulness: Tips for a Calm and Balanced Life"
                {...formik.getFieldProps("category")}
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Add Image
              </label>
              <input
                id="image"
                type="file"
                name="image"
                accept=".jpeg, .png , .jpg "
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                onChange={handleImage}
              ></input>
            </div>
            <div className="image">
              {image ? <img src={image} className="w-1/2" /> : <></>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Blog
              </label>
              {formik.errors.blog && formik.touched.blog ? (
                <div className={`text-rose-500 text-sm ${playfair.className}`}>
                  {formik.errors.blog}
                </div>
              ) : (
                ""
              )}
              <textarea
                id="blog"
                rows="20"
                name="blog"
                autoComplete="off"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                placeholder="Embrace the Writer Within"
                {...formik.getFieldProps("blog")}
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center w-full py-3 px-5 text-sm font-medium text-center text-black bg-transparent border border-black hover:bg-black hover:text-white"
            >
              Publish{" "}
              <span>
                <FiArrowUpRight size={20} />
              </span>
            </button>
          </form>
        </div>
      ) : (
        <div className="py-20 text-center flex justify-center">
          <h1 className={`${playfair.className} md:text-3xl  md:w-1/2`}>
            "Login to unveil your voice - Publish your blog and share your
            unique perspective with the world."
          </h1>
        </div>
      )}
      <Footer />
    </>
  );
};

export default createblog;
