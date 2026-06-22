import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppContext } from './AppContext.js'
import { titles } from './data.js'
import { useAuth } from './store/auth.js'
import Login from './screens/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import SourceSlideOver from './components/SourceSlideOver.jsx'
import CommandPalette from './components/CommandPalette.jsx'

import Dashboard from './screens/Dashboard.jsx'
import Chat from './screens/Chat.jsx'
import Documents from './screens/Documents.jsx'
import Assets from './screens/Assets.jsx'
import Plc from './screens/Plc.jsx'
import Schematics from './screens/Schematics.jsx'
import Predictive from './screens/Predictive.jsx'
import Patterns from './screens/Patterns.jsx'
import Defects from './screens/Defects.jsx'
import Spares from './screens/Spares.jsx'
import Handover from './screens/Handover.jsx'
import Improve from './screens/Improve.jsx'
import Audit from './screens/Audit.jsx'

const SCREENS = {
  dashboard: Dashboard, chat: Chat, documents: Documents, assets: Assets,
  plc: Plc, schematics: Schematics, predictive: Predictive, patterns: Patterns,
  defects: Defects, spares: Spares, handover: Handover, improve: Improve, audit: Audit,
}

export default function App() {
  const authed = useAuth((s) => s.authed)
  const [screen, setScreen] = useState('dashboard')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [sourceOpen, setSourceOpen] = useState(false)
  const [activeSourceId, setActiveSourceId] = useState(null)
  const [recording, setRecording] = useState(false)
  const [activeAsset, setActiveAsset] = useState('entry')
  const [showLabels, setShowLabels] = useState(true)
  const [activeDefect, setActiveDefect] = useState('edge')
  const [, force] = useState(0)

  const go = useCallback((s) => { setScreen(s); setPaletteOpen(false) }, [])
  const openSource = useCallback((id) => { setActiveSourceId(id); setSourceOpen(true) }, [])
  const closeSource = useCallback(() => setSourceOpen(false), [])
  const openPalette = useCallback(() => { setPaletteOpen(true); setPaletteQuery('') }, [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const toggleRec = useCallback(() => setRecording(r => !r), [])
  const toggleLabels = useCallback(() => setShowLabels(v => !v), [])
  const openInViewer = useCallback(() => { setSourceOpen(false); go('documents') }, [go])

  // refresh the live clock every 30s
  useEffect(() => {
    const t = setInterval(() => force(n => n + 1), 30000)
    return () => clearInterval(t)
  }, [])

  // ⌘K / Ctrl+K toggles the palette, Esc closes overlays
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
        setPaletteQuery('')
      } else if (e.key === 'Escape') {
        setPaletteOpen(false)
        setSourceOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const ctx = useMemo(() => ({
    screen, go, openSource, closeSource, sourceOpen, activeSourceId,
    paletteOpen, paletteQuery, setPaletteQuery, openPalette, closePalette,
    recording, toggleRec, activeAsset, setActiveAsset,
    showLabels, toggleLabels, activeDefect, setActiveDefect, openInViewer,
  }), [screen, go, openSource, closeSource, sourceOpen, activeSourceId, paletteOpen,
      paletteQuery, openPalette, closePalette, recording, toggleRec, activeAsset,
      showLabels, toggleLabels, activeDefect, openInViewer])

  const Screen = SCREENS[screen] || Dashboard

  if (!authed) return <Login />

  return (
    <AppContext.Provider value={ctx}>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
          <Topbar title={titles[screen] || 'Logan AI Assistant'} />
          <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
            <Screen />
          </div>
        </main>
        {sourceOpen && <SourceSlideOver />}
        {paletteOpen && <CommandPalette />}
      </div>
    </AppContext.Provider>
  )
}
