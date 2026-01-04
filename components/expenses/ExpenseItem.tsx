'use client';

import { Expense } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/formatting';
import { CATEGORY_COLORS } from '@/lib/constants';
import { Pencil, Trash2, UtensilsCrossed, Car, Film, ShoppingBag, Receipt, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const categoryIcons = {
  Food: UtensilsCrossed,
  Transportation: Car,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Other: MoreHorizontal,
};

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const Icon = categoryIcons[expense.category];
  const categoryColor = CATEGORY_COLORS[expense.category];

  return (
    <Card hover className="p-4">
      <div className="flex items-center gap-4">
        {/* Category Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: categoryColor + '20' }}
        >
          <Icon className="w-6 h-6" style={{ color: categoryColor }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {expense.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                  style={{ backgroundColor: categoryColor }}
                >
                  {expense.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(expense.date)}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(expense.amount)}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(expense)}
            aria-label="Edit expense"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm('Are you sure you want to delete this expense?')) {
                onDelete(expense.id);
              }
            }}
            aria-label="Delete expense"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
