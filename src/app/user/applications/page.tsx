"use client";
import { Application } from "@/types/Application";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchApplications = async () => {
    const res = await axios.get("/api/user/getApplications");
    setApplications(res.data.applications || []);
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 uppercase text-center">
        My Loan Applications
      </h1>
      <div className="overflow-x-auto bg-base-300 rounded-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Loan Amount</th>
              <th>Term</th>
              <th>Income</th>
              <th>Eligibility</th>
              <th>Model Result</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center">
                  No Applications Found
                </td>
              </tr>
            ) : (
              applications.map((app: any, idx: number) => (
                <tr key={app._id}>
                  <td>{idx + 1}</td>
                  <td>₹ {app.loanAmount}</td>
                  <td>{app.loanAmountTerm} months</td>
                  <td>₹ {app.applicantIncome}</td>
                  <td>
                    {app.eligibilityScore !== null
                      ? app.eligibilityScore.toFixed(2) + " %"
                      : "N/A"}
                  </td>
                  <td>{app.modelResult || "Pending"}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.adminStatus === "Approved"
                          ? "badge-success"
                          : app.adminStatus === "Rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {app.adminStatus}
                    </span>
                  </td>
                  <td>{app.adminRemarks || "-"}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this application?"
                          )
                        ) {
                          const res = axios.delete(
                            `/api/user/delete-application?id=${app._id}`
                          );
                          toast.promise(res, {
                            loading: "Deleting...",
                            success: () => {
                              fetchApplications();
                              return "Application deleted successfully";
                            },
                            error: (err) =>
                              err.response?.data?.message ||
                              "Failed to delete application",
                          });
                        }
                      }}
                    >
                      Delete <IconTrash size={24} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/user/new-applications" className="btn btn-primary">
          Apply for New Loan
        </Link>
      </div>
    </div>
  );
}
