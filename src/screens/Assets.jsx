import { css } from '../css.js'
import { useApp } from '../AppContext.js'
import { treeRaw, tags, assetDocs } from '../data.js'

export default function Assets() {
  const { go, openSource, activeAsset, setActiveAsset } = useApp()

  const run = (item) => {
    if (item.source) openSource(item.source)
    else if (item.go) go(item.go)
  }

  return (
    <section style={{ display: 'flex', height: '100%' }}>
      <aside style={{ width: 300, flex: 'none', borderRight: '1px solid #e4e2da', background: '#fff', overflowY: 'auto', padding: '16px 12px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9a9c94', textTransform: 'uppercase', letterSpacing: '.06em', padding: '0 8px 10px' }}>Facility</div>
        {treeRaw.map((n) => {
          const active = n.key === activeAsset
          const rowStyle = css(`display:flex;align-items:center;gap:8px;padding:7px 12px 7px ${12 + n.level * 18}px;border-radius:7px;cursor:pointer;background:${active ? '#e6efe9' : 'transparent'};`)
          return (
            <div key={n.key} className="h-row" onClick={() => setActiveAsset(n.key)} style={rowStyle}>
              <span style={{ width: 10, fontSize: 9, color: '#9a9c94' }}>{n.glyph || ''}</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: n.dot, flex: 'none' }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1d23' }}>{n.name}</div>
                {n.sub && <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#9a9c94' }}>{n.sub}</div>}
              </div>
            </div>
          )
        })}
      </aside>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 48px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8a8c84' }}>Hot Mill › CM3 Cold Mill ›</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>CM3 Entry Coiler</div>
            <div style={{ fontSize: 12.5, color: '#8a8c84' }}>Hydraulic clamp & coiling section · commissioned 2009</div>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #e4e2da', borderRadius: 9, padding: '8px 13px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', color: '#0e5436', fontFamily: 'inherit' }}>✎ Add knowledge note</button>
        </div>

        <div onClick={() => go('chat')} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fbe9e9', border: '1px solid #efc9c9', borderRadius: 11, padding: '14px 16px', marginBottom: 20, cursor: 'pointer' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c1272d', animation: 'pulse 1.8s infinite', flex: 'none' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: '#c1272d' }}><span style={{ fontFamily: "'IBM Plex Mono',monospace" }}>F23-47</span> · Hydraulic pressure low — interlock E-stop</div>
            <div style={{ fontSize: 11.5, color: '#9a5050' }}>Active since 06:42 · line down · diagnosis in progress</div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#c1272d' }}>Open in Assistant →</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '13px 16px', borderBottom: '1px solid #eeece4', fontSize: 13.5, fontWeight: 600 }}>Instrument Tags</div>
            {tags.map((t, i) => (
              <div key={i} className="h-row" onClick={() => run(t)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: '1px solid #f1efe8', cursor: 'pointer' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, color: '#0e5436' }}>{t.tag}</div>
                  <div style={{ fontSize: 11, color: '#8a8c84' }}>{t.desc}</div>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, fontWeight: 600, color: t.vc }}>{t.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>Specifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 12.5 }}>
                {[
                  ['HPU operating pressure', '2,350 psi'],
                  ['Clamp cylinder bore', '4.0 in'],
                  ['PLC program', 'CM3_EntryCoiler_Main'],
                  ['MCC feed', 'MCC-CM3-P07'],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8a8c84' }}>{k}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>Linked Documents</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {assetDocs.map((d, i) => (
                  <div key={i} onClick={() => run(d)} style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', padding: '5px 0' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, fontWeight: 600, color: '#fff', background: d.tc, padding: '2px 6px', borderRadius: 4 }}>{d.type}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#3a3f47' }}>{d.id}</span>
                    <span style={{ marginLeft: 'auto', color: '#c9c7bd', fontSize: 12 }}>›</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
