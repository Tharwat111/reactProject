import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleForgotPassword(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      toast.success("Code sent to your email");
      localStorage.setItem("resetEmail", email);
      navigate("/ResetCode");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center gap-8 mt-12">
      <header className="flex flex-col gap-4 text-center">
        <h2 className="font-extrabold text-primary text-2xl">
          Forgot your password?
        </h2>
        <p className="text-gray-500 text-sm">
          Your password will be reset by email.
        </p>
      </header>

      <form onSubmit={handleForgotPassword} className="w-[300px] sm:w-[350px]">
        <label
          className="text-left text-xs font-bold text-gray-600"
          htmlFor="email"
        >
          Enter your email address
        </label>

        <div className="mt-1 mb-5">
          <input
            autoComplete="off"
            id="email"
            type="email"
            name="email"
            required
            className="form-control border border-gray-300 rounded-md p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Next"}
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
