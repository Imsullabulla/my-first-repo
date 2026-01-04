import { Category } from './types';

export const CATEGORIES: Category[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#ef4444', // red-500
  Transportation: '#3b82f6', // blue-500
  Entertainment: '#a855f7', // purple-500
  Shopping: '#ec4899', // pink-500
  Bills: '#eab308', // yellow-500
  Other: '#6b7280', // gray-500
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: 'UtensilsCrossed',
  Transportation: 'Car',
  Entertainment: 'Film',
  Shopping: 'ShoppingBag',
  Bills: 'Receipt',
  Other: 'MoreHorizontal',
};

export const STORAGE_KEY = 'expense-tracker-data';
export const THEME_KEY = 'expense-tracker-theme';

export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  iso: 'yyyy-MM-dd',
  month: 'MMMM yyyy',
  monthShort: 'MMM yyyy',
  short: 'MM/dd/yy',
};
