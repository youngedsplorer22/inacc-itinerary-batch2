import { describe, expect, it } from 'vitest'
import { isValidParticipantId } from './participantId.js'

describe('isValidParticipantId', () => {
  it.each(['001', '002', '009', '010', '099', '100', '449', '450'])('accepts %s', (id) => {
    expect(isValidParticipantId(id)).toBe(true)
  })

  it.each([
    '000', '451', '999', '4500', '1', '01', '0001', '10', '450 ', ' 450', '+01', '-01',
    '1e2', '0x1', '1.0', 'abc', 'about', '', '00a', '０１０', '٠٠١',
  ])('rejects %j', (id) => {
    expect(isValidParticipantId(id)).toBe(false)
  })

  it('rejects non-strings', () => {
    expect(isValidParticipantId(undefined)).toBe(false)
    expect(isValidParticipantId(null)).toBe(false)
    expect(isValidParticipantId(1)).toBe(false)
  })

  it('accepts exactly 450 of the 1000 possible 3-digit strings, all in 001..450', () => {
    const valid = []
    for (let n = 0; n < 1000; n++) {
      const id = String(n).padStart(3, '0')
      if (isValidParticipantId(id)) valid.push(n)
    }
    expect(valid).toHaveLength(450)
    expect(valid[0]).toBe(1)
    expect(valid[valid.length - 1]).toBe(450)
  })
})
