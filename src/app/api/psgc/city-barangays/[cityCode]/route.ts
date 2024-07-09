import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  const { cityCode } = params;
  const response = await axios.get(
    `https://psgc.vercel.app/api/city/${cityCode}/barangay`
  );
  return NextResponse.json(response.data);
}
