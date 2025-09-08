import { NextResponse } from "next/server";
import { generatePdfBuffer } from "@/lib/tools/recipe-pdf";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = form.get("title")?.toString() || "";
    const timeblock = form.get("timeblock")?.toString() || "";
    const categories = JSON.parse(form.get("categories")?.toString() || "[]");
    const steps = JSON.parse(form.get("steps")?.toString() || "[]");

    // Bild in Base64
    const file = form.get("image") as File | null;
    let imageBase64: string | undefined = undefined;
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const base64 = Buffer.from(bytes).toString("base64");
      const mime = file.type || "image/png";
      imageBase64 = `data:${mime};base64,${base64}`;
    }

    const pdfBuffer = await generatePdfBuffer({
      title,
      timeblock,
      categories,
      steps,
      imageBase64,
    });

    // ⚡ Sicherstellen: echtes ArrayBuffer
    const buffer = new Uint8Array(pdfBuffer).buffer;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}
