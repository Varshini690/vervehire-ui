import { useState, useContext } from "react";
import Select from "react-select";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { jobRoles } from "../data/jobRoles";
import { companies } from "../data/companies";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // <-- added

export default function InterviewSetup() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- added

  const [form, setForm] = useState({
    job_role: "",
    company: "",
    difficulty: "",
    interview_type: "",
    rounds: 1,
  });

  const [questionsByPage, setQuestionsByPage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const roleOptions = jobRoles.map((r) => ({ value: r, label: r }));
  const companyOptions = companies.map((c) => ({ value: c, label: c }));

  const fetchQuestions = async (pageNumber) => {
    if (questionsByPage[pageNumber]) return;

    try {
      setLoading(true);

      const res = await api.post(
        "/interview/setup/",
        { ...form, page: pageNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestionsByPage((prev) => ({
        ...prev,
        [pageNumber]: res.data.questions,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setQuestionsByPage({});
    setCurrentPage(1);
    await fetchQuestions(1);
  };

  const nextPage = async () => {
    const next = currentPage + 1;
    setCurrentPage(next);
    await fetchQuestions(next);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const questions = questionsByPage[currentPage] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ color: "#0f8f48", margin: 0 }}>Interview Setup</h1>

        {/* ⭐ Premium Button (Top Right) */}
        <button
          onClick={() => navigate("/premium")}
          style={{
            padding: "10px 18px",
            background: "#0f8f48",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            transition: "0.3s",
          }}
        >
          Premium Features
        </button>
      </div>

      {/* Job Role */}
      <Select
        options={roleOptions}
        placeholder="Search or select job role"
        onChange={(selected) => setForm({ ...form, job_role: selected.value })}
      />

      {/* Company */}
      <div style={{ marginTop: "12px" }}>
        <Select
          options={companyOptions}
          placeholder="Search company"
          onChange={(selected) => setForm({ ...form, company: selected.value })}
        />
      </div>

      {/* Difficulty */}
      <div style={{ marginTop: "12px" }}>
        <select
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "2px solid #0f8f48" }}
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Interview Type */}
      <div style={{ marginTop: "12px" }}>
        <select
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "2px solid #0f8f48" }}
          value={form.interview_type}
          onChange={(e) => setForm({ ...form, interview_type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
          <option value="System Design">System Design</option>
        </select>
      </div>

      {/* Rounds */}
      <div style={{ marginTop: "12px" }}>
        <input
          type="number"
          min={1}
          max={5}
          value={form.rounds}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "2px solid #0f8f48" }}
          onChange={(e) => setForm({ ...form, rounds: e.target.value })}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 18,
          padding: 14,
          width: "100%",
          background: "#0f8f48",
          color: "white",
          borderRadius: 10,
          cursor: "pointer",
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        {loading ? "Generating..." : "Save & Generate Questions"}
      </button>

      {/* Questions Display */}
      <AnimatePresence mode="wait">
        {questions.length > 0 && (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: 30,
              background: "#e9ffee",
              padding: 20,
              borderRadius: 12,
            }}
          >
            <h3 style={{ color: "#0f8f48" }}>Questions — Page {currentPage}</h3>

            {questions.map((q, idx) => (
              <p key={idx}>
                <strong>{(currentPage - 1) * 10 + idx + 1}.</strong> {q}
              </p>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                style={{
                  padding: 10,
                  background: "#0f8f48",
                  color: "white",
                  borderRadius: 10,
                  width: "48%",
                  cursor: "pointer",
                }}
              >
                Prev
              </button>

              <button
                onClick={nextPage}
                disabled={loading}
                style={{
                  padding: 10,
                  background: "#0f8f48",
                  color: "white",
                  borderRadius: 10,
                  width: "48%",
                  cursor: "pointer",
                }}
              >
                {loading ? "Loading..." : "Next"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
