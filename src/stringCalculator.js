/**
 * String Calculator kata implementation (JavaScript / ESM).
 * Supports:
 * - Default delimiters: comma (,) and newline (\n)
 * - Custom delimiter header: `//<delim>\n` or `//[delim]\n` (any length)
 * - Multiple custom delimiters: `//[delim1][delim2]\n` (extra)
 * - Negative numbers -> throw Error("negative numbers not allowed <list>")
 */
export function add(numbers) {
  if (!numbers) return 0;

  const { body, delimiters } = extractDelimiters(numbers);
  const tokens = splitNumbers(body, delimiters);

  const values = tokens
    .filter(t => t.length > 0)
    .map(t => toInt(t));

  const negatives = values.filter(n => n < 0);
  if (negatives.length) {
    throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
  }

  return values.reduce((sum, n) => sum + n, 0);
}

function toInt(s) {
  const n = Number(s);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: ${s}`);
  }
  return n;
}

function extractDelimiters(input) {
  if (!input.startsWith("//")) {
    return { body: input, delimiters: [",", "\n"] };
  }
  const newlineIdx = input.indexOf("\n");
  if (newlineIdx === -1) {
    throw new Error("Invalid header: missing newline after delimiter declaration");
  }

  const header = input.slice(2, newlineIdx); // after '//' up to before '\n'
  const body = input.slice(newlineIdx + 1);

  let delimiters = [];

  if (header.startsWith("[") && header.endsWith("]")) {
    // Could be multiple: //[delim1][delim2]
    const regex = /\[(.+?)\]/g;
    let m;
    while ((m = regex.exec(header)) !== null) {
      delimiters.push(m[1]);
    }
    if (delimiters.length === 0) {
      throw new Error("Invalid delimiter declaration");
    }
  } else {
    // Single delimiter (legacy form)
    delimiters = [header];
  }

  return { body, delimiters };
}

function splitNumbers(body, delimiters) {
  const escaped = delimiters.map(escapeRegex);
  const pattern = new RegExp(escaped.join("|"), "g");
  return body.split(pattern);
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
