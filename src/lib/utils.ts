import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatArea(ha: number): string {
  if (ha >= 100) {
    return `${ha.toFixed(1)} ha`
  } else if (ha >= 1) {
    return `${ha.toFixed(2)} ha`
  } else {
    return `${(ha * 10000).toFixed(0)} m²`
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function calculateSqM(ha: number): number {
  return ha * 10000
}

export function calculateHa(sqM: number): number {
  return sqM / 10000
}
