'use client';

import { useState, FormEvent, useEffect } from 'react';
import { ExpenseFormData, ValidationErrors, Category } from '@/lib/types';
import { validateExpenseForm } from '@/lib/validation';
import { CATEGORIES } from '@/lib/constants';
import { formatDateForInput } from '@/lib/formatting';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DatePicker } from '@/components/ui/DatePicker';
import { Card } from '@/components/ui/Card';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  initialData?: ExpenseFormData;
  onCancel?: () => void;
  isEdit?: boolean;
}

export function ExpenseForm({ onSubmit, initialData, onCancel, isEdit = false }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(
    initialData || {
      date: new Date(),
      amount: '',
      category: 'Food',
      description: '',
    }
  );
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Update form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateExpenseForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);

    // Reset form if not in edit mode
    if (!isEdit) {
      setFormData({
        date: new Date(),
        amount: '',
        category: 'Food',
        description: '',
      });
    }
    setErrors({});
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {isEdit ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            error={errors.amount}
            placeholder="0.00"
            required
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
            error={errors.category}
            required
          />
        </div>

        <DatePicker
          label="Date"
          value={formatDateForInput(formData.date)}
          onChange={(date) => setFormData({ ...formData, date })}
          error={errors.date}
          max={formatDateForInput(new Date())}
          required
        />

        <Input
          label="Description"
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          placeholder="e.g., Lunch at cafe"
          required
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary" className="flex-1">
            {isEdit ? 'Update Expense' : 'Add Expense'}
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
