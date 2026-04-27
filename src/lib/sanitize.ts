/** Strip angle brackets and dangerous patterns to prevent stored XSS */
export function sanitize(input: string | null | undefined): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/** Validate UUID v4 format */
export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

/** Sanitize filename — only allow safe characters */
export function sanitizeFilename(name: string): string {
  const ext = name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'bin';
  return ext;
}
