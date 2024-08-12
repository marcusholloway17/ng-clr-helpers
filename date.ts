import { formatDate } from '@angular/common';
import { parse, format } from 'date-fns';

export function convertAndFormatDate(dateString: string) {
  const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
  return format(parsedDate, 'yyyy-MM-dd');
}

export function dateToMonthDayYear(
  dateString: string,
  separator: string = '/',
  locale: string = 'fr',
  timezone: string = 'UTC'
) {
  return formatDate(
    dateString,
    `MM${separator}dd${separator}YYYY`,
    locale,
    timezone
  );
}
export function dateToDayMonthYear(
  dateString: string,
  separator: string = '/',
  locale: string = 'fr',
  timezone: string = 'UTC'
) {
  const parts = dateString.split(separator);
  if (parts.length === 3) {
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
  } else {
    // Gérer l'erreur ou retourner une valeur par défaut si la date n'est pas valide
    return dateString;
  }
  // return formatDate(
  //   dateString,
  //   `dd${separator}MM${separator}YYYY`,
  //   locale,
  //   timezone
  // );
}
/**
 * convert YYYY MM DD -> DD MM YYYY
 * @param dateString date string value
 * @param separator separator string - or /
 */
export function YearMonthDayToDayMonthYear(
  dateString: string,
  inputSeparator: string = '-',
  outputSeparator: string = '-'
) {
  const parts = dateString.split(inputSeparator);
  if (parts.length === 3) {
    return `${parts[2]}${outputSeparator}${parts[1]}${outputSeparator}${parts[0]}`;
  } else {
    return dateString;
  }
}

export function dateToYearMonthDay(
  dateString: string,
  separator: string = '/',
  locale: string = 'fr',
  timezone: string = 'UTC'
) {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  } else {
    // Gérer l'erreur ou retourner une valeur par défaut si la date n'est pas valide
    return dateString;
  }
  // return formatDate(
  //   dateString,
  //   `YYYY${separator}MM${separator}dd`,
  //   locale,
  //   timezone
  // );
}

export function isValidDate(value: string) {
  return /(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)/.test(value);
}
