export function normalizeEmailAddress(email) {
  return email ? email.trim().toLowerCase() : ''
}

export function normalizeName(name) {
  return name ? name.trim().toLowerCase() : ''
}
