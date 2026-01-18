import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getWeekNumber(date: Date): number {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
}

export function calculateStreakInfo(incidents: any[]) {
  if (incidents.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const sortedDates = incidents
    .map((i) => new Date(i.date))
    .sort((a, b) => b.getTime() - a.getTime());

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDates.length; i++) {
    const date = new Date(sortedDates[i]);
    date.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === i) {
      currentStreak++;
      tempStreak++;
    } else {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
      tempStreak = 0;
    }
  }

  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }

  return { currentStreak, longestStreak };
}
