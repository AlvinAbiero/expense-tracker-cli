#!/usr/bin/env node

import { program } from "commander";
import {
  add,
  update,
  deleteExpense,
  list,
  summary,
  setBudgetCommand,
} from "./commands";
import { initializeDataStore } from "./dataStore";

// initialize data store when application starts
initializeDataStore();

program
  .name("expense-tracker")
  .description("A CLI application to track your expenses")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new expense")
  .requiredOption("--description <description>", "Description of the expense")
  .requiredOption("--amount <amount>", "Amount of the expense")
  .option("--category <category>", "Category of the expense")
  .option(
    "--date <date>",
    "Date of the expense (YYYY-MM-DD format)",
    new Date().toISOString().split("T")[0]
  )
  .action(add);

program
  .command("set-budget")
  .description("Set a budget for a specific month")
  .requiredOption("--month <month>", "Month to set budget for (1-12)")
  .requiredOption("--amount <amount>", "Budget amount")
  .action(setBudgetCommand);

program
  .command("update")
  .description("Update an existing expense")
  .requiredOption("--id <id>", "ID of the expense to update")
  .option("--description <description>", "New description of the expense")
  .option("--amount <amount>", "New amount of the expense")
  .option("--category <category>", "New category of the expense")
  .option("--date <date>", "New date of the expense (YYYY-MM-DD format)")
  .action(update);

program
  .command("delete")
  .description("Delete an expense")
  .requiredOption("--id <id>", "ID of the expense to delete")
  .action(deleteExpense);

program
  .command("list")
  .description("List all expenses")
  .option("--category <category>", "Filter expenses by category")
  .action(list);

program
  .command("summary")
  .description("Show a summary of expenses")
  .option("--month <month>", "Month to summarize expenses for (1-12)")
  .option("--category <category>", "Filter summary by category")
  .action(summary);

program
  .command("export")
  .description("Export expenses to a CSV file")
  .option("--output <filename>", "Output filename", "expenses.csv")
  .action(async (options) => {
    const { exportToCsv } = await import("./commands/export.js");
    exportToCsv(options);
  });

program.parse(process.argv);
