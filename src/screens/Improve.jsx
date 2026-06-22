import { improve } from '../data.js'

export default function Improve() {
  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Continuous Improvement</div>
        <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>Patterns the AI flagged from recurring engineer questions and friction</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {improve.map((i, idx) => (
          <div key={idx} style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: '16px 18px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center', flex: 'none', width: 54 }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 22, fontWeight: 700, color: i.sc }}>{i.freq}×</div>
              <div style={{ fontSize: 9.5, color: '#9a9c94', textTransform: 'uppercase', letterSpacing: '.04em' }}>this month</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{i.title}</div>
              <div style={{ fontSize: 12.5, lineHeight: 1.5, color: '#4a4f57', marginBottom: 9 }}>{i.detail}</div>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, background: '#f4f3ee', border: '1px solid #e4e2da', borderRadius: 6, padding: '3px 8px', color: '#3a3f47' }}>{i.tag}</span>
            </div>
            <span style={{ flex: 'none', fontSize: 11, fontWeight: 600, color: i.sc, background: '#faf9f5', border: '1px solid #e4e2da', padding: '5px 11px', borderRadius: 9 }}>{i.status}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
