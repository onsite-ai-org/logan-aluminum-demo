import { useApp } from '../AppContext.js'
import { predictive } from '../data.js'

export default function Predictive() {
  const { go } = useApp()
  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Predictive Maintenance</div>
        <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>Assets showing precursor patterns to known failure modes · ranked by risk</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {predictive.map((p, i) => (
          <div key={i} className="h-pred" onClick={() => go('chat')} style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: '16px 18px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '200px 1fr 160px', gap: 18, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 700, color: p.rc }}>{p.tag}</div>
              <div style={{ fontSize: 11.5, color: '#8a8c84' }}>{p.asset}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, lineHeight: 1.45, color: '#3a3f47', marginBottom: 8 }}>{p.pattern}</div>
              <div style={{ height: 6, background: '#f1efe8', borderRadius: 3, overflow: 'hidden', maxWidth: 340 }}><div style={{ height: '100%', borderRadius: 3, background: p.rc, width: `${p.risk}%` }} /></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 22, fontWeight: 700, color: p.rc }}>{p.risk}<span style={{ fontSize: 13 }}>%</span></div>
              <div style={{ fontSize: 11, color: '#8a8c84' }}>est. window {p.window}</div>
              <div style={{ fontSize: 10.5, color: '#a8a89e', fontFamily: "'IBM Plex Mono',monospace" }}>conf {p.conf}%</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
