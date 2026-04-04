import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  FaBolt,
  FaBookOpen,
  FaProjectDiagram,
  FaChartLine,
  FaFilePdf,
} from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Auth = () => {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const User = response.user;
      const name = User.displayName;
      const email = User.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/google`,
        { name, email },
        { withCredentials: true },
      );

      console.log(result.data);
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-pink-600/20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center py-10 relative z-10"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          className="text-4xl md:text-5xl font-extrabold tracking-widest"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            EXAM
          </span>
          <motion.span
            animate={{
              textShadow: [
                "0px 0px 10px rgba(168,85,247,0.6)",
                "0px 0px 20px rgba(236,72,153,0.9)",
                "0px 0px 10px rgba(59,130,246,0.6)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="ml-2"
          >
            Notes
          </motion.span>
          <span className="text-purple-500"> AI</span>
        </motion.h1>

        <p className="text-gray-400 mt-3">
          AI-powered exam-oriented notes & revision
        </p>
      </motion.header>

      {/* Main */}
      <main className="flex flex-col md:flex-row items-center justify-center flex-1 px-6 md:px-20 gap-16 relative z-10">
        {/* Left */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-lg text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Unlock Smart <br />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Notes
            </span>
          </h2>

          {/* ✅ FIXED BUTTON */}
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-8 flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-semibold shadow-lg mx-auto md:mx-0 w-full max-w-xs"
            onClick={handleGoogleAuth}
          >
            <FcGoogle size={22} />
            Continue with Google
          </motion.button>

          <p className="mt-6 text-gray-400">
            You get{" "}
            <span className="text-purple-400 font-bold">50 FREE Credits</span>{" "}
            to generate exam notes, projects, charts and download clean PDFs
            instantly using AI.
          </p>

          <p className="mt-3 text-gray-500 text-sm">
            Start free. Upgrade anytime. Instant access.
          </p>
        </motion.div>

        {/* Right Features */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <Feature
            icon={<FaBolt className="text-yellow-400" />}
            title="50 Free Credits"
            des="Start with 50 credits to generate notes without paying."
          />
          <Feature
            icon={<FaBookOpen className="text-green-400" />}
            title="Exam Notes"
            des="High-yield, revision-ready exam-oriented notes."
          />
          <Feature
            icon={<FaProjectDiagram className="text-blue-400" />}
            title="Project Notes"
            des="Well-structured documentation for assignments."
          />
          <Feature
            icon={<FaChartLine className="text-pink-400" />}
            title="Charts & Graphs"
            des="Auto-generated diagrams and flow charts."
          />
          <Feature
            icon={<FaFilePdf className="text-red-400" />}
            title="Free PDF Download"
            des="Download clean, printable PDFs instantly."
          />
        </motion.div>
      </main>
    </div>
  );
};

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:shadow-purple-500/20 shadow-lg transition"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-400 text-sm mt-2">{des}</p>
    </motion.div>
  );
}

export default Auth;
