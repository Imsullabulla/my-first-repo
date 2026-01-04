'use client';

import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Download, Wallet } from 'lucide-react';
import { Expense } from '@/lib/types';
import { exportToCSV } from '@/lib/export';

interface HeaderProps {
  expenses: Expense[];
}

export function Header({ expenses }: HeaderProps) {
  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }
    exportToCSV(expenses);
  };

  return (
    <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-primary rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                My Expense Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your finances
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExport}
              disabled={expenses.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
