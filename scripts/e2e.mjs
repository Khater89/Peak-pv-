/**
 * Acceptance checks against a running server.
 *   npm run build && npm start   (in another terminal)
 *   BASE_URL=http://localhost:3000 npm run test:e2e
 * Uses the Playwright package available in the environment (npm i -D playwright if missing).
 */
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

// require() also resolves a globally installed Playwright (NODE_PATH), which ESM import does not.
const { chromium } = createRequire(import.meta.url)("playwright");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const PAGES = ["/", "/services", "/projects", "/about", "/contact", "/projects/madama"];
let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failed++;
};

const browser = await chromium.launch();

// Page structure: unique titles, one h1, descriptions, alt text, no horizontal overflow, nav links.
const titles = new Set();
for (const width of [360, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const p of PAGES) {
    await page.goto(BASE + p, { waitUntil: "networkidle" });
    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelectorAll("h1").length,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      imgNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
      svgUnlabelled: [...document.querySelectorAll('svg[role="img"]')].filter((s) => !s.getAttribute("aria-label")).length,
    }));
    if (width === 1440) {
      titles.add(info.title);
      check(`${p} has exactly one h1`, info.h1 === 1, `found ${info.h1}`);
      check(`${p} has a meta description`, info.desc.length > 50);
      check(`${p} images have alt text`, info.imgNoAlt === 0 && info.svgUnlabelled === 0);
      for (const target of ["/services", "/projects", "/about", "/contact"]) {
        const inHeader = await page.locator(`header a[href="${target}"]`).count();
        const inFooter = await page.locator(`footer a[href="${target}"]`).count();
        if (!inHeader || !inFooter) check(`${p} links to ${target} in header+footer`, false);
      }
    }
    check(`${p} @${width}px has no horizontal scroll`, info.overflow <= 0, `overflow ${info.overflow}px`);
    check(`${p} @${width}px header CTA visible`, (await page.locator('header a[href="/contact"]:visible').count()) > 0);
  }
  await page.close();
}
check("page titles are unique", titles.size === PAGES.length);

// Home sections.
{
  const page = await browser.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  for (const id of ["hero-title", "services-title", "facts-title", "process-title", "sectors-title", "projects-title", "faq-title", "contact-title"]) {
    check(`home has section #${id}`, (await page.locator(`#${id}`).count()) === 1);
  }
  await page.close();
}

// Form: validation, keyboard, failure, success.
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
await page.goto(BASE + "/contact", { waitUntil: "networkidle" });

// Keyboard: tab to the first field and confirm a visible focus indicator.
await page.locator("form[data-ready]").waitFor();
for (let i = 0; i < 40; i++) {
  await page.keyboard.press("Tab");
  if (await page.evaluate(() => document.activeElement?.getAttribute("name") === "name")) break;
}
const focusStyle = await page.evaluate(() => getComputedStyle(document.activeElement).boxShadow);
check("keyboard reaches the form and shows a visible focus ring", focusStyle && focusStyle !== "none", focusStyle);

await page.click('button[type="submit"]');
check("empty submit shows error summary", await page.getByText(/Please fix \d+ fields/).isVisible());
check("empty submit shows inline name error", await page.getByText("Please enter your full name.", { exact: true }).isVisible());
check("required fields are aria-invalid", (await page.locator('[aria-invalid="true"]').count()) === 6);

// Fill partially with a bad email: other entries stay, only email errors.
await page.fill('input[name="name"]', "Test Person");
await page.fill('input[name="phone"]', "+20 100 123 4567");
await page.fill('input[name="email"]', "not-an-email");
await page.selectOption('select[name="projectType"]', "residential");
await page.selectOption('select[name="serviceInterest"]', "full-project");
await page.check('input[name="consent"]');
await page.click('button[type="submit"]');
check("invalid email blocks submit with specific message", await page.getByText(/valid email address/).first().isVisible());
check("other entries preserved", (await page.inputValue('input[name="name"]')) === "Test Person");

// Service failure: no success shown, inputs kept.
await page.fill('input[name="email"]', "test@example.com");
await page.route("**/api/inquiries", (r) => r.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, error: "Simulated outage." }) }));
await page.click('button[type="submit"]');
await page.getByText("Your request was not sent").waitFor();
check("service failure shows error, not success", !(await page.getByText(/request has been received/).count()));
check("inputs preserved after failure", (await page.inputValue('input[name="email"]')) === "test@example.com");

await page.unroute("**/api/inquiries");
await page.route("**/api/inquiries", (r) => r.abort("internetdisconnected"));
await page.click('button[type="submit"]');
await page.getByText(/couldn't reach our server/).waitFor();
check("network failure shows error", true);
await page.unroute("**/api/inquiries");

// Real success: server stores the record and returns a reference.
const unique = `E2E ${Date.now()}`;
await page.fill('textarea[name="message"]', unique);
await page.click('button[type="submit"]');
await page.getByText(/request has been received/).waitFor({ timeout: 10000 });
const ref = (await page.locator("strong.font-mono").textContent())?.trim();
check("success shows reference", /^PK-[A-Z0-9]{6}$/.test(ref || ""), ref);
const file = path.join(process.env.INQUIRY_DATA_DIR || "data", "inquiries.jsonl");
if (existsSync(file)) {
  const stored = readFileSync(file, "utf8").trim().split("\n").map((l) => JSON.parse(l));
  check("inquiry persisted with matching reference", stored.some((r) => r.reference === ref && r.message === unique));
} else {
  console.log("SKIP  persistence check (file store not local to this run)");
}
await browser.close();

// API: server-side validation independent of the UI.
const bad = await fetch(BASE + "/api/inquiries", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Forwarded-For": "203.0.113.9" },
  body: JSON.stringify({ name: "A", email: "x" }),
});
const badBody = await bad.json();
check("API rejects invalid payload with 422 + field errors", bad.status === 422 && !!badBody.fieldErrors?.phone);

console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
