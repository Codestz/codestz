// Generates static SVG stats cards from GitHub API data
// Run via: node .github/scripts/generate-stats.js

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const USERNAME = 'Codestz';
const PURPLE = '#7c3aed';
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error('GITHUB_TOKEN is required');
  process.exit(1);
}

async function githubAPI(query) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} - ${text}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json;
}

async function fetchStats() {
  const { data } = await githubAPI(`{
    user(login: "${USERNAME}") {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          stargazerCount
          primaryLanguage { name }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges { size node { name color } }
          }
        }
      }
      mergedPRs: pullRequests(states: MERGED) { totalCount }
      allPRs: pullRequests(states: [OPEN, CLOSED, MERGED]) { totalCount }
    }
  }`);
  return data.user;
}

function calculateStreak(weeks) {
  const days = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => b.date.localeCompare(a.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let todayIsToday = true;

  for (const day of days) {
    if (day.contributionCount > 0) {
      tempStreak++;
      if (todayIsToday || currentStreak > 0) currentStreak = tempStreak;
    } else {
      if (todayIsToday) {
        todayIsToday = false;
        continue;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 0;
      if (currentStreak > 0) break;
    }
    todayIsToday = false;
  }
  longestStreak = Math.max(longestStreak, tempStreak);
  return { currentStreak, longestStreak };
}

function getLanguageStats(repos) {
  const langMap = {};
  for (const repo of repos) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      if (!langMap[name]) langMap[name] = { size: 0, color: edge.node.color || '#888' };
      langMap[name].size += edge.size;
    }
  }
  const sorted = Object.entries(langMap)
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 8);
  const total = sorted.reduce((sum, [, v]) => sum + v.size, 0);
  return sorted.map(([name, v]) => ({
    name,
    color: v.color,
    percentage: ((v.size / total) * 100).toFixed(1),
  }));
}

function generateStatsSVG(stats, theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#c9d1d9' : '#333333';
  const totalStars = stats.repositories.nodes.reduce((sum, r) => sum + r.stargazerCount, 0);
  const mergedPRs = stats.mergedPRs.totalCount;
  const cc = stats.contributionsCollection;

  const items = [
    {
      icon: 'M12 .587l3.668 7.568L24 9.306l-6 5.862 1.416 8.245L12 19.446l-7.416 3.967L6 15.168 0 9.306l8.332-1.151z',
      label: 'Total Stars',
      value: totalStars,
    },
    {
      icon: 'M16 1.25a14.75 14.75 0 0 1 0 29.5H2V16C2 7.85 8.6 1.25 16 1.25zM8 18a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0-4a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H8z',
      label: 'Commits',
      value: cc.totalCommitContributions,
      viewBox: '0 0 32 32',
    },
    {
      icon: 'M18 13v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7l2 2h5a2 2 0 0 1 2 2v1H9l-2 4v5h11l2-6z',
      label: 'PRs Merged',
      value: mergedPRs,
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      label: 'Reviews',
      value: cc.totalPullRequestReviewContributions,
    },
    {
      icon: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 5a1 1 0 011 1v4a1 1 0 01-1 1H9a1 1 0 110-2h2V8a1 1 0 011-1z',
      label: 'Issues',
      value: cc.totalIssueContributions,
    },
    {
      icon: 'M3 3h18v18H3V3zm2 2v14h14V5H5z',
      label: 'Repos',
      value: stats.repositories.totalCount,
    },
  ];

  const rows = items
    .map((item, i) => {
      const y = 48 + i * 28;
      return `
    <g transform="translate(25, ${y})">
      <svg width="16" height="16" viewBox="0 0 ${item.viewBox || '24 24'}" fill="none" stroke="${PURPLE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="${item.icon}"/>
      </svg>
      <text x="28" y="12" fill="${textColor}" font-size="13" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif">${item.label}:</text>
      <text x="290" y="12" fill="${textColor}" font-size="13" font-weight="bold" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="end">${item.value.toLocaleString()}</text>
    </g>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="230" viewBox="0 0 340 230">
  <text x="25" y="28" fill="${PURPLE}" font-size="16" font-weight="bold" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif">Codestz's GitHub Stats</text>
  ${rows}
</svg>`;
}

function generateLanguagesSVG(languages, theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#c9d1d9' : '#333333';

  let barX = 25;
  const barWidth = 290;
  const bars = languages.map((lang) => {
    const width = (parseFloat(lang.percentage) / 100) * barWidth;
    const x = barX;
    barX += width;
    return `<rect x="${x}" y="42" width="${width}" height="8" fill="${lang.color}" rx="0"/>`;
  });

  const langLabels = languages.map((lang, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 25 + col * 150;
    const y = 70 + row * 22;
    return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="5" r="5" fill="${lang.color}"/>
      <text x="16" y="9" fill="${textColor}" font-size="12" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif">${lang.name} ${lang.percentage}%</text>
    </g>`;
  });

  const height = 70 + Math.ceil(languages.length / 2) * 22 + 10;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="${height}" viewBox="0 0 340 ${height}">
  <text x="25" y="28" fill="${PURPLE}" font-size="16" font-weight="bold" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif">Top Languages</text>
  ${bars.join('')}
  ${langLabels.join('')}
</svg>`;
}

function generateStreakSVG(streak, totalContributions, theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#c9d1d9' : '#333333';
  const subColor = isDark ? '#888888' : '#666666';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="540" height="160" viewBox="0 0 540 160">
  <g transform="translate(25, 30)">
    <text x="70" y="20" fill="${textColor}" font-size="28" font-weight="bold" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="middle">${totalContributions}</text>
    <text x="70" y="42" fill="${subColor}" font-size="12" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="middle">Total Contributions</text>
  </g>
  <line x1="180" y1="15" x2="180" y2="130" stroke="${isDark ? '#333' : '#e0e0e0'}" stroke-width="1"/>
  <g transform="translate(190, 20)">
    <text x="80" y="16" fill="${PURPLE}" font-size="36" font-weight="bold" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="middle">${streak.currentStreak}</text>
    <text x="80" y="42" fill="${subColor}" font-size="12" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="middle">Current Streak</text>
    <text x="80" y="62" fill="${subColor}" font-size="10" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="middle">days</text>
  </g>
  <line x1="360" y1="15" x2="360" y2="130" stroke="${isDark ? '#333' : '#e0e0e0'}" stroke-width="1"/>
  <g transform="translate(365, 30)">
    <text x="70" y="20" fill="${textColor}" font-size="28" font-weight="bold" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="middle">${streak.longestStreak}</text>
    <text x="70" y="42" fill="${subColor}" font-size="12" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif" text-anchor="middle">Longest Streak</text>
  </g>
  <g transform="translate(25, 85)">
    ${generateMiniGraph(streak.recentDays)}
  </g>
</svg>`;
}

function generateMiniGraph(recentDays) {
  if (!recentDays || recentDays.length === 0) return '';

  const width = 490;
  const height = 50;
  const max = Math.max(...recentDays.map((d) => d.count), 1);
  const barWidth = Math.max(1, width / recentDays.length - 1);

  const bars = recentDays.map((day, i) => {
    const barHeight = Math.max(2, (day.count / max) * height);
    const x = i * (barWidth + 1);
    const y = height - barHeight;
    const opacity = day.count === 0 ? 0.1 : 0.3 + (day.count / max) * 0.7;
    return `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${PURPLE}" opacity="${opacity.toFixed(2)}" rx="1"/>`;
  });

  return `<g transform="translate(0, 0)">${bars.join('')}</g>`;
}

function generateContributionGraphSVG(weeks, theme) {
  const isDark = theme === 'dark';
  const subColor = isDark ? '#888888' : '#666666';
  const emptyColor = isDark ? '#161b22' : '#ebedf0';

  // Take last 52 weeks
  const recentWeeks = weeks.slice(-52);
  const cellSize = 11;
  const gap = 2;
  const marginLeft = 30;
  const marginTop = 40;
  const width = marginLeft + recentWeeks.length * (cellSize + gap) + 20;
  const height = marginTop + 7 * (cellSize + gap) + 30;
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  function getColor(count) {
    if (count === 0) return emptyColor;
    if (count <= 2) return `${PURPLE}44`;
    if (count <= 5) return `${PURPLE}77`;
    if (count <= 10) return `${PURPLE}aa`;
    return PURPLE;
  }

  const cells = recentWeeks
    .map((week, wi) =>
      week.contributionDays
        .map((day, di) => {
          const x = marginLeft + wi * (cellSize + gap);
          const y = marginTop + di * (cellSize + gap);
          return `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${getColor(day.contributionCount)}" rx="2"><title>${day.date}: ${day.contributionCount} contributions</title></rect>`;
        })
        .join('')
    )
    .join('');

  const labels = dayLabels
    .map((label, i) => {
      if (!label) return '';
      const y = marginTop + i * (cellSize + gap) + 9;
      return `<text x="0" y="${y}" fill="${subColor}" font-size="10" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif">${label}</text>`;
    })
    .join('');

  // Month labels
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let lastMonth = -1;
  const monthLabels = recentWeeks
    .map((week, wi) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return '';
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        const x = marginLeft + wi * (cellSize + gap);
        return `<text x="${x}" y="${marginTop - 8}" fill="${subColor}" font-size="10" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif">${months[month]}</text>`;
      }
      return '';
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <text x="${marginLeft}" y="20" fill="${PURPLE}" font-size="16" font-weight="bold" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif">Contribution Graph</text>
  ${monthLabels}
  ${labels}
  ${cells}
</svg>`;
}

async function main() {
  console.log('Fetching GitHub stats...');
  const stats = await fetchStats();
  const weeks = stats.contributionsCollection.contributionCalendar.weeks;
  const totalContributions = stats.contributionsCollection.contributionCalendar.totalContributions;
  const languages = getLanguageStats(stats.repositories.nodes);
  const streak = calculateStreak(weeks);

  // Get recent 90 days for mini bar graph
  const allDays = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date));
  streak.recentDays = allDays.slice(-90).map((d) => ({ count: d.contributionCount }));

  const outDir = path.join(process.cwd(), 'public', 'stats');
  fs.mkdirSync(outDir, { recursive: true });

  for (const theme of ['dark', 'light']) {
    fs.writeFileSync(path.join(outDir, `stats-${theme}.svg`), generateStatsSVG(stats, theme));
    fs.writeFileSync(
      path.join(outDir, `langs-${theme}.svg`),
      generateLanguagesSVG(languages, theme)
    );
    fs.writeFileSync(
      path.join(outDir, `streak-${theme}.svg`),
      generateStreakSVG(streak, totalContributions, theme)
    );
    fs.writeFileSync(
      path.join(outDir, `contributions-${theme}.svg`),
      generateContributionGraphSVG(weeks, theme)
    );
    console.log(`Generated ${theme} theme SVGs`);
  }

  console.log('Done! SVGs written to public/stats/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
