import { getBudget, getExpenses } from "../dataStore";

interface SummaryOptions {
  month?: string;
  category?: string;
}

export function summary(options: SummaryOptions): void {
  try {
    let expenses = getExpenses();
    let totalAmount = 0;
    let summaryTitle = "Total expenses";

    // Filter by category if specified
    if (options.category) {
      expenses = expenses.filter((e) => e.category === options.category);
      summaryTitle += `for category '${options.category}'`;
    }

    // Filter by month if specified
    if (options.month) {
      const month = parseInt(options.month, 10);

      if (isNaN(month) || month < 1 || month > 12) {
        console.error("Month must be a number between 1 and 12");
      }

      // Get current year
      const currentYear = new Date().getFullYear();

      // Filter expenses for the specified month of the current year
      expenses = expenses.filter((e) => {
        const expensesDate = new Date(e.date);
        return (
          expensesDate.getMonth() + 1 === month &&
          expensesDate.getFullYear() === currentYear
        );
      });

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

      summaryTitle += `for ${monthNames[month - 1]}`;

      // check budget if month is specified
      const budget = getBudget(month);

      // calculate total amount
      totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

      console.log(`${summaryTitle}: $${totalAmount.toFixed(2)}`);

      // Display budget information if available
      if (budget !== null) {
        console.log(
          `Budget for ${monthNames[month - 1]}: $${budget.toFixed(2)}`
        );
        console.log(`Remaining budget: $${(budget - totalAmount).toFixed(2)}`);

        if (totalAmount > budget) {
          console.log(
            "\x1b[31mWARNING: You have exceeded your budget for this month!\x1b[0m"
          );
        }
      }

      return;
    }

    // Calculate total amount
    totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

    console.log(`${summaryTitle}: $${totalAmount.toFixed(2)}`);
  } catch (error) {
    console.error("Error generating summary:", error);
    process.exit(1);
  }
}
