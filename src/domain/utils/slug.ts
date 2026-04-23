export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function slugToId(slug: string): string {
  return slug.replace(/-/g, '_')
}

export function idToSlug(id: string): string {
  return id.replace(/_/g, '-')
}
