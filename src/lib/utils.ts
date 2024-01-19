import { type ClassValue, clsx } from "clsx";
import {
  format,
  formatDistance,
  formatRelative,
  parseISO,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, formatString: string) {
  const dateParsed = parseISO(date.toString());
  return format(dateParsed, formatString);
}

export function dateDistance(date: Date) {
  return formatDistance(date, new Date(), { addSuffix: true });
}
