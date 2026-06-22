// All static screen content ported from the Logan AI Assistant design brief.
// Click behavior is wired up in the components via the app context.

export const titles = {
  dashboard: 'Plant Status', chat: 'Assistant', documents: 'Document Library',
  assets: 'Equipment Asset Tree', plc: 'PLC Code Viewer', schematics: 'Schematic Viewer',
  predictive: 'Predictive Maintenance', patterns: 'Cross-Equipment Pattern Finder',
  defects: 'Quality Defect Root-Cause', spares: 'Spare Parts Intelligence',
  handover: 'Shift Handover', improve: 'Continuous Improvement', audit: 'Audit Log',
}

export const navKeys = [
  'dashboard', 'chat', 'documents', 'assets', 'plc', 'schematics',
  'predictive', 'patterns', 'defects', 'spares', 'handover', 'improve', 'audit',
]

export const navGroups = [
  { label: 'Core', items: [
    { key: 'dashboard', glyph: '▦', name: 'Dashboard' },
    { key: 'chat', glyph: '◆', name: 'Assistant', live: true },
    { key: 'documents', glyph: '▤', name: 'Documents' },
  ] },
  { label: 'Equipment', items: [
    { key: 'assets', glyph: '⊞', name: 'Asset Tree' },
    { key: 'plc', glyph: '⌗', name: 'PLC Code' },
    { key: 'schematics', glyph: '⌁', name: 'Schematics' },
  ] },
  { label: 'Intelligence', items: [
    { key: 'predictive', glyph: '◴', name: 'Predictive' },
    { key: 'patterns', glyph: '⋈', name: 'Pattern Finder' },
    { key: 'defects', glyph: '◇', name: 'Defect Root-Cause' },
    { key: 'spares', glyph: '⬡', name: 'Spare Parts' },
    { key: 'handover', glyph: '⇌', name: 'Shift Handover' },
  ] },
  { label: 'System', items: [
    { key: 'improve', glyph: '✦', name: 'Improvement Inbox', badge: '7' },
    { key: 'audit', glyph: '▣', name: 'Audit Log' },
  ] },
]

export const sources = {
  sop017: { id: 'CM3-HYD-SOP-017', type: 'SOP', typeColor: '#186e3a', title: 'Hydraulic Power Unit — Pressure Setpoints & Lockout', meta: 'Rev D · §6.2 · approved 2025-03-14', excerpt: '6.2  Relief valve PRV-CM3-04 shall be set to 2,350 psi ±50 with the HPU at operating temperature. After any adjustment, cycle the entry coiler three times and confirm header pressure at PT-1047 holds within 100 psi of setpoint under load.\n\nNOTE: Setting below 2,200 psi will trip the F23-47 pressure-low interlock during coil load.', rationale: 'The AI matched the F23-47 interlock to the documented PRV-CM3-04 setpoint procedure. The current reading (1,900 psi) is below the SOP minimum, directly explaining the trip.' },
  hpu04: { id: 'H-CM3-HPU-04', type: 'Hydraulic', typeColor: '#1e5fa4', title: 'CM3 HPU — Header & Cylinder Schematic', meta: 'Sheet 4 of 7 · HYD-CYL-11 detail', excerpt: 'PRV-CM3-04 ── header ── PT-1047 ── HYD-CYL-11 (entry coiler clamp)\n\nCylinder HYD-CYL-11: 4.0" bore, dual rod seal. Last seal kit 2024-04 (rated 18 mo service).', rationale: 'Used to trace the hydraulic path from relief valve through the transducer to the clamp cylinder, establishing which components sit upstream of the pressure deficit.' },
  fd006: { id: 'CM3-FD-006', type: 'Field Data', typeColor: '#b27300', title: 'PT-1047 Calibration & Trend Record', meta: 'Calibration verified 2025-09-02 · drift band ±25 psi', excerpt: 'PT-1047  4–20 mA, 0–3,000 psi.  Last verification 2025-09-02 against PG-1047 local gauge: agreement within 12 psi.\n\n06:42 today — step change 2,310 → 1,120 psi over 1.2 s. A transducer drift fault would trend slowly, not step. Step change favors a real hydraulic event.', rationale: 'The trend record shows a step change rather than gradual drift, which is why transducer drift (candidate 3) was ranked lowest at 15%.' },
  e047: { id: 'E-CM3-047', type: 'Electrical', typeColor: '#c1272d', title: 'CM3 Entry Coiler — E-Stop & Interlock Wiring', meta: 'Sheet 047 · TB-14C · MCC-CM3-P07', excerpt: 'F23-47 interlock relay CR-47 is driven by PLC output O:14/03. De-energizing CR-47 opens the master E-stop string at TB-14C and removes run permissive from MCC-CM3-P07.', rationale: 'Confirms the fault is a software-driven interlock (PLC rung 14), not a hardwired field device failure — so the diagnosis focuses on the pressure source, not the relay.' },
  plc14: { id: 'CM3_EntryCoiler_Main.L5X', type: 'PLC', typeColor: '#0e5436', title: 'Entry Coiler Main Routine — Rung 14', meta: 'CM3_EntryCoiler_Main · rung 14 · ControlLogix', excerpt: 'Rung 14  (Pressure-low interlock)\n\nXIC PT_1047_psi LES 1850  TON Timer_F23_47 (Preset 200ms)\n   └─ DN ─→ OTE F23_47_Trip  ─→ OTU Coiler_Run_Permissive\n\nComment: "Trip entry coiler if header < 1850 psi for 200ms — protects HYD-CYL-11 clamp."', rationale: 'This is the exact logic that generates F23-47. The 1,850 psi / 200 ms threshold quoted in the response is read directly from this rung.' },
}

export const faults = [
  { code: 'F23-47', sev: 'Critical', color: '#c1272d', title: 'Hydraulic pressure low — interlock E-stop', tag: 'PT-1047 · CM3 Entry Coiler', line: 'CM3', time: '06:42', age: '2h 14m' },
  { code: 'F19-22', sev: 'Critical', color: '#c1272d', title: 'Roll force sensor variance over tolerance', tag: 'LC-HM-02 · Hot Mill', line: 'Hot Mill', time: '05:51', age: '3h 05m' },
  { code: 'W14-03', sev: 'Warning', color: '#b27300', title: 'Coolant flow below setpoint', tag: 'FT-CM4-09 · CM4 Scalper', line: 'CM4', time: '05:18', age: '3h 38m' },
  { code: 'W08-11', sev: 'Warning', color: '#b27300', title: 'Tension reel drift on exit section', tag: 'TR-CM3-02 · CM3 Exit', line: 'CM3', time: '04:30', age: '4h 26m' },
  { code: 'I09-02', sev: 'Info', color: '#1e5fa4', title: 'Pit temperature logging gap', tag: 'TE-DC4-21 · DC4 Caster', line: 'DC4', time: '04:55', age: '4h 01m' },
]

export const lines = [
  { name: 'Hot Mill', state: 'Running', color: '#186e3a', glow: '#dcefe2' },
  { name: 'CM3', state: 'Faulted', color: '#c1272d', glow: '#fbe1e1' },
  { name: 'CM4', state: 'Running', color: '#186e3a', glow: '#dcefe2' },
  { name: 'DC4 Caster', state: 'Running', color: '#186e3a', glow: '#dcefe2' },
  { name: 'Scalper 1', state: 'Running', color: '#186e3a', glow: '#dcefe2' },
  { name: 'Scalper 2', state: 'Idle', color: '#8a8c84', glow: '#ececea' },
]

export const kpis = [
  { label: 'Active Faults', value: '5', sub: '1 critical', color: '#c1272d' },
  { label: 'Avg Diagnose', value: '7m', sub: '↓ 38% vs manual', color: '#186e3a' },
  { label: 'Sessions Today', value: '34', sub: '12 technologists', color: '#1a1d23' },
  { label: 'Corpus Coverage', value: '94%', sub: '12,418 documents', color: '#0e5436' },
  { label: 'Open Work Orders', value: '9', sub: '3 awaiting parts', color: '#b27300' },
]

export const activity = [
  { text: 'Diagnosed F23-47 — ranked 3 causes for CM3 Entry Coiler', time: '06:44 · session JR', color: '#c1272d' },
  { text: 'Indexed 84 new pages from CM4 SOP revision batch', time: '06:10 · auto', color: '#186e3a' },
  { text: 'Predictive alert raised on MCC-CM3-P07 contactor wear', time: '05:30 · model', color: '#b27300' },
  { text: 'Shift handover summary generated for C-shift', time: '06:00 · auto', color: '#1e5fa4' },
]

export const candidates = [
  { rank: 1, color: '#186e3a', tag: 'PRV-CM3-04', title: 'Relief valve setpoint regression', conf: 61, desc: 'Relief valve was adjusted during the 06/18 PM. Setpoint now reads 1,900 psi versus spec 2,350 psi. A clean step-down at startup is most consistent with a mis-set valve.', citeLabel: 'CM3-HYD-SOP-017 §6.2', cite: 'sop017' },
  { rank: 2, color: '#b27300', tag: 'HYD-CYL-11', title: 'Worn cylinder rod seal', conf: 24, desc: 'Internal leak-down would lower header pressure under clamp load. Seal kit installed 2024-04 is past its 18-month rating.', citeLabel: 'H-CM3-HPU-04 sht 4', cite: 'hpu04' },
  { rank: 3, color: '#8a8c84', tag: 'PT-1047', title: 'Transducer drift', conf: 15, desc: 'A drifting transducer would read low without a true pressure loss. But the 06:42 trend is a step change, not gradual drift — lowers this likelihood.', citeLabel: 'CM3-FD-006', cite: 'fd006' },
]

export const steps = [
  { n: 1, text: 'Lock out the HPU per CM3-HYD-SOP-017 §4. Verify zero stored energy at the header before any work.', cite: 'SOP §4', src: 'sop017' },
  { n: 2, text: 'Compare PT-1047 against local gauge PG-1047 at the header. A discrepancy over 150 psi points to the transducer (candidate 3).', cite: 'CM3-FD-006', src: 'fd006' },
  { n: 3, text: 'If both gauges read low, inspect PRV-CM3-04 setpoint. Re-set to 2,350 psi per SOP §6.2 and re-test under load.', cite: 'SOP §6.2', src: 'sop017' },
  { n: 4, text: 'If pressure holds at setpoint but decays under load, schedule a HYD-CYL-11 seal inspection (candidate 2).', cite: 'H-CM3-HPU-04', src: 'hpu04' },
]

export const followups = [
  'Show me PLC rung 14 with the trip logic',
  'When was PRV-CM3-04 last adjusted, and by whom?',
  'Has this fault occurred on CM4 Entry Coiler?',
]

export const paletteItems = [
  { glyph: 'F', title: 'F23-47 — Hydraulic pressure low', sub: 'CM3 Entry Coiler · active', kind: 'Fault', iconBg: '#fbe9e9', iconColor: '#c1272d', go: 'chat' },
  { glyph: 'PT', title: 'PT-1047 — Pressure transducer', sub: 'CM3 Entry Coiler header', kind: 'Tag', iconBg: '#e6efe9', iconColor: '#0e5436', go: 'assets' },
  { glyph: 'PR', title: 'PRV-CM3-04 — Relief valve', sub: 'CM3 HPU', kind: 'Tag', iconBg: '#e6efe9', iconColor: '#0e5436', go: 'assets' },
  { glyph: 'HY', title: 'HYD-CYL-11 — Clamp cylinder', sub: 'CM3 Entry Coiler', kind: 'Tag', iconBg: '#e6efe9', iconColor: '#0e5436', go: 'assets' },
  { glyph: 'DO', title: 'CM3-HYD-SOP-017', sub: 'HPU pressure setpoints & lockout', kind: 'Document', iconBg: '#eaf1f8', iconColor: '#1e5fa4', go: 'documents' },
  { glyph: 'L5', title: 'CM3_EntryCoiler_Main.L5X', sub: 'ControlLogix program', kind: 'PLC', iconBg: '#e6efe9', iconColor: '#0e5436', go: 'plc' },
  { glyph: 'E', title: 'E-CM3-047 — E-stop wiring', sub: 'Electrical print', kind: 'Schematic', iconBg: '#fbe9e9', iconColor: '#c1272d', go: 'schematics' },
  { glyph: '▦', title: 'Go to Dashboard', sub: 'Live plant status', kind: 'Screen', iconBg: '#f4f3ee', iconColor: '#6a6c64', go: 'dashboard' },
  { glyph: '◆', title: 'Open Assistant', sub: 'Fault diagnosis chat', kind: 'Screen', iconBg: '#f4f3ee', iconColor: '#6a6c64', go: 'chat' },
  { glyph: '◴', title: 'Predictive Maintenance', sub: 'Precursor alerts', kind: 'Screen', iconBg: '#f4f3ee', iconColor: '#6a6c64', go: 'predictive' },
]

// type=open via source slide-over; type=go navigates to a screen
export const documents = [
  { id: 'CM3-HYD-SOP-017', type: 'SOP', tc: '#186e3a', title: 'HPU — Pressure Setpoints & Lockout', pages: 24, bar: '', cites: 18, hot: true, action: { source: 'sop017' } },
  { id: 'CM3_EntryCoiler_Main.L5X', type: 'PLC', tc: '#0e5436', title: 'Entry Coiler Main Routine', pages: 312, bar: '', cites: 11, hot: true, action: { go: 'plc' } },
  { id: 'E-CM3-047', type: 'Electrical', tc: '#c1272d', title: 'E-Stop & Interlock Wiring', pages: 1, bar: '', cites: 7, action: { go: 'schematics' } },
  { id: 'H-CM3-HPU-04', type: 'Hydraulic', tc: '#1e5fa4', title: 'HPU Header & Cylinder Schematic', pages: 7, bar: '', cites: 6, action: { source: 'hpu04' } },
  { id: 'CM3-FD-006', type: 'Field Data', tc: '#b27300', title: 'PT-1047 Calibration & Trend Record', pages: 3, bar: '', cites: 4, action: { source: 'fd006' } },
  { id: 'CM4-HYD-SOP-019', type: 'SOP', tc: '#186e3a', title: 'CM4 HPU Pressure Procedures', pages: 22, bar: 'parsing pages · 14 of 22', cites: 0, action: {} },
  { id: 'MAINT-LOG-2026Q2', type: 'Maint Log', tc: '#6a6c64', title: 'CM3 Maintenance Log — Q2 2026', pages: 140, bar: 'extracting entities · 88 of 140', cites: 0, action: {} },
]

export const docFilters = ['All', 'SOP', 'PLC', 'Electrical', 'Hydraulic', 'Field Data', 'Maint Log']

export const treeRaw = [
  { key: 'hotmill', name: 'Hot Mill', level: 0, dot: '#186e3a', glyph: '▸' },
  { key: 'cm3', name: 'CM3 Cold Mill', level: 0, dot: '#c1272d', glyph: '▾' },
  { key: 'entry', name: 'Entry Coiler', level: 1, dot: '#c1272d', glyph: '▾' },
  { key: 'pt1047', name: 'PT-1047', level: 2, dot: '#c1272d', sub: 'Pressure transducer' },
  { key: 'prv04', name: 'PRV-CM3-04', level: 2, dot: '#b27300', sub: 'Relief valve' },
  { key: 'cyl11', name: 'HYD-CYL-11', level: 2, dot: '#186e3a', sub: 'Clamp cylinder' },
  { key: 'mcc07', name: 'MCC-CM3-P07', level: 2, dot: '#b27300', sub: 'Motor control center' },
  { key: 'exit', name: 'Exit Section', level: 1, dot: '#b27300', glyph: '▸' },
  { key: 'cm4', name: 'CM4 Cold Mill', level: 0, dot: '#186e3a', glyph: '▸' },
  { key: 'dc4', name: 'DC4 Caster', level: 0, dot: '#186e3a', glyph: '▸' },
  { key: 'scalp1', name: 'Scalper Line 1', level: 0, dot: '#186e3a', glyph: '▸' },
  { key: 'scalp2', name: 'Scalper Line 2', level: 0, dot: '#8a8c84', glyph: '▸' },
]

export const tags = [
  { tag: 'PT-1047', desc: 'Pressure transducer · 0–3,000 psi', val: '1,120 psi', vc: '#c1272d', source: 'fd006' },
  { tag: 'PRV-CM3-04', desc: 'Relief valve · setpoint', val: '1,900 psi', vc: '#b27300', source: 'sop017' },
  { tag: 'HYD-CYL-11', desc: 'Clamp cylinder · 4.0" bore', val: 'OK', vc: '#186e3a', source: 'hpu04' },
  { tag: 'MCC-CM3-P07', desc: 'Motor control · contactor', val: 'wear 78%', vc: '#b27300', go: 'predictive' },
]

export const assetDocs = [
  { id: 'CM3-HYD-SOP-017', type: 'SOP', tc: '#186e3a', source: 'sop017' },
  { id: 'E-CM3-047', type: 'Electrical', tc: '#c1272d', go: 'schematics' },
  { id: 'CM3_EntryCoiler_Main.L5X', type: 'PLC', tc: '#0e5436', go: 'plc' },
  { id: 'H-CM3-HPU-04', type: 'Hydraulic', tc: '#1e5fa4', source: 'hpu04' },
]

export const plcLeft = [
  { n: 13, t: '// Rung 13 — Coiler run permissive seal-in', c: 'cmt' },
  { n: 14, t: '// Rung 14 — Pressure-low interlock (F23-47)', c: 'cmt' },
  { n: 15, t: 'XIC PT_1047_psi  LES 1850  TON Timer_F23_47', c: 'code' },
  { n: 16, t: '   Preset := 200ms', c: 'code' },
  { n: 17, t: 'DN  →  OTE F23_47_Trip', c: 'code' },
  { n: 18, t: '    →  OTU Coiler_Run_Permissive', c: 'code' },
  { n: 19, t: '// Protects HYD-CYL-11 clamp from low-pressure slip', c: 'cmt' },
]

export const plcRight = [
  { n: 13, t: '// Rung 13 — Coiler run permissive seal-in', c: 'cmt' },
  { n: 14, t: '// Rung 14 — Pressure-low interlock (F23-47)', c: 'cmt' },
  { n: 15, t: 'XIC PT_2041_psi  LES 2000  TON Timer_F23_47', c: 'code', diff: 'chg' },
  { n: 16, t: '   Preset := 150ms', c: 'code', diff: 'chg' },
  { n: 17, t: 'DN  →  OTE F23_47_Trip', c: 'code' },
  { n: 18, t: '    →  OTU Coiler_Run_Permissive', c: 'code' },
  { n: 19, t: '// Higher threshold added after 2025-09 seal upgrade', c: 'cmt', diff: 'add' },
]

export function plcPaint(rows) {
  return rows.map(r => {
    const bg = r.diff === 'chg' ? '#3a3420' : r.diff === 'add' ? '#1c3526' : 'transparent'
    const color = r.c === 'cmt' ? '#7a8a82' : r.diff === 'chg' ? '#f5d98a' : r.diff === 'add' ? '#9ad6b0' : '#dcdcd4'
    return { ...r, bg, color }
  })
}

export const pins = [
  { id: 'PRV-CM3-04', x: '20%', y: '30%', color: '#b27300' },
  { id: 'PT-1047', x: '48%', y: '22%', color: '#c1272d' },
  { id: 'HYD-CYL-11', x: '74%', y: '52%', color: '#186e3a' },
  { id: 'HPU-Pump', x: '14%', y: '66%', color: '#1e5fa4' },
  { id: 'TB-14C', x: '58%', y: '74%', color: '#0e5436' },
]

export const predictive = [
  { tag: 'MCC-CM3-P07', asset: 'CM3 Entry Coiler', risk: 78, rc: '#c1272d', pattern: 'Contactor coil current rising 4%/week — matches 3 prior failures', window: '9–16 days', conf: 84 },
  { tag: 'HYD-CYL-11', asset: 'CM3 Entry Coiler', risk: 54, rc: '#b27300', pattern: 'Seal age past 18-mo rating; leak-down trend forming', window: '4–7 weeks', conf: 71 },
  { tag: 'FT-CM4-09', asset: 'CM4 Scalper', risk: 41, rc: '#b27300', pattern: 'Coolant flow variance widening at shift changes', window: '6–9 weeks', conf: 63 },
  { tag: 'TR-CM3-02', asset: 'CM3 Exit', risk: 23, rc: '#1e5fa4', pattern: 'Tension drift within band but trending toward limit', window: '10–14 weeks', conf: 58 },
]

export const patternSteps = [
  'Confirmed PRV-CM4-04 setpoint had drifted to 1,950 psi after a PM adjustment',
  'Re-set relief valve to 2,350 psi per CM4-HYD-SOP-019 §6.2',
  'Cycled entry coiler 3× under load — header held at 2,310 psi',
  'Cleared F23-47, returned to run. No recurrence in 6 months',
]

export const defectTabs = [
  { key: 'edge', label: 'Edge crack' },
  { key: 'gauge', label: 'Gauge variation' },
  { key: 'incl', label: 'Surface inclusion' },
  { key: 'roll', label: 'Roll mark' },
]

export const defectCauses = [
  { rank: 1, conf: 58, rc: '#186e3a', title: 'Entry coiler clamp slip', desc: 'Low hydraulic pressure (F23-47 family) reduces clamp force, letting the coil shift at thread-up and seeding edge cracks.', evidence: ['F23-47 active on CM3', 'CM3-HYD-SOP-017'] },
  { rank: 2, conf: 27, rc: '#b27300', title: 'Edge trim knife wear', desc: 'Dull side-trim knives leave a ragged edge that propagates under tension downstream.', evidence: ['MAINT-LOG-2026Q2', 'TR-CM3-02 trend'] },
  { rank: 3, conf: 15, rc: '#8a8c84', title: 'Cast slab edge condition', desc: 'Upstream DC4 caster edge quality variance correlates weakly with this defect cluster.', evidence: ['DC4 cast report'] },
]

export const spares = [
  { part: 'Rod seal kit — HYD-CYL-11', pn: 'SK-40-DR', wear: 91, wc: '#c1272d', stock: 1, lead: '12 days', reorder: 'Reorder now' },
  { part: 'Contactor — MCC-CM3-P07', pn: 'AB-100-C43', wear: 78, wc: '#b27300', stock: 2, lead: '5 days', reorder: 'In 2 weeks' },
  { part: 'Relief valve cartridge — PRV-CM3-04', pn: 'RV-2350-C', wear: 44, wc: '#186e3a', stock: 3, lead: '9 days', reorder: 'In 8 weeks' },
  { part: 'Transducer — PT-1047', pn: 'PX-3000-G', wear: 31, wc: '#186e3a', stock: 4, lead: '3 days', reorder: 'In 12 weeks' },
  { part: 'Coolant flow sensor — FT-CM4-09', pn: 'FS-2-IL', wear: 39, wc: '#186e3a', stock: 0, lead: '21 days', reorder: 'Backorder' },
]

export const handoverEvents = [
  { time: '06:42', sev: '#c1272d', text: 'F23-47 opened — CM3 Entry Coiler hydraulic pressure low. E-stop active, line down. Diagnosis started, relief valve PRV-CM3-04 prime suspect.' },
  { time: '05:51', sev: '#c1272d', text: 'F19-22 — Hot Mill roll force sensor variance. Monitoring; within shutdown threshold.' },
  { time: '05:18', sev: '#b27300', text: 'W14-03 — CM4 Scalper coolant flow dip during coil change. Cleared after strainer flush.' },
  { time: '02:10', sev: '#186e3a', text: 'DC4 Caster routine pit temp survey complete. No exceptions.' },
]

export const handoverOpen = [
  { text: 'F23-47 CM3 Entry Coiler — line down, awaiting relief valve re-set', owner: '→ A-shift' },
  { text: 'HYD-CYL-11 seal kit on order (SK-40-DR) — inspect on next stop', owner: '→ Maint' },
]

export const improve = [
  { freq: 14, title: 'Relief valve setpoints not captured after PM', detail: 'Engineers repeatedly ask the AI for PRV setpoints because the PM checklist does not log the value entered.', tag: 'PRV-CM3-04 · PRV-CM4-04', status: 'New', sc: '#c1272d' },
  { freq: 9, title: 'PT-1047 vs local gauge cross-check is manual', detail: 'Recurring questions comparing transducer to PG-1047. Candidate for an automated cross-check widget.', tag: 'PT-1047', status: 'Reviewing', sc: '#b27300' },
  { freq: 6, title: 'CM4 SOPs lag CM3 revisions', detail: 'Several sessions hit outdated CM4 procedures that were updated on CM3 but not mirrored.', tag: 'CM4-HYD-SOP-019', status: 'Planned', sc: '#1e5fa4' },
  { freq: 5, title: 'Handover summary missing parts-on-order', detail: 'Engineers add spare-part status manually each shift. Auto-include from spares panel.', tag: 'Handover', status: 'New', sc: '#c1272d' },
]

const auditKind = {
  query: ['#e6efe9', '#0e5436'], view: ['#eaf1f8', '#1e5fa4'],
  system: ['#f4f3ee', '#6a6c64'], edit: ['#fdf3d4', '#b27300'],
}

export const audit = [
  { time: '06:44:18', user: 'JR', who: 'Jordan Reynolds', action: 'Diagnosed fault', target: 'F23-47 · CM3 Entry Coiler', kind: 'query' },
  { time: '06:44:02', user: 'JR', who: 'Jordan Reynolds', action: 'Opened source', target: 'CM3_EntryCoiler_Main.L5X r14', kind: 'view' },
  { time: '06:31:55', user: 'AI', who: 'Logan AI', action: 'Raised predictive alert', target: 'MCC-CM3-P07', kind: 'system' },
  { time: '06:10:40', user: 'AI', who: 'Logan AI', action: 'Indexed batch', target: 'CM4 SOP revision · 84 pages', kind: 'system' },
  { time: '06:02:11', user: 'MK', who: 'Mara Klein', action: 'Added annotation', target: 'PRV-CM3-04', kind: 'edit' },
  { time: '06:00:00', user: 'AI', who: 'Logan AI', action: 'Generated handover', target: 'C-shift summary', kind: 'system' },
  { time: '05:52:30', user: 'DT', who: 'Devin Tran', action: 'Diagnosed fault', target: 'F19-22 · Hot Mill', kind: 'query' },
].map(a => ({ ...a, badgeBg: auditKind[a.kind][0], badgeColor: auditKind[a.kind][1] }))
