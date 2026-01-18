import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  age: z.number().min(1).max(120).optional(),
});

export const incidentSchema = z.object({
  date: z.string(),
  time: z.string(),
  sleepTime: z.string().optional(),
  wakeTime: z.string().optional(),
  quantity: z.enum(['small', 'medium', 'large']),
  smell: z.enum(['none', 'mild', 'strong']),
  mood: z.enum(['happy', 'sad', 'frustrated', 'neutral', 'anxious']),
  notes: z.string().optional(),
  customAnswers: z.record(z.string()).optional(),
});

export const drinkSchema = z.object({
  type: z.enum(['water', 'juice', 'milk', 'soda', 'tea', 'coffee', 'other']),
  amount: z.number().min(1, 'Amount must be at least 1ml'),
  time: z.string(),
  date: z.string().optional(),
});

export const goalSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  target: z.number().min(1).max(7),
  deadline: z.string().optional(),
});

export const reminderSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  time: z.string(),
  repeat: z.enum(['daily', 'weekdays', 'weekends', 'custom']),
  active: z.boolean().default(true),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(1).max(120).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type IncidentInput = z.infer<typeof incidentSchema>;
export type DrinkInput = z.infer<typeof drinkSchema>;
export type GoalInput = z.infer<typeof goalSchema>;
export type ReminderInput = z.infer<typeof reminderSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
