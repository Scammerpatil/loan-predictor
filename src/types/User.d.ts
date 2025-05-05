export interface User {
  name: string;
  email: string;
  contact: string;
  password: string;
  income: string;
  creditScore: string;
  role?: "user" | "admin";
  jobTitle?: string;
  location?: string;
  profileImage?: string;
  panCard: {
    number: string;
    image: string;
  };
  aadharCard: {
    number: string;
    image: string;
  };
  salarySlip: string;
  addressProof: string;
  otp: string;
}
