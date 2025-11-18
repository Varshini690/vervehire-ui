import { useState } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function CoverLetter() {
  const [jd, setJd] = useState("");
  const [letter, setLetter] = useState("");

  const generateLetter = async () => {
    if (!jd) return alert("Enter Job Description");

    try {
      const res = await api.post("resume/cover-letter/", { jd });
      setLetter(res.data.cover_letter);
    } catch (err) {
      alert("Upload a resume first!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-2xl mx-auto"
    >
      {/* Header */}
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#5CD6A4" }}
      >
        AI Cover Letter Generator
      </h2>

      {/* JD Text Area */}
      <textarea
        className="border p-3 w-full h-36 rounded-lg shadow-sm focus:outline-none"
        style={{ borderColor: "#5CD6A4" }}
        placeholder="Paste Job Description…"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      {/* Generate Button */}
      <motion.button
        onClick={generateLetter}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full text-white px-4 py-3 rounded-lg shadow-md mt-4 font-semibold text-lg"
        style={{ backgroundColor: "#5CD6A4" }}
      >
        Generate Cover Letter
      </motion.button>

      {/* Generated Cover Letter */}
      <AnimatePresence>
        {letter && (
          <motion.div
            key="coverLetterOutput"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-5 rounded-xl shadow-md whitespace-pre-line"
            style={{ backgroundColor: "#E9FFF4" }}
          >
            <p className="text-gray-800 leading-relaxed">{letter}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
