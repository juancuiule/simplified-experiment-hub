import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const body = await request.json();
  
  const res = await fetch(`https://dev-datastore.elgatoylacaja.com/payloads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      key: slug,
      data: {
        ...body,
        timestamp: Date.now(),
        date: new Date().toUTCString(),
      },
    }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
