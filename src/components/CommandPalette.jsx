import { useEffect, useRef } from 'react'
import { css } from '../css.js'
import { useApp } from '../AppContext.js'
import { paletteItems } from '../data.js'

export default function CommandPalette() {
  const { paletteQuery, setPaletteQuery, closePalette, go } = useApp()
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const q = paletteQuery.trim().toLowerCase()
  const results = (q
    ? paletteItems.filter(i => (i.title + i.sub + i.kind).toLowerCase().includes(q))
    : paletteItems)

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '13vh' }}>
      <div onClick={closePalette} style={{ position: 'absolute', inset: 0, background: 'rgba(26,29,35,.32)' }} />
      <div style={{ position: 'relative', width: 620, maxWidth: '92vw', background: '#fff', borderRadius: 14, boxShadow: '0 24px 70px rgba(0,0,0,.32)', overflow: 'hidden', animation: 'fadein .18s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid #eeece4' }}>
          <span style={{ fontSize: 16, color: '#8a8c84' }}>⌕</span>
          <input
            ref={inputRef}
            value={paletteQuery}
            onChange={(e) => setPaletteQuery(e.target.value)}
            placeholder="Jump to asset, fault, document, or screen…"
            style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 15, color: '#1a1d23', background: 'transparent' }}
          />
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, background: '#f4f3ee', border: '1px solid #e4e2da', borderRadius: 5, padding: '2px 6px', color: '#6a6c64' }}>ESC</span>
        </div>
        <div style={{ maxHeight: 380, overflowY: 'auto', padding: 8 }}>
          {results.map((r, i) => (
            <button key={i} className="h-palette" onClick={() => go(r.go)} style={{ display: 'flex', alignItems: 'center', gap: 13, width: '100%', padding: '10px 12px', border: 'none', background: 'transparent', borderRadius: 9, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
              <span style={{ width: 30, height: 30, borderRadius: 7, background: r.iconBg, color: r.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flex: 'none', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{r.glyph}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: '#1a1d23' }}>{r.title}</div>
                <div style={{ fontSize: 11.5, color: '#8a8c84', fontFamily: "'IBM Plex Mono',monospace" }}>{r.sub}</div>
              </div>
              <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#b6b4aa', textTransform: 'uppercase', letterSpacing: '.08em' }}>{r.kind}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: '9px 16px', borderTop: '1px solid #eeece4', display: 'flex', gap: 16, fontSize: 10.5, color: '#9a9c94', fontFamily: "'IBM Plex Mono',monospace" }}>
          <span>↑↓ navigate</span><span>↵ open</span><span>⌘K toggle</span>
        </div>
      </div>
    </div>
  )
}
