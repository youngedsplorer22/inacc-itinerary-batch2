// Event calendar: the single place that says WHEN each itinerary day happens.
// Dates come from the sheet's Notes tab (1-5 December); the year 2026 is confirmed by the
// weekdays on the design board (Tue 01 Dec ... Sat 05 Dec) - see VERIFICATION.md.
// Order matches DAYS in itinerary.js (index 0 = Day 1).
export const EVENT_TIME_ZONE = 'Asia/Kolkata' // venue: Vidyashilp Academy, Bengaluru
export const EVENT_DAY_DATES = ['2026-12-01', '2026-12-02', '2026-12-03', '2026-12-04', '2026-12-05']

// Today's calendar date (YYYY-MM-DD) in the event's time zone, whatever the device's zone is.
export function getEventDateString(now = new Date(), timeZone = EVENT_TIME_ZONE) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

// Index of the itinerary day to open first:
//   before the event -> first day; after it -> last day;
//   on an event day -> that day; in a gap between days -> the most recent earlier day.
export function getInitialDayIndex(now = new Date(), dates = EVENT_DAY_DATES, timeZone = EVENT_TIME_ZONE) {
  const today = getEventDateString(now, timeZone)
  let index = 0
  dates.forEach((date, i) => {
    if (date <= today) index = i // ISO dates compare correctly as strings
  })
  return index
}
