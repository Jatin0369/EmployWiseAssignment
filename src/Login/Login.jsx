import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Both fields are required."); // Show error as toast
      return;
    }

    try {
      // Send request to /api/login; Vite proxy handles redirect to reqres API
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      // Check if login is successful
      if (response.data.token) {
        // Store the token in cookies (expires in 3 days)
        Cookies.set("authToken", response.data.token, { expires: 3 });
        toast.success("Login successful");
        // Navigate to the Users List page
        navigate("/emplist");
      } else {
        toast.error("Invalid email or password."); // Show error as toast
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred during login."
      );
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="login w-[30vw] py-4 shadow-lg border-blue-400 rounded-md bg-white">
        <p className="login-heading text-3xl font-semibold text-center mt-4">
          Login to your account
        </p>
        <form onSubmit={handleSubmit} className="mt-[2vw] w-[75%] mx-auto">
          <div className="p-2 mb-4">
            <label className="block w-full my-2 text-gray-400">Email: </label>
            <input
              placeholder="Email"
              className="border-2 border-grey rounded-md w-[90%] h-[2.4vw] p-2 focus:border-blue-400 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-container p-2 mb-4">
            <label className="block w-full my-2 text-gray-400">Password: </label>
            <input
              className="border-2 border-grey rounded-md w-[90%] h-[2.4vw] p-2 focus:border-blue-400 focus:outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-btn-container p-2 my-4">
            <button
              type="submit"
              className="login-btn block w-[90%] h-[2.4vw] rounded-md font-semibold bg-blue-400 text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
