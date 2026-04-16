import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); 

export const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const pdfData = await pdfParse(pdfBuffer); 

    if (!pdfData.text || pdfData.text.trim() === "") {
      throw new Error("PDF is empty or scanned image — no text found.");
    }

    return pdfData.text;

  } catch (error) {
    console.error("PDF extraction error:", error.message);
    throw new Error("Failed to extract text from PDF");
  }
};