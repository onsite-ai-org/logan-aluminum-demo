import { useApp } from '../AppContext.js'
import { documents, docFilters } from '../data.js'

export default function Documents() {
  const { go, openSource } = useApp()
  const cols = '118px 1fr 150px 90px 78px'

  const run = (action) => {
    if (action.source) openSource(action.source)
    else if (action.go) go(action.go)
  }

  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Document Library</div>
          <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>12,418 indexed · 2 processing · corpus 94% covered</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0e5436', color: '#fff', border: 'none', borderRadius: 9, padding: '9px 15px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>↥ Upload documents</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {docFilters.map((f, i) => (
          <button key={i} style={{ padding: '6px 13px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px solid #e4e2da', background: '#fff', color: '#41454d', cursor: 'pointer', fontFamily: 'inherit' }}>{f}</button>
        ))}
      </div>

      <div style={{ border: '1.5px dashed #cfcdc4', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 18, background: '#faf9f5' }}>
        <div style={{ fontSize: 13.5, color: '#6a6c64' }}>Drop PDFs, PLC exports (.L5X), CAD prints, or database exports here</div>
        <div style={{ fontSize: 11.5, color: '#a8a89e', marginTop: 3, fontFamily: "'IBM Plex Mono',monospace" }}>AI parses, extracts entities, and indexes automatically</div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14, padding: '11px 18px', borderBottom: '1px solid #eeece4', fontSize: 10.5, fontWeight: 600, color: '#9a9c94', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          <div>Type</div><div>Document</div><div>Status</div><div>Pages</div><div>Citations</div>
        </div>
        {documents.map((d, i) => (
          <div key={i} className="h-row" onClick={() => run(d.action)} style={{ display: 'grid', gridTemplateColumns: cols, gap: 14, padding: '13px 18px', borderBottom: '1px solid #f1efe8', alignItems: 'center', cursor: 'pointer' }}>
            <div><span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, fontWeight: 600, color: '#fff', background: d.tc, padding: '3px 7px', borderRadius: 5 }}>{d.type}</span></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>{d.title}{d.hot && <span style={{ fontSize: 9, background: '#fbe9e9', color: '#c1272d', padding: '1px 6px', borderRadius: 9, fontWeight: 600 }}>F23-47</span>}</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8a8c84' }}>{d.id}</div>
            </div>
            <div>
              {d.bar && (
                <>
                  <div style={{ fontSize: 10.5, color: '#b27300', fontWeight: 600, marginBottom: 4 }}>{d.bar}</div>
                  <div style={{ height: 4, background: '#f1efe8', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', background: '#f5b820', borderRadius: 3, animation: 'idxbar 2.2s ease-in-out infinite alternate' }} /></div>
                </>
              )}
              {d.hot && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#186e3a', fontWeight: 600 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#186e3a' }} />Indexed</span>}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, color: '#3a3f47' }}>{d.pages}</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, color: '#3a3f47' }}>{d.cites}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
