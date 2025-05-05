"use client";

import { useState } from "react";

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure;

    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Number(emiValue.toFixed(2)));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-base-300 shadow-xl rounded-2xl p-8 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">EMI Calculator</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full border p-2 rounded"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Loan Tenure (Months)
            </label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={tenure}
              onChange={(e) => setTenure(parseFloat(e.target.value))}
            />
          </div>

          <button
            onClick={calculateEMI}
            className="btn btn-primary w-full mt-4"
          >
            Calculate EMI
          </button>

          {emi !== null && (
            <div className="alert alert-info mt-6 p-4 rounded">
              <strong>Monthly EMI:</strong> ₹{emi} /month
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
