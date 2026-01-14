export const parseDuration = (isoDuration: string): number => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
  const matches = isoDuration.match(regex);

  if (!matches) return 0;

  const hours = parseInt(matches[1] || '0', 10);
  const minutes = parseInt(matches[2] || '0', 10);

  return hours * 60 + minutes;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

export const formatLongDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'}`;
};

export const formatCompactDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`;
};

export const calculateTotalDuration = (segments: Array<{ duration: string }>): number => {
  return segments.reduce((total, segment) => {
    return total + parseDuration(segment.duration);
  }, 0);
};

export const calculateLayoverDuration = (
  arrivalTime: Date | string,
  departureTime: Date | string
): number => {
  const arrival = typeof arrivalTime === 'string' ? new Date(arrivalTime) : arrivalTime;
  const departure = typeof departureTime === 'string' ? new Date(departureTime) : departureTime;

  const diffMs = departure.getTime() - arrival.getTime();
  return Math.floor(diffMs / (1000 * 60));
};

export const formatLayoverDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m layover`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h layover`;
  }

  return `${hours}h ${remainingMinutes}m layover`;
};

export const isShortLayover = (minutes: number): boolean => {
  return minutes < 60;
};

export const isLongLayover = (minutes: number): boolean => {
  return minutes > 240;
};

export const getDurationCategory = (minutes: number): 'short' | 'medium' | 'long' => {
  if (minutes < 180) return 'short';
  if (minutes < 360) return 'medium';
  return 'long';
};

export const compareDurations = (duration1: number, duration2: number): number => {
  return duration1 - duration2;
};
