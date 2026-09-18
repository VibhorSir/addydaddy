import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  budget?: string;
  message?: string;
};

/**
 * Contact form endpoint. Validates the payload, then forwards it to a
 * Google Sheets Apps Script web hook (see scripts/google-sheet-webhook.gs).
 * The web hook URL is read at request time from GOOGLE_SHEET_WEBHOOK_URL so
 * the build never depends on it being present.
 */
export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const company = (body.company ?? "").trim();
  const budget = (body.budget ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      "Contact submission received but GOOGLE_SHEET_WEBHOOK_URL is not set."
    );
    return NextResponse.json(
      { error: "This form isn't fully set up yet. Please email us directly." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        company,
        email,
        budget,
        message,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Sheet webhook responded ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to forward contact form submission:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
      { status: 500 }
    );
  }
}
