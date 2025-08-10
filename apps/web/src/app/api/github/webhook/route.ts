import { createHmac, timingSafeEqual } from "node:crypto";
import { openUpgradePR, getDefaultBranch, readTextFile, bumpDeps } from "@/lib/github";

export const runtime = "nodejs";

function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function verify(sigHeader: string | null, payload: string) {
  const secret = required("GITHUB_WEBHOOK_SECRET");
  const hmac = createHmac("sha256", secret);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;
  if (!sigHeader) return false;
  try {
    // Samme lengde før timingSafeEqual
    if (sigHeader.length !== digest.length) return false;
    return timingSafeEqual(Buffer.from(sigHeader), Buffer.from(digest));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-hub-signature-256");
  if (!verify(sig, raw)) return new Response("Invalid signature", { status: 401 });

  const event = req.headers.get("x-github-event") || "unknown";
  const payload = JSON.parse(raw);

  if (event === "repository_dispatch" && payload.action === "twofold-upgrade") {
    const { owner, repo, deps, title, body } = payload.client_payload || {};
    if (owner && repo && deps && typeof deps === "object") {
      const base = await getDefaultBranch(owner, repo);
      const pkg = await readTextFile({ owner, repo, path: "package.json", ref: `heads/${base}` });
      const updated = bumpDeps(JSON.parse(pkg), deps);
      const t = title ?? `Twofold upgrade: ${Object.entries(deps).map(([k, v]: any) => `${k}@${v}`).join(", ")}`;
      const url = await openUpgradePR({
        owner, repo, title: t, body,
        files: [{ path: "package.json", content: updated, message: t }]
      });
      return Response.json({ ok: true, pr: url });
    }
  }

  return Response.json({ ok: true, event });
}
