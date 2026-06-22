import { patternSteps } from '../data.js'

export default function Patterns() {
  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Cross-Equipment Pattern Finder</div>
        <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>Matching the active CM3 fault against resolved events across the facility</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 56px 1fr', gap: 0, alignItems: 'stretch' }}>
        <div style={{ background: '#fff', border: '1px solid #efc9c9', borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: '#c1272d', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Active now · CM3</div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 16, fontWeight: 700, color: '#c1272d' }}>F23-47</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, margin: '4px 0 12px' }}>Hydraulic pressure low — interlock E-stop</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.6, color: '#4a4f57' }}>CM3 Entry Coiler tripped at 06:42. Relief valve PRV-CM3-04 reading 1,900 psi vs 2,350 spec after a recent PM. Line down 2h 14m.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#0e5436' }}>⟶</div>
        <div style={{ background: '#fff', border: '1px solid #cfe0d6', borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: '#186e3a', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Resolved · CM4 · 6 months ago</div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 16, fontWeight: 700, color: '#186e3a' }}>F23-47 <span style={{ fontSize: 11, background: '#e6efe9', padding: '2px 7px', borderRadius: 9 }}>94% match</span></div>
          <div style={{ fontSize: 13.5, fontWeight: 600, margin: '4px 0 12px' }}>Same fault, CM4 Entry Coiler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {patternSteps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid #f1efe8' }}>
                <span style={{ color: '#186e3a', fontSize: 13, flex: 'none' }}>✓</span>
                <span style={{ fontSize: 12.5, lineHeight: 1.45, color: '#3a3f47' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { v: '38 min', c: '#186e3a', l: 'CM4 time-to-resolve last time' },
          { v: '0', c: '#0e5436', l: 'recurrences in 6 months' },
          { v: '$42k', c: '#b27300', l: 'est. downtime avoided if applied' },
        ].map((m, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 11, padding: '15px 17px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 24, fontWeight: 700, color: m.c }}>{m.v}</div>
            <div style={{ fontSize: 12, color: '#8a8c84' }}>{m.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
