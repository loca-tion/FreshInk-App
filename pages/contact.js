import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Nunito } from "next/font/google";
import { FiArrowUpRight } from "react-icons/fi";
import { useFormik } from "formik";
import { contactValidate } from "@/lib/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

async function createBlog(email, subject, message) {
  try {
    await axios.post(`${process.env.BASE_URL}/api/sendmessage`, {
      email,
      subject,
      message,
    });
    toast.success("Thanks for your message", {
      position: toast.POSITION.TOP_CENTER,
    });
  } catch (error) {
    toast.error("Sorry your message is not sent", {
      position: toast.POSITION.TOP_CENTER,
    });
    console.error("Error creating contact", error);
  }
}

const contact = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },
    validate: contactValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const { email, subject, message } = values;
    createBlog(email, subject, message);
    formik.resetForm({
      values: {
        email: "",
        subject: "",
        message: "",
      },
    });
  }

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Navbar />
      <section className="bg-white">
        <ToastContainer autoClose={1000} />
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h1 className={`${nunito.className} text-4xl font-bold`}>
            Love to hear from you,<div>Get in touch👋</div>
          </h1>
          <form
            action="#"
            className="space-y-8 py-10"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                placeholder="name@flowbite.com"
                required
                {...formik.getFieldProps("email")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                placeholder="Let us know how we can help you"
                required
                {...formik.getFieldProps("subject")}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black">
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                name="subject"
                className="shadow-sm bg-[#e4e8ec]  text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                placeholder="Leave a comment..."
                {...formik.getFieldProps("message")}
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center w-1/2 py-3 px-5 text-sm font-medium text-center text-black bg-transparent border border-black hover:bg-black hover:text-white"
            >
              Just Send{" "}
              <span>
                <FiArrowUpRight size={20} />
              </span>
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default contact;
