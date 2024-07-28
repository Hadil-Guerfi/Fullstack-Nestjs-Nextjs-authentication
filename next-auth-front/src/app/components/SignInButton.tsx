import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { auth } from "../auth";

const SignInButton = async () => {
  const session = await auth();

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600 bg-red">{session.user.username}</p>
        <Link
          href={"/api/auth/signout"}
          className="flex gap-4 ml-auto text-red-600">
          Sign Out
        </Link>
        <div>{session.user.birthdate}</div>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link href={"/auth/login"} className="flex gap-4 ml-auto text-green-600">
        Sign In
      </Link>
      <Link
        href={"/auth/register"}
        className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded">
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;
