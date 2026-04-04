import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateNotes } from "../../services/api";
import { useDispatch } from "react-redux";
import { updateCreadits } from "../redux/userSlice";

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const dispatch = useDispatch();

  /* 🔥 SUBMIT */
  const handleAISubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });

      console.log("API RESPONSE 👉", response);

      if (!response?.data) {
        throw new Error("No response from server");
      }

      // ✅ FIXED
      setResult(response.data);

      setLoading(false);
      setProgress(100);
      setProgressText("Completed 🎉");
      setClassLevel("");
      setTopic("");
      setExamType("");
      setIncludeChart(false);
      setRevisionMode(false);
      setIncludeDiagram(false);

      if (typeof response.creditsLeft === "number") {
        dispatch(updateCreadits(response.creditsLeft));
      }
    } catch (error) {
      console.log("❌ FRONTEND ERROR:", error);

      setError(
        error.response?.data?.message || "Failed to fetch notes from server",
      );

      setLoading(false);
    }
  };

  /* 🔥 PROGRESS BAR LOGIC */
  useEffect(() => {
    if (!loading) return;

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done...");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing notes...");
      } else if (value > 40) {
        setProgressText("Processing content...");
      } else {
        setProgressText("Generating notes...");
      }

      setProgress(Math.floor(value));
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-xl shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-6 text-white">
        Generate AI Notes
      </h2>

      {/* 🔥 INPUTS */}
      <div className="flex flex-col gap-4">
        <InputField
          placeholder="Enter Topic (e.g. DBMS Normalization)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <InputField
          placeholder="Class / Level (e.g. BCA / MCA)"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
        />

        <InputField
          placeholder="Exam Type (e.g. Semester / UPSC)"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        />
      </div>

      {/* 🔥 TOGGLES */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Toggle
          label="Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />

        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />

        <Toggle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>

      {/* 🔥 BUTTON */}
      <motion.button
        onClick={handleAISubmit}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        className={`mt-8 w-full py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Generating Notes...
          </span>
        ) : (
          "Generate Notes"
        )}
      </motion.button>

      {/* 🔥 PROGRESS UI */}
      {loading && (
        <div className="mt-6">
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            This may take 2–5 minutes. Please don’t refresh the page.
          </p>
        </div>
      )}
    </motion.div>
  );
};

/* 🔥 INPUT */
function InputField({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 outline-none text-sm text-white placeholder-gray-400"
    />
  );
}

/* 🔥 TOGGLE */
function Toggle({ label, checked, onChange }) {
  return (
    <motion.div
      onClick={onChange}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 cursor-pointer"
    >
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          checked ? "bg-purple-600" : "bg-gray-600"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 bg-white rounded-full"
          style={{ x: checked ? 20 : 0 }}
        />
      </div>

      <span className="text-sm text-gray-300">{label}</span>
    </motion.div>
  );
}

export default TopicForm;
