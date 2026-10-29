import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Inquiry } from "./inquiry-schema";

export type StoredInquiry = Omit<Inquiry, "consent"> & { id: string; reference: string; createdAt: string };

export class StoreUnavailableError extends Error {}

function newReference() {
  // e.g. PK-7K3QX9 — short enough to read over the phone.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  return "PK-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

async function saveToFile(record: StoredInquiry) {
  const dir = process.env.INQUIRY_DATA_DIR || path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  // appendFile resolves only after the write is handed to the OS; failures throw.
  await appendFile(path.join(dir, "inquiries.jsonl"), JSON.stringify(record) + "\n", { encoding: "utf8", mode: 0o600 });
}

async function saveToSupabase(record: StoredInquiry) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new StoreUnavailableError("Supabase storage is selected but not configured.");

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      id: record.id,
      reference: record.reference,
      name: record.name,
      phone: record.phone,
      email: record.email,
      company: record.company ?? null,
      project_type: record.projectType,
      service_interest: record.serviceInterest,
      location: record.location ?? null,
      message: record.message ?? null,
      source_page: record.sourcePage ?? null,
      created_at: record.createdAt,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (res.status !== 201) {
    throw new Error(`Supabase insert failed with status ${res.status}`);
  }
}

/** Persists the inquiry and resolves only once the store has confirmed the write. */
export async function saveInquiry(input: Inquiry): Promise<StoredInquiry> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { consent, ...fields } = input;
  const record: StoredInquiry = {
    ...fields,
    id: randomUUID(),
    reference: newReference(),
    createdAt: new Date().toISOString(),
  };

  const store = (process.env.INQUIRY_STORE || "file").toLowerCase();
  if (store === "supabase") await saveToSupabase(record);
  else if (store === "file") await saveToFile(record);
  else throw new StoreUnavailableError(`Unknown INQUIRY_STORE "${store}".`);

  return record;
}
