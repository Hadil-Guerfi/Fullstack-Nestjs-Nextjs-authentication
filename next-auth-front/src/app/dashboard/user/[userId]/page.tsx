import { auth } from "@/app/auth";
import { BACKEND_URL } from "@/app/lib/Constants";
import { error } from "console";
import React from "react";

async function UserPage({ params }: { params: { userId: string } }) {
  const session = await auth();
  const res = await fetch(`${BACKEND_URL}/users/${params.userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    console.error("Unauthorized");
    return;
  }

  if (!res.ok) {
    console.error("Failed to fetch user data");
    return;
  }

  const user = await res.json();

  return (
    <div className="m-2 border rounded shadow overflow-hidden">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        User Profile
      </div>

      <div className="grid grid-cols-2  p-2 gap-2">
        <p className="p-2 text-slate-400">Name:</p>
        <p className="p-2 text-slate-950">{user?.username}</p>
        <p className="p-2 text-slate-400">Email:</p>
        <p className="p-2 text-slate-950">{user?.email}</p>
      </div>
    </div>
  );
}

export default UserPage;
