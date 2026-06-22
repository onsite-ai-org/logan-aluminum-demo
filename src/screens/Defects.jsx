import { css } from '../css.js'
import { useApp } from '../AppContext.js'
import { defectTabs, defectCauses } from '../data.js'

export default function Defects() {
  const { activeDefect, setActiveDefect } = useApp()

  return (
    <section style={{ padding: '24px 28px 48px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Quality Defect Root-Cause</div>
        <div style={{ fontSize: 12.5, color: '#8a8c84', marginTop: 2 }}>Select a defect to get a ranked cause analysis with its evidence chain</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {defectTabs.map((t) => {
          const active = t.key === activeDefect
          const tabStyle = css(`padding:8px 14px;border-radius:8px;font-size:12.5px;font-weight:${active ? 600 : 500};cursor:pointer;border:1px solid ${active ? '#0e5436' : '#e4e2da'};background:${active ? '#e6efe9' : '#fff'};color:${active ? '#0e5436' : '#41454d'};font-family:inherit;`)
          return <button key={t.key} onClick={() => setActiveDefect(t.key)} style={tabStyle}>{t.label}</button>
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 18 }}>
        <div style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: 16, height: 'fit-content' }}>
          <div style={{ aspectRatio: '1', backgroundImage: 'repeating-linear-gradient(45deg,#f4f3ee,#f4f3ee 9px,#ecebe4 9px,#ecebe4 18px)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#9a9c94' }}>defect sample image</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Edge crack</div>
          <div style={{ fontSize: 11.5, color: '#8a8c84', marginTop: 2 }}>CM3 · coil 4471-A · drive-side edge</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#8a8c84' }}>Occurrences (7d)</span><span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>11</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#8a8c84' }}>Scrap cost</span><span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, color: '#c1272d' }}>$18.4k</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {defectCauses.map((c, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e4e2da', borderRadius: 12, padding: '15px 17px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 700, color: '#fff', background: c.rc, width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.rank}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</span>
                <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 700, color: c.rc }}>{c.conf}%</span>
              </div>
              <div style={{ height: 5, background: '#f1efe8', borderRadius: 3, overflow: 'hidden', marginBottom: 11 }}><div style={{ height: '100%', borderRadius: 3, background: c.rc, width: `${c.conf}%` }} /></div>
              <div style={{ fontSize: 12.5, lineHeight: 1.55, color: '#4a4f57', marginBottom: 11 }}>{c.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: '#9a9c94', fontFamily: "'IBM Plex Mono',monospace", textTransform: 'uppercase' }}>Evidence</span>
                {c.evidence.map((e, j) => (
                  <span key={j} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, background: '#f4f3ee', border: '1px solid #e4e2da', borderRadius: 6, padding: '3px 8px', color: '#3a3f47' }}>{e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
