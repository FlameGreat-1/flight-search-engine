import {
  format,
  parse,
  isValid,
  isBefore,
  isAfter,
  addDays,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  startOfDay,
  endOfDay,
  parseISO,
} from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, formatStr) : '';
};

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, 'HH:mm') : '';
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, 'MMM dd, yyyy HH:mm') : '';
};

export const formatDateForAPI = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, 'yyyy-MM-dd') : '';
};

export const formatDateTimeForAPI = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, "yyyy-MM-dd'T'HH:mm:ss") : '';
};

export const parseDate = (dateString: string, formatStr: string = 'yyyy-MM-dd'): Date | null => {
  try {
    const parsed = parse(dateString, formatStr, new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const parseISODate = (isoString: string): Date | null => {
  try {
    const parsed = parseISO(isoString);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const isValidDate = (date: Date | string | null | undefined): boolean => {
  if (!date) return false;
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj);
};

export const isDateInPast = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isBefore(dateObj, startOfDay(new Date()));
};

export const isDateInFuture = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isAfter(dateObj, endOfDay(new Date()));
};

export const getDaysDifference = (startDate: Date | string, endDate: Date | string): number => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInDays(end, start);
};

export const getHoursDifference = (startDate: Date | string, endDate: Date | string): number => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInHours(end, start);
};

export const getMinutesDifference = (startDate: Date | string, endDate: Date | string): number => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInMinutes(end, start);
};

export const addDaysToDate = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addDays(dateObj, days);
};

export const getMinDate = (): Date => {
  return startOfDay(new Date());
};

export const getMaxDate = (daysFromNow: number = 365): Date => {
  return addDays(startOfDay(new Date()), daysFromNow);
};

export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = startOfDay(new Date());
  const targetDate = startOfDay(dateObj);
  const daysDiff = differenceInDays(targetDate, today);

  if (daysDiff === 0) return 'Today';
  if (daysDiff === 1) return 'Tomorrow';
  if (daysDiff === -1) return 'Yesterday';
  if (daysDiff > 1 && daysDiff <= 7) return `In ${daysDiff} days`;
  if (daysDiff < -1 && daysDiff >= -7) return `${Math.abs(daysDiff)} days ago`;

  return formatDate(dateObj);
};

export const getTimeOfDay = (date: Date | string): 'early-morning' | 'morning' | 'afternoon' | 'evening' => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const hour = dateObj.getHours();

  if (hour >= 0 && hour < 6) return 'early-morning';
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
};

export const formatDayOfWeek = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEEE');
};

export const formatShortDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd');
};
