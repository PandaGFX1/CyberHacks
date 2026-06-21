import { visit } from 'unist-util-visit';

const CALLOUT_TYPES = {
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
  question: { label: 'Question', icon: '?' },
  example: { label: 'Example', icon: '▸' },
  abstract: { label: 'Summary', icon: '◆' },
  summary: { label: 'Summary', icon: '◆' },
  todo: { label: 'TODO', icon: '☐' },
  bug: { label: 'Bug', icon: '🐛' },
  quote: { label: 'Quote', icon: '"' },
};

export function remarkObsidianCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      const firstPara = node.children?.[0];
      if (!firstPara || firstPara.type !== 'paragraph') return;

      const firstChild = firstPara.children?.[0];
      if (!firstChild || firstChild.type !== 'text') return;

      const match = firstChild.value.match(/^\[!(\w+)\]([+-]?)\s*(.*)?$/i);
      if (!match) return;

      const type = match[1].toLowerCase();
      const collapsible = match[2] === '-';
      const customTitle = match[3]?.trim() || '';
      const calloutInfo = CALLOUT_TYPES[type] || { label: type, icon: '◆' };
      const title = customTitle || calloutInfo.label;

      // Get body content (everything after the first line)
      const bodyChildren = [...node.children];
      // Remove the first paragraph's first text node (the [!TYPE] line)
      if (firstPara.children.length > 1) {
        firstPara.children = firstPara.children.slice(1);
        if (firstPara.children[0]?.type === 'break') {
          firstPara.children = firstPara.children.slice(1);
        }
      } else {
        bodyChildren.shift();
      }

      const htmlOpen = collapsible
        ? `<details class="callout callout-${type}"><summary class="callout-title"><span class="callout-icon">${calloutInfo.icon}</span><span>${title}</span></summary><div class="callout-body">`
        : `<div class="callout callout-${type}"><div class="callout-title"><span class="callout-icon">${calloutInfo.icon}</span><span>${title}</span></div><div class="callout-body">`;

      const htmlClose = collapsible
        ? `</div></details>`
        : `</div></div>`;

      parent.children.splice(index, 1,
        { type: 'html', value: htmlOpen },
        ...bodyChildren,
        { type: 'html', value: htmlClose }
      );
    });
  };
}
