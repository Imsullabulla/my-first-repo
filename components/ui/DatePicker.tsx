'use client';

import { forwardRef } from 'react';
import { Input } from './Input';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: Date) => void;
  error?: string;
  required?: boolean;
  max?: string;
  min?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, value, onChange, error, required, max, min }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = e.target.value;
      if (dateValue) {
        onChange(new Date(dateValue));
      }
    };

    return (
      <Input
        ref={ref}
        type="date"
        label={label}
        value={value}
        onChange={handleChange}
        error={error}
        required={required}
        max={max}
        min={min}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';
