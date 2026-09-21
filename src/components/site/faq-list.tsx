"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/content/types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const groups = faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
    const key = faq.category || "General";
    acc[key] = acc[key] ? [...acc[key], faq] : [faq];
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(groups).map(([category, items]) => (
        <div key={category}>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">{category}</h3>
          <Accordion.Root type="single" collapsible className="mt-4 divide-y divide-border rounded-[20px] bg-white shadow-card">
            {items.map((faq) => (
              <Accordion.Item key={faq.id} value={faq.id} className="px-5">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-navy">
                    {faq.question}
                    <ChevronDown className="size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden pb-4 text-sm leading-relaxed text-muted data-[state=open]:animate-none">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      ))}
    </div>
  );
}
