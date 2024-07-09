// app/api/psgc/municipalities/[provinceCode]/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  const { provinceCode } = params;
  const response = await axios.get(
    `https://psgc.vercel.app/api/province/${provinceCode}/city`
  );
  return NextResponse.json(response.data);
}
