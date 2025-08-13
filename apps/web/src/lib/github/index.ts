import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function getInstallationOctokit() {
  const appId = required("GITHUB_APP_ID");
  const privateKey = required("GITHUB_APP_PRIVATE_KEY");
  const installationId = Number(required("GITHUB_APP_INSTALLATION_ID"));
  return new Octokit({
    authStrategy: createAppAuth,
    auth: { appId, privateKey, installationId },
  });
}

export async function getDefaultBranch(owner: string, repo: string) {
  const octokit = getInstallationOctokit();
  const { data } = await octokit.repos.get({ owner, repo });
  return data.default_branch;
}

// ——— Helpers for type narrowing of GitHub file content ———
type RepoFile = { type: "file"; content: string; encoding: string; sha: string };
function isRepoFile(d: unknown): d is RepoFile {
  return (
    !!d &&
    typeof d === "object" &&
    (d as { type?: unknown }).type === "file" &&
    typeof (d as { content?: unknown }).content === "string" &&
    typeof (d as { encoding?: unknown }).encoding === "string"
  );
}
function hasSha(d: unknown): d is { sha: string } {
  return !!d && typeof d === "object" && typeof (d as { sha?: unknown }).sha === "string";
}

export async function readTextFile(opts: { owner: string; repo: string; path: string; ref: string }) {
  const octokit = getInstallationOctokit();
  const res = await octokit.repos.getContent({
    owner: opts.owner,
    repo: opts.repo,
    path: opts.path,
    ref: opts.ref,
  });
  const data = res.data as unknown;
  if (!isRepoFile(data)) throw new Error("Unexpected content type");
  const enc = data.encoding === "base64" ? ("base64" as const) : ("utf8" as const);
  return Buffer.from(data.content, enc).toString("utf8");
}

type Pkg = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [k: string]: unknown;
};

export function bumpDeps(pkgJson: Pkg, depsMap: Record<string, string>) {
  const updated: Pkg = { ...pkgJson };
  const ensure = (k: "dependencies" | "devDependencies") => {
    const cur = (updated[k] ?? {}) as Record<string, string>;
    updated[k] = { ...cur };
    for (const [name, ver] of Object.entries(depsMap)) {
      (updated[k] as Record<string, string>)[name] = ver;
    }
  };
  ensure("dependencies");
  ensure("devDependencies");
  return JSON.stringify(updated, null, 2) + "\n";
}

export async function openUpgradePR(opts: {
  owner: string;
  repo: string;
  branch?: string;
  title: string;
  body?: string;
  files: { path: string; content: string; message?: string }[];
}) {
  const { owner, repo, title, body = title } = opts;
  const branch = opts.branch ?? "twofold/upgrade";
  const octokit = getInstallationOctokit();

  const { data: repoData } = await octokit.repos.get({ owner, repo });
  const baseBranch = repoData.default_branch;
  const { data: baseRef } = await octokit.git.getRef({ owner, repo, ref: `heads/${baseBranch}` });
  const baseSha = baseRef.object.sha;

  // Ensure branch exists
  try {
    await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
  } catch {
    await octokit.git.createRef({ owner, repo, ref: `refs/heads/${branch}`, sha: baseSha });
  }

  // Upsert files
  for (const f of opts.files) {
    let sha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({ owner, repo, path: f.path, ref: branch });
      if (!Array.isArray(data) && hasSha(data)) sha = data.sha;
    } catch {
      // file might not exist on branch yet
    }
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: f.path,
      message: f.message ?? title,
      content: Buffer.from(f.content, "utf8").toString("base64"),
      branch,
      sha,
    });
  }

  const { data: pr } = await octokit.pulls.create({
    owner,
    repo,
    head: branch,
    base: baseBranch,
    title,
    body,
  });
  return pr.html_url;
}
