import React from "react";
import Party from "../assets/party.jpg";
import Party2 from "../assets/party2.jpg";
import Party3 from "../assets/party3.jpg";
import { FaInstagram } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import Header from "@/components/Header";
const Layout = () => {
  return (
    <div>
      <Header />
      <section className="flex relative mt-20 ">
        <div className=" flex flex-col gap-6 ml-8 justify-center">
          <div className="text-5xl font-bold">
            Payments tool for software companies
          </div>
          <div className="text-2xl">
            From checkout to global sales tax compliance, companies around the
            wolrd use flowbite to simpolify their payment stack
          </div>
          <div className="flex gap-8 ">
            <button className="bg-blue-500 text-white p-3 rounded-lg">
              Get Started
            </button>
            <button className="bg-slate-200 p-3 rounded-lg text-blue-500">
              Speak to sales
            </button>
          </div>
        </div>
        <motion.div className="ml-6">
          <img src={Party} alt="" className="w-3/4 rounded-lg" />
        </motion.div>
      </section>

      <section className="flex    bg-slate-100 justify-center items-center mt-20 p-20">
        <div className="flex gap-8 ml-20 justify-center items-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{
              scale: 0.8,
              rotate: -90,
              borderRadius: "100%",
            }}
          >
            {" "}
            <img src={Party2} alt="" className="h-96 rounded-2xl" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{
              scale: 0.8,
              rotate: -90,
              borderRadius: "100%",
            }}
          >
            {" "}
            <img src={Party3} alt="" className="h-96 rounded-2xl mt-10" />
          </motion.div>
        </div>
        <div className="flex flex-col w-2/4 gap-7 ml-9">
          <div className="text-3xl font-bold mt-9">
            We didn't reinvent the wheel
          </div>

          <div className="text-xl">
            We are strategists, designers and developers. Innovators and problem
            solvers. Small enough to be simple and quick, but big enough to
            deliver the scope you want at the pace you need. Small enough to be
            simple and quick, but big enough to deliver the scope you want at
            the pace you need.
          </div>

          <div className="text-xl">
            We are strategists, designers and developers. Innovators and problem
            solvers. Small enough to be simple and quick.
          </div>
        </div>
      </section>
      <footer className="h-40 flex justify-between items-center ">
        <div className="ml-20 text-gray-400 font-bold">
          2024 nithin raj .All rights reserved.
        </div>
        <div className="flex gap-10 mr-10">
          <div className="text-3xl">
            <FaInstagram />
          </div>
          <div className="text-3xl">
            <FaGithubSquare />
          </div>
          <div className="text-3xl">
            <FaSquareXTwitter />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
