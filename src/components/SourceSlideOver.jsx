import { css } from '../css.js'
import { useApp } from '../AppContext.js'
import { sources } from '../data.js'

export default function SourceSlideOver() {
  const { activeSourceId, closeSource, openInViewer } = useApp()
  const src = sources[activeSourceId] || {}

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={closeSource} style={{ position: 'absolute', inset: 0, background: 'rgba(26,29,35,.28)' }} />
      <div style={{ position: 'relative', width: 480, maxWidth: '92vw', height: '100%', background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,.16)', display: 'flex', flexDirection: 'column', animation: 'slidein .26s cubic-bezier(.2,.7,.2,1)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e4e2da', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '.1em', background: src.typeColor, color: '#fff', padding: '3px 8px', borderRadius: 5, textTransform: 'uppercase' }}>{src.type}</span>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600 }}>{src.id}</span>
          <button onClick={closeSource} style={{ marginLeft: 'auto', width: 30, height: 30, borderRadius: 7, border: '1px solid #e4e2da', background: '#f4f3ee', cursor: 'pointer', fontSize: 14, color: '#6a6c64' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35, marginBottom: 6 }}>{src.title}</div>
          <div style={{ fontSize: 12, color: '#8a8c84', marginBottom: 16, fontFamily: "'IBM Plex Mono',monospace" }}>{src.meta}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
            <span style={{ width: 3, height: 14, background: '#f5b820', borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#b27300', textTransform: 'uppercase', letterSpacing: '.05em' }}>Cited excerpt</span>
          </div>
          <div style={{ background: '#fdf3d4', border: '1px solid #f0dca0', borderRadius: 10, padding: '15px 16px', fontSize: 13.5, lineHeight: 1.65, color: '#3a3326', whiteSpace: 'pre-line' }}>{src.excerpt}</div>

          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8a8c84', textTransform: 'uppercase', letterSpacing: '.05em' }}>Why this was cited</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: '#4a4f57' }}>{src.rationale}</div>
          </div>

          <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
            <button onClick={openInViewer} style={{ flex: 1, padding: 10, borderRadius: 9, border: 'none', background: '#0e5436', color: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Open full document</button>
            <button style={{ padding: '10px 14px', borderRadius: 9, border: '1px solid #e4e2da', background: '#fff', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}>Copy citation</button>
          </div>
        </div>
      </div>
    </div>
  )
}
