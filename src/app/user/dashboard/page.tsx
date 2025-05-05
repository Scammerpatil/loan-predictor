"use client";

import Link from "next/link";
import { useUser } from "@/context/AuthProvider";
import {
  IconUser,
  IconMessage2,
  IconTrendingUp,
  IconReportMoney,
  IconMoneybag,
  IconCreditCard,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
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

const Dashboard = () => {
  const { user } = useUser();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get("/api/user/eligibility-history");
        setChartData(res.data);
      } catch (err) {
        console.error("Chart data fetch failed", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary uppercase text-center">
        Welcome, {user?.name}
      </h1>

      {/* Stats */}
      <div className="stats bg-base-300 shadow w-full rounded-lg p-6 border border-base-200">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconMoneybag size={24} />
          </div>
          <div className="stat-title">Your Income</div>
          <div className="stat-value text-primary">
            ₹ {user?.income.toLocaleString()}
          </div>
          <div className="stat-desc">
            Income increased by 21% compared to last month
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconCreditCard size={24} />
          </div>
          <div className="stat-title">Credit Score</div>
          <div className="stat-value text-secondary">{user?.creditScore}</div>
          <div className="stat-desc">
            Improved by 21 points since last month
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={user?.profileImage} />
              </div>
            </div>
          </div>
          <div className="stat-value">{user?.jobTitle}</div>
          <div className="stat-title">Employment Status</div>
          <div className="stat-desc text-secondary">
            Helps determine loan eligibility
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-base-300 rounded-lg shadow p-6 border border-base-200">
        <h2 className="text-lg font-semibold mb-4 text-primary">
          Eligibility Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="eligibility" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/user/my-account"
          className="bg-primary text-primary-content p-5 rounded-lg flex flex-col items-center gap-2 hover:scale-105 transition"
        >
          <IconUser size={32} />
          <span>My Profile</span>
        </Link>

        <Link
          href="/user/predict"
          className="bg-secondary text-secondary-content p-5 rounded-lg flex flex-col items-center gap-2 hover:scale-105 transition"
        >
          <IconTrendingUp size={32} />
          <span>Loan Prediction</span>
        </Link>

        <Link
          href="/user/applications"
          className="bg-accent text-accent-content p-5 rounded-lg flex flex-col items-center gap-2 hover:scale-105 transition"
        >
          <IconReportMoney size={32} />
          <span>Applications</span>
        </Link>

        <Link
          href="/user/chatbot"
          className="bg-info text-info-content p-5 rounded-lg flex flex-col items-center gap-2 hover:scale-105 transition"
        >
          <IconMessage2 size={32} />
          <span>Chatbot</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
