import { audit } from '../data.js'

export default function Audit() {
  const cols = '90px 160px 150px 1fr 100px'
  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Audit Log</div>
        <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>Every query, view, and edit across the platform · today</div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14, padding: '11px 18px', borderBottom: '1px solid #eeece4', fontSize: 10.5, fontWeight: 600, color: '#9a9c94', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          <div>Time</div><div>User</div><div>Action</div><div>Target</div><div>Type</div>
        </div>
        {audit.map((a, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: cols, gap: 14, padding: '12px 18px', borderBottom: '1px solid #f1efe8', alignItems: 'center' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#8a8c84' }}>{a.time}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#0e5436', color: '#fff', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{a.user}</span>
              <span style={{ fontSize: 12.5 }}>{a.who}</span>
            </div>
            <div style={{ fontSize: 12.5, color: '#3a3f47' }}>{a.action}</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#3a3f47' }}>{a.target}</div>
            <div><span style={{ fontSize: 10.5, fontWeight: 600, background: a.badgeBg, color: a.badgeColor, padding: '3px 9px', borderRadius: 9, textTransform: 'uppercase', letterSpacing: '.04em' }}>{a.kind}</span></div>
          </div>
        ))}
      </div>
    </section>
  )
}
