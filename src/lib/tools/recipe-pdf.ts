import fs from "fs";
import path from "path";
import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions, Content } from "pdfmake/interfaces";

// Interfaces
interface Category {
  name: string;
  items: string[];
}

interface GeneratePdfOptions {
  title: string;
  timeblock: string;
  categories: Category[];
  steps: string[];
  imageBase64?: string;
}

// Fonts laden
const fontDir = path.join(process.cwd(), "public/fonts");
const InterNormal = fs
  .readFileSync(path.join(fontDir, "Inter-VariableFont.ttf"))
  .toString("base64");
const InterItalic = fs
  .readFileSync(path.join(fontDir, "Inter-Italic-VariableFont.ttf"))
  .toString("base64");

(pdfMake as unknown as { vfs: Record<string, string> }).vfs = {
  "Inter-VariableFont.ttf": InterNormal,
  "Inter-Italic-VariableFont.ttf": InterItalic,
};

export const fonts = {
  Inter: {
    normal: "Inter-VariableFont.ttf",
    bold: "Inter-VariableFont.ttf",
    italics: "Inter-Italic-VariableFont.ttf",
    bolditalics: "Inter-Italic-VariableFont.ttf",
  },
};

export async function generatePdfBuffer(
  options: GeneratePdfOptions
): Promise<Buffer> {
  const { title, timeblock, categories, steps, imageBase64 } = options;

  const docDefinition: TDocumentDefinitions = {
    defaultStyle: { font: "Inter" },
    content: [
      {
        text: title,
        fontSize: 25,
        bold: true,
        margin: [0, 0, 0, 14],
        alignment: "left",
      },
      {
        columns: [
          {
            width: 140,
            stack: [
              { text: `⏱️ ${timeblock}`, fontSize: 11, margin: [0, 0, 0, 7.5] },
              ...categories.flatMap((cat) => [
                {
                  text: cat.name,
                  fontSize: 14,
                  bold: true,
                  color: "#2E75B5",
                  margin: [0, 4.5, 0, 3.5],
                },
                ...cat.items.map((item) => ({
                  text: item,
                  fontSize: 11,
                  bold: true,
                  margin: [0, 0, 0, 3.5],
                })),
              ]),
            ],
          },
          {
            width: "*",
            stack: steps.map((step, i) => ({
              text: `${i + 1}. ${step}`,
              fontSize: 11,
              margin: [1.1, 0, 0, 3.5],
            })),
          },
        ],
      },
    ] as Content[],
  };

  if (imageBase64) {
    (docDefinition.content as Content[]).push({
      image: imageBase64,
      width: 250,
      alignment: "center",
      margin: [0, 10, 0, 10],
    });
  }

  return new Promise((resolve) => {
    pdfMake.createPdf(docDefinition).getBuffer((buffer: Uint8Array) => {
      resolve(Buffer.from(buffer));
    });
  });
}
