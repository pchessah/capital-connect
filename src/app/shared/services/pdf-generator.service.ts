import { Injectable, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { LoadingService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  private _loadingService = inject(LoadingService);

  generatePDF(element: HTMLElement, filename: string) {
    // Set loading to true before starting the PDF generation
    this._loadingService.setLoading(true);

    const scale = 2; // Increase the scale for higher resolution
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Define margins
    const margin = 10; // in mm
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = pdfHeight - margin * 2;
    

    // Calculate the width and height in pixels
    const pdfWidthPx = contentWidth * scale;
    const pdfHeightPx = 2000;

    html2canvas(element, { scale }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const canvasWidth = imgProps.width;
      const canvasHeight = imgProps.height;

      const totalPages = Math.ceil(canvasHeight / pdfHeightPx);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        const srcY = i * pdfHeightPx;
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = pdfHeightPx;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(canvas, 0, srcY, canvasWidth, pdfHeightPx, 0, 0, canvasWidth, pdfHeightPx);
          const pageImgData = pageCanvas.toDataURL('image/png');

          pdf.addImage(pageImgData, 'PNG', margin, margin, contentWidth, contentHeight);
        }
      }

      pdf.save(filename + '.pdf');

      // Set loading to false after the PDF is generated and saved
      this._loadingService.setLoading(false);
    }).catch(error => {
      // Set loading to false in case of an error
      this._loadingService.setLoading(false);
      console.error('Error generating PDF:', error);
    });
  }
}
