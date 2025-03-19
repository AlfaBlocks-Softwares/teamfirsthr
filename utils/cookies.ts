"use server";
import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
  // maxAge: 1 * 24 * 60 * 60, // 1 day expiration
  path: "/",
  httpOnly: true,
};

/**
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 */

export async function createCookie(name: string, value: string) {
  "use server";
  (await cookies()).set(name, value, COOKIE_OPTIONS);
}

/**
 * Deletes a cookie
 * @param {string} name - Cookie name
 */
export async function deleteCookie(name: string) {
  "use server";
  (await cookies()).delete(name);
}
