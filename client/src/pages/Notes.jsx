import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaGem } from "react-icons/fa";
import TopicForm from "../components/TopicForm";
import Sidebar from "../components/Sidebar";
import FinalResult from "../components/FinalResult";

const Notes = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 🔥 Background Glow */}
      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-pink-600/20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* 🔥 HEADER */}
      <header className="w-full px-4 md:px-20 py-4 bg-black/60 backdrop-blur-lg border-b border-white/10 flex items-center justify-between relative z-10">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl md:text-2xl font-extrabold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              ExamNotes
            </span>
            <span className="text-purple-500 ml-1">AI</span>
          </h1>
        </motion.div>

        <button
          onClick={() => navigate("/pricing")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
        >
          <FaGem className="text-purple-400" />
          {credits}
        </button>
      </header>

      {/* 🔥 MAIN */}
      <main className="relative z-10 px-4 md:px-20 py-12">
        {/* FORM */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-3xl mx-auto"
        >
          <TopicForm
            loading={loading}
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />
        </motion.div>

        {/* EMPTY */}
        {!result && !loading && (
          <div className="mt-10 text-center text-gray-400">
            📚 Your generated notes will appear here
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT → SIDEBAR */}
            <div className="md:col-span-1">
              <Sidebar result={result} />
            </div>

            {/* RIGHT → RESULT */}
            <div className="md:col-span-2">
              <FinalResult result={result} />
            </div>
          </div>
        )}
        {/* ERROR */}
        {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
      </main>
    </div>
  );
};

export default Notes;
