import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { DAYS } from '../data/itinerary.js'
import ItineraryPage from './ItineraryPage.jsx'

afterEach(cleanup)

function renderPage(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:participantId?" element={<ItineraryPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

// Whitespace in the sheet (trailing spaces, line breaks) collapses when rendered.
const norm = (s) => s.replace(/\s+/g, ' ').trim()

describe('ItineraryPage', () => {
  it('shows the logo as the page heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1, name: 'INACC Event Itinerary' })).toBeTruthy()
  })

  it('has five day buttons, in order, and starts on Day 1', () => {
    renderPage()
    const buttons = within(screen.getByRole('navigation', { name: 'Event days' })).getAllByRole('button')
    expect(buttons.map((b) => b.getAttribute('aria-label'))).toEqual(DAYS.map((d) => `Day ${d.num}, ${d.code}`))
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(DAYS[0].stage)
  })

  it.each(DAYS.map((d) => [d.num, d]))('Day %i shows exactly its sheet rows, in order', (num, day) => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: new RegExp(`^Day ${num},`) }))
    expect(screen.getByRole('button', { name: new RegExp(`^Day ${num},`) }).getAttribute('aria-pressed')).toBe('true')
    expect(
      screen.getAllByRole('button').filter((b) => b.getAttribute('aria-pressed') === 'true'),
    ).toHaveLength(1)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(day.rows.length)
    day.rows.forEach((row, i) => {
      const text = norm(items[i].textContent)
      expect(text.replace(/\u00a0/g, ' ')).toContain(norm(row.time))
      expect(text).toContain(norm(row.title))
      if (row.detail) expect(text).toContain(norm(row.detail))
    })
  })

  it('shows the design-board headings and never the word Batch', () => {
    renderPage()
    const expected = [['Orient', 'Registration & Orientation'], ['Rocketry', 'Rocketry Fundamentals'], ['CanSat', 'CanSat Engineering'], ['Simulate', 'Mission Simulation & Launch Prep'], ['Launch', 'Final Launch & Valedictory']]
    expect(DAYS.map((d) => [d.code, d.stage])).toEqual(expected)
    for (const d of DAYS) {
      fireEvent.click(screen.getByRole('button', { name: new RegExp(`^Day ${d.num},`) }))
      expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(d.stage)
      expect(document.body.textContent).not.toMatch(/batch/i)
    }
  })

  it('has no placeholder content and no group controls', () => {
    renderPage('/001')
    expect(screen.queryByText('Testing')).toBeNull()
    expect(screen.queryByText(/group/i)).toBeNull()
  })

  it('keeps the participant ID as a string with leading zeros', () => {
    renderPage('/007')
    expect(screen.getByTestId('participant-id').textContent).toBe('007')
  })
})

describe('itinerary data (spot checks against the sheet)', () => {
  const byNum = (n) => DAYS.find((d) => d.num === n)

  it('has 11, 11, 10, 7 and 11 rows on Days 1-5', () => {
    expect(DAYS.map((d) => d.rows.length)).toEqual([11, 11, 10, 7, 11])
  })

  it('has the corrected guest names and sheet order', () => {
    expect(byNum(1).rows[2].detail).toBe('Dr. Deepak Singh - Assistant Professor - IIT Bombay')
    expect(byNum(2).rows[2].detail).toBe('Dr. Venkateshwarlu Andra - Ex-ISRO Scientist')
    expect(byNum(3).rows[1].detail).toBe('Ms. Ishita Ganju - ISRO Scientist')
  })

  it('has its own Days 4-5', () => {
    expect(byNum(4).rows[1].title).toBe('Workshop Session 1')
    expect(byNum(5).rows[2].title).toBe('Rocket Launches (Teams 22 - 28)')
  })

  it('marks one lunch row per day', () => {
    for (const d of DAYS) expect(d.rows.filter((r) => r.lunch)).toHaveLength(1)
  })

  it('has no Batch wording, double spaces or edge whitespace in any text', () => {
    for (const d of DAYS) {
      for (const r of d.rows) {
        for (const t of [r.time, r.title, r.detail ?? '']) {
          expect(t).not.toMatch(/batch|has to be booked/i)
          expect(t).toBe(t.trim())
          expect(t).not.toMatch(/\s{2,}/)
        }
      }
    }
  })

  it('has one schedule for each day (no per-group data yet)', () => {
    for (const d of DAYS) expect(d.groups).toBeUndefined()
  })
})
