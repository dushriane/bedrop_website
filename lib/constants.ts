export const INCIDENT_QUANTITIES = ['small', 'medium', 'large'] as const;
export const SMELL_INTENSITIES = ['none', 'mild', 'strong'] as const;
export const MOODS = ['happy', 'sad', 'frustrated', 'neutral', 'anxious'] as const;

export const DRINK_TYPES = [
  'water',
  'juice',
  'milk',
  'soda',
  'tea',
  'coffee',
  'other',
] as const;

export const REMINDER_FREQUENCIES = [
  'daily',
  'weekdays',
  'weekends',
  'custom',
] as const;

export const DAILY_TIPS = [
  'Limit fluids 2-3 hours before bedtime to reduce nighttime accidents.',
  'Empty your bladder right before going to sleep.',
  'Keep a consistent bedtime routine to regulate your body\'s schedule.',
  'Celebrate dry nights - positive reinforcement helps!',
  'Track your patterns - knowledge is power in managing bedwetting.',
  'Avoid caffeinated drinks in the evening as they stimulate the bladder.',
  'Practice bladder exercises during the day to increase capacity.',
  'Ensure the path to the bathroom is well-lit and clear.',
  'Consider using a bedwetting alarm if recommended by your doctor.',
  'Stay hydrated throughout the day, just reduce intake before bed.',
];

export const MOOD_EMOJIS: Record<typeof MOODS[number], string> = {
  happy: '😊',
  sad: '😢',
  frustrated: '😤',
  neutral: '😐',
  anxious: '😰',
};

export const APP_NAME = 'BeDrop';
export const APP_DESCRIPTION = 'Your personal bedwetting tracking companion';
