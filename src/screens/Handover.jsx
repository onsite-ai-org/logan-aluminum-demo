import { handoverEvents, handoverOpen } from '../data.js'

export default function Handover() {
  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Shift Handover</div>
          <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>Auto-generated summary · C-shift (22:00–06:00) → A-shift</div>
        </div>
        <span style={{ fontSize: 11, background: '#e6efe9', color: '#0e5436', padding: '5px 11px', borderRadius: 9, fontWeight: 600, fontFamily: "'IBM Plex Mono',monospace" }}>◆ AI generated 06:00</span>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>Shift summary</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.65, color: '#3a3f47' }}>C-shift ran clean until 05:18. CM4 Scalper coolant dip (W14-03) cleared after a strainer flush. At 06:42 CM3 Entry Coiler dropped on <strong style={{ color: '#c1272d', fontFamily: "'IBM Plex Mono',monospace" }}>F23-47</strong> — hydraulic pressure low — and is still down at handover. Diagnosis points to relief valve PRV-CM3-04 setpoint drift after the 06/18 PM; A-shift to lock out and re-set per <span style={{ fontFamily: "'IBM Plex Mono',monospace" }}>CM3-HYD-SOP-017</span>. Hot Mill roll-force variance (F19-22) is being monitored, within threshold.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18 }}>
        <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '13px 16px', borderBottom: '1px solid #eeece4', fontSize: 13.5, fontWeight: 600 }}>Event timeline</div>
          {handoverEvents.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 13, padding: '12px 16px', borderBottom: '1px solid #f1efe8' }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#8a8c84', width: 42, flex: 'none' }}>{e.time}</div>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: e.sev, marginTop: 5, flex: 'none' }} />
              <div style={{ fontSize: 12.5, lineHeight: 1.5, color: '#3a3f47' }}>{e.text}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden', height: 'fit-content' }}>
          <div style={{ padding: '13px 16px', borderBottom: '1px solid #eeece4', fontSize: 13.5, fontWeight: 600 }}>Open items carried over</div>
          {handoverOpen.map((o, i) => (
            <div key={i} style={{ padding: '13px 16px', borderBottom: '1px solid #f1efe8' }}>
              <div style={{ fontSize: 12.5, lineHeight: 1.5, color: '#3a3f47' }}>{o.text}</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#0e5436', fontWeight: 600, marginTop: 4 }}>{o.owner}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
