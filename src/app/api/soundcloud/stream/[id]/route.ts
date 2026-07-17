import { resolveTrackStreamUrl } from "@/lib/soundcloud";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Track inválido" }, { status: 400 });
  }

  try {
    const url = await resolveTrackStreamUrl(id);
    return NextResponse.redirect(url, 302);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo obtener el audio" },
      { status: 502 },
    );
  }
}
