export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: string;
}

export interface Incident {
  id: string;
  userId: string;
  date: string;
  time: string;
  sleepTime?: string;
  wakeTime?: string;
  quantity: 'small' | 'medium' | 'large';
  smell: 'none' | 'mild' | 'strong';
  mood: 'happy' | 'sad' | 'frustrated' | 'neutral' | 'anxious';
  notes?: string;
  customAnswers?: Record<string, string>;
  createdAt: string;
}

export interface Drink {
  id: string;
  userId: string;
  type: 'water' | 'juice' | 'milk' | 'soda' | 'tea' | 'coffee' | 'other';
  amount: number;
  time: string;
  date: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  target: number;
  deadline?: string;
  progress: number;
  completed: boolean;
  createdAt: string;
}

export interface Reminder {
  id: string;
  userId: string;
  title: string;
  time: string;
  repeat: 'daily' | 'weekdays' | 'weekends' | 'custom';
  active: boolean;
  createdAt: string;
}

export interface CustomQuestion {
  id: string;
  userId: string;
  text: string;
  type: 'text' | 'number' | 'yes-no';
  createdAt: string;
}
