"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Predict = () => {
  const [formData, setFormData] = useState({
    Gender: "1",
    Married: "1",
    Dependents: "0",
    Education: "1",
    Self_Employed: "0",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "1",
    Property_Area: "1",
  });

  const [prediction, setPrediction] = useState<null | number>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [factors, setFactors] = useState<any[]>([]);
  const [recommendation, setRecommendation] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = axios.post("/api/predict", formData);
      toast.promise(res, {
        loading: "Predicting...",
        success: (data) => {
          setPrediction(data.data.prediction);
          setConfidence(data.data.confidence);
          setFactors(data.data.factors);
          setRecommendation(data.data.recommendation);
          return "Prediction successful";
        },
        error: (err) => err.response?.data?.message || "Prediction failed",
      });
    } catch (err) {
      console.error("Prediction failed", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-2 text-primary text-center uppercase">
        Loan Approval Prediction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-6 bg-base-100 shadow rounded-lg"
      >
        {[
          { name: "Gender", label: "Gender", options: ["Male", "Female"] },
          { name: "Married", label: "Married", options: ["Yes", "No"] },
          {
            name: "Dependents",
            label: "Number of Dependents",
            options: ["0", "1", "2", "3+"],
          },
          {
            name: "Education",
            label: "Education",
            options: ["Graduate", "Not Graduate"],
          },
          {
            name: "Self_Employed",
            label: "Self Employed",
            options: ["Yes", "No"],
          },
          {
            name: "Credit_History",
            label: "Credit History",
            options: ["Good", "Bad"],
          },
          {
            name: "Property_Area",
            label: "Property Area",
            options: ["Rural", "Semiurban", "Urban"],
          },
        ].map((field) => (
          <label className="form-control w-full" key={field.name}>
            <div className="label">
              <span className="text-base-content/80 mb-2">{field.label}</span>
            </div>
            <select
              name={field.name}
              className="select select-primary"
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
            >
              {field.options.map((option, i) => (
                <option key={i} value={String(i)}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}

        {[
          {
            name: "ApplicantIncome",
            label: "Applicant Income",
            placeholder: "e.g. 5000",
          },
          {
            name: "CoapplicantIncome",
            label: "Coapplicant Income",
            placeholder: "e.g. 2000",
          },
          { name: "LoanAmount", label: "Loan Amount", placeholder: "e.g. 120" },
          {
            name: "Loan_Amount_Term",
            label: "Loan Term (in days)",
            placeholder: "e.g. 360",
          },
        ].map((field) => (
          <label className="form-control w-full" key={field.name}>
            <div className="label">
              <span className="text-base-content/80 mb-2">{field.label}</span>
            </div>
            <input
              type="number"
              name={field.name}
              className="input input-primary"
              placeholder={field.placeholder}
              required
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
            />
          </label>
        ))}

        <div className="col-span-full mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Predict
          </button>
        </div>
      </form>

      {prediction !== null && (
        <div className="mt-10 p-6 bg-base-100 border rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Loan Eligibility Results</h3>

          <div className="mb-4">
            {prediction === 1 ? (
              <div className="alert alert-success">
                ✅ <strong>Approved:</strong> Based on our prediction model,
                your loan is likely to be approved.
              </div>
            ) : (
              <div className="alert alert-error">
                ❌ <strong>Not Approved:</strong> Based on our prediction model,
                you may not be approved for this loan.
              </div>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium">Approval Confidence:</p>
            <progress
              className="progress progress-primary w-full"
              value={confidence}
              max="100"
            />
            <p className="text-sm mt-1">{confidence}%</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">
              Key Factors Affecting Decision
            </h4>
            <ul className="space-y-1">
              {factors.map((factor, idx) => (
                <li key={idx}>
                  <span
                    className={`badge mr-2 ${
                      factor.sentiment === "Positive"
                        ? "badge-success"
                        : factor.sentiment === "Negative"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {factor.sentiment}
                  </span>
                  {factor.label}: <strong>{factor.value}</strong>
                  <p className="text-sm text-base-content/80">
                    {factor.explanation}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Recommendation</h4>
            <p>{recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predict;
