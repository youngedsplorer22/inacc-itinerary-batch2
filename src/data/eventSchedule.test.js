import { describe, expect, it } from 'vitest'
import { DAYS } from './itinerary.js'
import { EVENT_DAY_DATES, getEventDateString, getInitialDayIndex } from './eventSchedule.js'

// Instants given with an explicit IST offset (+05:30) so the tests do not depend on the machine's zone.
const at = (iso) => new Date(iso)

describe('event schedule', () => {
  it('has one date per itinerary day, matching the day labels', () => {
    expect(EVENT_DAY_DATES).toHaveLength(DAYS.length)
    const names = { '2026-12-01': 'Tue 01 Dec', '2026-12-02': 'Wed 02 Dec', '2026-12-03': 'Thu 03 Dec', '2026-12-04': 'Fri 04 Dec', '2026-12-05': 'Sat 05 Dec' }
    EVENT_DAY_DATES.forEach((d, i) => expect(DAYS[i].date).toBe(names[d]))
  })

  it.each([0, 1, 2, 3, 4])('opens Day %i+1 on its date (midday IST)', (i) => {
    expect(getInitialDayIndex(at(`${EVENT_DAY_DATES[i]}T12:00:00+05:30`))).toBe(i)
  })

  it('uses the first day before the event', () => {
    expect(getInitialDayIndex(at('2026-11-03T10:00:00+05:30'))).toBe(0)
    expect(getInitialDayIndex(at('2026-11-30T23:59:59+05:30'))).toBe(0)
  })

  it('uses the last day after the event', () => {
    expect(getInitialDayIndex(at('2026-12-06T00:00:00+05:30'))).toBe(4)
    expect(getInitialDayIndex(at('2027-03-01T10:00:00+05:30'))).toBe(4)
  })

  it('switches days at midnight in the event time zone, not the device zone', () => {
    // 2026-12-01 18:29 UTC is 23:59 IST on Day 1; one minute later is Day 2 in IST.
    expect(getInitialDayIndex(at('2026-12-01T18:29:00Z'))).toBe(0)
    expect(getInitialDayIndex(at('2026-12-01T18:30:00Z'))).toBe(1)
    // 2026-11-30 19:00 UTC is already 1 Dec (00:30) in IST.
    expect(getEventDateString(at('2026-11-30T19:00:00Z'))).toBe('2026-12-01')
    expect(getInitialDayIndex(at('2026-11-30T19:00:00Z'))).toBe(0)
    expect(getInitialDayIndex(at('2026-12-05T18:29:00Z'))).toBe(4)
  })

  it('picks the most recent earlier day when dates have a gap', () => {
    const dates = ['2026-12-01', '2026-12-02', '2026-12-05']
    expect(getInitialDayIndex(at('2026-12-03T12:00:00+05:30'), dates)).toBe(1)
    expect(getInitialDayIndex(at('2026-12-04T12:00:00+05:30'), dates)).toBe(1)
  })
})
