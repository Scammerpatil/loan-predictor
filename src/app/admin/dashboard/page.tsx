"use client";

import { useEffect, useState } from "react";
import {
  IconReportMoney,
  IconClipboard,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Application } from "@/types/Application";

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsRes = await axios.get("/api/admin/applications");
        const chartRes = await axios.get("/api/admin/chart-data");

        setApplications(applicationsRes.data);
        setChartData(chartRes.data);
        setPendingCount(
          applicationsRes.data.filter(
            (app: Application) => app.adminStatus === "Pending"
          ).length
        );
        setApprovedCount(
          applicationsRes.data.filter(
            (app: Application) => app.adminStatus === "Approved"
          ).length
        );
        setRejectedCount(
          applicationsRes.data.filter(
            (app: Application) => app.adminStatus === "Rejected"
          ).length
        );
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary uppercase text-center">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="stats bg-base-300 shadow w-full rounded-lg p-6 border border-base-200">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconReportMoney size={24} />
          </div>
          <div className="stat-title">Total Applications</div>
          <div className="stat-value text-primary">{applications.length}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconClipboard size={24} />
          </div>
          <div className="stat-title">Pending</div>
          <div className="stat-value text-secondary">{pendingCount}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-success">
            <IconCheck size={24} />
          </div>
          <div className="stat-title">Approved</div>
          <div className="stat-value text-success">{approvedCount}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <IconX size={24} />
          </div>
          <div className="stat-title">Rejected</div>
          <div className="stat-value text-error">{rejectedCount}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-base-300 rounded-lg shadow p-6 border border-base-200">
        <h2 className="text-lg font-semibold mb-4 text-primary uppercase text-center">
          Applications Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="applications" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
