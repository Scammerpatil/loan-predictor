"use client";

import { useEffect, useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { Application } from "@/types/Application";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [remarks, setRemarks] = useState<{ [id: string]: string }>({});
  const [filters, setFilters] = useState({
    name: "",
    propertyArea: "",
    modelResult: "",
    adminStatus: "",
  });

  const fetchApplications = async () => {
    try {
      const res = await axios.get("/api/admin/applications");
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (applicationId: string) => {
    const remark = remarks[applicationId];
    if (!remark || remark.trim() === "") {
      toast.error("Please provide a remark before approving.");
      return;
    }
    try {
      const res = axios.put(
        `/api/admin/application?id=${applicationId}&status=Approved`,
        { remarks: remark }
      );
      toast.promise(res, {
        loading: "Approving application...",
        success: () => {
          fetchApplications();
          return "Application approved successfully";
        },
        error: "Error approving application",
      });
    } catch (err) {
      console.error("Error approving application", err);
    }
  };

  const handleReject = async (applicationId: string) => {
    const remark = remarks[applicationId];
    if (!remark || remark.trim() === "") {
      toast.error("Please provide a remark before approving.");
      return;
    }
    try {
      const res = axios.put(
        `/api/admin/application?id=${applicationId}&status=Rejected`,
        { remarks: remark }
      );
      toast.promise(res, {
        loading: "Rejecting application...",
        success: () => {
          fetchApplications();
          return "Application rejected successfully";
        },
        error: "Error rejecting application",
      });
    } catch (err) {
      console.error("Error rejecting application", err);
    }
  };

  const downloadExcel = (data: Application[]) => {
    const formatted = data.map((a) => ({
      Name: a.user.name,
      Email: a.user.email,
      LoanAmount: a.loanAmount,
      ApplicantIncome: a.applicantIncome,
      CoApplicantIncome: a.coapplicantIncome,
      LoanTerm: a.loanAmountTerm,
      PropertyArea: a.propertyArea,
      CreditHistory: a.creditHistory,
      EligibilityScore: a.eligibilityScore,
      ModelResult: a.modelResult,
      AdminStatus: a.adminStatus,
      AdminRemarks: a.adminRemarks,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    XLSX.writeFile(workbook, "loan_applications.xlsx");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary uppercase text-center">
        Manage Applications
      </h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select
          className="select select-bordered"
          value={filters.propertyArea}
          onChange={(e) =>
            setFilters({ ...filters, propertyArea: e.target.value })
          }
        >
          <option value="">All Areas</option>
          <option value="Urban">Urban</option>
          <option value="Semiurban">Semiurban</option>
          <option value="Rural">Rural</option>
        </select>
        <select
          className="select select-bordered"
          value={filters.modelResult}
          onChange={(e) =>
            setFilters({ ...filters, modelResult: e.target.value })
          }
        >
          <option value="">All Eligibility</option>
          <option value="Eligible">Eligible</option>
          <option value="Not Eligible">Not Eligible</option>
        </select>
        <select
          className="select select-bordered"
          value={filters.adminStatus}
          onChange={(e) =>
            setFilters({ ...filters, adminStatus: e.target.value })
          }
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => downloadExcel(applications)}
        >
          Download Excel
        </button>
      </div>

      <div className="bg-base-300 rounded-lg shadow p-6 border border-base-200">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Loan Amount</th>
                <th>Applicant Income</th>
                <th>Co-Applicant Income</th>
                <th>Loan Term</th>
                <th>Property Area</th>
                <th>Credit History</th>
                <th>Eligibility Score</th>
                <th>Model Result</th>
                <th>Status</th>
                <th>Admin Remark</th>
                <th>Action</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {applications
                .filter((a) =>
                  a.user.name.toLowerCase().includes(filters.name.toLowerCase())
                )
                .filter((a) =>
                  filters.propertyArea
                    ? a.propertyArea === filters.propertyArea
                    : true
                )
                .filter((a) =>
                  filters.modelResult
                    ? a.modelResult === filters.modelResult
                    : true
                )
                .filter((a) =>
                  filters.adminStatus
                    ? a.adminStatus === filters.adminStatus
                    : true
                )
                .map((application) => (
                  <tr key={application._id}>
                    <td>{application.user.name}</td>
                    <td>₹ {application.loanAmount}</td>
                    <td>₹ {application.applicantIncome}</td>
                    <td>₹ {application.coapplicantIncome}</td>
                    <td>{application.loanAmountTerm} months</td>
                    <td>{application.propertyArea}</td>
                    <td>{application.creditHistory}</td>
                    <td>{application.eligibilityScore}</td>
                    <td>
                      <span
                        className={`badge ${
                          application.modelResult === "Eligible"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {application.modelResult}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          application.adminStatus === "Approved"
                            ? "badge-success"
                            : application.adminStatus === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {application.adminStatus}
                      </span>
                    </td>
                    <th>
                      {application.adminRemarks ? (
                        <span className="badge badge-info">
                          {application.adminRemarks}
                        </span>
                      ) : (
                        <input
                          type="text"
                          className="input input-primary"
                          value={remarks[application._id!] || ""}
                          onChange={(e) =>
                            setRemarks({
                              ...remarks,
                              [application._id!]: e.target.value,
                            })
                          }
                        />
                      )}
                    </th>
                    <td>
                      {application.adminStatus === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              handleApprove(
                                application._id as unknown as string
                              )
                            }
                          >
                            <IconCheck size={16} /> Approve
                          </button>
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() =>
                              handleReject(application._id as unknown as string)
                            }
                          >
                            <IconX size={16} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="badge badge-secondary">
                          {application.adminStatus === "Approved"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      )}
                    </td>
                    <th>
                      <Link
                        href={`/admin/application?id=${application._id}`}
                        className="btn btn-sm btn-primary ml-2"
                      >
                        View Details
                      </Link>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
