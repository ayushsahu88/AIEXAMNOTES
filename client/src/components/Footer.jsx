import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid md:grid-cols-3 gap-10">
        {/* Logo Section */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <img src={logo} className="w-10 h-10" alt="logo" />

            <span className="text-xl font-bold text-white">
              ExamNotes <span className="text-purple-500">AI</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            ExamNotes AI helps students generate exam-focused notes, revision
            material, diagrams and printable PDFs instantly using AI.
          </p>
        </motion.div>

        {/* Quick Links */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li
              onClick={() => navigate("/notes")}
              className="hover:text-purple-400 cursor-pointer transition"
            >
              Notes
            </li>

            <li
              onClick={() => navigate("/history")}
              className="hover:text-purple-400 cursor-pointer transition"
            >
              History
            </li>

            <li
              onClick={() => navigate("/pricing")}
              className="hover:text-purple-400 cursor-pointer transition"
            >
              Pricing
            </li>
          </ul>
        </motion.div>

        {/* Social */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>

          <div className="flex gap-4 text-xl">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-gray-400 hover:text-purple-400 cursor-pointer"
            >
              <FaGithub />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-gray-400 hover:text-purple-400 cursor-pointer"
            >
              <FaLinkedin />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-gray-400 hover:text-purple-400 cursor-pointer"
            >
              <FaTwitter />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}

      <div className="border-t border-white/10 py-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
