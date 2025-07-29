import jsPDF from 'jspdf';
import type { FormData } from '../hooks/useFormData';

interface PDFGeneratorProps {
  formData: FormData;
  getFormattedDate: () => string;
  getValidityDate: () => string;
  getServiceText: () => string;
}

export const generatePDF = ({
  formData,
  getFormattedDate,
  getValidityDate,
  getServiceText,
}: PDFGeneratorProps) => {
  const doc = new jsPDF();
  const pageWidth = 210;
  const margin = 20;
  const lineHeight = 7;
  let currentY = 20;

  // Helper function to add text with automatic line breaks
  const addText = (text: string, x: number, y: number, maxWidth: number, align: 'left' | 'center' | 'right' = 'left') => {
    const lines = doc.splitTextToSize(text, maxWidth);
    if (align === 'center') {
      lines.forEach((line: string, index: number) => {
        doc.text(line, pageWidth / 2, y + (index * lineHeight), { align: 'center' });
      });
    } else if (align === 'right') {
      lines.forEach((line: string, index: number) => {
        doc.text(line, pageWidth - margin, y + (index * lineHeight), { align: 'right' });
      });
    } else {
      lines.forEach((line: string, index: number) => {
        doc.text(line, x, y + (index * lineHeight));
      });
    }
    return lines.length * lineHeight;
  };

  // Set font
  doc.setFont('times', 'normal');
  doc.setFontSize(12);

  // Date (top right)
  if (getFormattedDate()) {
    doc.text(getFormattedDate(), pageWidth - margin, currentY, { align: 'right' });
  }
  currentY += 20;

  // Title
  doc.setFontSize(16);
  doc.setFont('times', 'bold');
  doc.text('PROCURAÇÃO', pageWidth / 2, currentY, { align: 'center' });
  currentY += 15;

  // Reset font
  doc.setFontSize(12);
  doc.setFont('times', 'normal');

  // Outorgante section
  doc.setFont('times', 'bold');
  doc.text('OUTORGANTE:', margin, currentY);
  currentY += 10;

  doc.setFont('times', 'normal');
  const entityType = formData.outorgante.cpfCnpj.length > 14 ? 'jurídica' : 'física';
  const documentType = formData.outorgante.cpfCnpj.length > 14 ? 'CNPJ' : 'CPF';
  const residenceType = entityType === 'física' ? 'residência' : 'sede';

  const outorgarteText = `${formData.outorgante.nome}, pessoa ${entityType}, inscrita no ${documentType} sob nº ${formData.outorgante.cpfCnpj}, com ${residenceType} na ${formData.outorgante.endereco}, neste ato nomeia e constitui como seu procurador:`;
  
  const outorgarteHeight = addText(outorgarteText, margin, currentY, pageWidth - 2 * margin);
  currentY += outorgarteHeight + 10;

  // Outorgado section
  doc.setFont('times', 'bold');
  doc.text('OUTORGADO:', margin, currentY);
  currentY += 10;

  doc.setFont('times', 'normal');
  const outorgadoText = `Vem, pelo presente instrumento particular de procuração, nomear e constituir seu bastante procurador, o Sr. ${formData.outorgado.nome}, inscrito no CPF sob o nº ${formData.outorgado.cpf}.`;
  
  const outorgadoHeight = addText(outorgadoText, margin, currentY, pageWidth - 2 * margin);
  currentY += outorgadoHeight + 10;

  // Power section
  doc.setFont('times', 'bold');
  doc.text('PODER:', margin, currentY);
  currentY += 10;

  doc.setFont('times', 'normal');
  const powerText = getServiceText();
  if (powerText) {
    const powerHeight = addText(powerText, margin, currentY, pageWidth - 2 * margin);
    currentY += powerHeight + 10;
  }

  // Objective section
  doc.setFont('times', 'bold');
  doc.text('OBJETIVO:', margin, currentY);
  currentY += 10;

  doc.setFont('times', 'normal');
  const objectiveText = `Todos os poderes especificados nesta procuração destinam-se exclusivamente e especificamente à defesa dos interesses do Outorgante junto à distribuidora ${formData.concessionaria}.`;
  
  const objectiveHeight = addText(objectiveText, margin, currentY, pageWidth - 2 * margin);
  currentY += objectiveHeight + 10;

  // Validity
  const validityText = `O presente mandato vigorará até ${getValidityDate()}, vedado o substabelecimento dos poderes ora outorgados.`;
  const validityHeight = addText(validityText, margin, currentY, pageWidth - 2 * margin);
  currentY += validityHeight + 15;

  // Location and date
  const locationDateText = `${formData.local}, ${getFormattedDate()}`;
  doc.text(locationDateText, margin, currentY);
  currentY += 30;

  // Signature line
  const signatureLine = '_'.repeat(60);
  doc.text(signatureLine, pageWidth / 2, currentY, { align: 'center' });
  currentY += 10;
  doc.text(formData.outorgante.nome, pageWidth / 2, currentY, { align: 'center' });

  // Save the PDF
  const filename = `procuracao_${formData.outorgante.nome.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};