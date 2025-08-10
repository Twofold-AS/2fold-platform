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
    auth: { appId, privateKey, installationId }
  });
}

export async function getDefaultBranch(owner: string, repo: string) {
  const octokit = getInstallationOctokit();
  const { data } = await octokit.repos.get({ owner, repo });
  return data.default_branch;
}

export async function readTextFile(opts: { owner: string; repo: string; path: string; ref: string }) {
  const octokit = getInstallationOctokit();
  const { data } = await octokit.repos.getContent({
    owner: opts.owner, repo: opts.repo, path: opts.path, ref: opts.ref
  });
  if (Array.isArray(data) || !("content" in data)) throw new Error("Unexpected content type");
  // @ts-ignore
  return Buffer.from(data.content, "base64").toString("utf8");
}

export function bumpDeps(pkgJson: any, depsMap: Record<string, string>) {
  const updated = { ...pkgJson };
  const ensure = (k: "dependencies" | "devDependencies") => {
    updated[k] = { ...(updated[k] ?? {}) };
    for (const [name, ver] of Object.entries(depsMap)) {
      updated[k][name] = ver;
    }
  };
  ensure("dependencies");
  ensure("devDependencies");
  return JSON.stringify(updated, null, 2) + "\n";
}

export async function openUpgradePR(opts: {
  owner: string; repo: string; branch?: string;
  title: string; body?: string;
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
      if (!Array.isArray(data) && "sha" in data) sha = (data as any).sha;
    } catch {}

    await octokit.repos.createOrUpdateFileContents({
      owner, repo,
      path: f.path,
      message: f.message ?? title,
      content: Buffer.from(f.content, "utf8").toString("base64"),
      branch,
      sha
    });
  }

  const { data: pr } = await octokit.pulls.create({ owner, repo, head: branch, base: baseBranch, title, body });
  return pr.html_url;
}
