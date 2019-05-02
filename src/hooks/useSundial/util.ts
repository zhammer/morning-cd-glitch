import { SunlightWindow } from '../../definitions';
import { TimeOfDay } from './types';

export function dateFromUtcString(utcString: string): Date {
  const [dateString, timeString] = utcString.split('T');
  const [fullYear, month, date] = dateString.split('-');
  const [hour, minute, secondString] = timeString.split(':');
  const [second, microsecond] = secondString.split('.');

  const utcDate = Date.UTC(
    parseInt(fullYear),
    parseInt(month) - 1,
    parseInt(date),
    parseInt(hour),
    parseInt(minute),
    parseInt(second),
    microsecond ? parseInt(microsecond) / 1000 : 0
  );
  return new Date(utcDate);
}

export function pluckSunlightWindow({
  sunriseUtc,
  sunsetUtc
}: {
  sunriseUtc: string;
  sunsetUtc: string;
}): SunlightWindow {
  return {
    sunrise: dateFromUtcString(sunriseUtc),
    sunset: dateFromUtcString(sunsetUtc)
  };
}

export function twoDigits(number: number): string {
  return `0${number}`.slice(-2);
}

export function localDateString(date: Date): string {
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;
}

export function timeOfDay(time: Date, day: SunlightWindow): TimeOfDay {
  if (time < day.sunrise) {
    return 'beforeSunrise';
  } else if (time > day.sunset) {
    return 'afterSunset';
  } else {
    return 'day';
  }
}

export function midnightAfter(datetime: Date): Date {
  var midnight = new Date(datetime);
  midnight.setHours(24, 0, 0, 0);
  return midnight;
}
