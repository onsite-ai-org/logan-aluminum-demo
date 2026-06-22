import { css } from '../css.js'
import { useApp } from '../AppContext.js'
import { pins } from '../data.js'

export default function Schematics() {
  const { showLabels, toggleLabels } = useApp()

  const toggleStyle = css(`display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:600;border:1px solid ${showLabels ? '#0e5436' : '#e4e2da'};background:${showLabels ? '#e6efe9' : '#fff'};color:${showLabels ? '#0e5436' : '#41454d'};font-family:inherit;`)

  return (
    <section style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ flex: 'none', padding: '14px 24px', borderBottom: '1px solid #e4e2da', background: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "'IBM Plex Mono',monospace" }}>E-CM3-047</div>
            <div style={{ fontSize: 11.5, color: '#8a8c84' }}>CM3 Entry Coiler — E-Stop & Interlock Wiring · sheet 047</div>
          </div>
          <button onClick={toggleLabels} style={{ ...toggleStyle, marginLeft: 'auto' }}>⊙ AI label layer</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f4f3ee', border: '1px solid #e4e2da', borderRadius: 8, padding: '7px 12px', color: '#8a8c84', fontSize: 12 }}>⌕ Search labels…</div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 28, background: '#ecebe4' }}>
          <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', aspectRatio: '4 / 3', backgroundImage: 'repeating-linear-gradient(45deg,#fff,#fff 11px,#f4f3ee 11px,#f4f3ee 22px)', border: '1px solid #d8d6cc', borderRadius: 6 }}>
            <div style={{ position: 'absolute', top: 14, left: 16, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#9a9c94' }}>E-CM3-047 · electrical print placeholder</div>
            {showLabels && pins.map((p, i) => (
              <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 13, height: 13, borderRadius: '50%', background: p.color, border: '2.5px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,.3)', flex: 'none' }} />
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 600, background: p.color, color: '#fff', padding: '2px 7px', borderRadius: 5, whiteSpace: 'nowrap' }}>{p.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside style={{ width: 268, flex: 'none', borderLeft: '1px solid #e4e2da', background: '#faf9f5', overflowY: 'auto', padding: '18px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9a9c94', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>AI-Extracted Labels</div>
        <div style={{ fontSize: 11.5, color: '#8a8c84', marginBottom: 14 }}>5 components found on this sheet</div>
        {pins.map((l, i) => (
          <div key={i} className="h-label" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff', border: '1px solid #e4e2da', borderRadius: 9, marginBottom: 8, cursor: 'pointer' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: l.color, flex: 'none' }} />
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, fontWeight: 600 }}>{l.id}</span>
            <span style={{ marginLeft: 'auto', fontSize: 14, color: '#c9c7bd' }}>⌖</span>
          </div>
        ))}
      </aside>
    </section>
  )
}
