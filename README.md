# Expense Tracker CLI

A command-line expense tracker application to manage your finances. Track your expenses, set budgets, and view spending summaries.

## Features

- Add, update, and delete expenses
- View all expenses with filtering options
- View expense summaries (overall and by month)
- Set monthly budgets with warnings when exceeded
- Export expenses to CSV
- Categorize expenses

## Installation

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Install from source

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the application:
   ```
   npm run build
   ```
4. Install globally:
   ```
   npm install -g .
   ```

## Usage

### Adding an expense

```
expense-tracker add --description "Lunch" --amount 20 --category "Food"
# Expense added successfully (ID: 1)
```

### Updating an expense

```
expense-tracker update --id 1 --description "Dinner with friends" --amount 35
# Expense updated successfully (ID: 1)
```

### Deleting an expense

```
expense-tracker delete --id 1
# Expense deleted successfully
```

### Listing expenses

```
expense-tracker list
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20.00
# 2   2024-08-06  Dinner       $10.00
```

Filter by category:

```
expense-tracker list --category "Food"
```

### Viewing summaries

Overall summary:

```
expense-tracker summary
# Total expenses: $30.00
```

Monthly summary:

```
expense-tracker summary --month 8
# Total expenses for August: $20.00
# Budget for August: $500.00
# Remaining budget: $480.00
```

### Setting a budget

```
expense-tracker set-budget --month 8 --amount 500
# Budget for August set to $500.00
```

### Exporting expenses to CSV

```
expense-tracker export --output expenses.csv
# Expenses exported successfully to expenses.csv
```

## License

MIT
