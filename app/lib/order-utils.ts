import { PrismaClient } from '@prisma/client';

/**
 * Generates a human-readable order number.
 * Format: ORD-YYYYMMDD-SHORTID (e.g., ORD-20260214-A1B2)
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
  // Using a short random string to ensure uniqueness within the same day
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `ORD-${datePart}-${randomPart}`;
}