'use client';

import { ExpenseFilters as Filters, Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatDateForInput } from '@/lib/formatting';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Search, X, ArrowUpDown } from 'lucide-react';

interface ExpenseFiltersProps {
  filters: Filters;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: Category | 'All') => void;
  onDateRangeChange: (start: Date | null, end: Date | null) => void;
  onSortChange: (sortBy: Filters['sortBy'], sortOrder: Filters['sortOrder']) => void;
  onReset: () => void;
}

export function ExpenseFilters({
  filters,
  onSearchChange,
  onCategoryChange,
  onDateRangeChange,
  onSortChange,
  onReset,
}: ExpenseFiltersProps) {
  const hasActiveFilters =
    filters.searchQuery ||
    filters.category !== 'All' ||
    filters.dateRange.start ||
    filters.dateRange.end;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Filters & Search
        </h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by description..."
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Category"
            value={filters.category}
            onChange={(e) => onCategoryChange(e.target.value as Category | 'All')}
            options={[
              { value: 'All', label: 'All Categories' },
              ...CATEGORIES.map((cat) => ({ value: cat, label: cat })),
            ]}
          />

          <Select
            label="Sort By"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-') as [
                Filters['sortBy'],
                Filters['sortOrder']
              ];
              onSortChange(sortBy, sortOrder);
            }}
            options={[
              { value: 'date-desc', label: 'Date (Newest)' },
              { value: 'date-asc', label: 'Date (Oldest)' },
              { value: 'amount-desc', label: 'Amount (Highest)' },
              { value: 'amount-asc', label: 'Amount (Lowest)' },
              { value: 'category-asc', label: 'Category (A-Z)' },
              { value: 'category-desc', label: 'Category (Z-A)' },
            ]}
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="From Date"
            value={filters.dateRange.start ? formatDateForInput(filters.dateRange.start) : ''}
            onChange={(e) =>
              onDateRangeChange(
                e.target.value ? new Date(e.target.value) : null,
                filters.dateRange.end
              )
            }
          />
          <Input
            type="date"
            label="To Date"
            value={filters.dateRange.end ? formatDateForInput(filters.dateRange.end) : ''}
            onChange={(e) =>
              onDateRangeChange(
                filters.dateRange.start,
                e.target.value ? new Date(e.target.value) : null
              )
            }
          />
        </div>
      </div>
    </Card>
  );
}
