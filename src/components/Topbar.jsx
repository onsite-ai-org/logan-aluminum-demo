import { useApp } from '../AppContext.js'

export default function Topbar({ title }) {
  const { openPalette } = useApp()
  return (
    <header style={{ height: 54, flex: 'none', background: '#ffffff', borderBottom: '1px solid #e4e2da', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px' }}>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
      <button onClick={openPalette} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 12px', minWidth: 280, background: '#f4f3ee', border: '1px solid #e4e2da', borderRadius: 8, color: '#8a8c84', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 13 }}>⌕</span>
        <span>Search assets, faults, documents…</span>
        <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, background: '#fff', border: '1px solid #e4e2da', borderRadius: 5, padding: '1px 6px', color: '#6a6c64' }}>⌘K</span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 11px', background: '#fbe9e9', border: '1px solid #efc9c9', borderRadius: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c1272d', animation: 'pulse 1.8s infinite' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#c1272d' }}>1 Critical</span>
      </div>
      <button style={{ width: 34, height: 34, borderRadius: 8, background: '#f4f3ee', border: '1px solid #e4e2da', cursor: 'pointer', fontSize: 14, color: '#3a3f47', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚑</button>
    </header>
  )
}
