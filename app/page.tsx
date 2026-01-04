'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseFormData } from '@/lib/types';
import { parseISO } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { useExpenses } from '@/hooks/useExpenses';
import { useFilters } from '@/hooks/useFilters';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SplashScreen } from '@/components/SplashScreen';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters';
import { ExpenseStatsCards } from '@/components/expenses/ExpenseStats';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { Modal } from '@/components/ui/Modal';

export default function Home() {
  const { expenses, addExpense, updateExpense, deleteExpense, stats } = useExpenses();
  const {
    filters,
    setSearchQuery,
    setCategory,
    setDateRange,
    setSorting,
    resetFilters,
    filteredExpenses,
  } = useFilters(expenses);

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddExpense = (data: ExpenseFormData) => {
    addExpense(data);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleUpdateExpense = (data: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
      setIsEditModalOpen(false);
      setEditingExpense(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-50 dark:bg-dark-bg flex flex-col">
        <Header expenses={expenses} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <div className="space-y-8">
            {/* Stats Cards */}
            <ExpenseStatsCards stats={stats} />

            {/* Add Expense Form */}
            <ExpenseForm onSubmit={handleAddExpense} />

            {/* Filters */}
            <ExpenseFilters
              filters={filters}
              onSearchChange={setSearchQuery}
              onCategoryChange={setCategory}
              onDateRangeChange={setDateRange}
              onSortChange={setSorting}
              onReset={resetFilters}
            />

            {/* Expense List */}
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
              onDelete={deleteExpense}
            />

            {/* Charts */}
            {expenses.length > 0 && <DashboardCharts expenses={expenses} />}
          </div>
        </main>

        <Footer />

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={handleCancelEdit}
          title="Edit Expense"
        >
          {editingExpense && (
            <ExpenseForm
              onSubmit={handleUpdateExpense}
              initialData={{
                date: parseISO(editingExpense.date),
                amount: editingExpense.amount.toString(),
                category: editingExpense.category,
                description: editingExpense.description,
              }}
              onCancel={handleCancelEdit}
              isEdit
            />
          )}
        </Modal>
      </div>
    </>
  );
}
