'use client'
import { logout } from "@/actions";
import { CiLogout } from "react-icons/ci";

export const Logout = () => {
  return (
    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <button
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        onClick={() => logout()}
      >
        <CiLogout />
        <span className="group-hover:text-gray-700">Logout</span>
      </button>
    </div>
  );
};
