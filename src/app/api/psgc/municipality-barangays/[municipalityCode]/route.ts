// app/api/psgc/barangays/[municipalityCode]/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  const { municipalityCode } = params;
  const response = await axios.get(
    `https://psgc.vercel.app/api/municipality/${municipalityCode}/barangay`
  );
  return NextResponse.json(response.data);
}
