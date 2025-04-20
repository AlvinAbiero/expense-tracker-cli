import { getExpenses } from "../dataStore";

interface ListOptions {
  category?: string;
}

export function list(options: ListOptions): void {
  try {
    let expenses = getExpenses();

    // Filter by category if specified
    if (options.category) {
      expenses = expenses.filter((e) => e.category === options.category);
    }

    if (expenses.length === 0) {
      console.log("No expenses found");
      return;
    }

    // Format and display expenses
    console.log(
      "ID  Date       Description  Amount" +
        (options.category ? "  Category" : "")
    );
    expenses.forEach((e) => {
      console.log(
        `${e.id.toString().padEnd(3)} ${e.date}  ${e.description.padEnd(
          12
        )} $${e.amount.toFixed(2).padStart(6)}` +
          (options.category || e.category ? `  ${e.category || ""}` : "")
      );
    });
  } catch (error) {
    console.error("Errr listing expenses:", error);
    process.exit(1);
  }
}
