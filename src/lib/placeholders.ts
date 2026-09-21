/** Tokens that must never be treated as real contact data. */
export const PLACEHOLDER_TOKENS = [
  "[PHONE NUMBER]",
  "[TEXT NUMBER]",
  "[EMAIL ADDRESS]",
  "[BUSINESS ADDRESS OR SERVICE-AREA BUSINESS]",
  "[BUSINESS HOURS]",
  "[GOOGLE BUSINESS PROFILE URL]",
  "[FACEBOOK URL]",
  "[INSTAGRAM URL]",
  "[BOOKING URL]",
] as const;

export function isPlaceholder(value?: string | null): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (PLACEHOLDER_TOKENS.includes(trimmed as (typeof PLACEHOLDER_TOKENS)[number])) {
    return true;
  }
  return /^\[[A-Z0-9 /._-]+\]$/.test(trimmed);
}

export function realValue(value?: string | null): string | undefined {
  if (isPlaceholder(value)) return undefined;
  return value?.trim();
}

export function telHref(phone?: string | null): string | undefined {
  const value = realValue(phone);
  if (!value) return undefined;
  const digits = value.replace(/[^\d+]/g, "");
  if (digits.length < 10) return undefined;
  return `tel:${digits}`;
}

export function smsHref(phone?: string | null): string | undefined {
  const value = realValue(phone);
  if (!value) return undefined;
  const digits = value.replace(/[^\d+]/g, "");
  if (digits.length < 10) return undefined;
  return `sms:${digits}`;
}

export function mailtoHref(email?: string | null): string | undefined {
  const value = realValue(email);
  if (!value || !value.includes("@")) return undefined;
  return `mailto:${value}`;
}

export function httpHref(url?: string | null): string | undefined {
  const value = realValue(url);
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}
