import fs from "fs";
import path from "path";
import { getExpenses } from "../dataStore";

interface ExportOptions {
  output: string;
}

export function exportToCsv(options: ExportOptions): void {
  try {
    const expenses = getExpenses();

    if (expenses.length === 0) {
      console.log("No expenses to export");
      return;
    }

    // Create CSV header
    const headers = ["ID", "Date", "Description", "Amount", "Category"];
    let csvContent = headers.join(",") + "\n";

    // Add expense data
    expenses.forEach((expense) => {
      const row = [
        expense.id,
        expense.date,
        `"${expense.description.replace(/"/g, '""')}"`, // Escape quotes in description
        expense.amount,
        expense.category || "",
      ];
      csvContent += row.join(",") + "\n";
    });

    //   write to file
    const outputPath = path.resolve(options.output);
    fs.writeFileSync(outputPath, csvContent);

    console.log(`Expenses exported successfully to ${outputPath}`);
  } catch (error) {
    console.error("Error exporting expenses:", error);
    process.exit(1);
  }
}
