import { Expense } from './types';
import { formatDate, formatCurrency } from './formatting';

/**
 * Export expenses to CSV format and trigger download
 */
export function exportToCSV(expenses: Expense[], filename?: string): void {
  const csvContent = generateCSVContent(expenses);
  const defaultFilename = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
  downloadFile(csvContent, filename || defaultFilename, 'text/csv');
}

/**
 * Generate CSV content from expenses
 */
export function generateCSVContent(expenses: Expense[]): string {
  // CSV headers
  const headers = ['Date', 'Category', 'Amount', 'Description'];
  const rows = [headers.join(',')];

  // Add expense rows
  expenses.forEach((expense) => {
    const row = [
      formatDate(expense.date, 'iso'),
      expense.category,
      expense.amount.toFixed(2),
      `"${expense.description.replace(/"/g, '""')}"`, // Escape quotes in description
    ];
    rows.push(row.join(','));
  });

  return rows.join('\n');
}

/**
 * Trigger browser download of a file
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
