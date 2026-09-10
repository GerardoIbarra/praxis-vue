import { downloadBlob } from "./downloadHelper";

export interface ExportColumn {
  field: string;
  header: string;
  [key: string]: unknown;
}

export interface ExportOptions {
  filename?: string;
  columns?: ExportColumn[];
  separator?: string;
}

/**
 * Formats a single value safely for CSV representation.
 */
function formatCSVValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "object") {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return JSON.stringify(value);
  }
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Exports tabular data to CSV format with UTF-8 BOM for full Excel compatibility.
 */
export function exportToCSV(
  data: Record<string, unknown>[],
  columns: ExportColumn[],
  options: ExportOptions = {}
): void {
  const separator = options.separator || ",";
  const filename = (options.filename || "table-export").replace(/\.csv$/i, "") + ".csv";

  // Headers
  const headerRow = columns.map((col) => formatCSVValue(col.header || col.field)).join(separator);

  // Rows
  const rows = data.map((row) =>
    columns.map((col) => formatCSVValue(row[col.field])).join(separator)
  );

  // UTF-8 BOM (\uFEFF) ensures Excel reads accented characters, UTF-8 symbols and emojis correctly
  const csvContent = "\uFEFF" + [headerRow, ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, filename);
}

/**
 * Escapes XML entities for SpreadsheetML format.
 */
function escapeXml(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = typeof value === "object" ? JSON.stringify(value) : String(value);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Exports tabular data to Excel XML (SpreadsheetML) format.
 * Natively supported by Excel, Google Sheets, and LibreOffice with proper data types.
 */
export function exportToExcel(
  data: Record<string, unknown>[],
  columns: ExportColumn[],
  options: ExportOptions = {}
): void {
  const filename = (options.filename || "table-export").replace(/\.xls$/i, "") + ".xls";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Header">
   <Font ss:Bold="1" ss:Color="#1E293B" />
   <Interior ss:Color="#F1F5F9" ss:Pattern="Solid" />
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
   </Borders>
  </Style>
  <Style ss:ID="Default">
   <Font ss:Color="#334155" />
  </Style>
 </Styles>
 <Worksheet ss:Name="Sheet1">
  <Table>
`;

  // Define Columns
  columns.forEach(() => {
    xml += `   <Column ss:AutoFitWidth="1" ss:Width="120" />\n`;
  });

  // Header row
  xml += `   <Row ss:StyleID="Header">\n`;
  columns.forEach((col) => {
    xml += `    <Cell><Data ss:Type="String">${escapeXml(col.header || col.field)}</Data></Cell>\n`;
  });
  xml += `   </Row>\n`;

  // Data rows
  data.forEach((row) => {
    xml += `   <Row ss:StyleID="Default">\n`;
    columns.forEach((col) => {
      const val = row[col.field];
      const isNum = typeof val === "number" && !isNaN(val);
      const cellType = isNum ? "Number" : "String";
      xml += `    <Cell><Data ss:Type="${cellType}">${escapeXml(val)}</Data></Cell>\n`;
    });
    xml += `   </Row>\n`;
  });

  xml += `  </Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([xml], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  downloadBlob(blob, filename);
}
