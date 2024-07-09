// app/api/psgc/regions/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const response = await axios.get("https://psgc.vercel.app/api/region");
  return NextResponse.json(response.data);
}
