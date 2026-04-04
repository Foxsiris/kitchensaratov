const base = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
