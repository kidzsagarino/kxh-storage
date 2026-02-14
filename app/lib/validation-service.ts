import { ServiceType, Weekday, PrismaClient } from '@prisma/client';

export async function validateServiceAvailability(
  tx: any, // Prisma Transaction Client
  serviceType: ServiceType,
  date: Date
) {
  const settings = await tx.adminSettings.findFirst({
    include: {
      blackoutDates: { where: { date: date } },
      weekdayRules: { where: { serviceType, enabled: false } }
    }
  });

  if (!settings) return; // Fallback if no settings exist

  // 1. Check if the specific service is toggled ON
  const isEnabled = 
    (serviceType === 'STORAGE' && settings.storageEnabled) ||
    (serviceType === 'MOVING' && settings.movingEnabled) ||
    (serviceType === 'SHREDDING' && settings.shreddingEnabled);
  
  if (!isEnabled) throw new Error(`${serviceType} services are currently unavailable.`);

  // 2. Check for Blackout Dates
  if (settings.blackoutDates.length > 0) {
    throw new Error(`The date ${date.toLocaleDateString()} is unavailable: ${settings.blackoutDates[0].reason || 'Holiday'}`);
  }

  // 3. Check Weekday Rules
  const dayNames: Weekday[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = dayNames[date.getDay()];
  
  const isDayBlocked = settings.weekdayRules.some((rule: any) => rule.weekday === dayOfWeek);
  if (isDayBlocked) {
    throw new Error(`${serviceType} services are not provided on ${dayOfWeek}s.`);
  }
}