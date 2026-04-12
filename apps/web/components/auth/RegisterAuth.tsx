"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/Logo.png";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterAuth() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-black text-white flex-col justify-between p-10">
        <div className="text-xl font-bold"><Image src={Logo} alt="" width={32} height={32} className="h-8 w-8" priority /></div>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Learn Smarter. <br />
            Build Faster. <br />
            Grow Anywhere.
          </h1>
          <p className="mt-4 text-gray-300">
            Adaptive learning platform to boost your coding and concepts.
          </p>
        </div>

        <div className="text-sm text-gray-400">© 2026 AdaptiveLearn</div>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started</p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg hover:bg-gray-800"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
