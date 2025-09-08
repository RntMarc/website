declare module "pdfmake/build/pdfmake" {
  import type { TDocumentDefinitions } from "pdfmake/interfaces";

  interface CreatePdf {
    getBuffer(cb: (buffer: Uint8Array) => void): void;
  }

  const pdfMake: {
    createPdf: (docDefinition: TDocumentDefinitions) => CreatePdf;
    vfs?: { [file: string]: string };
  };

  export default pdfMake;
}

declare module "pdfmake/build/vfs_fonts" {
  const vfs: { [key: string]: string };
  export { vfs };
}

declare module "pdfmake/interfaces" {
  export interface ContentText {
    text: string;
    fontSize?: number;
    bold?: boolean;
    margin?: number[];
    alignment?: string;
    columns?: Content[];
  }

  export interface ContentImage {
    image: string;
    width?: number;
    height?: number;
    alignment?: string;
    margin?: number[];
  }

  export type Content = ContentText | ContentImage;

  export interface TDocumentDefinitions {
    content: Content[];
    defaultStyle?: {
      font?: string;
    };
  }
}
