'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Target, Pencil, Check, X } from 'lucide-react';
import { formatCurrency } from '@/lib/formatting';
import { isValidAmount } from '@/lib/validation';
import { cn } from '@/lib/utils';

interface MonthlyGoalCardProps {
  goal: number;
  onGoalChange: (newGoal: number) => boolean;
}

export function MonthlyGoalCard({ goal, onGoalChange }: MonthlyGoalCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setInputValue(goal.toString());
    setError('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setInputValue('');
    setError('');
    setIsEditing(false);
  };

  const getValidationError = (value: string): string => {
    if (!value || value.trim() === '') {
      return 'Please enter a valid number';
    }

    if (!isValidAmount(value)) {
      const num = parseFloat(value);
      if (isNaN(num)) {
        return 'Please enter a valid number';
      }
      if (num <= 0) {
        return 'Goal must be greater than $0';
      }
      if (num > 1_000_000) {
        return 'Goal must be less than $1,000,000';
      }
      return 'Maximum 2 decimal places';
    }

    return '';
  };

  const handleSave = () => {
    const validationError = getValidationError(inputValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    const newGoal = parseFloat(inputValue);
    const success = onGoalChange(newGoal);

    if (success) {
      setIsEditing(false);
      setInputValue('');
      setError('');
    } else {
      setError('Failed to update goal');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleBlur = () => {
    // Only save on blur if there's no error and input has changed
    if (inputValue !== goal.toString()) {
      handleSave();
    } else {
      handleCancel();
    }
  };

  return (
    <Card className="p-6 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Monthly Goal
          </p>
          {isEditing ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  $
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    'w-32 bg-white dark:bg-dark-card border rounded px-2 py-1',
                    'text-2xl font-bold text-gray-900 dark:text-gray-100',
                    'focus:outline-none focus:ring-2 focus:ring-orange-500',
                    error
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-dark-border'
                  )}
                  aria-label="Monthly goal amount"
                />
                <button
                  onClick={handleSave}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  aria-label="Save goal"
                >
                  <Check className="w-4 h-4 text-green-500" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  aria-label="Cancel editing"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
              {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(goal)}
              </p>
              <button
                onClick={handleEditClick}
                className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all"
                aria-label="Edit monthly goal"
              >
                <Pencil className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg bg-orange-500/10">
          <Target className="w-6 h-6 text-orange-500" />
        </div>
      </div>
    </Card>
  );
}
