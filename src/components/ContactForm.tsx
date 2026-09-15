"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

/**
 * Placeholder client-side form. Wire `handleSubmit` up to a real API route,
 * email service, or CRM webhook before launch; this only manages local UI
 * state.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: POST to a real API route / CRM webhook.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-heading/10 p-8">
        <h2 className="text-[18px]">Thanks! We&apos;ll be in touch.</h2>
        <p className="mt-2 text-body">
          We usually reply within one business day. In the meantime, feel
          free to browse our <Link href="/portfolio" className="font-bold text-heading underline underline-offset-2">recent work</Link>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required />
        <Field id="company" label="Company" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" type="email" required />
        <Field id="budget" label="Monthly ad budget (optional)" />
      </div>
      <div>
        <label htmlFor="message" className="text-[14px] font-bold text-heading">
          What are you looking to grow?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-heading/15 bg-transparent px-4 py-3 text-body outline-none transition-colors duration-300 focus:border-heading"
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center self-start rounded-full bg-heading px-6 py-3 text-[14px] font-bold text-background transition-transform duration-300 hover:scale-[1.03]"
      >
        Send message
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-bold text-heading">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-heading/15 bg-transparent px-4 py-3 text-body outline-none transition-colors duration-300 focus:border-heading"
      />
    </div>
  );
}
