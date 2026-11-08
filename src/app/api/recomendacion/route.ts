import { NextRequest, NextResponse } from "next/server";
import { getRecommendation } from "@/lib/recommendations";
import { Priority, priorities } from "@/lib/tasks";

export async function GET(request: NextRequest) {
  const value = request.nextUrl.searchParams.get("prioridad") ?? "media";
  if (!priorities.includes(value as Priority)) {
    return NextResponse.json({ error: "Prioridad inválida. Usa alta, media o baja." }, { status: 400 });
  }
  return NextResponse.json(getRecommendation(value as Priority), {
    headers: { "Cache-Control": "no-store" },
  });
}
