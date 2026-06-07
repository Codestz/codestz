// Refreshes stars/forks in showcase project frontmatter from the GitHub API.
// Surgical line edits keep diffs minimal (no frontmatter reserialization).
// Run via: node .github/scripts/update-showcase-stats.js

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const SHOWCASE_DIR = path.join(process.cwd(), 'src/content/showcase');
const TOKEN = process.env.GITHUB_TOKEN;

async function fetchRepo(repo) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'codestz-showcase-stats' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} for ${repo}: ${await res.text()}`);
  }
  return res.json();
}

// Split a file into its YAML frontmatter block and the rest.
function splitFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  return { block: match[1], start: match.index, end: match.index + match[0].length };
}

function readField(block, key) {
  const m = block.match(new RegExp(`^${key}:\\s*['"]?([^'"\\n]+)['"]?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
}

// Set `key: value` inside the frontmatter block. Replaces the line if present,
// otherwise inserts it right after the `repo:` line.
function setField(block, key, value) {
  const line = `${key}: ${value}`;
  const re = new RegExp(`^${key}:.*$`, 'm');
  if (re.test(block)) return block.replace(re, line);
  return block.replace(/^(repo:.*)$/m, `$1\n${line}`);
}

async function main() {
  if (!fs.existsSync(SHOWCASE_DIR)) {
    console.log('No showcase directory, nothing to do.');
    return;
  }

  const files = fs.readdirSync(SHOWCASE_DIR).filter((f) => f.endsWith('.mdx'));
  let changed = 0;

  for (const file of files) {
    const filePath = path.join(SHOWCASE_DIR, file);
    const text = fs.readFileSync(filePath, 'utf8');
    const fm = splitFrontmatter(text);

    if (!fm) {
      console.warn(`! ${file}: no frontmatter, skipping`);
      continue;
    }

    const repo = readField(fm.block, 'repo');
    if (!repo) {
      console.warn(`! ${file}: no repo field, skipping`);
      continue;
    }

    try {
      const data = await fetchRepo(repo);
      const stars = data.stargazers_count ?? 0;
      const forks = data.forks_count ?? 0;

      let block = setField(fm.block, 'stars', stars);
      block = setField(block, 'forks', forks);

      if (block !== fm.block) {
        const updated = `---\n${block}\n---` + text.slice(fm.end);
        fs.writeFileSync(filePath, updated);
        changed++;
        console.log(`✓ ${file}: ${repo} → ★${stars} ⑂${forks}`);
      } else {
        console.log(`= ${file}: ${repo} unchanged (★${stars} ⑂${forks})`);
      }
    } catch (err) {
      console.error(`! ${file}: ${err.message}`);
    }
  }

  console.log(`Done. ${changed} file(s) updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
