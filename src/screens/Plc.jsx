import { plcLeft, plcRight, plcPaint } from '../data.js'

function Pane({ dotColor, label, rows }) {
  return (
    <div style={{ background: '#1a1d23', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '11px 16px', background: '#23262c', color: '#e8e8e2', fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: dotColor }}>●</span> {label}</div>
      <div style={{ padding: '10px 0', fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, lineHeight: 1.85 }}>
        {rows.map((l, i) => (
          <div key={i} style={{ display: 'flex', padding: '1px 16px', background: l.bg }}>
            <span style={{ width: 26, color: '#5a5e66', flex: 'none', userSelect: 'none' }}>{l.n}</span>
            <span style={{ color: l.color }}>{l.t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Plc() {
  const left = plcPaint(plcLeft)
  const right = plcPaint(plcRight)

  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace" }}>CM3_EntryCoiler_Main.L5X</div>
          <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>ControlLogix · Rung 14 — Pressure-low interlock (F23-47)</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
          <span style={{ color: '#8a8c84' }}>Compare against</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #e4e2da', borderRadius: 8, padding: '7px 12px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>CM4_EntryCoiler_Main.L5X ▾</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 14, fontSize: 11.5 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: '#fdf3d4', border: '1px solid #f0dca0' }} />Changed</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: '#e6efe9', border: '1px solid #cfe0d6' }} />Added on CM4</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Pane dotColor="#f5b820" label="CM3 · current production" rows={left} />
        <Pane dotColor="#1e5fa4" label="CM4 · reference" rows={right} />
      </div>

      <div style={{ marginTop: 16, background: '#e6efe9', border: '1px solid #cfe0d6', borderRadius: 11, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 16 }}>◆</span>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: '#0a3d28' }}><strong>AI note:</strong> CM4 raised its F23-47 threshold from 1,850 to 2,000 psi and shortened the debounce to 150 ms after the 2025-09 seal upgrade. If the CM3 relief valve is re-set per SOP, consider mirroring this rung change to harden CM3 against clamp slip.</div>
      </div>
    </section>
  )
}
