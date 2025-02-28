/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable, { UserOptions } from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

interface Column {
  header: string;
  dataKey: string;
}

interface ExportOptions {
  filename?: string;
  title?: string;
  columns?: Column[];
  styles?: Partial<UserOptions>;
}

export const JSONTOPDFDownloader = <T extends Record<string, any>>(
  data: T[],
  options: ExportOptions = {}
): boolean => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return false;
  }

  const defaultOptions: ExportOptions = {
    filename: "export.pdf",
    title: "Data Export",
    styles: {
      headStyles: { fillColor: [66, 139, 202] },
      styles: { overflow: "linebreak" },
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const doc = new jsPDF();

    if (finalOptions.title) {
      doc.setFontSize(18);
      doc.text(finalOptions.title, 14, 22);
    }

    const columns: Column[] =
      finalOptions.columns ||
      Object.keys(data[0]).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        dataKey: key,
      }));

    autoTable(doc, {
      columns: columns,
      body: data,
      startY: finalOptions.title ? 30 : 10,
      ...finalOptions.styles,
    });

    doc.save(finalOptions.filename);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};
