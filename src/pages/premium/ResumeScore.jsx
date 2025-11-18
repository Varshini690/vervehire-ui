import { useState } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeScore() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScore = async () => {
    try {
      setLoading(true);
      const res = await api.post("resume/score/");
      setResult(res.data.analysis);
    } catch (err) {
      alert("Please upload a resume first!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-2xl mx-auto"
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#5CD6A4" }}
      >
        Resume Score
      </h2>

      {/* Generate Score Button */}
      <motion.button
        onClick={handleScore}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full text-white px-4 py-3 rounded-lg shadow-md font-semibold text-lg"
        style={{ backgroundColor: "#5CD6A4" }}
      >
        {loading ? "Scoring..." : "Generate Score"}
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            key="scoreResult"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="mt-6 p-5 rounded-xl shadow-md"
            style={{ backgroundColor: "#E9FFF4" }}
          >
            {/* Score Display */}
            <h3 className="text-xl font-bold mb-2" style={{ color: "#5CD6A4" }}>
              Score: {result.score}
            </h3>
            <p className="text-gray-700 text-md">
              <strong>ATS Score:</strong> {result.ats_score}
            </p>

            {/* Strengths */}
            <div className="mt-4">
              <h4 className="font-semibold" style={{ color: "#5CD6A4" }}>
                Strengths:
              </h4>
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {result.strengths.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="mt-4">
              <h4 className="font-semibold" style={{ color: "#5CD6A4" }}>
                Weaknesses:
              </h4>
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {result.weaknesses.map((w, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {w}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
