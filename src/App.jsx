import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ItineraryPage from './pages/ItineraryPage.jsx'

// Routes only (no router), so tests can render them inside a MemoryRouter.
export function AppRoutes() {
  return (
    <Routes>
      {/* /001, /002 ... /450. Also matches ANY single-segment path (/abc, /000, /451).
          ItineraryPage checks the ID itself (see useParticipantId). */}
      <Route path="/:participantId" element={<ItineraryPage />} />

      {/* The root URL. */}
      <Route path="/" element={<ItineraryPage />} />

      {/* Anything else (/a/b, /001/extra ...). Shows the itinerary, as the lead intended. */}
      <Route path="*" element={<ItineraryPage />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
