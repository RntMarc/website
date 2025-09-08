// types/pdfmake.d.ts
declare module "pdfmake" {
  import { Writable } from "stream";

  export class PdfPrinter {
    constructor(fonts: any);
    createPdfKitDocument(docDefinition: any): Writable;
  }
}
