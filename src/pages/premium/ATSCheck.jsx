import { useState } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ATSCheck() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleATS = async () => {
    try {
      setLoading(true);
      const res = await api.post("resume/ats-check/"); // No resume_id needed
      setResult(res.data.ats);
    } catch (err) {
      alert("Upload a resume first!");
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
      <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "#5CD6A4" }}>
        ATS Compatibility Check
      </h2>

      <motion.button
        onClick={handleATS}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full text-white px-4 py-3 rounded-lg shadow-md font-semibold text-lg"
        style={{ backgroundColor: "#5CD6A4" }}
      >
        {loading ? "Checking..." : "Run ATS Check"}
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            key="atsResult"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="mt-6 p-5 rounded-xl shadow-md"
            style={{ backgroundColor: "#E9FFF4" }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: "#5CD6A4" }}>
              ATS Score: {result.ats_score}
            </h3>

            {/* Missing Keywords */}
            <div className="mt-4">
              <h4 className="font-semibold" style={{ color: "#5CD6A4" }}>
                Missing Keywords:
              </h4>
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {result.missing_keywords.map((k, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {k}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Format Issues */}
            <div className="mt-4">
              <h4 className="font-semibold" style={{ color: "#5CD6A4" }}>
                Format Issues:
              </h4>
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {result.format_issues.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="mt-4">
              <h4 className="font-semibold" style={{ color: "#5CD6A4" }}>
                Suggestions:
              </h4>
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {result.suggestions.map((s, i) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
