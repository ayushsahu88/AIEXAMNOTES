import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import img from "../assets/img1.png";
import Footer from "../components/Footer";

import { FaBookOpen, FaFileAlt, FaChartLine, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-16">
        {/* Left Content */}

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Create Smart <br />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Notes
            </span>{" "}
            in Seconds
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mt-6 text-lg"
          >
            Generate exam-focused notes, project documentation, flow diagrams
            and revision-ready content using AI — faster, cleaner and smarter.
          </motion.p>

          <motion.button
            onClick={() => navigate("/notes")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-8 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold shadow-lg"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image */}

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={img}
            alt=""
            className="w-[420px]"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </section>

      {/* FEATURES */}

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-20 pb-20">
        <Feature
          icon={<FaBookOpen className="text-green-400" />}
          title="Exam Notes"
          des="High-yield exam-oriented notes with revision points."
        />

        <Feature
          icon={<FaFileAlt className="text-blue-400" />}
          title="Project Docs"
          des="Well-structured content for assignments and projects."
        />

        <Feature
          icon={<FaChartLine className="text-pink-400" />}
          title="AI Diagrams"
          des="Auto-generated visual diagrams for clarity."
        />

        <Feature
          icon={<FaFilePdf className="text-red-400" />}
          title="PDF Download"
          des="Download clean, printable PDFs instantly."
        />
      </section>

      <Footer />
    </div>
  );
};

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07, y: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:shadow-purple-500/20 shadow-lg"
    >
      <div className="text-3xl mb-4">{icon}</div>

      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="text-gray-400 text-sm mt-2">{des}</p>
    </motion.div>
  );
}

export default Home;
