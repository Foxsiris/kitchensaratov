export function toSlug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0400-\u04FF-]/g, '');
}

export function uniqueSlug(base, existing) {
  let id = base || 'item';
  let n = 1;
  while (existing.has(id)) {
    id = `${base}-${n++}`;
  }
  return id;
}
