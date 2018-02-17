export default function normalizeEmailAddress(email) {
  return email ? email.trim().toLowerCase() : ''
}
