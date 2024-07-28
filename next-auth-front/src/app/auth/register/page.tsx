"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { BACKEND_URL } from "@/app/lib/Constants";

function RegisterPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();

  const form = useForm();

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    const res = await fetch(BACKEND_URL + "/users", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        birthdate: data.birthdate,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess("Register successful!");
      router.push("/auth/login"); // Redirect to login
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <>
          <div>
            <label className="block mb-2">Username</label>
            <input
              {...form.register("username")}
              placeholder="john.doe"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>{" "}
          <div>
            <label className="block mb-2">Birthdate</label>
            <input
              {...form.register("birthdate")}
              placeholder="2001-08-10"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>{" "}
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
