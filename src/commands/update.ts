import { updateExpense } from "../dataStore";

interface UpdateOptions {
  id: string;
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}

export function update(options: UpdateOptions): void {
  const { id, description, amount, category, date } = options;

  // Validate id
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId) || parsedId <= 0) {
    console.error("ID must be a positive number");
    process.exit(1);
  }

  // validate amount if provided
  let parsedAmount: number | undefined;
  if (amount !== undefined) {
    parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      console.error("Amount must be a positive number");
      process.exit(1);
    }
  }

  // validate date if provided
  if (date !== undefined) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      console.error("Date must be in YYYY-MM-DD format");
      process.exit(1);
    }
  }

  try {
    const updates: any = {};
    if (description !== undefined) updates.description = description;
    if (parsedAmount !== undefined) updates.amount = parsedAmount;
    if (category !== undefined) updates.category = category;
    if (date !== undefined) updates.date = date;

    const expense = updateExpense(parsedId, updates);

    if (expense) {
      console.log(`Expense updated successfully (ID: ${parsedId})`);
    } else {
      console.error(`Expense with ID ${parsedId} not found`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error updating expense:", error);
    process.exit(1);
  }
}
