import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

function Login({ setIsLoggedIn }) {
  const [identifier, setIdentifier] = useState(""); // Accepts email or username
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();  // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true); // Update the parent state
        navigate("/check-form");  // Navigate to the next page after login
      } else {
        setErrorMessage(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="bg-white/10 rounded-full p-4"
              >
                <Stethoscope size={40} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-center">Healthcare Portal</h2>
            <p className="text-center mt-2 text-cyan-100">Secure access for professionals</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm text-center mb-4"
              >
                {errorMessage}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username or Email Input */}
              <motion.div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {identifier.includes("@") ? (
                      <Mail className="h-5 w-5 text-gray-400" />
                    ) : (
                      <User className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 font-medium transition-all duration-200 ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:from-cyan-700 hover:to-blue-700"
                  }`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <motion.a
                  href="/signup"
                  className="text-cyan-600 hover:text-cyan-800 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register here
                </motion.a>
              </p>
            </div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <Lock className="w-4 h-4 mr-2" />
                <span>Secure, encrypted login</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
