import { z } from "zod";
import { OFFERED_SERVICES } from "@/lib/site-config";

export const TESTIMONIAL_SERVICES = [...OFFERED_SERVICES] as const;

export const testimonialSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Please enter your first name and last initial")
    .max(80),
  serviceType: z.enum(TESTIMONIAL_SERVICES),
  review: z.string().trim().min(20, "Please write a bit more about your visit").max(4000),
  company: z.string().max(0).optional().default(""),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
