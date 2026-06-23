import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Lightly obfuscated credential: the literal password is not stored in source,
// only its base64 form. We compare btoa(input) to this rather than decoding.
// This is obfuscation, not real security — anyone can read the bundle. Fine for a
// gated demo; do not use this pattern for anything that needs to actually be secret.
const SECRET = 'TG9nYW5BSURlbW8yMDI2' // base64('LoganAIDemo2026')

export const useAuth = create(
  persist(
    (set) => ({
      authed: false,
      // returns true on success so the form can show an error on failure.
      // trim() so a pasted value with a trailing newline / stray whitespace
      // (common from password managers or copied text) still matches.
      login: (password) => {
        let ok = false
        try { ok = btoa(String(password).trim()) === SECRET } catch { ok = false }
        if (ok) set({ authed: true })
        return ok
      },
      logout: () => set({ authed: false }),
    }),
    {
      name: 'logan-auth', // localStorage key — survives refresh
      partialize: (s) => ({ authed: s.authed }),
    },
  ),
)
