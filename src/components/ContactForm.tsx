"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "h-12 w-full rounded-xl border border-line bg-bg px-4 text-[17px] text-fg placeholder:text-muted";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot: bots fill hidden fields

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "");

    // No form service configured: open the visitor's email app instead.
    if (!site.web3formsKey) {
      const body = `${message}\n\n${name}\n${email}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `Portfolio: ${topic}`,
          name,
          email,
          message,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!json.success) throw new Error("rejected");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[32px] bg-alt p-10">
        <h2 className="text-3xl font-bold tracking-tight">Message sent</h2>
        <p className="mt-3 text-lg text-muted">Thank you. I will reply to you by email soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-[32px] bg-alt p-8 md:p-10">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold">Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" className={field} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className="text-sm font-semibold">I am contacting about</label>
        <select id="topic" name="topic" className={`${field} px-3`}>
          <option>A full-time role</option>
          <option>A freelance project</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-semibold">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-[17px] text-fg"
        />
      </div>
      {/* honeypot */}
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-[52px] rounded-full bg-btn text-[17px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-[15px] text-red-600 dark:text-red-400">
          Something went wrong. Please email me directly at{" "}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  );
}
