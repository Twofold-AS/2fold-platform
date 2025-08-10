import { openUpgradePR, getDefaultBranch, readTextFile, bumpDeps } from "@/lib/github";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const owner = body.owner as string;
  const repo = body.repo as string;
  const deps = body.deps as Record<string, string>;
  if (!owner || !repo || !deps || typeof deps !== "object") {
    return new Response("Missing owner/repo/deps", { status: 400 });
  }
  const base = await getDefaultBranch(owner, repo);
  const pkgStr = await readTextFile({ owner, repo, path: "package.json", ref: \`heads/\${base}\` });
  const updated = bumpDeps(JSON.parse(pkgStr), deps);
  const title = body.title ?? \`Twofold upgrade: \${Object.entries(deps).map(([k,v]: any)=>\`\${k}@\${v}\`).join(", ")}\`;
  const pr = await openUpgradePR({ owner, repo, title, body: body.body, files: [{ path: "package.json", content: updated, message: title }] });
  return Response.json({ ok: true, pr });
}
