import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Demo-only persistence: writes to a local JSON file so submissions survive
// a dev server restart. In production this would write to a real database
// or CRM webhook instead of the filesystem.
const DATA_FILE = path.join(process.cwd(), "lib", "leads.json");

type Lead = {
  name: string;
  workEmail: string;
  company: string;
  teamSize: string;
  domain: string;
  submittedAt: string;
};

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !body.name || !body.workEmail || !body.company) {
    return NextResponse.json(
      { ok: false, error: "Name, work email, and company are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.workEmail)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid work email." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    name: String(body.name).slice(0, 200),
    workEmail: String(body.workEmail).slice(0, 200),
    company: String(body.company).slice(0, 200),
    teamSize: String(body.teamSize ?? "Not specified").slice(0, 100),
    domain: String(body.domain ?? "Not specified").slice(0, 100),
    submittedAt: new Date().toISOString(),
  };

  try {
    const leads = await readLeads();
    leads.push(lead);
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist lead:", err);
  }

  return NextResponse.json({ ok: true, recordId: `LED-${Date.now()}` });
}

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ ok: true, count: leads.length, leads });
}
