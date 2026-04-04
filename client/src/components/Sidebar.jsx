import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ result }) => {
  if (!result) return null;

  // ✅ Safe JSON parse
  let data;
  try {
    data = typeof result === "string" ? JSON.parse(result) : result;
  } catch (e) {
    return null;
  }

  const { subTopics, questions, diagram } = data || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full 
      bg-gradient-to-br from-white/5 to-white/0
      border border-white/10 
      backdrop-blur-xl 
      p-5 rounded-2xl 
      shadow-lg shadow-purple-900/20"
    >
      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          📌 Quick Exam View
        </h3>
        <p className="text-xs text-gray-400">
          Smart breakdown for fast revision
        </p>
      </div>

      {/* 🔥 SUBTOPICS */}
      {subTopics && (
        <section className="mb-6">
          <p className="text-sm text-gray-400 mb-3 uppercase">Sub Topics</p>

          {Object.entries(subTopics).map(([star, topics]) => (
            <div
              key={star}
              className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <p className="text-purple-300 font-semibold mb-2">
                {star} Priority
              </p>

              <ul className="text-sm text-gray-300 space-y-1">
                {topics.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* 🔥 QUESTIONS */}
      {questions && (
        <section className="mb-6">
          <p className="text-sm text-gray-400 mb-3 uppercase">
            Important Questions
          </p>

          {/* SHORT */}
          <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-purple-300 font-semibold mb-2">Short</p>
            <ul className="text-sm text-gray-300 space-y-1">
              {questions.short?.map((q, i) => (
                <li key={i}>• {q}</li>
              ))}
            </ul>
          </div>

          {/* LONG */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-purple-300 font-semibold mb-2">Long</p>
            <ul className="text-sm text-gray-300 space-y-1">
              {questions.long?.map((q, i) => (
                <li key={i}>• {q}</li>
              ))}
            </ul>
          </div>

          {/* 🔥 DIAGRAM QUESTION */}
          {questions.diagram && (
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-purple-300 font-semibold mb-2">
                Diagram Question
              </p>
              <p className="text-sm text-gray-300">{questions.diagram}</p>
            </div>
          )}
        </section>
      )}

      {/* 🔥 DIAGRAM (Flowchart Data) */}
      {diagram && (
        <section>
          <p className="text-sm text-gray-400 mb-3 uppercase">Diagram</p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 mb-2">Type: {diagram.type}</p>

            <pre className="text-xs text-gray-300 whitespace-pre-wrap">
              {diagram.data}
            </pre>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default Sidebar;
