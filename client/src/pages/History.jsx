import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FinalResult from "../components/FinalResult";
import { FaGem } from "react-icons/fa";

const History = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;

  // 📡 Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/notes/getnotes`, {
          withCredentials: true,
        });
        setNotes(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);

  // 📱 Responsive sidebar
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, []);

  // 📂 Open note
  const openNotes = async (noteId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/notes/${noteId}`, {
        withCredentials: true,
      });
      setSelectedNotes(res.data.content);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* 🔝 HEADER */}
      <header className="px-4 md:px-10 py-4 flex justify-between items-center border-b border-white/10 bg-black/70 backdrop-blur">
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold cursor-pointer bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
        >
          ExamNotes AI
        </h1>

        <button
          onClick={() => navigate("/pricing")}
          className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-lg bg-white/10 border border-white/10 text-sm md:text-base"
        >
          <FaGem className="text-purple-400" />
          {credits}
        </button>
      </header>

      {/* 🔽 MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* 📂 SIDEBAR */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay (mobile) */}
              <motion.div
                className="fixed inset-0 bg-black/60 z-20 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed md:static z-30 w-72 h-full bg-[#0a0a0a] border-r border-white/10 p-4 overflow-y-auto"
              >
                <button
                  onClick={() => navigate("/notes")}
                  className="w-full mb-4 py-2 bg-blue-600 rounded-lg text-sm"
                >
                  + New Notes
                </button>

                {notes.length === 0 ? (
                  <p className="text-gray-400 text-sm">No notes</p>
                ) : (
                  notes.map((t) => (
                    <div
                      key={t._id}
                      onClick={() => openNotes(t._id)}
                      className="p-3 mb-3 rounded-xl cursor-pointer hover:bg-white/5 border border-white/5 transition"
                    >
                      <h3 className="text-blue-400 font-semibold text-sm md:text-base">
                        {t.topic}
                      </h3>

                      <p className="text-xs text-gray-400">
                        {t.classLevel} • {t.examType}
                      </p>

                      <div className="flex gap-2 mt-2 flex-wrap">
                        {t.revisionMode && (
                          <span className="text-xs bg-green-900 px-2 rounded">
                            Rev
                          </span>
                        )}
                        {t.includeDiagram && (
                          <span className="text-xs bg-purple-900 px-2 rounded">
                            Dia
                          </span>
                        )}
                        {t.includeChart && (
                          <span className="text-xs bg-yellow-900 px-2 rounded">
                            Chart
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 📄 CONTENT */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* ☰ Toggle (mobile only) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="mb-4 px-3 py-2 bg-white/10 rounded-lg md:hidden"
          >
            ☰ Menu
          </button>

          {/* Content */}
          {loading && <p className="text-gray-400 text-sm">Loading notes...</p>}

          {!loading && !selectedNotes && (
            <div className="text-gray-500 text-center mt-20 text-sm md:text-base">
              Select a note from sidebar 📂
            </div>
          )}

          {!loading && selectedNotes && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FinalResult result={selectedNotes} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
