"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "submitted" | "error";

/**
 * Client-side contact form. Submits to /api/contact, which forwards the
 * payload to a Google Sheet web hook. Nothing is sent anywhere from the
 * client other than this site's own API route.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }
      setStatus("submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-heading/10 p-8">
        <h2 className="text-[18px]">Thanks! We&apos;ll be in touch.</h2>
        <p className="mt-2 text-body">
          We usually reply within one business day. In the meantime, feel
          free to browse our{" "}
          <Link href="/portfolio" className="font-bold text-heading underline underline-offset-2">
            recent work
          </Link>
          .
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

      {status === "error" && (
        <p className="rounded-xl bg-pastel-blush/50 px-4 py-3 text-[14px] text-heading">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center self-start rounded-full bg-heading px-6 py-3 text-[14px] font-bold text-background transition-transform duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
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
