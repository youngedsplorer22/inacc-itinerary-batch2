import { useState } from 'react'
import logo from '../assets/inacc-logo.png'
import { DAYS, getDayRows } from '../data/itinerary.js'
import { getGroupForParticipant } from '../participant/group.js'
import { useParticipantId } from '../participant/useParticipantId.js'
import './ItineraryPage.css'

export default function ItineraryPage() {
  const { participantId, isInvalid } = useParticipantId()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const day = DAYS[selectedIndex]
  const rows = getDayRows(day, getGroupForParticipant(participantId))
  const lastIndex = DAYS.length - 1

  return (
    <main className="itinerary">
      <header className="itinerary-top">
        <h1 className="itinerary-logo">
          <img src={logo} alt="INACC Event Itinerary" />
        </h1>
        {/* Kept for the future attendance feature; the ID is also read by other components. */}
        {participantId && (
          <p className="itinerary-participant">
            ID <strong data-testid="participant-id">{participantId}</strong>
          </p>
        )}
      </header>

      {isInvalid && (
        <p className="itinerary-notice" role="status">
          This participant ID was not recognised. Showing the general itinerary.
        </p>
      )}

      <nav className="rocket" aria-label="Event days">
        <div className="rocket-track">
          <svg className="rocket-flame" width="46" height="44" viewBox="0 0 46 44" aria-hidden="true">
            <path d="M40 2 L2 22 L40 42 Z" fill="#EA2180" />
            <path d="M40 12 L16 22 L40 32 Z" fill="#FFFFFF" />
          </svg>
          <svg className="rocket-fin rocket-fin-top" width="38" height="18" viewBox="0 0 38 18" aria-hidden="true">
            <path d="M0 0 L36 17 L0 17 Z" fill="#EA2180" />
          </svg>
          <svg className="rocket-fin rocket-fin-bottom" width="38" height="18" viewBox="0 0 38 18" aria-hidden="true">
            <path d="M0 18 L36 1 L0 1 Z" fill="#8849F5" />
          </svg>
          <div className="rocket-body">
            {DAYS.map((d, i) => (
              <button
                key={d.id}
                type="button"
                className="rocket-seg"
                aria-label={`Day ${d.num}, ${d.code}`}
                aria-pressed={i === selectedIndex}
                onClick={() => setSelectedIndex(i)}
              >
                <span className="rocket-num">{String(d.num).padStart(2, '0')}</span>
                {i === selectedIndex && <span className="rocket-label" aria-hidden="true">{d.code}</span>}
              </button>
            ))}
          </div>
          <svg className="rocket-nose" width="62" height="66" viewBox="0 0 62 66" aria-hidden="true">
            <path
              d="M0 0.75 C30 0.75 49 14 61.2 33 C49 52 30 65.25 0 65.25"
              fill={selectedIndex === lastIndex ? '#7F3FE8' : '#FFFFFF'}
              stroke="#8849F5"
              strokeWidth="1.5"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </nav>

      <section className="day" aria-labelledby="day-heading">
        <div className="day-head">
          <h2 id="day-heading">{day.stage}</h2>
          <p className="day-date">{day.date}</p>
        </div>

        <ol className="schedule">
          {rows.map((row, i) =>
            row.lunch ? (
              <li key={i} className="lunch">
                <span className="lunch-title">{row.title}</span>
                <span className="lunch-time">{row.time}</span>
              </li>
            ) : (
              <li key={i} className="slot">
                {/* Non-breaking space keeps "AM"/"PM" with its time when the range wraps. */}
                <span className="slot-time">{row.time.replace(/ (AM|PM)/g, '\u00a0$1')}</span>
                <div className="slot-main">
                  <span className="slot-title">{row.title}</span>
                  {row.detail && <span className="slot-detail">{row.detail}</span>}
                </div>
              </li>
            ),
          )}
        </ol>
      </section>
    </main>
  )
}
