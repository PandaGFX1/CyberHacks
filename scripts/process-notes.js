import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VAULT = 'A:\\Documents\\My Files\\Obsidian Notes\\03 - Cyber Notes';
const OUTPUT = path.join(__dirname, '..', 'src', 'content', 'notes');

const CATEGORY_MAP = {
  '01 - Knowledge': 'knowledge',
  '02 - Techniques': 'techniques',
  '03 - Playbooks': 'playbooks',
  '04 - Tools': 'tools',
  '05 - Labs': 'labs',
  '06 - Resources & References': 'resources',
};

const EXCLUDE_FOLDERS = ['00 - Cyber Homepage & Index', 'Templates'];

function slugify(name) {
  return name
    .replace(/^\d{2} - /, '')
    .replace(/[—–]/g, '-')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractTitle(content, filename) {
  return filename
    .replace(/-/g, ' ')
    .replace(/\b(\w)/g, c => c.toUpperCase())
    .replace(/\bDns\b/g, 'DNS')
    .replace(/\bHttp\b/g, 'HTTP')
    .replace(/\bHttps\b/g, 'HTTPS')
    .replace(/\bFtp\b/g, 'FTP')
    .replace(/\bSsh\b/g, 'SSH')
    .replace(/\bSsl\b/g, 'SSL')
    .replace(/\bTls\b/g, 'TLS')
    .replace(/\bSmb\b/g, 'SMB')
    .replace(/\bSmtp\b/g, 'SMTP')
    .replace(/\bSnmp\b/g, 'SNMP')
    .replace(/\bNfs\b/g, 'NFS')
    .replace(/\bOsi\b/g, 'OSI')
    .replace(/\bSiem\b/g, 'SIEM')
    .replace(/\bSoc\b/g, 'SOC')
    .replace(/\bSql\b/g, 'SQL')
    .replace(/\bVpn\b/g, 'VPN')
    .replace(/\bApi\b/g, 'API')
    .replace(/\bXss\b/g, 'XSS')
    .replace(/\bCve\b/g, 'CVE')
    .replace(/\bMitre\b/g, 'MITRE')
    .replace(/\bOsint\b/g, 'OSINT')
    .replace(/\bIpmi\b/g, 'IPMI')
    .replace(/\bRdp\b/g, 'RDP')
    .replace(/\bWmi\b/g, 'WMI')
    .replace(/\bLdap\b/g, 'LDAP')
    .replace(/\bEtw\b/g, 'ETW')
    .replace(/\bIds\b/g, 'IDS')
    .replace(/\bIps\b/g, 'IPS')
    .replace(/\bNac\b/g, 'NAC')
    .replace(/\bCs\b$/, 'CS');
}

function extractExcerpt(content, maxLength = 120) {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('<')) continue;
    if (trimmed.startsWith('>')) continue;
    if (trimmed.startsWith('-')) continue;
    if (trimmed.startsWith('*')) continue;
    if (trimmed.startsWith('`')) continue;
    if (trimmed.startsWith('---')) continue;
    if (trimmed.startsWith('|')) continue;
    if (trimmed.startsWith('!')) continue;
    if (trimmed.length < 20) continue;
    const clean = trimmed
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`[^`]+`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/<[^>]+>/g, '')
      .trim();
    if (clean.length < 20) continue;
    return clean.length > maxLength
      ? clean.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
      : clean;
  }
  return '';
}

function extractTags(content) {
  const match = content.match(/^Tags:\s*(.+)$/m);
  let rawTags = [];
  if (match) {
    rawTags = match[1].split(/\s+/).filter(t => t.startsWith('#'));
  } else {
    const bareMatch = content.match(/^(#[A-Za-z][A-Za-z0-9/_-]*(?:\s+#[A-Za-z][A-Za-z0-9/_-]*)*)$/m);
    if (bareMatch) rawTags = bareMatch[1].split(/\s+/);
  }
  const SKIP_PREFIXES = ['Status/', 'Type/', 'Context/', 'Exam/', 'Season/', 'Difficulty/', 'MoC'];
  return rawTags
    .map(t => t.replace('#', ''))
    .filter(t => !SKIP_PREFIXES.some(skip => t.startsWith(skip) || t === skip.replace('/', '')));
}

function stripTagLines(content) {
  content = content.replace(/^Tags:.*$/m, '');
  content = content.replace(/^#[A-Za-z][A-Za-z0-9/_-]*(\s+#[A-Za-z][A-Za-z0-9/_-]*)*\s*$/m, '');
  return content.trimStart();
}

function convertCallouts(content) {
  const lines = content.split('\n');
  const output = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const calloutMatch = line.match(/^(?:▎|>\s*)\[!(\w+)\]([+-]?)\s*(.*)$/i);

    if (calloutMatch) {
      const type = calloutMatch[1].toLowerCase();
      const collapsible = calloutMatch[2] === '-';
      const customTitle = calloutMatch[3].trim();

      const TYPES = {
        info: { label: 'Info', icon: 'ℹ' },
        note: { label: 'Note', icon: '📝' },
        warning: { label: 'Warning', icon: '⚠' },
        warn: { label: 'Warning', icon: '⚠' },
        danger: { label: 'Danger', icon: '🔴' },
        error: { label: 'Error', icon: '🔴' },
        tip: { label: 'Tip', icon: '💡' },
        hint: { label: 'Hint', icon: '💡' },
        success: { label: 'Success', icon: '✓' },
        check: { label: 'Check', icon: '✓' },
        example: { label: 'Example', icon: '▸' },
        abstract: { label: 'Summary', icon: '◆' },
        summary: { label: 'Summary', icon: '◆' },
        todo: { label: 'TODO', icon: '☐' },
        bug: { label: 'Bug', icon: '🐛' },
        quote: { label: 'Quote', icon: '"' },
      };

      const info = TYPES[type] || { label: type, icon: '◆' };
      const title = customTitle || info.label;
      i++;

      const bodyLines = [];
      while (i < lines.length) {
        const bodyLine = lines[i];
        const bodyMatch = bodyLine.match(/^(?:▎|>\s?)(.*)$/);
        if (bodyMatch) {
          bodyLines.push(bodyMatch[1]);
          i++;
        } else {
          break;
        }
      }

      const processedLines = bodyLines.flatMap(line => {
        const trimmed = line.trim();
        if (!trimmed) return [line];
        const parts = trimmed.split(/(?<=`{1,2})\s+(?=[A-Z])/);
        return parts.map(part => {
          const p = part.trim();
          if (/^(`{1,2})[^`]+\1$/.test(p)) return `- ${p}`;
          if (/^(`{1,2}[^`]+`{1,2}\s*){2,}$/.test(p)) {
            const commands = [...p.matchAll(/`{1,2}([^`]+)`{1,2}/g)].map(m => `- \`${m[1]}\``);
            return commands.join('\n');
          }
          return p;
        });
      });

      const bodyLines2 = processedLines.join('\n').trim().split('\n');
      let inList = false;
      const htmlLines = [];

      for (const line of bodyLines2) {
        const listMatch = line.match(/^-\s+`{1,2}(.+?)`{1,2}$/);
        if (listMatch) {
          if (!inList) { htmlLines.push('<ul class="callout-list">'); inList = true; }
          htmlLines.push(`  <li><code>${listMatch[1]}</code></li>`);
        } else {
          if (inList) { htmlLines.push('</ul>'); inList = false; }
          const processed = line.replace(/`{1,2}([^`]+)`{1,2}/g, '<code>$1</code>');
          htmlLines.push(processed);
        }
      }
      if (inList) htmlLines.push('</ul>');
      const bodyHtml = htmlLines.join('\n');

      if (collapsible) {
        output.push(`<details class="callout callout-${type}">`);
        output.push(`<summary class="callout-title"><span class="callout-icon">${info.icon}</span><span>${title}</span></summary>`);
        output.push(`<div class="callout-body">\n\n${bodyHtml}\n\n</div>`);
        output.push(`</details>`);
      } else {
        output.push(`<div class="callout callout-${type}">`);
        output.push(`<div class="callout-title"><span class="callout-icon">${info.icon}</span><span>${title}</span></div>`);
        output.push(`<div class="callout-body">\n\n${bodyHtml}\n\n</div>`);
        output.push(`</div>`);
      }
    } else {
      output.push(line);
      i++;
    }
  }

  return output.join('\n');
}

// Build a map of note title/filename -> slug for wiki link resolution
function buildSlugMap(vaultDir, categoryMap) {
  const slugMap = {};

  function scanDir(dirPath, category, slugParts) {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (EXCLUDE_FOLDERS.some(ex => entry.name === ex)) continue;
        const slug = slugify(entry.name);
        scanDir(fullPath, category, [...slugParts, slug]);
      } else if (entry.name.endsWith('.md')) {
        const basename = path.basename(entry.name, '.md');
        const slug = slugify(basename);
        const fullSlug = [category, ...slugParts, slug].join('/');
        // Map both original name and slugified name
        slugMap[basename.toLowerCase()] = fullSlug;
        slugMap[slug.toLowerCase()] = fullSlug;
        // Also map without number prefix
        const stripped = basename.replace(/^\d{2} - /, '');
        slugMap[stripped.toLowerCase()] = fullSlug;
      }
    }
  }

  for (const [folder, category] of Object.entries(categoryMap)) {
    const sourceDir = path.join(vaultDir, folder);
    scanDir(sourceDir, category, []);
  }

  return slugMap;
}

function resolveWikiLinks(content, slugMap) {
  // Handle [[Page|Alias]] — use alias as text, resolve Page to URL
  content = content.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (match, page, alias) => {
    const key = page.trim().toLowerCase();
    const slug = slugMap[key] || slugMap[slugify(page.trim()).toLowerCase()];
    if (slug) return `[${alias.trim()}](/${slug})`;
    return alias.trim();
  });

  // Handle [[Page]] — resolve to URL or plain text
  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, page) => {
    const key = page.trim().toLowerCase();
    const slug = slugMap[key] || slugMap[slugify(page.trim()).toLowerCase()];
    if (slug) return `[${page.trim()}](/${slug})`;
    return page.trim();
  });

  return content;
}

function processFile(filePath, category, subpath, slugMap) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath, '.md');
  const title = extractTitle(content, slugify(filename));
  const date = fs.statSync(filePath).mtime.toISOString().split('T')[0];
  const tags = extractTags(content);
  content = stripTagLines(content);
  const excerpt = extractExcerpt(content);
  content = convertCallouts(content);
  content = resolveWikiLinks(content, slugMap);

  const frontmatter = `---
title: "${title.replace(/"/g, "'")}"
category: "${category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
excerpt: "${excerpt.replace(/"/g, "'")}"
date: "${date}"
---

`;

  return frontmatter + content;
}

function processDir(dirPath, category, outDir, slugMap) {
  fs.mkdirSync(outDir, { recursive: true });
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_FOLDERS.some(ex => entry.name === ex)) continue;
      const slug = slugify(entry.name);
      processDir(fullPath, category, path.join(outDir, slug), slugMap);
    } else if (entry.name.endsWith('.md')) {
      const slug = slugify(path.basename(entry.name, '.md')) + '.md';
      const result = processFile(fullPath, category, slug, slugMap);
      if (result) {
        const outPath = path.join(outDir, slug);
        fs.writeFileSync(outPath, result, 'utf-8');
        console.log(`  ✓ ${outPath.replace(OUTPUT, '')}`);
      }
    }
  }
}

// Clear output
fs.rmSync(OUTPUT, { recursive: true, force: true });
fs.mkdirSync(OUTPUT, { recursive: true });

console.log('Building slug map...');
const slugMap = buildSlugMap(VAULT, CATEGORY_MAP);
console.log(`  ${Object.keys(slugMap).length} entries mapped\n`);

console.log('Processing vault notes...\n');

for (const [folder, category] of Object.entries(CATEGORY_MAP)) {
  const sourceDir = path.join(VAULT, folder);
  if (!fs.existsSync(sourceDir)) continue;
  console.log(`[${category}]`);
  processDir(sourceDir, category, path.join(OUTPUT, category), slugMap);
}

console.log('\nDone.');
