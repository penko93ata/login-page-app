"use server";

import { clearResetAccess } from "@/lib/session";
import { redirect } from "next/navigation";

export async function clearAccessAndRedirect() {
  await clearResetAccess();
  redirect("/login");
}
