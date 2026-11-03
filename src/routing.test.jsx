import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { AppRoutes } from './App.jsx'
import { useParticipantId } from './participant/useParticipantId.js'

afterEach(cleanup)

// Shows where the router ended up, so tests can prove nothing redirected.
function Where() {
  return <p data-testid="where">{useLocation().pathname}</p>
}

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Where />
      <AppRoutes />
    </MemoryRouter>,
  )

const idShown = () => screen.queryByTestId('participant-id')?.textContent ?? null
const hasItinerary = () =>
  Boolean(screen.queryByRole('heading', { level: 1, name: 'INACC Event Itinerary' }))
const hasNotice = () => Boolean(screen.queryByRole('status'))

describe('valid participant IDs open the itinerary', () => {
  it.each(['/001', '/002', '/100', '/449', '/450'])('%s', (path) => {
    renderAt(path)
    expect(hasItinerary()).toBe(true)
    expect(idShown()).toBe(path.slice(1))
    expect(hasNotice()).toBe(false)
    expect(screen.getByTestId('where').textContent).toBe(path) // not redirected
  })

  it('preserves leading zeros (001 stays "001", never "1")', () => {
    renderAt('/001')
    expect(idShown()).toBe('001')
    expect(idShown()).not.toBe('1')
  })

  it('all 450 IDs open the itinerary with the exact ID', () => {
    for (let n = 1; n <= 450; n++) {
      const id = String(n).padStart(3, '0')
      const { unmount } = renderAt(`/${id}`)
      expect(hasItinerary()).toBe(true)
      expect(idShown()).toBe(id)
      unmount()
    }
  }, 30000)

  it('a trailing slash still works (/001/)', () => {
    renderAt('/001/')
    expect(hasItinerary()).toBe(true)
    expect(idShown()).toBe('001')
  })
})

describe('invalid participant IDs: itinerary shown, no ID, notice shown, no redirect', () => {
  it.each(['/000', '/451', '/999', '/1', '/01', '/abc', '/4500', '/0001', '/450x', '/%20001'])(
    '%s',
    (path) => {
      renderAt(path)
      expect(hasItinerary()).toBe(true)
      expect(idShown()).toBe(null)
      expect(hasNotice()).toBe(true)
      expect(screen.getByTestId('where').textContent).not.toBe('/')
    },
  )

  it('does not echo the invalid text back onto the page', () => {
    renderAt('/%3Cb%3Ehi%3C%2Fb%3E')
    expect(document.body.innerHTML).not.toContain('<b>hi</b>')
    expect(hasNotice()).toBe(true)
  })
})

describe('root and wildcard', () => {
  it('/ opens the itinerary with no participant ID and no notice', () => {
    renderAt('/')
    expect(hasItinerary()).toBe(true)
    expect(idShown()).toBe(null)
    expect(hasNotice()).toBe(false)
  })

  it.each(['/a/b', '/001/extra', '/events/001', '/a/b/c/d'])(
    '%s falls to the wildcard: itinerary, no ID, no notice, no redirect',
    (path) => {
      renderAt(path)
      expect(hasItinerary()).toBe(true)
      expect(idShown()).toBe(null)
      expect(hasNotice()).toBe(false)
      expect(screen.getByTestId('where').textContent).toBe(path)
    },
  )
})

describe('useParticipantId hook', () => {
  function Probe() {
    const { participantId, isInvalid } = useParticipantId()
    return <p data-testid="probe">{JSON.stringify({ participantId, isInvalid })}</p>
  }

  // Same three route shapes as the app, but rendering the probe instead of the page.
  function probeAt(path) {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/:participantId" element={<Probe />} />
          <Route path="/" element={<Probe />} />
          <Route path="*" element={<Probe />} />
        </Routes>
      </MemoryRouter>,
    )
    const result = JSON.parse(screen.getByTestId('probe').textContent)
    cleanup()
    return result
  }

  it('gives the string ID (zeros kept) for valid IDs', () => {
    expect(probeAt('/007')).toEqual({ participantId: '007', isInvalid: false })
    expect(probeAt('/450')).toEqual({ participantId: '450', isInvalid: false })
  })

  it('gives null + isInvalid for bad IDs, and null for / and wildcard paths', () => {
    expect(probeAt('/451')).toEqual({ participantId: null, isInvalid: true })
    expect(probeAt('/1')).toEqual({ participantId: null, isInvalid: true })
    expect(probeAt('/')).toEqual({ participantId: null, isInvalid: false })
    expect(probeAt('/a/b')).toEqual({ participantId: null, isInvalid: false })
  })
})
