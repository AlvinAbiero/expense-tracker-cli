import { removeExpense } from "../dataStore";

interface DeleteOptions {
  id: string;
}

export function deleteExpense(options: DeleteOptions): void {
  const { id } = options;

  // Validate id
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId) || parsedId <= 0) {
    console.error("ID must be a positive number");
    process.exit(1);
  }

  try {
    const success = removeExpense(parsedId);

    if (success) {
      console.log("Expense deleted successfully");
    } else {
      console.error(`Expense with ID ${parsedId} not found`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    process.exit(1);
  }
}
