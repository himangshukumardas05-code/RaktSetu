import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Heart, Eye, EyeOff, AlertCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Validation schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Please select a role"),
});

interface LoginFormData {
  email: string;
  password: string;
  role: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const selectedRole = watch("role");

  // ✅ Google Sign-In Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com", // Replace with actual client ID
          callback: handleGoogleSignIn,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    setIsGoogleLoading(true);
    setLoginError("");
    try {
      const payload = JSON.parse(atob(response.credential.split(".")[1]));
      const email = payload.email;

      let role = "donor";
      if (email.includes("admin")) role = "admin";
      else if (email.includes("hospital")) role = "hospital";
      else if (email.includes("seeker")) role = "seeker";

      const success = await login(email, "google-auth", role);

      if (success) {
        navigate(`/${role}/dashboard`);
      } else {
        setLoginError("Google sign-in failed. Please try again.");
      }
    } catch {
      setLoginError("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoginError("");
    const success = await login(data.email, data.password, data.role);
    if (success) {
      navigate(`/${data.role}/dashboard`);
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleButtonClick = () => {
    if (!selectedRole) {
      setLoginError("Please select a role before signing in with Google.");
      return;
    }
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const roles = [
    {
      value: "admin",
      label: "Administrator",
      color: "bg-blue-100 text-blue-800",
      icon: "👨‍💼",
    },
    {
      value: "donor",
      label: "Blood Donor",
      color: "bg-red-100 text-red-800",
      icon: "🩸",
    },
    {
      value: "seeker",
      label: "Blood Seeker",
      color: "bg-green-100 text-green-800",
      icon: "🔍",
    },
    {
      value: "hospital",
      label: "Hospital Staff",
      color: "bg-purple-100 text-purple-800",
      icon: "🏥",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-12 w-12 text-red-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900">RaktSetu</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-gray-600">
            Access your dashboard and manage your profile
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6"
        >
          {/* Error Message */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700 text-sm">{loginError}</span>
            </motion.div>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <label
                  key={role.value}
                  className="relative cursor-pointer transition-transform hover:scale-105"
                >
                  <input
                    {...register("role")}
                    type="radio"
                    value={role.value}
                    className="sr-only peer"
                  />
                  <div className="p-3 text-center border-2 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-gray-300 transition-all">
                    <div className="text-2xl mb-1">{role.icon}</div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${role.color} font-medium`}
                    >
                      {role.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-2 bg-white text-gray-500 text-sm">
              Or continue with
            </span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleButtonClick}
            disabled={isGoogleLoading || !selectedRole}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-transform hover:scale-105"
          >
            {isGoogleLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-gray-600 border-t-transparent rounded-full"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-2 bg-white text-gray-500 text-sm">
              Or sign in with email
            </span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pr-10 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <span className="text-gray-700">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting || loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-red-600 hover:text-red-500 transition-colors"
            >
              Register here
            </Link>
          </div>
        </motion.form>

        {/* Demo Credentials */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p className="font-medium">Demo Credentials:</p>
          <p>Email: any@email.com | Password: any | Select any role</p>
        </div>
      </motion.div>
    </div>
  );
};
