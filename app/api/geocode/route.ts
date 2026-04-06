import { cs } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ' London')}&format=jsonv2&polygon_geojson=1&addressdetails=1&limit=1`,
      {
        headers: {
          // REQUIRED by Nominatim policy
          "User-Agent": "KXHStorageApp/1.0 (help@kxhlogistics.co.uk)",
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(
      data.map((item: any) => ({
        displayName: item.display_name,
        lat: item.lat,
        lon: item.lon,
        address: item.address,
      }))
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Geocode failed" }, { status: 500 });
  }
}