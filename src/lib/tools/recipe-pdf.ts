import fs from "fs";
import path from "path";
import pdfMake from "pdfmake/build/pdfmake";
import { buildLeftContent, buildSteps } from "./recipe-latex";

// PDFMake benötigt vfs: wir laden die TTF-Dateien
const fontDir = path.join(process.cwd(), "public/fonts");

const InterNormal = fs
  .readFileSync(path.join(fontDir, "Inter-VariableFont.ttf"))
  .toString("base64");
const InterItalic = fs
  .readFileSync(path.join(fontDir, "Inter-Italic-VariableFont.ttf"))
  .toString("base64");

// Virtual File System für pdfMake
(pdfMake as any).vfs = {
  "Inter-VariableFont.ttf": InterNormal,
  "Inter-Italic-VariableFont.ttf": InterItalic,
};

// Fonts definieren
export const fonts = {
  Inter: {
    normal: "Inter-VariableFont.ttf",
    bold: "Inter-VariableFont.ttf",
    italics: "Inter-Italic-VariableFont.ttf",
    bolditalics: "Inter-Italic-VariableFont.ttf",
  },
};

export async function generatePdfBuffer({
  title,
  timeblock,
  categories,
  steps,
  imageBase64,
}: {
  title: string;
  timeblock: string;
  categories: { name: string; items: string[] }[];
  steps: string[];
  imageBase64?: string;
}): Promise<Buffer> {
  const leftContent = buildLeftContent(categories);
  const stepsTex = buildSteps(steps);

  const docDefinition: any = {
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
    ],
  };

  if (imageBase64) {
    docDefinition.content.push({
      image: imageBase64,
      width: 250,
      alignment: "center",
      margin: [0, 10, 0, 10],
    });
  }

  return new Promise((resolve) => {
    pdfMake
      .createPdf(docDefinition, {}, fonts)
      .getBuffer((buffer: Uint8Array) => {
        resolve(Buffer.from(buffer));
      });
  });
}
