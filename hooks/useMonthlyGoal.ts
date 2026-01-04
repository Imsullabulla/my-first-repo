'use client';

import { useLocalStorage } from './useLocalStorage';

const MONTHLY_GOAL_KEY = 'monthly-goal';
const DEFAULT_GOAL = 2500;

export function useMonthlyGoal() {
  const [goal, setGoalValue] = useLocalStorage<number>(MONTHLY_GOAL_KEY, DEFAULT_GOAL);

  const setGoal = (newGoal: number): boolean => {
    if (newGoal > 0 && newGoal <= 1_000_000) {
      setGoalValue(newGoal);
      return true;
    }
    return false;
  };

  return {
    goal,
    setGoal,
  };
}
