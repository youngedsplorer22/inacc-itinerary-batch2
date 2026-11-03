import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../App.jsx'
import { DAYS } from '../data/itinerary.js'
import ItineraryPage from './ItineraryPage.jsx'

beforeEach(() => {
  window.scrollTo = vi.fn()
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

const renderPage = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:participantId?" element={<ItineraryPage />} />
      </Routes>
    </MemoryRouter>,
  )
const prev = () => screen.getByRole('button', { name: 'Previous day' })
const next = () => screen.getByRole('button', { name: 'Next day' })
const heading = () => screen.getByRole('heading', { level: 2 }).textContent
const setNow = (iso) => vi.useFakeTimers({ now: new Date(iso), toFake: ['Date'] })

describe('bottom day arrows', () => {
  it('sit at the very bottom of the page, after the schedule', () => {
    const { container } = renderPage()
    const main = container.querySelector('main')
    expect(main.lastElementChild.getAttribute('aria-label')).toBe('Previous and next day')
    expect(within(main.lastElementChild).getAllByRole('button')).toHaveLength(2)
  })

  it('move through all five days and keep the top navigation in sync', () => {
    setNow('2026-11-03T10:00:00+05:30')
    renderPage()
    expect(prev().disabled).toBe(true)
    for (let i = 1; i < DAYS.length; i++) {
      fireEvent.click(next())
      expect(heading()).toBe(DAYS[i].stage)
      expect(screen.getByRole('button', { name: new RegExp(`^Day ${i + 1},`) }).getAttribute('aria-pressed')).toBe('true')
    }
    expect(next().disabled).toBe(true)
    for (let i = DAYS.length - 2; i >= 0; i--) {
      fireEvent.click(prev())
      expect(heading()).toBe(DAYS[i].stage)
    }
    expect(prev().disabled).toBe(true)
  })

  it('cannot go beyond Day 1 or Day 5', () => {
    setNow('2026-11-03T10:00:00+05:30')
    renderPage()
    fireEvent.click(prev())
    expect(heading()).toBe(DAYS[0].stage)
    fireEvent.click(screen.getByRole('button', { name: /^Day 5,/ }))
    fireEvent.click(next())
    expect(heading()).toBe(DAYS[4].stage)
  })

  it('stay in sync after picking a day in the top navigation', () => {
    setNow('2026-11-03T10:00:00+05:30')
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /^Day 3,/ }))
    fireEvent.click(next())
    expect(heading()).toBe(DAYS[3].stage)
    fireEvent.click(prev())
    fireEvent.click(prev())
    expect(heading()).toBe(DAYS[1].stage)
  })

  it('have accessible names and a day counter', () => {
    renderPage()
    expect(screen.getByText('Day 1 of 5')).toBeTruthy()
    fireEvent.click(next())
    expect(screen.getByText('Day 2 of 5')).toBeTruthy()
  })
})

describe('automatic day selection on load', () => {
  it.each([
    ['2026-11-03T10:00:00+05:30', 0, 'before the event'],
    ['2026-12-01T09:00:00+05:30', 0, 'Day 1'],
    ['2026-12-02T09:00:00+05:30', 1, 'Day 2'],
    ['2026-12-03T00:00:00+05:30', 2, 'Day 3 at midnight'],
    ['2026-12-04T23:59:00+05:30', 3, 'Day 4 late night'],
    ['2026-12-05T09:00:00+05:30', 4, 'Day 5'],
    ['2026-12-20T09:00:00+05:30', 4, 'after the event'],
  ])('%s opens index %i (%s)', (iso, index) => {
    setNow(iso)
    renderPage()
    expect(heading()).toBe(DAYS[index].stage)
    expect(screen.getByRole('button', { name: new RegExp(`^Day ${index + 1},`) }).getAttribute('aria-pressed')).toBe('true')
  })

  it('does not reset a manual choice when the page re-renders', () => {
    setNow('2026-12-02T09:00:00+05:30')
    const { rerender } = renderPage()
    fireEvent.click(screen.getByRole('button', { name: /^Day 4,/ }))
    act(() => {
      vi.setSystemTime(new Date('2026-12-05T09:00:00+05:30'))
    })
    rerender(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/:participantId?" element={<ItineraryPage />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(heading()).toBe(DAYS[3].stage)
  })

  it('works with participant URLs and the catch-all route', () => {
    setNow('2026-12-04T09:00:00+05:30')
    for (const path of ['/001', '/450', '/abc', '/a/b']) {
      render(
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>,
      )
      expect(heading()).toBe(DAYS[3].stage)
      cleanup()
    }
  })
})
