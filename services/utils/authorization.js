// Validate secret-bearing authorization values without logging the secrets themselves.
export const authorizationHeader = (value, name) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().toLowerCase() === 'null' || value.trim().toLowerCase() === 'undefined') {
    throw new Error(`Missing or invalid ${name} environment variable`);
  }
  const key = value.trim();
  if (/[\r\n\x00-\x1f\x7f]/.test(key) || /\s/.test(key)) {
    throw new Error(`Invalid whitespace or control characters in ${name} environment variable`);
  }
  return `Bearer ${key}`;
};
