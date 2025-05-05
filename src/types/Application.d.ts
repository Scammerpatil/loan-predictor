import { User } from "./User";

export interface Application {
  _id?: string;
  user: User;
  gender: string;
  married: string;
  dependent: string;
  education: string;
  applicantIncome: string;
  coapplicantIncome: string;
  loanAmount: number;
  loanAmountTerm: number;
  creditHistory: string;
  propertyArea: string;
  eligibilityScore: number;
  modelResult: string;
  adminStatus: string;
  adminRemarks: string;
  createdAt: Date;
}
