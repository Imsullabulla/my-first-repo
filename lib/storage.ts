import { Expense } from './types';
import { STORAGE_KEY } from './constants';

/**
 * Load expenses from localStorage
 */
export function loadExpenses(): Expense[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const expenses = JSON.parse(data);
    return Array.isArray(expenses) ? expenses : [];
  } catch (error) {
    console.error('Error loading expenses from localStorage:', error);
    return [];
  }
}

/**
 * Save expenses to localStorage
 */
export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to localStorage:', error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please delete some old expenses.');
    }
  }
}

/**
 * Clear all expenses from localStorage
 */
export function clearExpenses(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing expenses from localStorage:', error);
  }
}

/**
 * Export expenses as JSON string
 */
export function exportToJSON(expenses: Expense[]): string {
  return JSON.stringify(expenses, null, 2);
}

/**
 * Import expenses from JSON string
 */
export function importFromJSON(json: string): Expense[] {
  try {
    const expenses = JSON.parse(json);
    if (!Array.isArray(expenses)) {
      throw new Error('Invalid JSON format');
    }
    return expenses;
  } catch (error) {
    console.error('Error importing expenses:', error);
    throw new Error('Failed to import expenses. Invalid JSON format.');
  }
}
