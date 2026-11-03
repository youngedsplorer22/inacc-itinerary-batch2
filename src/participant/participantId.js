// Participant IDs are exactly three digits, 001 through 450 inclusive.
export const MIN_PARTICIPANT = 1
export const MAX_PARTICIPANT = 450

// Strict check: "001" is valid; "1", "01", "0001", "000", "451", "abc" are not.
// [0-9] (not \d) so only plain ASCII digits are accepted.
export function isValidParticipantId(id) {
  if (typeof id !== 'string' || !/^[0-9]{3}$/.test(id)) return false
  const n = Number(id)
  return n >= MIN_PARTICIPANT && n <= MAX_PARTICIPANT
}
