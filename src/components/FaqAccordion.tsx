"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/services";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-heading/10 border-y border-heading/10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-bold text-heading">{faq.question}</span>
              <Plus
                size={18}
                className={`shrink-0 text-heading transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="min-h-0 text-body">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
