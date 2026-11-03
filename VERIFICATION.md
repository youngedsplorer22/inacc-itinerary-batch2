# Itinerary verification: sheet vs website data

Source: second itinerary tab of the Google Sheet (identical in `INACC_Day4_Day5_Itinerary (1).xlsx`). Rows are compared 1:1 in sheet order.

## Corrections made to sheet text
- "Asisstant" -> "Assistant" (Day 1 guest line).
- "disbursal" / "Disbursal" -> "dispersal" / "Dispersal" (the sheet's own Notes tab uses "dispersal").
- "Ex- ISRO" -> "Ex-ISRO".
- "CANSAT" / "CanSAT" / "CanSat" -> "CANSAT" (one spelling everywhere, matching the "CANSAT" nav heading).
- "visualization" -> "visualisation" (Day 2), to match "visualisation" and "centre" elsewhere in the sheet.
- "Snacks break" -> "Snack Break"; "Snack break" -> "Snack Break"; "Rocket launches" -> "Rocket Launches" (consistent capitalization).
- "his Team" -> "his team"; "Pickup by Parents" / "Pick Up by Parents" -> "Pick up by parents".
- "Teams 1 – 8" (en dash) -> "Teams 1 - 8", like the other ranges.
- "11:00 - 11:15 - Am" -> "11:00 - 11:15 AM" (stray dash).
- Times: all shown as 12-hour "h:mm AM/PM" (the sheet mixed 24-hour, "Am", "Pm", "pm", "5pm"). Clock values are unchanged.
- Trailing spaces and line breaks inside cells removed.
- Five start times stored as time values in the sheet are shown as clock times: 7:00 AM and 8:00 AM (Day 1), 7:30 AM (Day 2), 6:30 AM (Day 4), 9:00 AM (Day 5).

## Further corrections
- "Pickup by Parents" / "Pick Up by Parents" -> "Pick up by parents".
- "Vidyashilp Academy 2 -2:30 pm" -> "Vidyashilp Academy 2:00 - 2:30 PM".
- "Rocket launches (Teams 22–28)" and "Teams 36–42" -> hyphen with spaces, like "Teams 29 - 35".
- "Snack break followed by disbursal" -> "Snack Break followed by dispersal".

## Wording changed to remove the word "Batch"
- Day 5 "Safety briefing and Batch 1 final checks" -> "Safety briefing and final checks".
- Day 5 "Batch 3 launches (Teams 36–42)" -> "Rocket Launches (Teams 36 - 42)".

## Left out of the website (please confirm)
- Day 4 sheet row 54: the cell `Disbursal` stands alone in the time column with no time, session or activity. The row above already says "Snack Break followed by dispersal" with pick-up times, so it looks like a stray label.
- Day 5 sheet row 65, Session cell: "Bus has to be booked". It reads as an internal to-do, not student information, so it is not shown. The Activity text "Snacks break followed by disbursal" is shown.

## Unresolved / please confirm
1. Group 1 / Group 2: this tab, like the other, has one schedule for Days 4-5 and there is no participant-to-group mapping. Everyone sees that schedule. Integration point: `src/participant/group.js`. No assignments from the other itinerary were reused.
2. Day 4 text "Pre-launch inspection of rockets": shown exactly as written. "Group B" is a group label; confirm it should be visible to students.
3. Design-board Day 4 heading "Mission Simulation & Launch Prep" sits over workshops and a rocket inspection on this tab. Kept unchanged as instructed.
4. Day 5 "Teams report and register at SNIS": "SNIS" is not expanded in the sheet. "Transfer to Vidyashilp" is shown as written.
5. Meal counts in the Notes tab (245 on Days 4 and 5) suggest about half of the participants per itinerary on those days. No ID-to-itinerary mapping exists in the workbook.

## Sheet vs website, row by row

Status: `same` = same time and identical text (time only re-formatted to 12-hour AM/PM, whitespace collapsed); `CORRECTED` = wording/punctuation change, shown side by side. Times are compared by clock value, so every time shown is equal to the sheet.

Totals: 50 rows compared, 16 rows with wording corrections, 34 identical. No rows missing, added or reordered.

## Day 1 - Registration & Orientation, Tue 01 Dec (sheet heading: "Day 1")

| # | Sheet time | Sheet session | Sheet activity | Site time | Site title | Site detail | Status |
|---|---|---|---|---|---|---|---|
| 1 | 7:00 AM (sheet time value) | Assemble at Vidyashilp Academy |  | 7:00 AM | Assemble at Vidyashilp Academy |  | same |
| 2 | 8:00 AM (sheet time value) | Orientation & Welcome |  | 8:00 AM | Orientation & Welcome |  | same |
| 3 | 8:00 - 9:00 | Opening Ceremony and Guest Talks | Dr. Deepak Singh - Asisstant Professor - IIT Bombay | 8:00 - 9:00 AM | Opening Ceremony and Guest Talks | Dr. Deepak Singh - Assistant Professor - IIT Bombay | CORRECTED |
| 4 | 9:00 - 9:50 | Fundamentals of Rocketry | Theoretical session with experiential activities for the explanation of thrust, rocket CG & CP, etc. | 9:00 - 9:50 AM | Fundamentals of Rocketry | Theoretical session with experiential activities for the explanation of thrust, rocket CG & CP, etc. | same |
| 5 | 9:50 - 10:00 | Snack Break |  | 9:50 - 10:00 AM | Snack Break |  | same |
| 6 | 10:00 - 10:50 | Fundamentals of CANSAT | Theoretical session with visual activities and videos | 10:00 - 10:50 AM | Fundamentals of CANSAT | Theoretical session with visual activities and videos | CORRECTED |
| 7 | 10:50 - 11:00 | Movement to Breakout Rooms |  | 10:50 - 11:00 AM | Movement to Breakout Rooms |  | same |
| 8 | 11:00 - 13:00 | Rocket Integration | Component visualisation, shroud line fixation & parachute folding + lower body assembly - fixation of aeropack and centre rings. | 11:00 AM - 1:00 PM | Rocket Integration | Component visualisation, shroud line fixation & parachute folding + lower body assembly - fixation of aeropack and centre rings. | same |
| 9 | 13:00 - 13:45 | Lunch |  | 1:00 - 1:45 PM | Lunch |  | same |
| 10 | 13:45 - 15:15 | Rocket Integration | Lower body assembly - fin alignment and fixation + Outer body preparation + briefing for next day's plan | 1:45 - 3:15 PM | Rocket Integration | Lower body assembly - fin alignment and fixation + Outer body preparation + briefing for next day's plan | same |
| 11 | 15:15 - 15:30 | Snack Break followed by disbursal | Pick up by parents from Vidyashilp between 3:45 - 4:00 pm | 3:15 - 3:30 PM | Snack Break followed by dispersal | Pick up by parents from Vidyashilp between 3:45 - 4:00 PM | CORRECTED |

## Day 2 - Rocketry Fundamentals, Wed 02 Dec (sheet heading: "Day 2")

| # | Sheet time | Sheet session | Sheet activity | Site time | Site title | Site detail | Status |
|---|---|---|---|---|---|---|---|
| 1 | 7:30 AM (sheet time value) | Assemble at Vidyashilp Academy |  | 7:30 AM | Assemble at Vidyashilp Academy |  | same |
| 2 | 7:45 - 8:00 | Welcome Note |  | 7:45 - 8:00 AM | Welcome Note |  | same |
| 3 | 8:00 - 8:30 | Guest Talk | Dr. Venkateshwarlu Andra - Ex- ISRO Scientist | 8:00 - 8:30 AM | Guest Talk | Dr. Venkateshwarlu Andra - Ex-ISRO Scientist | CORRECTED |
| 4 | 8:30 - 9:15 | Fundamentals of Rocket Onboard Flight Computers | Theoretical session with visual activities and videos | 8:30 - 9:15 AM | Fundamentals of Rocket Onboard Flight Computers | Theoretical session with visual activities and videos | same |
| 5 | 9:15 - 9:30 | Movement to Breakout Rooms |  | 9:15 - 9:30 AM | Movement to Breakout Rooms |  | same |
| 6 | 9:30 - 11:15 | Rocket Integration | Component visualization and on-board flight computer (avionics) testing | 9:30 - 11:15 AM | Rocket Integration | Component visualisation and on-board flight computer (avionics) testing | CORRECTED |
| 7 | 11:15 - 11:30 | Break |  | 11:15 - 11:30 AM | Break |  | same |
| 8 | 11:30 - 13:15 | Rocket Integration | PCB Mounting + Ground control integration test and coupler integration with rocket body | 11:30 AM - 1:15 PM | Rocket Integration | PCB Mounting + Ground control integration test and coupler integration with rocket body | same |
| 9 | 13:15 - 14:00 | Lunch |  | 1:15 - 2:00 PM | Lunch |  | same |
| 10 | 14:00 - 15:30 | CANSAT Integration | Circuit testing on breadboard + CANSAT PCB integration and CANSAT parachute integration | 2:00 - 3:30 PM | CANSAT Integration | Circuit testing on breadboard + CANSAT PCB integration and CANSAT parachute integration | CORRECTED |
| 11 | 15:30 - 15:45 | Snack Break followed by disbursal | Pick up by parents from Vidyashilp between 3:45 - 4:00 pm | 3:30 - 3:45 PM | Snack Break followed by dispersal | Pick up by parents from Vidyashilp between 3:45 - 4:00 PM | CORRECTED |

## Day 3 - CANSAT Engineering, Thu 03 Dec (sheet heading: "Day 3")

| # | Sheet time | Sheet session | Sheet activity | Site time | Site title | Site detail | Status |
|---|---|---|---|---|---|---|---|
| 1 | 7:00 - 7:30 | Assemble at the Venue | Vidyashilp Academy | 7:00 - 7:30 AM | Assemble at the Venue | Vidyashilp Academy | same |
| 2 | 7:45 - 8:15 | Guest Talk | Ms. Ishita Ganju - ISRO Scientist | 7:45 - 8:15 AM | Guest Talk | Ms. Ishita Ganju - ISRO Scientist | same |
| 3 | 8:15 - 9:00 | Fundamentals of Rocket Propulsion | Theoretical session with visual activities and videos | 8:15 - 9:00 AM | Fundamentals of Rocket Propulsion | Theoretical session with visual activities and videos | same |
| 4 | 9:00 - 9:15 | Movement to Breakout Rooms |  | 9:00 - 9:15 AM | Movement to Breakout Rooms |  | same |
| 5 | 9:15 - 11:00 | Rocket Integration | Recovery mechanism integration | 9:15 - 11:00 AM | Rocket Integration | Recovery mechanism integration | same |
| 6 | 11:00 - 11:15 | Snack Break |  | 11:00 - 11:15 AM | Snack Break |  | same |
| 7 | 11:15 - 13:00 | Rocket Integration | Upper body + coupler + lower body rocket integration and final assembly | 11:15 AM - 1:00 PM | Rocket Integration | Upper body + coupler + lower body rocket integration and final assembly | same |
| 8 | 13:00 - 13:45 | Lunch |  | 1:00 - 1:45 PM | Lunch |  | same |
| 9 | 13:45 - 15:15 | Rocket Inspection | Final rocket inspection and propulsion system integration test | 1:45 - 3:15 PM | Rocket Inspection | Final rocket inspection and propulsion system integration test | same |
| 10 | 15:15 - 16:00 | Snack Break followed by disbursal | Pick up by parents from Vidyashilp between 3:45 - 4:00 pm | 3:15 - 4:00 PM | Snack Break followed by dispersal | Pick up by parents from Vidyashilp between 3:45 - 4:00 PM | CORRECTED |

## Day 4 - Mission Simulation & Launch Prep, Fri 04 Dec (sheet heading: "Day 4")

| # | Sheet time | Sheet session | Sheet activity | Site time | Site title | Site detail | Status |
|---|---|---|---|---|---|---|---|
| 1 | 08:00 - 08:30 am | Teams report at Vidyashilp, attendance |  | 8:00 - 8:30 AM | Teams report at Vidyashilp, attendance |  | same |
| 2 | 8:30- 10:00 | Workshop Session 1 |  | 8:30 - 10:00 AM | Workshop Session 1 |  | same |
| 3 | 10:00- 10:15 AM | Snack break |  | 10:00 - 10:15 AM | Snack Break |  | CORRECTED |
| 4 | 10:15 - 12:00 | Workshop Session 2 | Software workshop by Mr. Prakhar Jain and his Team | 10:15 AM - 12:00 PM | Workshop Session 2 | Software workshop by Mr. Prakhar Jain and his team | CORRECTED |
| 5 | 12:00 - 1:00 pm | Lunch |  | 12:00 - 1:00 PM | Lunch |  | same |
| 6 | 1:00 PM to 1:30 Pm | Pre-launch inspection of rockets (inspected rockets tagged as cleared for Day 5) |  | 1:00 - 1:30 PM | Pre-launch inspection of rockets (inspected rockets tagged as cleared for Day 5) |  | same |
| 7 | 1:30 - 2:00 pm | Snack break followed by disbursal | Pick Up by Parents from Vidyashilp Academy 2 -2:30 pm | 1:30 - 2:00 PM | Snack Break followed by dispersal | Pick up by parents from Vidyashilp Academy 2:00 - 2:30 PM | CORRECTED |

## Day 5 - Final Launch & Valedictory, Sat 05 Dec (sheet heading: "Day 5")

| # | Sheet time | Sheet session | Sheet activity | Site time | Site title | Site detail | Status |
|---|---|---|---|---|---|---|---|
| 1 | 6:30 AM (sheet time value) | Teams report and register at SNIS |  | 6:30 AM | Teams report and register at SNIS |  | same |
| 2 | 6:45 - 7:00 AM | Safety briefing and Batch 1 final checks |  | 6:45 - 7:00 AM | Safety briefing and final checks |  | CORRECTED |
| 3 | 7:00 - 9:00 AM | Rocket launches (Teams 22–28) |  | 7:00 - 9:00 AM | Rocket Launches (Teams 22 - 28) |  | CORRECTED |
| 4 | 9:00 - 9:15 Am | Snack Break |  | 9:00 - 9:15 AM | Snack Break |  | same |
| 5 | 9:15 - 11:30 Am | Rocket Launches (Teams 29 - 35) |  | 9:15 - 11:30 AM | Rocket Launches (Teams 29 - 35) |  | same |
| 6 | 11:30 - 12:00 Pm | Lunch |  | 11:30 AM - 12:00 PM | Lunch |  | same |
| 7 | 12:00 - 1:30 PM | Batch 3 launches (Teams 36–42) |  | 12:00 - 1:30 PM | Rocket Launches (Teams 36 - 42) |  | CORRECTED |
| 8 | 1:30 - 1:45 | Bus has to be booked | Snacks break followed by disbursal | 1:30 - 1:45 PM | Snack Break followed by dispersal |  | CORRECTED |
| 9 | 1:45 - 3:00 | Transfer to Vidyashilp |  | 1:45 - 3:00 PM | Transfer to Vidyashilp |  | same |
| 10 | 3:00 - 4:30 pm | Closing ceremony and certificate distribution |  | 3:00 - 4:30 PM | Closing ceremony and certificate distribution |  | same |
| 11 | 4:45 - 5pm | Disbursal | Pickup by Parents at 4:45 - 5pm from Vidyashilp | 4:45 - 5:00 PM | Dispersal | Pick up by parents at 4:45 - 5:00 PM from Vidyashilp | CORRECTED |
