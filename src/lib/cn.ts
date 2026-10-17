/**
 * Tiny class-merge helper (no dependency needed for this shape).
 * Joins non-empty class names, which keeps JSX readable.
 */

type ClassValue = string | number | null | undefined | false | ClassValue[] | ClassValue[];

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      continue;
    }
    out.push(...(value as ClassValue[]).flatMap((item) => {
      if (!item) return [];
      return [String(item)];
    }));
  }
  return out.join(' ');
}
