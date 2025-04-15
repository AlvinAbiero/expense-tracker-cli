import fs from "fs";
import path from "path";
import os from "os";

const DATA_DIR = path.join(os.homedir(), ".expense-tracker");
const DATA_FILE = path.join(DATA_DIR, ".express.json");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

import { Expense } from "./models/expense";

// Initialize data store (create necessary files if they don't exist)
export function initializeDataStore(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }

    if (!fs.existsSync(CONFIG_FILE)) {
      const defaultConfig = {
        budgets: {},
      };
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
    }
  } catch (error) {
    console.error("Error initializing data store:", error);
    process.exit(1);
  }
}

// Get all expenses
export function getExpenses(): Expense[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading expenses:", error);
    return [];
  }
}

// Save expenses
export function saveExpenses(expenses: Expense[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
  } catch (error) {
    console.error("Error saving expenses:", error);
  }
}

// Add an expense
export function addExpense(expense: Omit<Expense, "id">): Expense {
  const expenses = getExpenses();
  const newId =
    expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1;
  const newExpense = { id: newId, ...expense };
  expenses.push(newExpense);
  saveExpenses(expenses);
  return newExpense;
}

// Update an expense
export function updateExpense(
  id: number,
  updates: Partial<Omit<Expense, "id">>
): Expense | null {
  const expenses = getExpenses();
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return null;
  }

  const updatedExpense = { ...expenses[index], ...updates };
  expenses[index] = updatedExpense;
  saveExpenses(expenses);
  return updatedExpense;
}

// Delete an expense
export function removeExpense(id: number): boolean {
  const expenses = getExpenses();
  const filteredExpenses = expenses.filter((e) => e.id !== id);

  if (filteredExpenses.length === expenses.length) {
    return false;
  }

  saveExpenses(filteredExpenses);
  return true;
}

// Get budget for a specific month
export function getBudget(month: number): number | null {
  try {
    const data = fs.readFileSync(CONFIG_FILE, "utf-8");
    const config = JSON.parse(data);
    return config.budgets[month] || null;
  } catch (error) {
    console.error("Error reading budget:", error);
    return null;
  }
}

// Set budget for a specific month
export function setBudget(month: number, amount: number): void {
  try {
    const data = fs.readFileSync(CONFIG_FILE, "utf-8");
    const config = JSON.parse(data);
    config.budgets[month] = amount;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error("Error setting budget:", error);
  }
}
