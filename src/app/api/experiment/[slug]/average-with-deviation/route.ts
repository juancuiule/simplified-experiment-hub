import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const dataKeys = searchParams.get("dataKeys");
  const { slug } = params;

  const url = `https://datastore-dev.elgatoylacaja.com/payloads/${slug}/average-with-deviation?dataKeys=${dataKeys}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
