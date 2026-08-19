"use server";
import { getServerSession } from "next-auth";
import { NextOptions } from "./app/api/auth/[...nextauth]/route";

export async function getUserToken() {
  try {
    const session = await getServerSession(NextOptions);
    return session?.accessToken;
  } catch (error) {
    throw error;
  }
}
