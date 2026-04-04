import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;
  const navigate = useNavigate();

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-lg border-b border-white/10 relative">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} className="w-9 h-9" alt="logo" />

        <span className="text-xl font-bold text-white">
          ExamNotes <span className="text-purple-500">AI</span>
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Credits */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowCredits(!showCredits);
              setShowProfile(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10"
          >
            <span>💎</span>
            <span className="font-semibold text-purple-400">{credits}</span>
          </motion.div>

          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 mt-3 w-64 p-5 rounded-xl bg-zinc-900 border border-white/10 shadow-xl"
              >
                <h4 className="font-semibold text-lg text-white">
                  Buy Credits
                </h4>

                <p className="text-sm text-gray-400 mt-1">
                  Use credits to generate AI notes, diagrams & PDFs.
                </p>

                <button
                  onClick={() => {
                    setShowCredits(false);
                    navigate("/pricing");
                  }}
                  className="mt-4 w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredits(false);
            }}
            className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold cursor-pointer"
          >
            {userData?.name?.slice(0, 1)?.toUpperCase()}
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 mt-3 w-40 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden"
              >
                <MenuItem
                  text="History"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/history");
                  }}
                />

                <div className="border-t border-white/10" />

                <MenuItem text="Sign Out" red onClick={handleSignOut} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-sm cursor-pointer transition ${
        red
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-300 hover:bg-white/10"
      }`}
    >
      {text}
    </div>
  );
}

export default Navbar;
