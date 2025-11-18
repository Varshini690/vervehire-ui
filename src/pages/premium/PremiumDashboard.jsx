import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PremiumDashboard() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Resume Score",
      description: "AI-powered scoring & resume analysis.",
      path: "/score",
    },
    {
      title: "ATS Check",
      description: "ATS compatibility + keyword analysis.",
      path: "/ats",
    },
    {
      title: "JD-Based Questions",
      description: "AI-generated questions from any JD.",
      path: "/jd-questions",
    },
    {
      title: "Cover Letter",
      description: "Generate a tailored, professional cover letter.",
      path: "/cover-letter",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-10"
      style={{
        background: "linear-gradient(135deg, #E9FFF4, white)",
      }}
    >
      {/* Page Header */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-10"
        style={{ color: "#5CD6A4" }}
      >
        Premium Features
      </motion.h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(f.path)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              y: -8,
              boxShadow: "0px 15px 40px rgba(92,214,164,0.4)",
            }}
            className="p-7 rounded-2xl cursor-pointer relative overflow-hidden"
            style={{
              background: "white",
              border: "2px solid #5CD6A4",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(92,214,164,0.25), transparent 60%)",
              }}
            />

            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#3ABF85" }}
            >
              {f.title}
            </h2>

            <p className="text-gray-700 mb-4">{f.description}</p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 text-white rounded-lg font-semibold shadow-md"
              style={{ backgroundColor: "#5CD6A4" }}
            >
              Open
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
