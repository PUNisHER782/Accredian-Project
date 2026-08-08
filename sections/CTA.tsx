"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export default function CTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [recordId, setRecordId] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setRecordId(json.recordId);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again in a moment.");
    }
  }

  return (
    <section id="brief" aria-labelledby="brief-heading" className="py-24 md:py-32 bg-ink-raised/40">
      <Container className="max-w-5xl grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] text-brass-bright uppercase mb-4">
              Open a File
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="brief-heading" className="font-display text-4xl md:text-5xl text-bone text-balance">
              Request an enterprise briefing
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-bone/60 leading-relaxed max-w-sm">
              Tell us about your team and we&apos;ll get back within two business days with a
              tailored programme outline and pricing.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {status === "success" ? (
            <div className="bg-parchment text-charcoal p-8" role="status">
              <CheckCircle2 className="text-emerald mb-4" size={28} />
              <p className="font-mono text-[10px] tracking-widest text-charcoal/75 uppercase mb-3">
                Filed
              </p>
              <p className="font-display text-2xl mb-2">Briefing request received.</p>
              <p className="text-charcoal/75 text-sm">
                Record ID <span className="font-mono">{recordId}</span> — our enterprise team
                will reach out to the work email you provided.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-ink border border-ink-line rounded-[2px] p-8"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" name="name" required placeholder="Full name" />
                <Field label="Work email" name="workEmail" type="email" required placeholder="you@company.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Company" name="company" required placeholder="Company name" />
                <div>
                  <label htmlFor="teamSize" className="block text-xs font-mono uppercase tracking-wide text-bone/65 mb-2">
                    Team size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    className="w-full bg-ink-raised border border-ink-line rounded-sm px-3 py-2.5 text-sm text-bone focus:border-brass outline-none"
                  >
                    <option>15–30</option>
                    <option>31–100</option>
                    <option>101–500</option>
                    <option>500+</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="domain" className="block text-xs font-mono uppercase tracking-wide text-bone/65 mb-2">
                  Domain of interest
                </label>
                <select
                  id="domain"
                  name="domain"
                  className="w-full bg-ink-raised border border-ink-line rounded-sm px-3 py-2.5 text-sm text-bone focus:border-brass outline-none"
                >
                  <option>Generative AI Mastery</option>
                  <option>Data Science &amp; Analytics</option>
                  <option>Leadership Elevation</option>
                  <option>Tech &amp; Data Insights</option>
                  <option>Operations Excellence</option>
                  <option>Digital Enterprise</option>
                  <option>Fintech Fundamentals</option>
                </select>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400" role="alert">
                  {errorMsg}
                </p>
              )}

              <Button type="submit" disabled={status === "loading"} className="w-full" magnetic={false}>
                {status === "loading" ? "Filing request…" : "Submit briefing request"}
              </Button>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-mono uppercase tracking-wide text-bone/65 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-ink-raised border border-ink-line rounded-sm px-3 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:border-brass outline-none"
      />
    </div>
  );
}
