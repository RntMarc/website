import { NextResponse } from "next/server";
import { generatePdfBuffer } from "@/lib/tools/recipe-pdf";

interface Category {
  name: string;
  items: string[];
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = form.get("title")?.toString() || "";
    const timeblock = form.get("timeblock")?.toString() || "";
    const categories: Category[] = JSON.parse(
      form.get("categories")?.toString() || "[]"
    );
    const steps: string[] = JSON.parse(form.get("steps")?.toString() || "[]");

    const file = form.get("image") as File | null;
    let imageBase64: string | undefined;
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

    // ⚡ Korrekt: echtes ArrayBuffer erzeugen, SharedArrayBuffer ausgeschlossen
    const safeArrayBuffer = Uint8Array.from(pdfBuffer).buffer;

    return new NextResponse(safeArrayBuffer, {
      status: 200,
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return new NextResponse(message, { status: 500 });
  }
}
