declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | number[];
      filename?: string;
      image?: { type: string; quality: number };
      html2canvas?: { scale: number; backgroundColor: string };
      jsPDF?: { unit: string; format: string | number[]; orientation: string };
      pagebreak?: { mode: string | string[] };
    }
  
    function html2pdf(): {
      from: (element: HTMLElement) => any;
      set: (options: Html2PdfOptions) => any;
      toPdf: () => { get: (type: string) => Promise<any>; save: () => Promise<void> };
    };
  
    export = html2pdf;
  }
  