"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();

  const form = useForm();

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess("Login successful!");
      router.push("/dashboard"); // Redirect to your desired page after login
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <>
          <div>
            <label className="block mb-2">Email</label>
            <input
              {...form.register("email")}
              placeholder="john.doe@example.com"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              {...form.register("password")}
              placeholder="******"
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
