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

export function parseDateOrUndefined(date: Date | null | undefined) {
  if (!date) {
    return undefined;
  }
  return new Date(date);
}

export function getContrastColor(hex: string) {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate the luminance of the color
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export function generateShortId(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }
  return shortId;
}

export function groupByKey(array: any[], key: string) {
  if (typeof key !== "string") {
    throw new Error("Key must be a string.");
  }

  return array.reduce((groupedItems, item) => {
    const value = item[key];
    if (!groupedItems[value]) {
      groupedItems[value] = [];
    }
    groupedItems[value].push(item);
    return groupedItems;
  }, {});
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
