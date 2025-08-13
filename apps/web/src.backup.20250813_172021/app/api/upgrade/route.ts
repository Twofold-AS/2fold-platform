import { openUpgradePR, getDefaultBranch, readTextFile, bumpDeps } from "@/lib/github";

type UpgradeBody = {
  owner: string;
  repo: string;
  deps: Record<string, string>;
  title?: string;
  body?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<UpgradeBody>;
  const { owner, repo, deps } = body;
  if (!owner || !repo || !deps || typeof deps !== "object") {
    return new Response("Missing owner/repo/deps", { status: 400 });
  }
  const base = await getDefaultBranch(owner, repo);
  const pkgStr = await readTextFile({ owner, repo, path: "package.json", ref: `heads/${base}` });
  const updated = bumpDeps(JSON.parse(pkgStr), deps);
  const title =
    body.title ??
    `Twofold upgrade: ${Object.entries(deps as Record<string, string>)
      .map(([k, v]) => `${k}@${v}`)
      .join(", ")}`;
  const pr = await openUpgradePR({
    owner,
    repo,
    title,
    body: body.body,
    files: [{ path: "package.json", content: updated, message: title }],
  });
  return Response.json({ ok: true, pr });
}
