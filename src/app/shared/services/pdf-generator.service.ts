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

    const scale = 2; // Adjust scale for lower resolution
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Define margins
    const margin = 20; // in mm
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = pdfHeight - margin * 2;


    const addTimestamp = () => {
      const now = new Date();
      const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      const textWidth = pdf.getStringUnitWidth(timestamp) * pdf.getFontSize() / pdf.internal.scaleFactor;
      const textX = pdfWidth - margin - textWidth; // Adjust position to be at the end of the last line
      const textY = pdfHeight - margin + 5; // Position below the bottom margin
      pdf.setFontSize(8); // Set smaller font size for timestamp
      pdf.text(timestamp, textX, textY, { align: 'left' });
    };


    // Add white space at the top
    pdf.setFillColor('#ffffff'); // White color
    pdf.rect(0, 0, pdfWidth, margin, 'F'); // Fill rectangle for top margin

    html2canvas(element, { scale }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg', 0.8); // Adjust quality for smaller file size
      const imgProps = pdf.getImageProperties(imgData);
      const canvasWidth = imgProps.width;
      const canvasHeight = imgProps.height;

      const pdfHeightPx = 2800;

      let yPos = margin; // Initial position from top margin

      for (let i = 0; i < Math.ceil(canvasHeight / pdfHeightPx); i++) {
        if (i > 0) {
          pdf.addPage();
          yPos = margin; // Reset yPos for each new page

          // Add white space at the top of each new page
          pdf.setFillColor('#ffffff'); // White color
          pdf.rect(0, 0, pdfWidth, margin, 'F'); // Fill rectangle for top margin
        }

        const srcY = i * pdfHeightPx;
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = pdfHeightPx;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(canvas, 0, srcY, canvasWidth, pdfHeightPx, 0, 0, canvasWidth, pdfHeightPx);
          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.8); // Adjust quality for smaller file size

          pdf.addImage(pageImgData, 'JPEG', margin, yPos, contentWidth, contentHeight);

          // Calculate the height of the added image
          const addedHeight = (canvasHeight - srcY) * contentWidth / canvasWidth;

          // Update yPos for the next element
          yPos += addedHeight;

          // Add page number at the bottom of each page with margin from content
          const pageNumber = i + 1;
          pdf.setFontSize(10); // Set font size for page number
          const textWidth = pdf.getStringUnitWidth(`Page ${pageNumber}`) * pdf.getFontSize() / pdf.internal.scaleFactor;

          // https://capitalconnect.africa/
          const textX = (pdfWidth - textWidth) / 2;
          const textY = pdfHeight - margin + 5; // Position below the bottom margin
          pdf.text(`Page ${pageNumber}`, textX, textY, { align: 'center' });
        }
      }

      addTimestamp();

      // Save PDF with the provided filename
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










