// app/api/psgc/provinces/[regionCode]/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  const { regionCode } = params;
  const response = await axios.get(
    `https://psgc.vercel.app/api/region/${regionCode}/province`
  );
  return NextResponse.json(response.data);
  );
  return NextResponse.json(response.data);
}
