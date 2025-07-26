import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleResetPassword(e) {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      toast.error("No email found. Please go back and start again.");
      return;
    }

    setLoading(true);
    try {
      await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
      });
      toast.success("Password reset successfully");
      localStorage.removeItem("resetEmail");
      navigate("/Login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center gap-8 mt-12">
      <header className="flex flex-col gap-4 text-center">
        <h2 className="font-extrabold text-primary text-2xl">Set new password</h2>
        <p className="text-gray-500 text-sm">Enter your new password below.</p>
      </header>

      <form onSubmit={handleResetPassword} className="text-center w-[300px] sm:w-[350px]">
        <label htmlFor="newPassword" className="text-left text-xs font-bold text-gray-600">
          New Password
        </label>
        <div className="mt-1 mb-5">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            required
            className="form-control border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <footer className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full py-2 rounded-md text-white font-semibold transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-darkPrimary"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link
            className="text-xs text-primary font-bold inline-block mt-4 hover:underline"
            to={"/Login"}
          >
            Back to log in
          </Link>
        </footer>
      </form>
    </section>
  );
}
