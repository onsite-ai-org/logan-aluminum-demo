import { css } from '../css.js'
import { useApp } from '../AppContext.js'
import { useAuth } from '../store/auth.js'
import { navGroups } from '../data.js'

export default function Sidebar() {
  const { screen, go } = useApp()
  const logout = useAuth((s) => s.logout)

  const navStyle = (k) => {
    const a = screen === k
    return css(`display:flex;align-items:center;gap:9px;padding:8px 11px;margin-bottom:1px;border-radius:7px;cursor:pointer;font-size:13px;font-weight:${a ? 600 : 500};color:${a ? '#0e5436' : '#41454d'};background:${a ? '#e6efe9' : 'transparent'};border:none;width:100%;text-align:left;font-family:inherit;`)
  }

  return (
    <aside style={{ width: 236, flex: 'none', background: '#ffffff', borderRight: '1px solid #e4e2da', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #eeece4' }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: '#0e5436', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <div style={{ width: 13, height: 13, border: '2.5px solid #f5b820', borderRadius: 2 }} />
        </div>
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '.04em', color: '#0e5436' }}>LOGAN</div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, letterSpacing: '.12em', color: '#8a8c84', textTransform: 'uppercase' }}>AI Assistant</div>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '14px 12px' }}>
        {navGroups.map((group, gi) => (
          <div key={group.label}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, letterSpacing: '.14em', color: '#9a9c94', padding: gi === 0 ? '4px 8px 6px' : '14px 8px 6px', textTransform: 'uppercase' }}>{group.label}</div>
            {group.items.map(item => (
              <button key={item.key} onClick={() => go(item.key)} style={navStyle(item.key)}>
                <span style={{ display: 'flex', width: 17, justifyContent: 'center' }}>{item.glyph}</span>
                {item.name}
                {item.live && <span style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#c1272d', animation: 'pulse 1.8s infinite' }} />}
                {item.badge && <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, background: '#fdf3d4', color: '#b27300', padding: '1px 6px', borderRadius: 9, fontWeight: 600 }}>{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid #eeece4', padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0e5436', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flex: 'none' }}>JR</div>
        <div style={{ lineHeight: 1.2, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Jordan Reynolds</div>
          <div style={{ fontSize: 10.5, color: '#8a8c84' }}>Engineering Technologist</div>
        </div>
        <div title="On shift" style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#186e3a', flex: 'none' }} />
        <button onClick={logout} title="Sign out" style={{ width: 28, height: 28, borderRadius: 7, background: '#f4f3ee', border: '1px solid #e4e2da', cursor: 'pointer', fontSize: 13, color: '#6a6c64', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>⏻</button>
      </div>
    </aside>
  )
}
