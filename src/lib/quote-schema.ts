import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z.string().trim().min(7, "Please enter a phone number").max(40),
  email: z.string().trim().email("Please enter a valid email"),
  preferredContact: z.enum(["call", "text", "email"]),
  serviceNeeded: z.string().trim().min(1, "Please choose a service"),
  propertyType: z.enum(["home", "apartment", "office", "rental", "other"]),
  size: z.string().trim().max(80).optional().default(""),
  desiredDate: z.string().trim().max(40).optional().default(""),
  frequency: z.enum(["one-time", "weekly", "biweekly", "monthly", "custom"]),
  cityOrZip: z.string().trim().min(2, "Please add a city or ZIP").max(80),
  message: z.string().trim().max(4000).optional().default(""),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please confirm we may contact you"),
  company: z.string().max(0).optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const SERVICE_OPTIONS = [
  "Standard Residential Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out Cleaning",
  "Recurring Cleaning",
  "Commercial / Office Cleaning",
  "Airbnb / Short-Term Rental Turnover Cleaning",
  "Post-Construction Cleaning",
  "Not sure yet",
] as const;
