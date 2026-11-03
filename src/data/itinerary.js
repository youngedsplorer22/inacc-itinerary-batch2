// Itinerary source of truth: Google Sheet, second itinerary tab
// (https://docs.google.com/spreadsheets/d/1LGqES6PjPQu07g23_qTasQdUQrprBjeP).
// Rows follow the sheet's order. Text is the sheet's text, with only the proofreading
// corrections listed in VERIFICATION.md (spelling, grammar, punctuation, time format).
//
// code, stage: headings from the approved design board (nav label and day heading).
// date: from the sheet's Notes tab (1-3 December common days, 4 December, 5 December).
//
// Row fields: time, title (sheet "Session"; where the sheet has only an Activity column,
// that text is the title), detail (sheet "Activity", optional), lunch (shown as a band).
//
// Days 4-5: the sheet has ONE schedule per day, so every participant sees `rows`.
// For per-group schedules add `groups: { 1: [...], 2: [...] }` to a day and return the group
// from getGroupForParticipant() (src/participant/group.js).
export const DAYS = [
  {
    id: 'day-1',
    num: 1,
    code: 'Orient',
    stage: 'Registration & Orientation',
    date: 'Tue 01 Dec',
    rows: [
      { time: '7:00 AM', title: 'Assemble at Vidyashilp Academy' },
      { time: '8:00 AM', title: 'Orientation & Welcome' },
      { time: '8:00 - 9:00 AM', title: 'Opening Ceremony and Guest Talks', detail: 'Dr. Deepak Singh - Assistant Professor - IIT Bombay' },
      { time: '9:00 - 9:50 AM', title: 'Fundamentals of Rocketry', detail: 'Theoretical session with experiential activities for the explanation of thrust, rocket CG & CP, etc.' },
      { time: '9:50 - 10:00 AM', title: 'Snack Break' },
      { time: '10:00 - 10:50 AM', title: 'Fundamentals of CANSAT', detail: 'Theoretical session with visual activities and videos' },
      { time: '10:50 - 11:00 AM', title: 'Movement to Breakout Rooms' },
      { time: '11:00 AM - 1:00 PM', title: 'Rocket Integration', detail: 'Component visualisation, shroud line fixation & parachute folding + lower body assembly - fixation of aeropack and centre rings.' },
      { time: '1:00 - 1:45 PM', title: 'Lunch', lunch: true },
      { time: '1:45 - 3:15 PM', title: 'Rocket Integration', detail: "Lower body assembly - fin alignment and fixation + Outer body preparation + briefing for next day's plan" },
      { time: '3:15 - 3:30 PM', title: 'Snack Break followed by dispersal', detail: 'Pick up by parents from Vidyashilp between 3:45 - 4:00 PM' },
    ],
  },
  {
    id: 'day-2',
    num: 2,
    code: 'Rocketry',
    stage: 'Rocketry Fundamentals',
    date: 'Wed 02 Dec',
    rows: [
      { time: '7:30 AM', title: 'Assemble at Vidyashilp Academy' },
      { time: '7:45 - 8:00 AM', title: 'Welcome Note' },
      { time: '8:00 - 8:30 AM', title: 'Guest Talk', detail: 'Dr. Venkateshwarlu Andra - Ex-ISRO Scientist' },
      { time: '8:30 - 9:15 AM', title: 'Fundamentals of Rocket Onboard Flight Computers', detail: 'Theoretical session with visual activities and videos' },
      { time: '9:15 - 9:30 AM', title: 'Movement to Breakout Rooms' },
      { time: '9:30 - 11:15 AM', title: 'Rocket Integration', detail: 'Component visualisation and on-board flight computer (avionics) testing' },
      { time: '11:15 - 11:30 AM', title: 'Break' },
      { time: '11:30 AM - 1:15 PM', title: 'Rocket Integration', detail: 'PCB Mounting + Ground control integration test and coupler integration with rocket body' },
      { time: '1:15 - 2:00 PM', title: 'Lunch', lunch: true },
      { time: '2:00 - 3:30 PM', title: 'CANSAT Integration', detail: 'Circuit testing on breadboard + CANSAT PCB integration and CANSAT parachute integration' },
      { time: '3:30 - 3:45 PM', title: 'Snack Break followed by dispersal', detail: 'Pick up by parents from Vidyashilp between 3:45 - 4:00 PM' },
    ],
  },
  {
    id: 'day-3',
    num: 3,
    code: 'CANSAT',
    stage: 'CANSAT Engineering',
    date: 'Thu 03 Dec',
    rows: [
      { time: '7:00 - 7:30 AM', title: 'Assemble at the Venue', detail: 'Vidyashilp Academy' },
      { time: '7:45 - 8:15 AM', title: 'Guest Talk', detail: 'Ms. Ishita Ganju - ISRO Scientist' },
      { time: '8:15 - 9:00 AM', title: 'Fundamentals of Rocket Propulsion', detail: 'Theoretical session with visual activities and videos' },
      { time: '9:00 - 9:15 AM', title: 'Movement to Breakout Rooms' },
      { time: '9:15 - 11:00 AM', title: 'Rocket Integration', detail: 'Recovery mechanism integration' },
      { time: '11:00 - 11:15 AM', title: 'Snack Break' },
      { time: '11:15 AM - 1:00 PM', title: 'Rocket Integration', detail: 'Upper body + coupler + lower body rocket integration and final assembly' },
      { time: '1:00 - 1:45 PM', title: 'Lunch', lunch: true },
      { time: '1:45 - 3:15 PM', title: 'Rocket Inspection', detail: 'Final rocket inspection and propulsion system integration test' },
      { time: '3:15 - 4:00 PM', title: 'Snack Break followed by dispersal', detail: 'Pick up by parents from Vidyashilp between 3:45 - 4:00 PM' },
    ],
  },
  {
    id: 'day-4',
    num: 4,
    code: 'Simulate',
    stage: 'Mission Simulation & Launch Prep',
    date: 'Fri 04 Dec',
    rows: [
      { time: '8:00 - 8:30 AM', title: 'Teams report at Vidyashilp, attendance' },
      { time: '8:30 - 10:00 AM', title: 'Workshop Session 1' },
      { time: '10:00 - 10:15 AM', title: 'Snack Break' },
      { time: '10:15 AM - 12:00 PM', title: 'Workshop Session 2', detail: 'Software workshop by Mr. Prakhar Jain and his team' },
      { time: '12:00 - 1:00 PM', title: 'Lunch', lunch: true },
      { time: '1:00 - 1:30 PM', title: 'Pre-launch inspection of rockets (inspected rockets tagged as cleared for Day 5)' },
      { time: '1:30 - 2:00 PM', title: 'Snack Break followed by dispersal', detail: 'Pick up by parents from Vidyashilp Academy 2:00 - 2:30 PM' },
    ],
  },
  {
    id: 'day-5',
    num: 5,
    code: 'Launch',
    stage: 'Final Launch & Valedictory',
    date: 'Sat 05 Dec',
    rows: [
      { time: '6:30 AM', title: 'Teams report and register at SNIS' },
      { time: '6:45 - 7:00 AM', title: 'Safety briefing and final checks' },
      { time: '7:00 - 9:00 AM', title: 'Rocket Launches (Teams 22 - 28)' },
      { time: '9:00 - 9:15 AM', title: 'Snack Break' },
      { time: '9:15 - 11:30 AM', title: 'Rocket Launches (Teams 29 - 35)' },
      { time: '11:30 AM - 12:00 PM', title: 'Lunch', lunch: true },
      { time: '12:00 - 1:30 PM', title: 'Rocket Launches (Teams 36 - 42)' },
      { time: '1:30 - 1:45 PM', title: 'Snack Break followed by dispersal' },
      { time: '1:45 - 3:00 PM', title: 'Transfer to Vidyashilp' },
      { time: '3:00 - 4:30 PM', title: 'Closing ceremony and certificate distribution' },
      { time: '4:45 - 5:00 PM', title: 'Dispersal', detail: 'Pick up by parents at 4:45 - 5:00 PM from Vidyashilp' },
    ],
  },
]

// The rows a participant of `group` should see. Falls back to the single schedule.
export function getDayRows(day, group) {
  return (group != null && day.groups?.[group]) || day.rows
}
