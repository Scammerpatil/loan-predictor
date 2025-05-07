"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { IconBuildingBank, IconLogout } from "@tabler/icons-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/AuthProvider";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
    const res = axios.get("/api/auth/logout");
    toast.promise(res, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: (err) => err.response?.data?.message || "Logout failed",
    });
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="navbar px-6 py-2 bg-base-300">
      <div className="navbar-start">
        <Link
          href="/user/dashboard"
          className="text-2xl font-bold flex items-center py-2 rounded-lg hover:bg-base-200 transition-colors duration-300"
        >
          <IconBuildingBank size={48} className="text-secondary mx-2" />
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex items-baseline gap-[2px]">
              <span className="text-primary font-extrabold text-xl">Loan</span>
              <span className="text-accent font-semibold text-xl">
                Predictor
              </span>
            </div>
            <span className="text-sm text-base-content/70 italic">
              Har sapne ke liye ek loan – Asaan, Tez, Vishwas ke saath.
            </span>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base text-base-content">
          <li>
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/applications">Applications</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end space-x-3">
        <ThemeToggler />
        <div className="dropdown dropdown-left cursor-pointer bg-transparent">
          <Image
            src={user.profileImage!}
            alt="Avatar"
            className="rounded-full"
            width={40}
            height={40}
            tabIndex={0}
            role="button"
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-base-content rounded-full text-xl font-bold">
                {user.name[0].toUpperCase()}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-lg font-semibold text-base-content">
                {user.name}
              </span>
            </div>
            <hr className="my-2 border-base-content" />
            <div className="flex flex-col">
              <button
                onClick={handleLogout}
                className="text-left px-4 py-2 text-base-content hover:bg-base-200 transition duration-200"
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
