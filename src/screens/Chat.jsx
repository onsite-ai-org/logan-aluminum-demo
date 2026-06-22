import { css } from '../css.js'
import { useApp } from '../AppContext.js'
import { candidates, steps, followups } from '../data.js'
import { citeBtn, citeBtnInline, srcChip, ghostBtn } from '../styles.js'

export default function Chat() {
  const { openSource, recording, toggleRec } = useApp()

  const micStyle = css(`width:36px;height:36px;border-radius:9px;border:1px solid ${recording ? '#c1272d' : '#d8d6cc'};background:${recording ? '#fbe9e9' : '#fff'};color:${recording ? '#c1272d' : '#6a6c64'};font-size:15px;cursor:pointer;flex:none;`)

  return (
    <section style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '26px 0' }}>
          <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 28px' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8a8c84' }}>
              <span style={{ background: '#fbe9e9', color: '#c1272d', padding: '3px 9px', borderRadius: 20, fontWeight: 600, border: '1px solid #efc9c9' }}>● F23-47 ACTIVE</span>
              <span>Session opened 06:44 · CM3 Entry Coiler</span>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginBottom: 24 }}>
              <div style={{ maxWidth: 560, background: '#0e5436', color: '#fff', padding: '13px 16px', borderRadius: '14px 14px 4px 14px', fontSize: 14, lineHeight: 1.55 }}>CM3 Entry Coiler tripped on F23-47 at shift start — hydraulic pressure low interlock E-stop. Still down. Where do I start?</div>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#0e5436', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, flex: 'none' }}>JR</div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: '#0e5436', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><div style={{ width: 11, height: 11, border: '2.5px solid #f5b820', borderRadius: 2 }} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, lineHeight: 1.62, color: '#23262c' }}>
                  <strong style={{ fontFamily: "'IBM Plex Mono',monospace", color: '#c1272d' }}>F23-47</strong> on CM3 Entry Coiler is a hydraulic pressure-low interlock E-stop. The interlock trips when header pressure at <button onClick={() => openSource('fd006')} style={css(citeBtn)}>PT-1047</button> falls below 1,850 psi for &gt;200 ms <button onClick={() => openSource('plc14')} style={css(citeBtn)}>PLC rung 14</button>. PT-1047 has logged <strong>1,120 psi</strong> since 06:42 — a real pressure deficit, not a momentary dropout. Three candidate causes, ranked by likelihood:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0' }}>
                  {candidates.map((c, i) => (
                    <div key={i} style={{ border: '1px solid #e4e2da', borderRadius: 11, padding: '13px 15px', background: '#fff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 700, color: '#fff', background: c.color, width: 20, height: 20, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{c.rank}</span>
                        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, fontWeight: 600, color: '#0e5436' }}>{c.tag}</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</span>
                        <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 700, color: c.color }}>{c.conf}%</span>
                      </div>
                      <div style={{ height: 5, background: '#f1efe8', borderRadius: 3, overflow: 'hidden', marginBottom: 9 }}>
                        <div style={{ height: '100%', borderRadius: 3, background: c.color, width: `${c.conf}%` }} />
                      </div>
                      <div style={{ fontSize: 12.5, lineHeight: 1.5, color: '#4a4f57' }}>{c.desc} <button onClick={() => openSource(c.cite)} style={css(citeBtn)}>{c.citeLabel}</button></div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 14, fontWeight: 600, margin: '18px 0 10px' }}>Recommended diagnostic sequence</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {steps.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 13, padding: '10px 0', borderBottom: '1px solid #f1efe8' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid #0e5436', color: '#0e5436', fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{s.n}</div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#23262c', paddingTop: 2 }}>{s.text} <button onClick={() => openSource(s.src)} style={css(citeBtnInline)}>{s.cite}</button></div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 18, padding: '13px 15px', background: '#e6efe9', border: '1px solid #cfe0d6', borderRadius: 11, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 18 }}>◆</span>
                  <div style={{ fontSize: 12.5, lineHeight: 1.5, color: '#0a3d28' }}><strong>Overall confidence 61%.</strong> Strongest signal points to relief-valve setpoint regression after the 06/18 PM. Start at step 3 if local gauge confirms the pressure deficit is real.</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: '#9a9c94', fontFamily: "'IBM Plex Mono',monospace" }}>SOURCES</span>
                  <button onClick={() => openSource('sop017')} style={css(srcChip)}>CM3-HYD-SOP-017</button>
                  <button onClick={() => openSource('plc14')} style={css(srcChip)}>CM3_EntryCoiler_Main.L5X</button>
                  <button onClick={() => openSource('e047')} style={css(srcChip)}>E-CM3-047</button>
                  <button onClick={() => openSource('hpu04')} style={css(srcChip)}>H-CM3-HPU-04</button>
                  <button onClick={() => openSource('fd006')} style={css(srcChip)}>CM3-FD-006</button>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button style={css(ghostBtn)}>↳ Create work order</button>
                  <button style={css(ghostBtn)}>⎙ Export to handover</button>
                  <button style={css(ghostBtn)}>⋈ Find similar on CM4</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div style={{ flex: 'none', borderTop: '1px solid #e4e2da', background: '#fff', padding: '14px 28px 18px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {recording && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9, fontSize: 12, color: '#c1272d', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
                  <span style={{ width: 3, height: 6, background: '#c1272d', borderRadius: 2, animation: 'blink 0.6s infinite' }} />
                  <span style={{ width: 3, height: 13, background: '#c1272d', borderRadius: 2, animation: 'blink 0.6s infinite .15s' }} />
                  <span style={{ width: 3, height: 9, background: '#c1272d', borderRadius: 2, animation: 'blink 0.6s infinite .3s' }} />
                  <span style={{ width: 3, height: 13, background: '#c1272d', borderRadius: 2, animation: 'blink 0.6s infinite .45s' }} />
                </span>
                Listening… release to send
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, border: '1px solid #d8d6cc', borderRadius: 13, padding: '8px 8px 8px 14px', background: '#fff' }}>
              <textarea placeholder="Ask about an asset, fault code, or document…" rows={1} style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.5, color: '#1a1d23', background: 'transparent', maxHeight: 120, padding: '6px 0' }} />
              <button onClick={toggleRec} title="Press to talk" style={micStyle}>🎙</button>
              <button style={{ width: 36, height: 36, borderRadius: 9, border: 'none', background: '#0e5436', color: '#fff', fontSize: 15, cursor: 'pointer', flex: 'none' }}>↑</button>
            </div>
            <div style={{ fontSize: 10.5, color: '#a8a89e', marginTop: 7, textAlign: 'center' }}>Logan AI can be wrong. Verify against source documents and follow lockout procedure before any work.</div>
          </div>
        </div>
      </div>

      <aside style={{ width: 296, flex: 'none', borderLeft: '1px solid #e4e2da', background: '#faf9f5', overflowY: 'auto', padding: '20px 18px' }}>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '.12em', color: '#9a9c94', textTransform: 'uppercase', marginBottom: 10 }}>Active Fault</div>
        <div style={{ background: '#fff', border: '1px solid #efc9c9', borderRadius: 11, padding: 14, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 15, fontWeight: 700, color: '#c1272d' }}>F23-47</span>
            <span style={{ fontSize: 10, background: '#fbe9e9', color: '#c1272d', padding: '2px 7px', borderRadius: 10, fontWeight: 600 }}>CRITICAL</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 10 }}>Hydraulic pressure low — interlock E-stop</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12 }}>
            {[
              ['Asset', 'CM3 Entry Coiler', null],
              ['Opened', '06:42', null],
              ['Duration', '2h 14m', '#c1272d'],
              ['PT-1047', '1,120 psi', '#c1272d'],
              ['Setpoint', '2,350 psi', null],
            ].map(([k, v, c], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a8c84' }}>{k}</span>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", color: c || undefined }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '.12em', color: '#9a9c94', textTransform: 'uppercase', marginBottom: 10 }}>Suggested follow-ups</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {followups.map((q, i) => (
            <button key={i} className="h-followup" style={{ textAlign: 'left', background: '#fff', border: '1px solid #e4e2da', borderRadius: 9, padding: '10px 12px', fontSize: 12, lineHeight: 1.4, color: '#3a3f47', cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
          ))}
        </div>
      </aside>
    </section>
  )
}
