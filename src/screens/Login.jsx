import { useState } from 'react'
import { useAuth } from '../store/auth.js'

export default function Login() {
  const login = useAuth((s) => s.login)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const ok = login(password)
    if (!ok) {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f3ee', backgroundImage: 'repeating-linear-gradient(45deg,#f4f3ee,#f4f3ee 22px,#f1efe8 22px,#f1efe8 44px)' }}>
      <div style={{ width: 380, maxWidth: '92vw', background: '#fff', border: '1px solid #e4e2da', borderRadius: 16, boxShadow: '0 24px 70px rgba(26,29,35,.12)', overflow: 'hidden' }}>
        <div style={{ padding: '28px 32px 22px', borderBottom: '1px solid #eeece4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: '#0e5436', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <div style={{ width: 16, height: 16, border: '3px solid #f5b820', borderRadius: 3 }} />
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.04em', color: '#0e5436' }}>LOGAN</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '.12em', color: '#8a8c84', textTransform: 'uppercase' }}>AI Assistant</div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} style={{ padding: '24px 32px 30px' }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Sign in</div>
          <div style={{ fontSize: 12.5, color: '#8a8c84', marginBottom: 20 }}>Enter the demo access code to continue.</div>

          <label style={{ fontSize: 11, fontWeight: 600, color: '#6a6c64', textTransform: 'uppercase', letterSpacing: '.05em' }}>Access code</label>
          <input
            type="password"
            value={password}
            autoFocus
            onChange={(e) => { setPassword(e.target.value); if (error) setError(false) }}
            placeholder="••••••••••••"
            style={{
              width: '100%', marginTop: 7, padding: '11px 13px', fontSize: 14, fontFamily: 'inherit',
              color: '#1a1d23', background: '#faf9f5', border: `1px solid ${error ? '#efc9c9' : '#d8d6cc'}`,
              borderRadius: 9, outline: 'none', boxSizing: 'border-box',
            }}
          />

          {error && (
            <div style={{ marginTop: 10, fontSize: 12, color: '#c1272d', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c1272d', flex: 'none' }} />
              Incorrect access code. Try again.
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%', marginTop: 18, padding: '11px', borderRadius: 9, border: 'none',
              background: '#0e5436', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Enter portal →
          </button>

          <div style={{ marginTop: 16, fontSize: 10.5, color: '#a8a89e', textAlign: 'center', fontFamily: "'IBM Plex Mono',monospace" }}>
            Logan Aluminum · Russellville, KY · Demo environment
          </div>
        </form>
      </div>
    </div>
  )
}
