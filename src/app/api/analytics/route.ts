import { NextResponse } from "next/server";
import { analytics } from "@/mocks/analytics";

export async function GET() {
  return NextResponse.json({ analytics });
}
