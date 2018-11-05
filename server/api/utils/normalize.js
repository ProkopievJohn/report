export function normalizeEmailAddress(email) {
  return email ? email.trim().toLowerCase() : ''
}

export function normalizeName(name) {
  return name ? name.trim().toLowerCase() : ''
}

export function normalizeNameUpper(name) {
  return name ? name.trim().toUpperCase() : ''
}

export function normalizeDate(date) {
  if (date && !isNaN(new Date(date).getTime())) {
    return new Date(date)
  }
}
