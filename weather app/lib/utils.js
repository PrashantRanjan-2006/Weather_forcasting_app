export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function toShiftedUtcDate(input, tzOffsetSeconds = 0) {
  const ms = typeof input === 'number' ? input : new Date(input).getTime();
  return new Date(ms + tzOffsetSeconds * 1000);
}

export function toLocalDateTime(input, tzOffsetSeconds = 0) {
  const date = toShiftedUtcDate(input, tzOffsetSeconds);
  return date.toLocaleString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

export function toLocalDayLabel(unixSeconds, tzOffsetSeconds = 0) {
  const date = toShiftedUtcDate(unixSeconds * 1000, tzOffsetSeconds);
  return date.toLocaleDateString([], { weekday: 'short', timeZone: 'UTC' });
}

export function toLocalHourMinute(unixSeconds, tzOffsetSeconds = 0) {
  const date = toShiftedUtcDate(unixSeconds * 1000, tzOffsetSeconds);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
}

export function toLocalDayKey(unixSeconds, tzOffsetSeconds = 0) {
  const date = toShiftedUtcDate(unixSeconds * 1000, tzOffsetSeconds);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function weatherThemeByCondition(condition = '') {
  const value = condition.toLowerCase();

  if (value.includes('rain') || value.includes('drizzle') || value.includes('storm')) {
    return 'rainy';
  }

  if (value.includes('cloud') || value.includes('mist') || value.includes('fog')) {
    return 'cloudy';
  }

  if (value.includes('clear') || value.includes('sun')) {
    return 'sunny';
  }

  return 'night';
}
