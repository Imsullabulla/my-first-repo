import { ExpenseFormData, ValidationErrors } from './types';
import { CATEGORIES } from './constants';

/**
 * Validate expense form data
 */
export function validateExpenseForm(data: ExpenseFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Validate amount
  if (!data.amount || data.amount.trim() === '') {
    errors.amount = 'Amount is required';
  } else {
    const amount = parseFloat(data.amount);
    if (isNaN(amount)) {
      errors.amount = 'Amount must be a valid number';
    } else if (amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (amount > 1_000_000) {
      errors.amount = 'Amount must be less than $1,000,000';
    } else if (!/^\d+(\.\d{1,2})?$/.test(data.amount)) {
      errors.amount = 'Amount can have at most 2 decimal places';
    }
  }

  // Validate date
  if (!data.date) {
    errors.date = 'Date is required';
  } else if (!isValidDate(data.date)) {
    errors.date = 'Invalid date';
  } else if (data.date > new Date()) {
    errors.date = 'Date cannot be in the future';
  }

  // Validate category
  if (!data.category) {
    errors.category = 'Category is required';
  } else if (!CATEGORIES.includes(data.category)) {
    errors.category = 'Invalid category';
  }

  // Validate description
  if (!data.description || data.description.trim() === '') {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 3) {
    errors.description = 'Description must be at least 3 characters';
  } else if (data.description.length > 200) {
    errors.description = 'Description must be less than 200 characters';
  }

  return errors;
}

/**
 * Check if a string represents a valid amount
 */
export function isValidAmount(amount: string): boolean {
  if (!amount || amount.trim() === '') return false;
  const num = parseFloat(amount);
  if (isNaN(num)) return false;
  if (num <= 0) return false;
  return /^\d+(\.\d{1,2})?$/.test(amount);
}

/**
 * Check if a date is valid
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Sanitize description text
 */
export function sanitizeDescription(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}
