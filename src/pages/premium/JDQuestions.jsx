import { useState } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function JDQuestions() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const generate = async () => {
    if (!jd) return alert("Enter Job Description");

    try {
      const res = await api.post("resume/jd-questions/", { jd });
      setResult(res.data.questions);
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
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#5CD6A4" }}
      >
        JD Based Questions
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full text-white px-4 py-3 rounded-lg shadow-md mt-4 font-semibold text-lg"
        style={{ backgroundColor: "#5CD6A4" }}
        onClick={generate}
      >
        Generate Questions
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            key="jdResults"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="mt-6 p-5 rounded-xl shadow-md"
            style={{ backgroundColor: "#E9FFF4" }}
          >
            {result.questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="mb-5 border-b pb-3"
              >
                <p className="text-lg font-semibold" style={{ color: "#5CD6A4" }}>
                  Q{i + 1}: {q.question}
                </p>

                <p className="text-gray-700 mt-1 text-sm">
                  <strong>Skill:</strong> {q.skill}
                </p>

                <p className="text-gray-700 mt-1 text-sm whitespace-pre-line">
                  <strong>Ideal Answer:</strong> {q.ideal_answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
