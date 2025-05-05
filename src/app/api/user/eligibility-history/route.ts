import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import Application from "@/models/Application";

dbConfig();
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;
    console.log("User ID from token:", userId);
    const applications = await Application.find({ user: userId });

    const eligibilityHistory = [
      { month: "Jan", eligibility: 70 },
      { month: "Feb", eligibility: 74 },
      { month: "Mar", eligibility: 78 },
      { month: "Apr", eligibility: 81 },
      { month: "May", eligibility: 85 },
    ];
    return NextResponse.json(eligibilityHistory, { status: 200 });
  } catch (error) {
    console.error("Error fetching eligibility history:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
