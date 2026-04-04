import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MermaidSetup from "./MermaidSetup";
import ReChartSetUp from "./ReChartSetUp";
import { downloadPdf } from "../../services/api";

const markDownComponent = {
  h1: ({ children }) => <h1 className="text-2xl font-bold mb-3">{children}</h1>,
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold mb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mb-2">{children}</h3>
  ),
  p: ({ children }) => <p className="text-gray-300 mb-2">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc ml-5 text-gray-300">{children}</ul>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
};

const FinalResult = ({ result }) => {
  const [quickRevisionMode, setQuickRevisionMode] = useState(false);

  if (!result) return null;

  // ✅ Parse JSON
  let data;
  try {
    data = typeof result === "string" ? JSON.parse(result) : result;

    // 🔥 IMPORTANT: content parse
    if (typeof data.content === "string") {
      data = JSON.parse(data.content);
    }
  } catch (e) {
    return <p className="text-red-400">Invalid data format</p>;
  }

  const { notes, revisionPoints, questions, charts } = data || {};

  // ✅ 🔥 ONLY FIX: correct diagram access
  const diagramCode = data?.diagram?.data;

  return (
    <div className="w-full bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg shadow-purple-900/20">
      {/* 🔥 HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">📘 Generated Notes</h2>

        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-purple-600 rounded-lg">
            Copy
          </button>
          <button
            onClick={() => downloadPdf(result)}
            className="px-3 py-1 text-sm bg-pink-600 rounded-lg"
          >
            Download
          </button>
        </div>
      </div>

      {/* 🔥 TOGGLE */}
      <div className="mb-6">
        <button
          onClick={() => setQuickRevisionMode(!quickRevisionMode)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            quickRevisionMode ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          {quickRevisionMode ? "Full Notes Mode" : "Quick Revision (5 min)"}
        </button>
      </div>

      {/* 🔥 FULL NOTES MODE */}
      {!quickRevisionMode && (
        <>
          {/* NOTES */}
          {notes && (
            <section className="mb-6">
              <ReactMarkdown components={markDownComponent}>
                {notes}
              </ReactMarkdown>
            </section>
          )}

          {/* SHORT QUESTIONS */}
          {questions?.short && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">
                📌 Short Questions
              </h3>

              <ul className="list-disc ml-5 text-gray-300 space-y-1">
                {questions.short.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </section>
          )}

          {/* LONG QUESTIONS */}
          {questions?.long && (
            <section>
              <h3 className="text-lg font-semibold mb-3 text-pink-300">
                📝 Long Questions
              </h3>

              <ul className="list-disc ml-5 text-gray-300 space-y-1">
                {questions.long.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 🔥 ONLY DIAGRAM FIXED */}
          {diagramCode && (
            <section>
              <h2>Diagram</h2>
              <MermaidSetup diagram={diagramCode} />
              <p>
                If you need this diagram for future reference or revision,you
                can save it by taking a screenshot.
              </p>
            </section>
          )}
        </>
      )}
      {charts && charts.length > 0 && (
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            📊 Graphs & Charts
          </h3>

          <ReChartSetUp charts={charts} />
        </section>
      )}

      {/* 🔥 QUICK REVISION MODE */}
      {quickRevisionMode && revisionPoints && (
        <section>
          <h3 className="text-lg font-semibold mb-3 text-green-300">
            ⚡ Quick Revision Points
          </h3>

          <ul className="list-disc ml-5 text-gray-300 space-y-1">
            {revisionPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default FinalResult;
