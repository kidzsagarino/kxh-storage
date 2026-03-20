import { PrismaClient } from '@prisma/client';

/**
 * Generates a human-readable order number.
 * Format: ORD-YYYYMMDD-SHORTID (e.g., ORD-20260214-A1B2)
 */
export function generateOrderNumber(): string {
  const seconds = Math.floor(Date.now() / 1000);

  const shortTimestamp = (seconds % 1000000).toString().padStart(6, '0');

  const randomDigit = Math.floor(Math.random() * 10);

  return `ORD-${shortTimestamp}${randomDigit}`;
}