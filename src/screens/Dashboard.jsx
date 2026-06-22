import { useApp } from '../AppContext.js'
import { kpis, faults, lines, activity } from '../data.js'

export default function Dashboard() {
  const { go } = useApp()
  const clock = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-.01em' }}>Plant Status</div>
          <div style={{ fontSize: 13, color: '#8a8c84', marginTop: 2 }}>Logan Aluminum · Russellville, KY · Live · {clock}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #e4e2da', borderRadius: 8, padding: '7px 12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#186e3a' }} />
            <span style={{ fontSize: 12, fontWeight: 600 }}>Index healthy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #e4e2da', borderRadius: 8, padding: '7px 12px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#6a6c64' }}>12,418 docs indexed</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#8a8c84', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em' }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: '-.02em', color: k.color, fontFamily: "'IBM Plex Mono',monospace" }}>{k.value}</div>
            <div style={{ fontSize: 11.5, color: '#8a8c84', marginTop: 2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 18 }}>
        <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #eeece4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Active Faults</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8a8c84' }}>5 open · sorted by severity</div>
          </div>
          {faults.map((f, i) => (
            <div key={i} className="h-row" onClick={() => go('chat')} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: '1px solid #f1efe8', cursor: 'pointer' }}>
              <div style={{ width: 5, height: 38, borderRadius: 3, background: f.color, flex: 'none' }} />
              <div style={{ minWidth: 92 }}>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, color: f.color }}>{f.code}</div>
                <div style={{ fontSize: 10.5, color: '#9a9c94', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600 }}>{f.sev}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.title}</div>
                <div style={{ fontSize: 11.5, color: '#8a8c84', fontFamily: "'IBM Plex Mono',monospace" }}>{f.tag} · {f.line}</div>
              </div>
              <div style={{ textAlign: 'right', flex: 'none' }}>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#3a3f47' }}>{f.time}</div>
                <div style={{ fontSize: 11, color: '#9a9c94' }}>{f.age}</div>
              </div>
              <span style={{ fontSize: 14, color: '#c9c7bd' }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #eeece4', fontSize: 14, fontWeight: 600 }}>Line Status</div>
            <div style={{ padding: '6px 8px' }}>
              {lines.map((l, i) => (
                <div key={i} className="h-row" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 11px', borderRadius: 8 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: l.color, flex: 'none', boxShadow: `0 0 0 3px ${l.glow}` }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{l.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11.5, color: l.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{l.state}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>AI Activity</div>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 11, padding: '7px 0' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: a.color, marginTop: 6, flex: 'none' }} />
                <div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 10.5, color: '#9a9c94', fontFamily: "'IBM Plex Mono',monospace", marginTop: 1 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
