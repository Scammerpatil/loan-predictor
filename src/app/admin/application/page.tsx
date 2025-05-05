"use client";
import { Application } from "@/types/Application";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ApplicationPage = () => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id") as string;
  const [application, setApplication] = useState<Application>(
    {} as Application
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/admin/get-application?id=${applicationId}`
      );
      setApplication(res.data.application);
    } catch (error) {
      console.error("Error fetching application", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center uppercase text-primary">
        Loan Application Details
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-72">
          {/* DaisyUI loading spinner */}
          <div className="animate-spin rounded-full w-16 h-16 border-t-4 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Details */}
          <div className="card bg-base-300 shadow-xl p-4">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              User Details
            </h2>
            <div className="space-y-2">
              <p>
                <b>Name:</b> {application.user?.name}
              </p>
              <p>
                <b>Email:</b> {application.user?.email}
              </p>
              <p>
                <b>Contact:</b> {application.user?.contact}
              </p>
              <p>
                <b>Location:</b> {application.user?.location || "N/A"}
              </p>
              <p>
                <b>Income:</b> ₹{application.user?.income}
              </p>
              <p>
                <b>Credit Score:</b> {application.user?.creditScore}
              </p>
              <p>
                <b>Job Title:</b> {application.user?.jobTitle || "N/A"}
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="card bg-base-300 shadow-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="space-y-4">
              <div>
                <p>
                  <b>PAN Number:</b> {application.user?.panCard.number}
                </p>
                <img
                  src={application.user?.panCard.image}
                  alt="PAN"
                  className="w-full rounded border"
                />
              </div>
              <div>
                <p>
                  <b>Aadhar Number:</b> {application.user?.aadharCard.number}
                </p>
                <img
                  src={application.user?.aadharCard.image}
                  alt="Aadhar"
                  className="w-full rounded border"
                />
              </div>
              <div>
                <p>
                  <b>Salary Slip:</b>
                </p>
                <img
                  src={application.user?.salarySlip}
                  alt="Salary Slip"
                  className="w-full rounded border"
                />
              </div>
              <div>
                <p>
                  <b>Address Proof:</b>
                </p>
                <img
                  src={application.user?.addressProof}
                  alt="Address Proof"
                  className="w-full rounded border"
                />
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="card bg-base-300 shadow-xl p-4 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Application Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <b>Gender:</b> {application.gender}
              </p>
              <p>
                <b>Married:</b> {application.married}
              </p>
              <p>
                <b>Dependents:</b> {application.dependent}
              </p>
              <p>
                <b>Education:</b> {application.education}
              </p>
              <p>
                <b>Applicant Income:</b> ₹{application.applicantIncome}
              </p>
              <p>
                <b>Coapplicant Income:</b> ₹{application.coapplicantIncome}
              </p>
              <p>
                <b>Loan Amount:</b> ₹{application.loanAmount}
              </p>
              <p>
                <b>Loan Term:</b> {application.loanAmountTerm} months
              </p>
              <p>
                <b>Credit History:</b> {application.creditHistory}
              </p>
              <p>
                <b>Property Area:</b> {application.propertyArea}
              </p>
              <p>
                <b>AI Prediction:</b> {application.modelResult || "N/A"} (
                {application.eligibilityScore || "N/A"})
              </p>
              <p>
                <b>Admin Status:</b> {application.adminStatus}
              </p>
              <p>
                <b>Admin Remarks:</b> {application.adminRemarks || "None"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MainPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <ApplicationPage />
    </Suspense>
  );
};

const Skeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 animate-pulse space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary uppercase bg-base-300 rounded h-10 w-2/3 mx-auto"></h1>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Details Skeleton */}
        <div className="card bg-base-300 shadow-xl p-4 space-y-4">
          <div className="h-6 skeleton rounded w-1/2 mx-auto"></div>
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-4 skeleton rounded w-full"></div>
            ))}
          </div>
        </div>

        {/* Documents Skeleton */}
        <div className="card bg-base-300 shadow-xl p-4 space-y-4">
          <div className="h-6 skeleton rounded w-1/2"></div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 skeleton rounded w-2/3 mb-2"></div>
              <div className="h-40 skeleton rounded w-full"></div>
            </div>
          ))}
        </div>

        {/* Application Details Skeleton */}
        <div className="card bg-base-300 shadow-xl p-4 col-span-full space-y-4">
          <div className="h-6 skeleton rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="h-4 skeleton rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
