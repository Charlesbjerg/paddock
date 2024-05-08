import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a time string to the F1 format (mm:ss.SSS)
 * @param time 
 * @returns string
 */
export function formatLapTime(time: string): string {
  const [hours, minutes, seconds] = time.split(':')
  const [secondsOnly, milliseconds] = seconds.split('.')
  return `${minutes}:${secondsOnly}.${milliseconds.substring(0, 3)}`;
}

/**
 * Formats a typical date string to the F1 format (dd/mm/yyyy)
 * @param date 
 * @returns 
 */
export function formatRaceDate(date: Date | string): string {

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
}

export function formatRaceStartTime(time: string): string {
  return time.substring(0, 5);  
}