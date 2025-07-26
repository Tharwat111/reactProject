import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetCode() {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      });
      toast.success("Code verified successfully");
      navigate("/ResetPassword");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid reset code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center gap-8 mt-12">
      <header className="text-center space-y-2">
        <i className="fa-regular fa-envelope text-primary text-3xl"></i>
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p className="text-xs text-gray-600">A reset code has been sent to your email</p>
      </header>

      <form onSubmit={handleSubmit} className="text-center w-[300px] sm:w-[350px]">
        <label htmlFor="resetCode" className="text-left text-xs font-bold text-gray-600 block mb-1">
          Reset Code
        </label>
        <div className="mb-5">
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            required
            className="form-control border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter Reset Code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
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
            {loading ? "Verifying..." : "Next"}
          </button>

          <Link
            className="text-xs text-primary font-bold inline-block mt-4 hover:underline"
            to={"/ForgetPassword"}
          >
            Back to Forgot Password
          </Link>
        </footer>
      </form>
    </section>
  );
}
