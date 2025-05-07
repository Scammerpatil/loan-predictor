"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoanApplicationPage() {
  const [formData, setFormData] = useState({
    Gender: "0",
    Married: "0",
    Dependents: "0",
    Education: "0",
    Self_Employed: "0",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "0",
    Property_Area: "0",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = axios.post("/api/user/application", formData);
    toast.promise(res, {
      loading: "Submitting...",
      success: () => {
        return "Application submitted successfully!";
      },
      error: (error) => {
        console.error(error);
        return "Error submitting application.";
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow-lg bg-base-300">
      <h2 className="text-3xl font-semibold mb-2 text-primary text-center uppercase">
        Loan Application Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-6 bg-base-100 shadow rounded-lg"
      >
        {[
          { name: "Gender", label: "Gender", options: ["Male", "Female"] },
          { name: "Married", label: "Married", options: ["No", "Yes"] },
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
            options: ["No", "Yes"],
          },
          {
            name: "Credit_History",
            label: "Credit History",
            options: ["Bad", "Good"],
          },
          {
            name: "Property_Area",
            label: "Property Area",
            options: ["Semiurban", "Urban", "Rural"],
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
            Apply Now
          </button>
        </div>
      </form>
    </div>
  );
}
