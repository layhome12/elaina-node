import { z } from 'zod';

export const AuthRequest = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

export type AuthRequestType = z.infer<typeof AuthRequest>;