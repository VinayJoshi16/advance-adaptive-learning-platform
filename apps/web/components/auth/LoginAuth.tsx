"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../../assets/Logo.png";

interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginAuth() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center text-white p-10 flex-col justify-between"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
        }}
      >
        <div className="text-xl font-bold"><Image src={Logo} alt="" width={50} height={50} className="h-8 w-8" priority /></div>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Learn Smarter. <br />
            Build Faster. <br />
            Grow Anywhere.
          </h1>
          <p className="mt-4 text-gray-200">
            Personalized paths, feedback, and recommendations that adapt to you.
          </p>
        </div>

        <div className="text-sm text-gray-300">© 2026 AdaptiveLearn</div>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-gray-500 text-sm">Log in to your account</p>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember Me
            </label>

            <span className="text-blue-500 cursor-pointer">Forgot Password?</span>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg hover:bg-gray-800"
          >
            Login
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <hr className="flex-1" />
            Or continue with
            <hr className="flex-1" />
          </div>

          <button
            type="button"
            className="border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-black font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
