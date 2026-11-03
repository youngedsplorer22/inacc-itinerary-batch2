import { useParams } from 'react-router-dom'
import { isValidParticipantId } from './participantId.js'

// Reads the participant ID from the URL (the ":participantId" part of "/:participantId").
//
// Returns:
//   participantId - the ID as a STRING with leading zeros kept ("001"), or null when
//                   there is no valid ID (on "/", on unknown paths, or on an invalid ID)
//   isInvalid     - true only when the URL had a single-segment ID that failed validation
//                   (for example /000, /451, /abc, /1)
//
// Any component rendered inside the router can call this, so a future group-specific
// itinerary can simply do:  const { participantId } = useParticipantId()
export function useParticipantId() {
  const { participantId: raw } = useParams()

  if (raw === undefined) return { participantId: null, isInvalid: false }

  const valid = isValidParticipantId(raw)
  return { participantId: valid ? raw : null, isInvalid: !valid }
}
