import { setBudget } from "../dataStore";

interface BudgetOptions {
  month: string;
  amount: string;
}

export function setBudgetCommand(options: BudgetOptions): void {
  const { month, amount } = options;

  // Validate month
  const parsedMonth = parseInt(month, 10);
  if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    console.error("Month must be a number between 1 and 12");
    process.exit(1);
  }

  // Validate amount
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    console.error("Budget amount must be a positive number");
    process.exit(1);
  }

  try {
    setBudget(parsedMonth, parsedAmount);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    console.log(
      `Budget for ${monthNames[parsedMonth - 1]} set to $${parsedAmount.toFixed(
        2
      )}`
    );
  } catch (error) {
    console.error("Error setting budget:", error);
    process.exit(1);
  }
}
