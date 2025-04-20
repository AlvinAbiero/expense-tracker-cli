import { addExpense } from "../dataStore";

interface AddOptions {
  description: string;
  amount: string;
  category?: string;
  date: string;
}

export function add(options: AddOptions): void {
  const { description, amount, category, date } = options;

  // validate amount
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    console.error("Amount must be a positive number");
    process.exit(1);
  }

  // Validate date
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    console.error("Date must be in YYYY-MM-DD format");
    process.exit(1);
  }

  try {
    const expense = addExpense({
      description,
      amount: parsedAmount,
      date,
      category,
    });

    console.log(`Wxpense added successfully (ID: ${expense.id})`);
  } catch (error) {
    console.error("Error adding expense:", error);
    process.exit(1);
  }
}
