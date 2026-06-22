import { spares } from '../data.js'

export default function Spares() {
  const cols = '1fr 130px 200px 80px 110px 130px'
  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Spare Parts Intelligence</div>
        <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>Projected reorder timing from observed wear patterns</div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14, padding: '11px 18px', borderBottom: '1px solid #eeece4', fontSize: 10.5, fontWeight: 600, color: '#9a9c94', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          <div>Part</div><div>Part No.</div><div>Wear</div><div>On hand</div><div>Lead time</div><div>Reorder</div>
        </div>
        {spares.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: cols, gap: 14, padding: '13px 18px', borderBottom: '1px solid #f1efe8', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{s.part}</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#3a3f47' }}>{s.pn}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ flex: 1, height: 6, background: '#f1efe8', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', borderRadius: 3, background: s.wc, width: `${s.wear}%` }} /></div>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, color: s.wc }}>{s.wear}%</span>
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, textAlign: 'center', color: s.wc }}>{s.stock}</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#3a3f47' }}>{s.lead}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: s.wc }}>{s.reorder}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
