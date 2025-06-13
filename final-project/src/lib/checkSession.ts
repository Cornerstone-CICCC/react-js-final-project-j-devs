import { cookies } from "next/headers";

export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies()
  if (cookieStore.has("logged")) {
    return true
  }
  return false
}