import { useState, useEffect, useRef } from "react";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const icons = {
  ppe: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  obs: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  legal: "M3 6l9-4 9 4v6c0 5.25-3.75 10.15-9 11.25C6.75 22.15 3 17.25 3 12V6z",
  audit: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  asset: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  training: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  induction: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  risk: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  plus: "M12 5v14M5 12h14",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  ai: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z",
  chevron: "M9 18l6-6-6-6",
  menu: "M3 12h18M3 6h18M3 18h18",
  alert: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  calendar: "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
};

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
const useStorage = (key, def) => {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; }
    catch { return def; }
  });
  const save = (v) => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
};

const uid = () => Math.random().toString(36).slice(2, 9);
const today = () => new Date().toISOString().split("T")[0];
const daysFrom = (d) => Math.ceil((new Date(d) - new Date()) / 86400000);

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const Badge = ({ label, color = "slate" }) => {
  const colors = {
    green: "bg-emerald-900/60 text-emerald-300 border border-emerald-700/50",
    red: "bg-red-900/60 text-red-300 border border-red-700/50",
    amber: "bg-amber-900/60 text-amber-300 border border-amber-700/50",
    blue: "bg-blue-900/60 text-blue-300 border border-blue-700/50",
    slate: "bg-slate-700/60 text-slate-300 border border-slate-600/50",
    purple: "bg-purple-900/60 text-purple-300 border border-purple-700/50",
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[color]}`}>{label}</span>;
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 ${className}`}>{children}</div>
);

const Btn = ({ children, onClick, variant = "primary", size = "md", className = "", disabled = false }) => {
  const v = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    ghost: "hover:bg-slate-700/60 text-slate-300",
    amber: "bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold",
  };
  const s = { md: "px-4 py-2 text-sm", sm: "px-3 py-1.5 text-xs", lg: "px-6 py-3 text-base" };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`rounded-lg transition-all flex items-center gap-2 ${v[variant]} ${s[size]} ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, type = "text", placeholder = "", required = false, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="bg-slate-900/70 border border-slate-600/50 rounded-lg px-3 py-2.5 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/20 transition" />
  </div>
);

const Select = ({ label, value, onChange, options = [], placeholder = "Select…", className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>}
    <select value={value} onChange={e => onChange(e.target.value)}
      className="bg-slate-900/70 border border-slate-600/50 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/70 transition">
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, value, onChange, rows = 3, placeholder = "", className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>}
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
      className="bg-slate-900/70 border border-slate-600/50 rounded-lg px-3 py-2.5 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/20 transition resize-none" />
  </div>
);

const Modal = ({ open, onClose, title, children, width = "max-w-2xl" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full ${width} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h3 className="font-bold text-slate-100 text-lg">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition">
            <Icon d={icons.x} size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, color = "cyan", icon }) => {
  const c = { cyan: "text-cyan-400", emerald: "text-emerald-400", amber: "text-amber-400", red: "text-red-400" };
  return (
    <Card className="flex items-center gap-4">
      {icon && <div className={`w-10 h-10 rounded-xl bg-slate-700/60 flex items-center justify-center ${c[color]}`}>
        <Icon d={icon} size={18} />
      </div>}
      <div>
        <div className={`text-2xl font-bold ${c[color]}`}>{value}</div>
        <div className="text-xs text-slate-400 font-medium">{label}</div>
        {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
      </div>
    </Card>
  );
};

const PhotoUpload = ({ photos = [], onAdd }) => {
  const ref = useRef();
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onAdd(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Photos</label>
      <div className="flex flex-wrap gap-2">
        {photos.map((p, i) => (
          <img key={i} src={p} alt="" className="w-20 h-20 object-cover rounded-lg border border-slate-600" />
        ))}
        <button onClick={() => ref.current?.click()}
          className="w-20 h-20 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition">
          <Icon d={icons.camera} size={22} />
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
};

// ─── No AI dependencies — Legal Register uses built-in offline database ────────


// ════════════════════════════════════════════════════════════════════════════
// MODULE 1 — PPE MANAGEMENT
// ════════════════════════════════════════════════════════════════════════════
const PPEModule = () => {
  const [items, setItems] = useStorage("ppe_items", []);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", assignedTo: "", issuedDate: today(), nextCheck: "", notes: "", photos: [] });

  const ppeTypes = ["Hard Hat","Hi-Vis Vest","Safety Boots","Gloves","Safety Glasses","RPE Mask","RPE Filter","Ear Defenders","Face Shield","Harness","Chemical Suit","Knee Pads"];

  const save = () => {
    if (!form.name || !form.assignedTo) return;
    setItems([...items, { ...form, id: uid(), status: "Active" }]);
    setForm({ name: "", type: "", assignedTo: "", issuedDate: today(), nextCheck: "", notes: "", photos: [] });
    setModal(false);
  };

  const remove = (id) => setItems(items.filter(i => i.id !== id));

  const getDaysStatus = (d) => {
    if (!d) return null;
    const days = daysFrom(d);
    if (days < 0) return { label: "Overdue", color: "red" };
    if (days <= 7) return { label: `${days}d`, color: "red" };
    if (days <= 30) return { label: `${days}d`, color: "amber" };
    return { label: `${days}d`, color: "green" };
  };

  const overdue = items.filter(i => i.nextCheck && daysFrom(i.nextCheck) < 0).length;
  const due7 = items.filter(i => i.nextCheck && daysFrom(i.nextCheck) >= 0 && daysFrom(i.nextCheck) <= 7).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">PPE Management</h2>
        <Btn onClick={() => setModal(true)}><Icon d={icons.plus} size={16} />Issue PPE</Btn>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Items Issued" value={items.length} color="cyan" icon={icons.ppe} />
        <StatCard label="Overdue Checks" value={overdue} color="red" icon={icons.alert} />
        <StatCard label="Due This Week" value={due7} color="amber" icon={icons.bell} />
        <StatCard label="Active PPE Types" value={new Set(items.map(i => i.type)).size} color="emerald" icon={icons.check} />
      </div>

      {overdue > 0 && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 flex items-center gap-3">
          <Icon d={icons.alert} color="#f87171" size={20} />
          <div>
            <div className="text-red-300 font-semibold text-sm">⚠ {overdue} PPE item{overdue > 1 ? "s" : ""} overdue for inspection/replacement</div>
            <div className="text-red-400/70 text-xs mt-0.5">Review items below and take action</div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-6">No PPE issued yet. Click "Issue PPE" to get started.</p></Card>}
        {items.map(item => {
          const st = getDaysStatus(item.nextCheck);
          return (
            <Card key={item.id} className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon d={icons.ppe} size={18} color="#22d3ee" />
                </div>
                <div>
                  <div className="font-semibold text-slate-100">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.type} • {item.assignedTo}</div>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    <Badge label={`Issued: ${item.issuedDate}`} color="slate" />
                    {item.nextCheck && st && <Badge label={`Next check: ${st.label}`} color={st.color} />}
                    {item.type === "RPE Filter" && <Badge label="RPE Filter — Check Seal & Life" color="amber" />}
                  </div>
                  {item.notes && <div className="text-xs text-slate-500 mt-1">{item.notes}</div>}
                </div>
              </div>
              <button onClick={() => remove(item.id)} className="text-slate-600 hover:text-red-400 transition flex-shrink-0">
                <Icon d={icons.trash} size={16} />
              </button>
            </Card>
          );
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Issue PPE Item">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Item Name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="e.g. Hard Hat #4" required />
            <Select label="PPE Type" value={form.type} onChange={v => setForm({ ...form, type: v })} options={ppeTypes} />
          </div>
          <Input label="Assigned To" value={form.assignedTo} onChange={v => setForm({ ...form, assignedTo: v })} placeholder="Employee name" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Issue Date" value={form.issuedDate} onChange={v => setForm({ ...form, issuedDate: v })} type="date" />
            <Input label="Next Check / Replacement Date" value={form.nextCheck} onChange={v => setForm({ ...form, nextCheck: v })} type="date" />
          </div>
          <Textarea label="Notes / Serial Number" value={form.notes} onChange={v => setForm({ ...form, notes: v })} placeholder="Serial number, size, condition notes…" rows={2} />
          <PhotoUpload photos={form.photos} onAdd={p => setForm({ ...form, photos: [...form.photos, p] })} />
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.name || !form.assignedTo}>Issue PPE</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE 2 — OBSERVATION MANAGEMENT
// ════════════════════════════════════════════════════════════════════════════
const ObservationModule = () => {
  const [records, setRecords] = useStorage("obs_records", []);
  const [modal, setModal] = useState(false);
  const [view, setView] = useState(null);
  const [form, setForm] = useState({ type: "Improvement", title: "", description: "", location: "", severity: "", reportedBy: "", date: today(), notifyEmail: "", photos: [], actions: [] });

  const types = { "Improvement": "blue", "Near Miss": "amber", "Incident": "red" };

  const save = () => {
    if (!form.title || !form.description) return;
    setRecords([...records, { ...form, id: uid(), status: "Open" }]);
    setForm({ type: "Improvement", title: "", description: "", location: "", severity: "", reportedBy: "", date: today(), notifyEmail: "", photos: [], actions: [] });
    setModal(false);
  };

  const close = (id) => setRecords(records.map(r => r.id === id ? { ...r, status: "Closed" } : r));
  const counts = { Improvement: records.filter(r => r.type === "Improvement").length, "Near Miss": records.filter(r => r.type === "Near Miss").length, Incident: records.filter(r => r.type === "Incident").length };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Observation Management</h2>
        <Btn onClick={() => setModal(true)}><Icon d={icons.plus} size={16} />New Record</Btn>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Improvements" value={counts["Improvement"]} color="cyan" icon={icons.obs} />
        <StatCard label="Near Misses" value={counts["Near Miss"]} color="amber" icon={icons.alert} />
        <StatCard label="Incidents" value={counts["Incident"]} color="red" icon={icons.alert} />
      </div>

      <div className="space-y-2">
        {records.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-6">No observations recorded yet.</p></Card>}
        {records.map(r => (
          <Card key={r.id} className="cursor-pointer hover:border-slate-600 transition" >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className={`w-2 h-full min-h-[40px] rounded-full flex-shrink-0 ${r.type === "Incident" ? "bg-red-500" : r.type === "Near Miss" ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: 3 }} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{r.title}</span>
                    <Badge label={r.type} color={types[r.type]} />
                    <Badge label={r.status} color={r.status === "Closed" ? "slate" : "green"} />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{r.date} • {r.location || "No location"} • {r.reportedBy || "Unknown"}</div>
                  <p className="text-sm text-slate-400 mt-1.5 line-clamp-2">{r.description}</p>
                  {r.severity && <div className="mt-1"><Badge label={`Severity: ${r.severity}`} color={r.severity === "High" ? "red" : r.severity === "Medium" ? "amber" : "slate"} /></div>}
                  {r.notifyEmail && <div className="text-xs text-cyan-400 mt-1 flex items-center gap-1"><Icon d={icons.mail} size={12} />{r.notifyEmail} notified</div>}
                </div>
              </div>
              <div className="flex gap-2">
                {r.photos?.length > 0 && <Badge label={`📷 ${r.photos.length}`} color="slate" />}
                {r.status === "Open" && <Btn size="sm" variant="secondary" onClick={() => close(r.id)}>Close</Btn>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Record Observation / Incident">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(types).map(t => (
              <button key={t} onClick={() => setForm({ ...form, type: t })}
                className={`py-3 rounded-xl border text-sm font-medium transition ${form.type === t ? `bg-${t === "Incident" ? "red" : t === "Near Miss" ? "amber" : "blue"}-900/50 border-${t === "Incident" ? "red" : t === "Near Miss" ? "amber" : "blue"}-500 text-${t === "Incident" ? "red" : t === "Near Miss" ? "amber" : "blue"}-300` : "border-slate-600 text-slate-400 hover:border-slate-500"}`}>
                {t}
              </button>
            ))}
          </div>
          <Input label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="Brief description" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} placeholder="Site / area" />
            <Input label="Reported By" value={form.reportedBy} onChange={v => setForm({ ...form, reportedBy: v })} placeholder="Name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Severity" value={form.severity} onChange={v => setForm({ ...form, severity: v })} options={["Low","Medium","High","Critical"]} />
            <Input label="Date" value={form.date} onChange={v => setForm({ ...form, date: v })} type="date" />
          </div>
          <Textarea label="Full Description" value={form.description} onChange={v => setForm({ ...form, description: v })} placeholder="Describe what happened, contributing factors…" rows={4} />
          <Input label="Notify Email(s)" value={form.notifyEmail} onChange={v => setForm({ ...form, notifyEmail: v })} placeholder="manager@company.com, safety@company.com" />
          <PhotoUpload photos={form.photos} onAdd={p => setForm({ ...form, photos: [...form.photos, p] })} />
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title || !form.description}>Submit Record</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE 3 — LEGAL REGISTER (AI-Powered)
// ════════════════════════════════════════════════════════════════════════════
const UK_LEGISLATION = [
  // ── GENERAL ──────────────────────────────────────────────────────────────
  { id:"l001", title:"Health and Safety at Work etc. Act", abbr:"HASAWA", year:1974, category:"General", description:"The primary piece of UK health and safety legislation, placing general duties on employers, employees and the self-employed.", requirement:"Employers must ensure, so far as is reasonably practicable, the health, safety and welfare of all employees and others affected by their work.", tags:["general","all workplaces","employer duty","employee duty"], link:"https://www.legislation.gov.uk/ukpga/1974/37" },
  { id:"l002", title:"Management of Health and Safety at Work Regulations", abbr:"MHSWR", year:1999, category:"General", description:"Requires employers to carry out risk assessments, implement preventive measures, appoint competent persons and provide health surveillance.", requirement:"Employers must carry out suitable and sufficient risk assessments and implement appropriate preventive and protective measures.", tags:["risk assessment","management","all workplaces","competent person"], link:"https://www.legislation.gov.uk/uksi/1999/3242" },
  { id:"l003", title:"Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", abbr:"RIDDOR", year:2013, category:"General", description:"Requires employers to report and record certain work-related accidents, diseases and dangerous occurrences to the HSE.", requirement:"Specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences must be reported to HSE within set timescales.", tags:["reporting","incidents","accidents","diseases"], link:"https://www.legislation.gov.uk/uksi/2013/1471" },
  { id:"l004", title:"Health and Safety (First-Aid) Regulations", abbr:"First Aid Regs", year:1981, category:"General", description:"Requires employers to make adequate first-aid provision for employees injured or taken ill at work.", requirement:"Employers must provide adequate and appropriate first-aid equipment, facilities and personnel for their workplace.", tags:["first aid","medical","all workplaces"], link:"https://www.legislation.gov.uk/uksi/1981/917" },
  { id:"l005", title:"Workplace (Health, Safety and Welfare) Regulations", abbr:"WHSWR", year:1992, category:"General", description:"Sets minimum standards for the working environment, including temperature, lighting, ventilation, sanitation, rest facilities and maintenance.", requirement:"Workplaces must be maintained to minimum standards covering environment, facilities and housekeeping.", tags:["workplace","welfare","facilities","environment"], link:"https://www.legislation.gov.uk/uksi/1992/3004" },
  { id:"l006", title:"Health and Safety (Display Screen Equipment) Regulations", abbr:"DSE Regs", year:1992, category:"General", description:"Protects workers who use computers, laptops, tablets and display screens regularly as a significant part of their work.", requirement:"Employers must carry out DSE workstation assessments, provide eye tests and ensure adequate breaks for DSE users.", tags:["display screen","computers","office","DSE","VDU"], link:"https://www.legislation.gov.uk/uksi/1992/2792" },
  { id:"l007", title:"Personal Protective Equipment at Work Regulations", abbr:"PPE Regs", year:2022, category:"General", description:"Requires employers to provide suitable PPE to employees exposed to risks that cannot be controlled by other means.", requirement:"Employers must carry out PPE assessments, provide suitable PPE free of charge and ensure it is properly used and maintained.", tags:["PPE","protective equipment","all workplaces"], link:"https://www.legislation.gov.uk/uksi/2022/8" },
  { id:"l008", title:"Employers' Liability (Compulsory Insurance) Act", abbr:"ELCI Act", year:1969, category:"General", description:"Requires employers to hold compulsory insurance to cover liability for employees injured or made ill at work.", requirement:"Employers must hold a minimum of £5 million employers' liability insurance and display the certificate.", tags:["insurance","liability","employer"], link:"https://www.legislation.gov.uk/ukpga/1969/57" },

  // ── FIRE ─────────────────────────────────────────────────────────────────
  { id:"l010", title:"Regulatory Reform (Fire Safety) Order", abbr:"RRFSO", year:2005, category:"Fire", description:"Consolidates UK fire safety legislation, placing duties on the 'responsible person' to carry out fire risk assessments and implement fire safety measures.", requirement:"A suitable and sufficient fire risk assessment must be carried out and fire precautions implemented and maintained.", tags:["fire","fire safety","risk assessment","emergency"], link:"https://www.legislation.gov.uk/uksi/2005/1541" },
  { id:"l011", title:"Fire Safety Act", abbr:"FSA", year:2021, category:"Fire", description:"Amends the RRFSO to clarify that it applies to the structure, external walls and flat entrance doors of multi-occupied residential buildings.", requirement:"Responsible persons for multi-occupied buildings must assess fire risk from structure, external walls and flat doors.", tags:["fire","residential","buildings","external walls"], link:"https://www.legislation.gov.uk/ukpga/2021/24" },
  { id:"l012", title:"Fire Safety (England) Regulations", abbr:"FSE Regs", year:2022, category:"Fire", description:"Introduces additional fire safety duties for responsible persons in multi-occupied residential buildings over 11 metres.", requirement:"Regular checks of communal fire doors, provision of fire safety information to residents, and annual checks of flat entrance doors.", tags:["fire","residential","high rise","fire doors"], link:"https://www.legislation.gov.uk/uksi/2022/547" },

  // ── COSHH ────────────────────────────────────────────────────────────────
  { id:"l020", title:"Control of Substances Hazardous to Health Regulations", abbr:"COSHH", year:2002, category:"COSHH", description:"Requires employers to control exposure to substances that may cause ill health, including chemicals, fumes, dusts, vapours, gases, mists, biological agents and nanotechnology.", requirement:"Employers must carry out COSHH assessments, implement control measures following the hierarchy of controls, and provide health surveillance where appropriate.", tags:["chemicals","substances","hazardous","COSHH","fumes","dust","biological"], link:"https://www.legislation.gov.uk/uksi/2002/2677" },
  { id:"l021", title:"Control of Asbestos Regulations", abbr:"CAR", year:2012, category:"COSHH", description:"Imposes duties to manage asbestos in non-domestic premises and controls work with asbestos.", requirement:"Duty holders must manage asbestos in premises; work with asbestos requires appropriate licence, training and controls.", tags:["asbestos","ACM","refurbishment","demolition","buildings"], link:"https://www.legislation.gov.uk/uksi/2012/632" },
  { id:"l022", title:"Control of Lead at Work Regulations", abbr:"CLAW", year:2002, category:"COSHH", description:"Requires employers to control exposure to lead and compounds of lead, including lead-containing dust and fumes.", requirement:"Employers must assess exposure to lead, implement control measures and provide health surveillance for employees at risk.", tags:["lead","CLAW","metals","smelting","batteries"], link:"https://www.legislation.gov.uk/uksi/2002/2676" },
  { id:"l023", title:"Ionising Radiations Regulations", abbr:"IRR17", year:2017, category:"COSHH", description:"Controls risks from ionising radiation at work, covering X-rays, gamma rays and radioactive substances.", requirement:"Employers must appoint an RPA, designate controlled/supervised areas, ensure classified workers wear dosimetry and comply with dose limits.", tags:["radiation","X-ray","radioactive","IRR","RPS","RPA"], link:"https://www.legislation.gov.uk/uksi/2017/1075" },
  { id:"l024", title:"Control of Pesticides Regulations", abbr:"COPR", year:1986, category:"COSHH", description:"Controls the approval, sale, supply, storage and use of pesticides in Great Britain.", requirement:"Only approved pesticides may be used and only by competent persons; storage and use must follow label and approval conditions.", tags:["pesticides","agriculture","horticulture","chemicals"], link:"https://www.legislation.gov.uk/uksi/1986/1510" },

  // ── WORK EQUIPMENT ───────────────────────────────────────────────────────
  { id:"l030", title:"Provision and Use of Work Equipment Regulations", abbr:"PUWER", year:1998, category:"Work Equipment", description:"Covers risks created by the use of equipment at work, requiring it to be suitable, maintained, inspected and used only by trained persons.", requirement:"Work equipment must be suitable for its intended use, maintained in good repair, subject to inspection and used by trained, competent persons.", tags:["work equipment","machinery","tools","PUWER","maintenance"], link:"https://www.legislation.gov.uk/uksi/1998/2306" },
  { id:"l031", title:"Lifting Operations and Lifting Equipment Regulations", abbr:"LOLER", year:1998, category:"Work Equipment", description:"Requires lifting equipment to be strong, stable and marked with safe working loads, and that lifting operations are properly planned by a competent person.", requirement:"Lifting equipment must be thoroughly examined at specified intervals (6 or 12 months), and all lifting operations planned by a competent person.", tags:["lifting","cranes","hoists","LOLER","thorough examination","SWL"], link:"https://www.legislation.gov.uk/uksi/1998/2307" },
  { id:"l032", title:"Pressure Systems Safety Regulations", abbr:"PSSR", year:2000, category:"Work Equipment", description:"Requires safe design, installation, maintenance and operation of pressure systems, including written schemes of examination.", requirement:"Pressure systems must be examined by a competent person under a written scheme; systems must not exceed design limits.", tags:["pressure","boilers","compressors","pipework","PSSR"], link:"https://www.legislation.gov.uk/uksi/2000/128" },
  { id:"l033", title:"Gas Safety (Installation and Use) Regulations", abbr:"GSIUR", year:1998, category:"Work Equipment", description:"Controls gas fitting work, maintenance of gas appliances and flues in residential and commercial premises.", requirement:"Gas work must be carried out by Gas Safe registered engineers; annual safety checks required on gas appliances in rented premises.", tags:["gas","boilers","appliances","Gas Safe"], link:"https://www.legislation.gov.uk/uksi/1998/2451" },
  { id:"l034", title:"Electricity at Work Regulations", abbr:"EaWR", year:1989, category:"Work Equipment", description:"Imposes duties to prevent danger from electrical systems at work, covering design, construction, maintenance and use.", requirement:"Electrical systems must be constructed, maintained and used to prevent danger; work on live systems is generally prohibited.", tags:["electricity","electrical","wiring","PAT","EaWR"], link:"https://www.legislation.gov.uk/uksi/1989/635" },

  // ── MANUAL HANDLING ──────────────────────────────────────────────────────
  { id:"l040", title:"Manual Handling Operations Regulations", abbr:"MHOR", year:1992, category:"Manual Handling", description:"Requires employers to avoid manual handling operations that involve risk of injury, or where unavoidable, assess and reduce the risk.", requirement:"Employers must avoid hazardous manual handling where reasonably practicable; where not, a suitable and sufficient assessment must be carried out.", tags:["manual handling","lifting","musculoskeletal","MSD"], link:"https://www.legislation.gov.uk/uksi/1992/2793" },

  // ── CONSTRUCTION ─────────────────────────────────────────────────────────
  { id:"l050", title:"Construction (Design and Management) Regulations", abbr:"CDM", year:2015, category:"Construction", description:"Integrates health and safety into the design and management of construction projects, assigning duties to clients, designers and contractors.", requirement:"A principal designer and principal contractor must be appointed on projects with more than one contractor; F10 notification required for notifiable projects.", tags:["construction","CDM","design","contractors","principal contractor","principal designer"], link:"https://www.legislation.gov.uk/uksi/2015/51" },
  { id:"l051", title:"Work at Height Regulations", abbr:"WAHR", year:2005, category:"Construction", description:"Aims to prevent death and injury from falls by requiring employers to plan, supervise and carry out work at height safely.", requirement:"Work at height must be avoided where possible; where not, it must be properly planned, supervised and carried out using appropriate equipment.", tags:["work at height","falls","scaffolding","ladders","MEWP","harness"], link:"https://www.legislation.gov.uk/uksi/2005/735" },
  { id:"l052", title:"Control of Vibration at Work Regulations", abbr:"CVR", year:2005, category:"Construction", description:"Protects workers from the risks of hand-arm vibration (HAV) and whole-body vibration (WBV).", requirement:"Employers must assess vibration exposure, ensure it does not exceed action or limit values, and provide health surveillance.", tags:["vibration","HAV","WBV","HAVS","hand arm","power tools"], link:"https://www.legislation.gov.uk/uksi/2005/1093" },
  { id:"l053", title:"Control of Noise at Work Regulations", abbr:"CNR", year:2005, category:"Construction", description:"Protects workers from hearing damage caused by noise, setting action values and a limit value for daily noise exposure.", requirement:"Where daily noise exposure reaches 80 dB(A), hearing protection zones must be identified; above 85 dB(A), protection must be worn.", tags:["noise","hearing","dB","hearing protection","loud"], link:"https://www.legislation.gov.uk/uksi/2005/1643" },
  { id:"l054", title:"Confined Spaces Regulations", abbr:"CSR", year:1997, category:"Construction", description:"Requires employers to avoid entry to confined spaces where possible, and where entry is necessary, to follow a safe system of work.", requirement:"A risk assessment must be completed; safe working procedures and emergency rescue arrangements must be in place before entry.", tags:["confined space","entry","manhole","vessel","sewer","tank"], link:"https://www.legislation.gov.uk/uksi/1997/1713" },
  { id:"l055", title:"Excavations (Construction Regulations)", abbr:"CDM Excavations", year:2015, category:"Construction", description:"Requires that excavations are constructed and maintained to prevent danger from collapse of sides, falls of persons or materials.", requirement:"Excavations must be inspected daily before work, be adequately supported where necessary, and no person may work in unsafe conditions.", tags:["excavation","trenches","ground","collapse","CDM"], link:"https://www.legislation.gov.uk/uksi/2015/51" },

  // ── ENVIRONMENT ──────────────────────────────────────────────────────────
  { id:"l060", title:"Environmental Protection Act", abbr:"EPA", year:1990, category:"Environment", description:"Primary legislation for pollution control and waste management in the UK, covering statutory nuisances and contaminated land.", requirement:"Duty of care applies to all who produce, import, carry, keep, treat or dispose of controlled waste.", tags:["waste","pollution","environment","duty of care"], link:"https://www.legislation.gov.uk/ukpga/1990/43" },
  { id:"l061", title:"Control of Pollution Act", abbr:"COPA", year:1974, category:"Environment", description:"Provides controls over waste disposal, water pollution, noise and atmospheric pollution.", requirement:"Waste disposal must be authorised; causing water pollution or statutory nuisance is an offence.", tags:["pollution","water","noise","waste","environment"], link:"https://www.legislation.gov.uk/ukpga/1974/40" },
  { id:"l062", title:"Hazardous Waste Regulations", abbr:"HWR", year:2005, category:"Environment", description:"Controls the management and movement of hazardous waste in England and Wales.", requirement:"Hazardous waste must be classified, consigned with a consignment note and disposed of through licensed facilities only.", tags:["hazardous waste","disposal","chemicals","environment"], link:"https://www.legislation.gov.uk/uksi/2005/894" },

  // ── TRANSPORT ────────────────────────────────────────────────────────────
  { id:"l070", title:"Road Traffic Act", abbr:"RTA", year:1988, category:"Transport", description:"Primary legislation governing road traffic, vehicle standards, driver licensing and offences including dangerous/careless driving.", requirement:"Employers must ensure drivers hold valid licences, vehicles are roadworthy and they have a fit-to-drive policy for work-related driving.", tags:["driving","vehicles","road","transport","fleet"], link:"https://www.legislation.gov.uk/ukpga/1988/52" },
  { id:"l071", title:"Carriage of Dangerous Goods and Use of Transportable Pressure Equipment Regulations", abbr:"CDG Regs", year:2009, category:"Transport", description:"Implements ADR requirements for the carriage of dangerous goods by road in the UK.", requirement:"Dangerous goods must be correctly classified, packaged, labelled and accompanied by the required documentation; drivers must hold ADR certificates.", tags:["dangerous goods","ADR","transport","chemicals","flammable"], link:"https://www.legislation.gov.uk/uksi/2009/1348" },

  // ── WELFARE / HR ─────────────────────────────────────────────────────────
  { id:"l080", title:"Working Time Regulations", abbr:"WTR", year:1998, category:"Welfare", description:"Implements maximum working hours, mandatory rest breaks, rest periods and minimum paid annual leave entitlement.", requirement:"Workers must not work more than 48 hours per week on average (unless they opt out); minimum 20 minutes rest in shifts over 6 hours.", tags:["working hours","rest breaks","fatigue","night work","shift work"], link:"https://www.legislation.gov.uk/uksi/1998/1833" },
  { id:"l081", title:"Health and Safety (Young Persons) Regulations", abbr:"Young Persons Regs", year:1997, category:"Welfare", description:"Extends risk assessment duties specifically to young persons under 18, taking account of their inexperience and immaturity.", requirement:"Before employing a young person, a specific risk assessment must be carried out considering their age, inexperience and any prohibited work.", tags:["young persons","under 18","apprentices","trainees"], link:"https://www.legislation.gov.uk/uksi/1997/135" },
  { id:"l082", title:"New and Expectant Mothers at Work Regulations", abbr:"Maternity Regs", year:1994, category:"Welfare", description:"Requires specific risk assessments for new and expectant mothers, with action to remove or reduce risks to them.", requirement:"Employers must carry out a specific risk assessment when notified an employee is pregnant and take appropriate action to protect her.", tags:["pregnant","maternity","new mothers","expectant"], link:"https://www.legislation.gov.uk/uksi/1994/2865" },
  { id:"l083", title:"Equality Act", abbr:"EA", year:2010, category:"Welfare", description:"Protects people from discrimination, harassment and victimisation in the workplace based on protected characteristics.", requirement:"Employers must not discriminate on grounds of protected characteristics and must make reasonable adjustments for disabled workers.", tags:["equality","disability","discrimination","reasonable adjustments"], link:"https://www.legislation.gov.uk/ukpga/2010/15" },

  // ── INDUSTRY SPECIFIC ────────────────────────────────────────────────────
  { id:"l090", title:"Control of Major Accident Hazards Regulations", abbr:"COMAH", year:2015, category:"Major Hazard", description:"Applies to establishments storing or using dangerous substances above threshold quantities, requiring prevention and mitigation of major accidents.", requirement:"Top-tier COMAH sites must prepare a safety report and emergency plans; lower-tier sites must notify and have a Major Accident Prevention Policy.", tags:["COMAH","major hazard","SEVESO","chemical","explosives","LPG"], link:"https://www.legislation.gov.uk/uksi/2015/483" },
  { id:"l091", title:"Dangerous Substances and Explosive Atmospheres Regulations", abbr:"DSEAR", year:2002, category:"Major Hazard", description:"Requires employers to control risks from fire, explosion and similar events arising from dangerous substances in the workplace.", requirement:"Employers must carry out a DSEAR risk assessment, classify zones where explosive atmospheres may occur, and control ignition sources.", tags:["DSEAR","explosive atmosphere","ATEX","flammable","zones","ignition"], link:"https://www.legislation.gov.uk/uksi/2002/2776" },
  { id:"l092", title:"Pipelines Safety Regulations", abbr:"PSR", year:1996, category:"Major Hazard", description:"Sets standards for the design, construction, operation and maintenance of major and local pipelines.", requirement:"Pipeline operators must prepare and implement pipeline emergency plans and carry out regular inspections and maintenance.", tags:["pipelines","gas","oil","major hazard"], link:"https://www.legislation.gov.uk/uksi/1996/825" },

  // ── AGRICULTURE ──────────────────────────────────────────────────────────
  { id:"l100", title:"Provision and Use of Work Equipment Regulations (Agriculture)", abbr:"PUWER (Agri)", year:1998, category:"Agriculture", description:"PUWER as applied to agricultural and forestry machinery, including tractors, power take-off shafts and other farm equipment.", requirement:"Agricultural equipment must be guarded, maintained, inspected and only operated by trained, competent persons.", tags:["agriculture","farming","tractors","PTO","forestry","machinery"], link:"https://www.legislation.gov.uk/uksi/1998/2306" },
  { id:"l101", title:"Agriculture (Tractor Cabs) Act", abbr:"Tractor Cabs Act", year:1967, category:"Agriculture", description:"Requires approved safety cabs or frames to be fitted to tractors used in agriculture.", requirement:"Tractors used in agriculture must be fitted with an approved safety cab or safety frame.", tags:["tractors","ROPS","agriculture","cab"], link:"https://www.legislation.gov.uk/ukpga/1967/56" },
];

const CATEGORIES = ["All", ...Array.from(new Set(UK_LEGISLATION.map(l => l.category))).sort()];

const LegalModule = () => {
  const [register, setRegister] = useStorage("legal_register_v2", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [addedIds, setAddedIds] = useState(() => new Set(register.map(r => r.sourceId)));
  const [detailItem, setDetailItem] = useState(null);
  const [auditModal, setAuditModal] = useState(false);

  // Keep addedIds in sync
  useEffect(() => {
    setAddedIds(new Set(register.map(r => r.sourceId)));
  }, [register]);

  const filtered = UK_LEGISLATION.filter(l => {
    const matchesCat = categoryFilter === "All" || l.category === categoryFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || l.title.toLowerCase().includes(q) || l.abbr.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) || l.tags.some(t => t.includes(q));
    return matchesCat && matchesSearch;
  });

  const addToRegister = (leg) => {
    if (addedIds.has(leg.id)) return;
    setRegister(prev => [...prev, { ...leg, sourceId: leg.id, id: uid(), status: "Compliant", addedDate: today(), notes: "" }]);
  };

  const removeFromRegister = (sourceId) => {
    setRegister(prev => prev.filter(r => r.sourceId !== sourceId));
  };

  const toggleStatus = (id) => {
    setRegister(prev => prev.map(r => r.id === id ? { ...r, status: r.status === "Compliant" ? "Non-Compliant" : r.status === "Non-Compliant" ? "Under Review" : "Compliant" } : r));
  };

  const updateNotes = (id, notes) => {
    setRegister(prev => prev.map(r => r.id === id ? { ...r, notes } : r));
  };

  const regCategories = [...new Set(register.map(r => r.category))].sort();
  const compliant = register.filter(r => r.status === "Compliant").length;
  const nonCompliant = register.filter(r => r.status === "Non-Compliant").length;
  const underReview = register.filter(r => r.status === "Under Review").length;
  const compliancePct = register.length > 0 ? Math.round((compliant / register.length) * 100) : 0;

  const statusColor = { "Compliant": "green", "Non-Compliant": "red", "Under Review": "amber" };
  const categoryColors = { General:"cyan", Fire:"red", COSHH:"purple", "Work Equipment":"amber", "Manual Handling":"blue", Construction:"amber", Environment:"green", Transport:"slate", Welfare:"blue", "Major Hazard":"red", Agriculture:"green" };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Legal Register</h2>
        {register.length > 0 && (
          <Btn variant="secondary" onClick={() => setAuditModal(true)}>
            <Icon d={icons.audit} size={16} />Compliance Overview
          </Btn>
        )}
      </div>

      {/* Stats */}
      {register.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="In Register" value={register.length} color="cyan" />
          <StatCard label="Compliant" value={compliant} color="emerald" />
          <StatCard label="Non-Compliant" value={nonCompliant} color="red" />
          <StatCard label="Under Review" value={underReview} color="amber" />
        </div>
      )}

      {/* Your Register */}
      {register.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Register ({register.length} items)</h3>
            <div className={`text-sm font-bold ${compliancePct >= 80 ? "text-emerald-400" : compliancePct >= 60 ? "text-amber-400" : "text-red-400"}`}>{compliancePct}% compliant</div>
          </div>
          {regCategories.map(cat => (
            <div key={cat} className="space-y-1.5">
              <div className="text-xs font-medium text-slate-500 pl-1">{cat}</div>
              {register.filter(r => r.category === cat).map(item => (
                <Card key={item.id} className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-100 text-sm">{item.title}</span>
                        <Badge label={item.abbr} color="slate" />
                        <Badge label={item.year} color="slate" />
                        <Badge label={item.status} color={statusColor[item.status]} />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{item.requirement}</p>
                      {item.notes && <p className="text-xs text-cyan-400/80 mt-1 italic">Note: {item.notes}</p>}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Btn size="sm" variant={item.status === "Compliant" ? "secondary" : item.status === "Non-Compliant" ? "danger" : "amber"}
                        onClick={() => toggleStatus(item.id)}>
                        {item.status === "Compliant" ? "Flag" : item.status === "Non-Compliant" ? "Review" : "✓ Clear"}
                      </Btn>
                      <button onClick={() => removeFromRegister(item.sourceId)} className="text-slate-600 hover:text-red-400 transition p-1">
                        <Icon d={icons.trash} size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-slate-700/40">
                    <input value={item.notes || ""} onChange={e => updateNotes(item.id, e.target.value)}
                      placeholder="Add compliance notes, evidence references, action owner…"
                      className="w-full bg-transparent text-xs text-slate-400 placeholder-slate-600 focus:outline-none focus:text-slate-300" />
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Legislation database */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          UK H&S Legislation Database — {UK_LEGISLATION.length} Acts & Regulations
        </h3>

        {/* Search + filter */}
        <div className="flex gap-2 mb-3 flex-col sm:flex-row">
          <div className="flex items-center gap-2 flex-1 bg-slate-900/70 border border-slate-600/50 rounded-lg px-3 py-2">
            <Icon d={icons.search} size={16} color="#64748b" />
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search legislation, acronym, topic…"
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none" />
            {searchTerm && <button onClick={() => setSearchTerm("")} className="text-slate-500 hover:text-slate-300"><Icon d={icons.x} size={14} /></button>}
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="bg-slate-900/70 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/70 flex-shrink-0">
            {CATEGORIES.map(c => <option key={c} value={c}>{c} {c === "All" ? `(${UK_LEGISLATION.length})` : `(${UK_LEGISLATION.filter(l => l.category === c).length})`}</option>)}
          </select>
        </div>

        {filtered.length === 0 && (
          <Card><p className="text-slate-500 text-sm text-center py-4">No legislation found matching your search.</p></Card>
        )}

        <div className="space-y-2">
          {filtered.map(leg => {
            const inReg = addedIds.has(leg.id);
            return (
              <Card key={leg.id} className={`transition-all ${inReg ? "opacity-60 border-slate-700/30" : "hover:border-slate-600"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setDetailItem(detailItem?.id === leg.id ? null : leg)}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-100 text-sm">{leg.title}</span>
                      <Badge label={leg.abbr} color={categoryColors[leg.category] || "slate"} />
                      <Badge label={leg.year} color="slate" />
                      {inReg && <Badge label="In Register" color="green" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{leg.description}</p>
                    {detailItem?.id === leg.id && (
                      <div className="mt-3 space-y-2 border-t border-slate-700/50 pt-3">
                        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Key Requirement</div>
                        <p className="text-xs text-cyan-400">{leg.requirement}</p>
                        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-2">Relevant to</div>
                        <div className="flex flex-wrap gap-1">
                          {leg.tags.map(t => <span key={t} className="text-xs bg-slate-700/40 text-slate-400 px-2 py-0.5 rounded">{t}</span>)}
                        </div>
                        <a href={leg.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline mt-1">
                          <Icon d={icons.link} size={12} />View on legislation.gov.uk
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {inReg ? (
                      <Btn size="sm" variant="secondary" onClick={() => removeFromRegister(leg.id)}>
                        <Icon d={icons.x} size={14} />Remove
                      </Btn>
                    ) : (
                      <Btn size="sm" onClick={() => addToRegister(leg)}>
                        <Icon d={icons.plus} size={14} />Add
                      </Btn>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Compliance overview modal */}
      <Modal open={auditModal} onClose={() => setAuditModal(false)} title="Compliance Overview" width="max-w-2xl">
        <div className="space-y-4">
          <div className={`text-center py-6 rounded-xl ${compliancePct >= 80 ? "bg-emerald-900/20 border border-emerald-700/30" : compliancePct >= 60 ? "bg-amber-900/20 border border-amber-700/30" : "bg-red-900/20 border border-red-700/30"}`}>
            <div className={`text-5xl font-bold ${compliancePct >= 80 ? "text-emerald-400" : compliancePct >= 60 ? "text-amber-400" : "text-red-400"}`}>{compliancePct}%</div>
            <div className="text-slate-400 text-sm mt-1">Overall compliance rating</div>
            <div className="text-slate-500 text-xs mt-0.5">{register.length} legislation items tracked</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center bg-emerald-900/20 rounded-xl p-3 border border-emerald-700/30">
              <div className="text-2xl font-bold text-emerald-400">{compliant}</div>
              <div className="text-xs text-slate-400 mt-1">Compliant</div>
            </div>
            <div className="text-center bg-amber-900/20 rounded-xl p-3 border border-amber-700/30">
              <div className="text-2xl font-bold text-amber-400">{underReview}</div>
              <div className="text-xs text-slate-400 mt-1">Under Review</div>
            </div>
            <div className="text-center bg-red-900/20 rounded-xl p-3 border border-red-700/30">
              <div className="text-2xl font-bold text-red-400">{nonCompliant}</div>
              <div className="text-xs text-slate-400 mt-1">Non-Compliant</div>
            </div>
          </div>
          {nonCompliant > 0 && (
            <div>
              <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Non-Compliant Items — Action Required</div>
              {register.filter(r => r.status === "Non-Compliant").map(r => (
                <div key={r.id} className="flex items-start justify-between py-2 border-b border-slate-700/50 gap-2">
                  <div>
                    <div className="text-sm text-slate-200">{r.title} <span className="text-slate-500 text-xs">({r.abbr})</span></div>
                    {r.notes && <div className="text-xs text-slate-500 mt-0.5">{r.notes}</div>}
                  </div>
                  <Btn size="sm" variant="secondary" onClick={() => toggleStatus(r.id)}>Mark Review</Btn>
                </div>
              ))}
            </div>
          )}
          {underReview > 0 && (
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Under Review</div>
              {register.filter(r => r.status === "Under Review").map(r => (
                <div key={r.id} className="flex items-start justify-between py-2 border-b border-slate-700/50 gap-2">
                  <div className="text-sm text-slate-300">{r.title} <span className="text-slate-500 text-xs">({r.abbr})</span></div>
                  <Btn size="sm" onClick={() => { toggleStatus(r.id); }} >Mark Compliant</Btn>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs text-slate-500 text-center pt-2">Last updated: {today()} · Use the Flag button on each item to change its compliance status</div>
        </div>
      </Modal>

      {/* Detail modal for a specific item */}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE 4 — AUDITS & INSPECTIONS
// ════════════════════════════════════════════════════════════════════════════
const AuditModule = () => {
  const [templates, setTemplates] = useStorage("audit_templates", []);
  const [audits, setAudits] = useStorage("completed_audits", []);
  const [tModal, setTModal] = useState(false);
  const [aModal, setAModal] = useState(null);
  const [tForm, setTForm] = useState({ name: "", category: "", questions: [] });
  const [newQ, setNewQ] = useState("");
  const [activeAudit, setActiveAudit] = useState(null);
  const [aAnswers, setAAnswers] = useState({});
  const [aSig, setASig] = useState("");
  const [aCSig, setACSig] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [aPhotos, setAPhotos] = useState([]);

  const addQ = () => { if (!newQ.trim()) return; setTForm({ ...tForm, questions: [...tForm.questions, newQ] }); setNewQ(""); };
  const saveTemplate = () => {
    if (!tForm.name || tForm.questions.length === 0) return;
    setTemplates([...templates, { ...tForm, id: uid() }]);
    setTForm({ name: "", category: "", questions: [] });
    setTModal(false);
  };

  const startAudit = (t) => { setActiveAudit(t); setAAnswers({}); setASig(""); setACSig(""); setAPhotos([]); setAModal(true); };
  const completeAudit = () => {
    if (!aSig || !aCSig) return alert("Both signatures required");
    const score = Object.values(aAnswers).filter(a => a === "yes").length;
    const total = activeAudit.questions.length;
    setAudits([...audits, { id: uid(), template: activeAudit.name, date: today(), answers: aAnswers, score, total, sig: aSig, csig: aCSig, emailTo, photos: aPhotos }]);
    setAModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Audits & Inspections</h2>
        <Btn onClick={() => setTModal(true)}><Icon d={icons.plus} size={16} />New Template</Btn>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Templates" value={templates.length} color="cyan" />
        <StatCard label="Completed" value={audits.length} color="emerald" />
        <StatCard label="Avg Score" value={audits.length ? Math.round(audits.reduce((a, b) => a + (b.score / b.total) * 100, 0) / audits.length) + "%" : "—"} color="amber" />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Audit Templates</h3>
        <div className="space-y-2">
          {templates.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-4">No templates yet. Create one to start auditing.</p></Card>}
          {templates.map(t => (
            <Card key={t.id} className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-100">{t.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.questions.length} questions {t.category && `• ${t.category}`}</div>
              </div>
              <Btn size="sm" onClick={() => startAudit(t)}>Start Audit</Btn>
            </Card>
          ))}
        </div>
      </div>

      {audits.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recent Audits</h3>
          <div className="space-y-2">
            {audits.slice().reverse().slice(0, 10).map(a => (
              <Card key={a.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-100">{a.template}</div>
                  <div className="text-xs text-slate-400">{a.date} • Score: {a.score}/{a.total}</div>
                  <div className="flex gap-2 mt-1">
                    <Badge label={`${Math.round((a.score / a.total) * 100)}%`} color={a.score / a.total >= 0.8 ? "green" : a.score / a.total >= 0.6 ? "amber" : "red"} />
                    <Badge label="✓ Signed" color="slate" />
                    {a.emailTo && <Badge label={`📧 ${a.emailTo}`} color="slate" />}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Modal open={tModal} onClose={() => setTModal(false)} title="Create Audit Template">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Template Name" value={tForm.name} onChange={v => setTForm({ ...tForm, name: v })} placeholder="e.g. Weekly Site Inspection" />
            <Select label="Category" value={tForm.category} onChange={v => setTForm({ ...tForm, category: v })} options={["Safety","Fire","Environment","Equipment","General"]} />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Questions</label>
            <div className="mt-2 space-y-1.5">
              {tForm.questions.map((q, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-900/50 rounded-lg px-3 py-2 text-sm text-slate-300">
                  <span className="text-slate-500 text-xs">{i + 1}.</span> {q}
                  <button onClick={() => setTForm({ ...tForm, questions: tForm.questions.filter((_, j) => j !== i) })} className="ml-auto text-slate-600 hover:text-red-400"><Icon d={icons.x} size={14} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={newQ} onChange={e => setNewQ(e.target.value)} onKeyDown={e => e.key === "Enter" && addQ()}
                placeholder="Add question…" className="flex-1 bg-slate-900/70 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/70" />
              <Btn size="sm" onClick={addQ}><Icon d={icons.plus} size={14} /></Btn>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setTModal(false)}>Cancel</Btn>
            <Btn onClick={saveTemplate} disabled={!tForm.name || tForm.questions.length === 0}>Save Template</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={aModal} onClose={() => setAModal(false)} title={`Audit: ${activeAudit?.name}`} width="max-w-3xl">
        {activeAudit && (
          <div className="space-y-4">
            <div className="space-y-3">
              {activeAudit.questions.map((q, i) => (
                <div key={i} className="bg-slate-900/50 rounded-xl p-4">
                  <div className="text-sm text-slate-200 mb-3">{i + 1}. {q}</div>
                  <div className="flex gap-2">
                    {["yes", "no", "n/a"].map(a => (
                      <button key={a} onClick={() => setAAnswers({ ...aAnswers, [i]: a })}
                        className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition capitalize ${aAnswers[i] === a ? a === "yes" ? "bg-emerald-500 border-emerald-400 text-white" : a === "no" ? "bg-red-500 border-red-400 text-white" : "bg-slate-600 border-slate-500 text-white" : "border-slate-600 text-slate-400 hover:border-slate-500"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <PhotoUpload photos={aPhotos} onAdd={p => setAPhotos([...aPhotos, p])} />
            <Input label="Email completed audit to" value={emailTo} onChange={setEmailTo} placeholder="auditor@company.com" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Auditor Signature" value={aSig} onChange={setASig} placeholder="Type full name" />
              <Input label="Counter Signature" value={aCSig} onChange={setACSig} placeholder="Type full name" />
            </div>
            {Object.keys(aAnswers).length > 0 && (
              <div className="bg-slate-900/50 rounded-xl p-3 text-sm text-slate-300">
                Score: <strong className="text-cyan-400">{Object.values(aAnswers).filter(a => a === "yes").length}/{activeAudit.questions.length}</strong> ({Math.round(Object.values(aAnswers).filter(a => a === "yes").length / activeAudit.questions.length * 100)}%)
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <Btn variant="secondary" onClick={() => setAModal(false)}>Cancel</Btn>
              <Btn onClick={completeAudit} disabled={!aSig || !aCSig}>Complete & Submit</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE 5 — ASSET MANAGEMENT
// ════════════════════════════════════════════════════════════════════════════
const AssetModule = () => {
  const [assets, setAssets] = useStorage("assets", []);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", serial: "", location: "", purchaseDate: today(), nextService: "", nextCalibration: "", loler: false, puwer: false, lolerDate: "", puwerDate: "", notes: "" });

  const save = () => {
    if (!form.name) return;
    setAssets([...assets, { ...form, id: uid(), status: "Active" }]);
    setForm({ name: "", category: "", serial: "", location: "", purchaseDate: today(), nextService: "", nextCalibration: "", loler: false, puwer: false, lolerDate: "", puwerDate: "", notes: "" });
    setModal(false);
  };

  const getStatus = (asset) => {
    const checks = [asset.nextService, asset.nextCalibration, asset.loler && asset.lolerDate, asset.puwer && asset.puwerDate].filter(Boolean);
    const overdue = checks.some(d => d && daysFrom(d) < 0);
    const dueSoon = checks.some(d => d && daysFrom(d) <= 30);
    return overdue ? "Overdue" : dueSoon ? "Due Soon" : "OK";
  };

  const overdueCount = assets.filter(a => getStatus(a) === "Overdue").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Asset Management</h2>
        <Btn onClick={() => setModal(true)}><Icon d={icons.plus} size={16} />Add Asset</Btn>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Assets" value={assets.length} color="cyan" icon={icons.asset} />
        <StatCard label="Overdue Actions" value={overdueCount} color="red" icon={icons.alert} />
        <StatCard label="LOLER Items" value={assets.filter(a => a.loler).length} color="amber" icon={icons.wrench} />
        <StatCard label="PUWER Items" value={assets.filter(a => a.puwer).length} color="purple" icon={icons.wrench} />
      </div>

      <div className="space-y-2">
        {assets.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-6">No assets registered. Add your equipment to track maintenance.</p></Card>}
        {assets.map(a => {
          const st = getStatus(a);
          return (
            <Card key={a.id}>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-700/60 flex items-center justify-center flex-shrink-0">
                    <Icon d={icons.wrench} size={18} color="#94a3b8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-100">{a.name}</span>
                      <Badge label={st} color={st === "Overdue" ? "red" : st === "Due Soon" ? "amber" : "green"} />
                      {a.loler && <Badge label="LOLER" color="amber" />}
                      {a.puwer && <Badge label="PUWER" color="purple" />}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{a.category} • {a.serial || "No serial"} • {a.location || "No location"}</div>
                    <div className="flex gap-3 mt-2 flex-wrap text-xs">
                      {a.nextService && <span className={`${daysFrom(a.nextService) < 0 ? "text-red-400" : daysFrom(a.nextService) <= 30 ? "text-amber-400" : "text-slate-400"}`}>🔧 Service: {a.nextService} ({daysFrom(a.nextService)}d)</span>}
                      {a.nextCalibration && <span className={`${daysFrom(a.nextCalibration) < 0 ? "text-red-400" : "text-slate-400"}`}>📐 Cal: {a.nextCalibration}</span>}
                      {a.loler && a.lolerDate && <span className={`${daysFrom(a.lolerDate) < 0 ? "text-red-400" : "text-amber-400"}`}>⚖ LOLER: {a.lolerDate}</span>}
                      {a.puwer && a.puwerDate && <span className={`${daysFrom(a.puwerDate) < 0 ? "text-red-400" : "text-purple-400"}`}>⚙ PUWER: {a.puwerDate}</span>}
                    </div>
                  </div>
                </div>
                <button onClick={() => setAssets(assets.filter(x => x.id !== a.id))} className="text-slate-600 hover:text-red-400 transition">
                  <Icon d={icons.trash} size={16} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Register Asset">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Asset Name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="e.g. Overhead Crane #1" required />
            <Select label="Category" value={form.category} onChange={v => setForm({ ...form, category: v })} options={["Lifting","Machinery","Electrical","Vehicle","Pressure","Hand Tool","Other"]} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Serial Number" value={form.serial} onChange={v => setForm({ ...form, serial: v })} placeholder="SN-12345" />
            <Input label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} placeholder="Workshop A" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Next Service Date" value={form.nextService} onChange={v => setForm({ ...form, nextService: v })} type="date" />
            <Input label="Next Calibration Date" value={form.nextCalibration} onChange={v => setForm({ ...form, nextCalibration: v })} type="date" />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.loler} onChange={e => setForm({ ...form, loler: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
              <span className="text-sm text-slate-300">LOLER applicable</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.puwer} onChange={e => setForm({ ...form, puwer: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
              <span className="text-sm text-slate-300">PUWER applicable</span>
            </label>
          </div>
          {form.loler && <Input label="Next LOLER Inspection" value={form.lolerDate} onChange={v => setForm({ ...form, lolerDate: v })} type="date" />}
          {form.puwer && <Input label="Next PUWER Inspection" value={form.puwerDate} onChange={v => setForm({ ...form, puwerDate: v })} type="date" />}
          <Textarea label="Notes / Manufacturer Instructions" value={form.notes} onChange={v => setForm({ ...form, notes: v })} rows={2} />
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.name}>Register Asset</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE 6 — TRAINING & COMPETENCIES
// ════════════════════════════════════════════════════════════════════════════
const TrainingModule = () => {
  const [courses, setCourses] = useStorage("training_courses", []);
  const [certs, setCerts] = useStorage("training_certs", []);
  const [cModal, setCModal] = useState(false);
  const [certModal, setCertModal] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [courseForm, setCourseForm] = useState({ title: "", type: "Toolbox Talk", duration: "", assignedTo: "", url: "", description: "" });
  const [certForm, setCertForm] = useState({ employee: "", cert: "", issuer: "", issued: today(), expiry: "", category: "" });

  const saveCourse = () => {
    if (!courseForm.title) return;
    setCourses([...courses, { ...courseForm, id: uid(), status: "Assigned", completedBy: [] }]);
    setCourseForm({ title: "", type: "Toolbox Talk", duration: "", assignedTo: "", url: "", description: "" });
    setCModal(false);
  };

  const complete = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: "Completed", completedDate: today() } : c));
  };

  const saveCert = () => {
    if (!certForm.employee || !certForm.cert) return;
    setCerts([...certs, { ...certForm, id: uid() }]);
    setCertForm({ employee: "", cert: "", issuer: "", issued: today(), expiry: "", category: "" });
    setCertModal(false);
  };

  const expiring = certs.filter(c => c.expiry && daysFrom(c.expiry) <= 30 && daysFrom(c.expiry) >= 0).length;
  const expired = certs.filter(c => c.expiry && daysFrom(c.expiry) < 0).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Training & Competencies</h2>
        <div className="flex gap-2">
          <Btn variant="secondary" size="sm" onClick={() => setCertModal(true)}>+ Certificate</Btn>
          <Btn onClick={() => setCModal(true)}><Icon d={icons.plus} size={16} />Add Course</Btn>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Courses" value={courses.length} color="cyan" />
        <StatCard label="Completed" value={courses.filter(c => c.status === "Completed").length} color="emerald" />
        <StatCard label="Certs Expiring Soon" value={expiring} color="amber" />
        <StatCard label="Certs Expired" value={expired} color="red" />
      </div>

      {/* User search */}
      <Card className="border-slate-700/40">
        <div className="flex items-center gap-3">
          <Icon d={icons.search} size={18} color="#64748b" />
          <input
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            placeholder="Search by employee name to view their training profile…"
            className="flex-1 bg-transparent text-slate-200 text-sm placeholder-slate-500 focus:outline-none"
          />
          {userSearch && <button onClick={() => setUserSearch("")} className="text-slate-500 hover:text-slate-300"><Icon d={icons.x} size={16} /></button>}
        </div>
        {userSearch.trim() && (() => {
          const q = userSearch.trim().toLowerCase();
          const userCourses = courses.filter(c => (c.assignedTo || "").toLowerCase().includes(q));
          const userCerts = certs.filter(c => (c.employee || "").toLowerCase().includes(q));
          const names = [...new Set([...userCourses.map(c => c.assignedTo), ...userCerts.map(c => c.employee)].filter(Boolean).filter(n => n.toLowerCase().includes(q)))];
          if (names.length === 0) return <div className="mt-3 text-xs text-slate-500">No training records found for "{userSearch}"</div>;
          return (
            <div className="mt-4 space-y-4">
              {names.map(name => {
                const nc = courses.filter(c => (c.assignedTo || "").toLowerCase() === name.toLowerCase());
                const uc = certs.filter(c => (c.employee || "").toLowerCase() === name.toLowerCase());
                const expiredC = uc.filter(c => c.expiry && daysFrom(c.expiry) < 0);
                const expiringC = uc.filter(c => c.expiry && daysFrom(c.expiry) >= 0 && daysFrom(c.expiry) <= 30);
                return (
                  <div key={name} className="bg-slate-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon d={icons.user} size={16} color="#22d3ee" />
                      <span className="font-semibold text-slate-100">{name}</span>
                      {expiredC.length > 0 && <Badge label={expiredC.length + " expired"} color="red" />}
                      {expiringC.length > 0 && <Badge label={expiringC.length + " expiring"} color="amber" />}
                    </div>
                    {nc.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs text-slate-500 uppercase mb-1.5">Courses ({nc.length})</div>
                        {nc.map(c => (
                          <div key={c.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
                            <span className="text-slate-300">{c.title}</span>
                            <Badge label={c.status} color={c.status === "Completed" ? "green" : "slate"} />
                          </div>
                        ))}
                      </div>
                    )}
                    {uc.length > 0 && (
                      <div>
                        <div className="text-xs text-slate-500 uppercase mb-1.5">Certificates ({uc.length})</div>
                        {uc.map(c => {
                          const days = c.expiry ? daysFrom(c.expiry) : null;
                          return (
                            <div key={c.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
                              <span className="text-slate-300">{c.cert}</span>
                              <Badge label={days === null ? "No expiry" : days < 0 ? "EXPIRED" : days <= 30 ? days + "d left" : "Valid"} color={days === null ? "slate" : days < 0 ? "red" : days <= 30 ? "amber" : "green"} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </Card>

      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Learning Library</h3>
        <div className="space-y-2">
          {courses.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-4">No courses yet.</p></Card>}
          {courses.map(c => (
            <Card key={c.id} className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-700/30 flex items-center justify-center flex-shrink-0">
                  <Icon d={icons.training} size={18} color="#60a5fa" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{c.title}</span>
                    <Badge label={c.type} color="blue" />
                    <Badge label={c.status} color={c.status === "Completed" ? "green" : "slate"} />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.assignedTo || "All staff"} {c.duration && `• ${c.duration}`}</div>
                  {c.description && <p className="text-xs text-slate-500 mt-1">{c.description}</p>}
                  {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline mt-1 flex items-center gap-1"><Icon d={icons.link} size={12} />Open Resource</a>}
                </div>
              </div>
              {c.status !== "Completed" && <Btn size="sm" variant="secondary" onClick={() => complete(c.id)}>Mark Complete</Btn>}
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Competency Matrix / Certificates</h3>
        <div className="space-y-2">
          {certs.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-4">No certificates stored.</p></Card>}
          {certs.map(c => {
            const days = c.expiry ? daysFrom(c.expiry) : null;
            return (
              <Card key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{c.cert}</span>
                    {days !== null && <Badge label={days < 0 ? "EXPIRED" : days <= 30 ? `Expires ${days}d` : "Valid"} color={days < 0 ? "red" : days <= 30 ? "amber" : "green"} />}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.employee} • {c.issuer || "Unknown issuer"}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Issued: {c.issued} {c.expiry && `• Expires: ${c.expiry}`}</div>
                </div>
                <button onClick={() => setCerts(certs.filter(x => x.id !== c.id))} className="text-slate-600 hover:text-red-400 transition">
                  <Icon d={icons.trash} size={16} />
                </button>
              </Card>
            );
          })}
        </div>
      </div>

      <Modal open={cModal} onClose={() => setCModal(false)} title="Add Course / Learning Resource">
        <div className="space-y-4">
          <Input label="Title" value={courseForm.title} onChange={v => setCourseForm({ ...courseForm, title: v })} placeholder="e.g. Manual Handling Awareness" required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Type" value={courseForm.type} onChange={v => setCourseForm({ ...courseForm, type: v })} options={["Toolbox Talk","Video","E-Learning","Classroom","Workshop","Assessment"]} />
            <Input label="Duration" value={courseForm.duration} onChange={v => setCourseForm({ ...courseForm, duration: v })} placeholder="e.g. 30 mins" />
          </div>
          <Input label="Assign To" value={courseForm.assignedTo} onChange={v => setCourseForm({ ...courseForm, assignedTo: v })} placeholder="Employee name or 'All staff'" />
          <Input label="Resource URL" value={courseForm.url} onChange={v => setCourseForm({ ...courseForm, url: v })} placeholder="https://…" />
          <Textarea label="Description" value={courseForm.description} onChange={v => setCourseForm({ ...courseForm, description: v })} rows={2} />
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setCModal(false)}>Cancel</Btn>
            <Btn onClick={saveCourse} disabled={!courseForm.title}>Add Course</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={certModal} onClose={() => setCertModal(false)} title="Add Certificate / Qualification">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Employee Name" value={certForm.employee} onChange={v => setCertForm({ ...certForm, employee: v })} placeholder="Full name" required />
            <Input label="Certificate / Qualification" value={certForm.cert} onChange={v => setCertForm({ ...certForm, cert: v })} placeholder="e.g. IOSH Managing Safely" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Issuing Body" value={certForm.issuer} onChange={v => setCertForm({ ...certForm, issuer: v })} placeholder="e.g. IOSH, NEBOSH" />
            <Select label="Category" value={certForm.category} onChange={v => setCertForm({ ...certForm, category: v })} options={["Health & Safety","First Aid","Fire","Manual Handling","Lifting","Machinery","Environmental","Other"]} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Issue Date" value={certForm.issued} onChange={v => setCertForm({ ...certForm, issued: v })} type="date" />
            <Input label="Expiry Date" value={certForm.expiry} onChange={v => setCertForm({ ...certForm, expiry: v })} type="date" />
          </div>
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setCertModal(false)}>Cancel</Btn>
            <Btn onClick={saveCert} disabled={!certForm.employee || !certForm.cert}>Save Certificate</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE 7 — INDUCTIONS
// ════════════════════════════════════════════════════════════════════════════
const InductionModule = () => {
  const [inductions, setInductions] = useStorage("inductions", []);
  const [assignments, setAssignments] = useStorage("induction_assignments", []);
  const [iModal, setIModal] = useState(false);
  const [aModal, setAModal] = useState(false);
  const [activeInduction, setActiveInduction] = useState(null);
  const [form, setForm] = useState({ title: "", passMark: 80, sections: [], questions: [] });
  const [newSection, setNewSection] = useState("");
  const [newQ, setNewQ] = useState({ q: "", a: "", options: "" });
  const [assignEmail, setAssignEmail] = useState("");
  const [assignName, setAssignName] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizModal, setQuizModal] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const save = () => {
    if (!form.title) return;
    setInductions([...inductions, { ...form, id: uid() }]);
    setForm({ title: "", passMark: 80, sections: [], questions: [] });
    setIModal(false);
  };

  const assign = (ind) => { setActiveInduction(ind); setAssignEmail(""); setAssignName(""); setAModal(true); };
  const doAssign = () => {
    if (!assignEmail) return;
    setAssignments([...assignments, { id: uid(), inductionId: activeInduction.id, inductionTitle: activeInduction.title, email: assignEmail, name: assignName, status: "Pending", assigned: today() }]);
    setAModal(false);
  };

  const startQuiz = (ind) => { setQuizModal(ind); setQuizAnswers({}); setSubmitted(false); };
  const submitQuiz = (ind) => {
    const correct = ind.questions.filter((q, i) => quizAnswers[i] === q.a).length;
    const pct = Math.round(correct / ind.questions.length * 100);
    setSubmitted({ correct, total: ind.questions.length, pct, passed: pct >= ind.passMark });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Inductions</h2>
        <Btn onClick={() => setIModal(true)}><Icon d={icons.plus} size={16} />New Induction</Btn>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Inductions" value={inductions.length} color="cyan" />
        <StatCard label="Assigned" value={assignments.length} color="blue" />
        <StatCard label="Completed" value={assignments.filter(a => a.status === "Completed").length} color="emerald" />
      </div>

      <div className="space-y-2">
        {inductions.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-6">No inductions built yet.</p></Card>}
        {inductions.map(ind => {
          const assigned = assignments.filter(a => a.inductionId === ind.id);
          const done = assigned.filter(a => a.status === "Completed");
          return (
            <Card key={ind.id}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-100">{ind.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{ind.sections?.length || 0} sections • {ind.questions?.length || 0} questions • Pass mark: {ind.passMark}%</div>
                  <div className="text-xs text-slate-500 mt-1">Assigned: {assigned.length} • Completed: {done.length}</div>
                </div>
                <div className="flex gap-2">
                  <Btn size="sm" variant="secondary" onClick={() => startQuiz(ind)}>Preview</Btn>
                  <Btn size="sm" onClick={() => assign(ind)}>Assign</Btn>
                </div>
              </div>
              {assigned.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700 space-y-1.5">
                  {assigned.map(a => (
                    <div key={a.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">{a.name || a.email}</span>
                      <div className="flex items-center gap-2">
                        <Badge label={a.status} color={a.status === "Completed" ? "green" : "slate"} />
                        {a.status === "Pending" && <button onClick={() => setAssignments(assignments.map(x => x.id === a.id ? { ...x, status: "Completed", completedDate: today() } : x))} className="text-cyan-400 hover:underline text-xs">Mark complete</button>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Modal open={iModal} onClose={() => setIModal(false)} title="Build Induction" width="max-w-3xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Induction Title" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="e.g. Site Induction" required />
            <Input label="Pass Mark (%)" value={form.passMark} onChange={v => setForm({ ...form, passMark: Number(v) })} type="number" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Content Sections</label>
            <div className="mt-2 space-y-1">
              {form.sections.map((s, i) => <div key={i} className="text-sm text-slate-300 bg-slate-900/50 px-3 py-2 rounded-lg">📋 {s}</div>)}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={newSection} onChange={e => setNewSection(e.target.value)} placeholder="Add section topic…" className="flex-1 bg-slate-900/70 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/70" />
              <Btn size="sm" onClick={() => { if (newSection) { setForm({ ...form, sections: [...form.sections, newSection] }); setNewSection(""); } }}>+</Btn>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Quiz Questions</label>
            {form.questions.map((q, i) => (
              <div key={i} className="bg-slate-900/50 rounded-lg px-3 py-2 mt-1 text-xs text-slate-300">Q: {q.q} • Correct: {q.a}</div>
            ))}
            <div className="mt-2 space-y-2">
              <Input label="Question" value={newQ.q} onChange={v => setNewQ({ ...newQ, q: v })} placeholder="What is the site speed limit?" />
              <Input label="Options (comma separated)" value={newQ.options} onChange={v => setNewQ({ ...newQ, options: v })} placeholder="5mph, 10mph, 15mph" />
              <Input label="Correct Answer" value={newQ.a} onChange={v => setNewQ({ ...newQ, a: v })} placeholder="5mph" />
              <Btn size="sm" variant="secondary" onClick={() => { if (newQ.q && newQ.a) { setForm({ ...form, questions: [...form.questions, { ...newQ, options: newQ.options.split(",").map(o => o.trim()) }] }); setNewQ({ q: "", a: "", options: "" }); } }}>Add Question</Btn>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setIModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title}>Save Induction</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={aModal} onClose={() => setAModal(false)} title="Assign Induction">
        <div className="space-y-4">
          <Input label="Employee Name" value={assignName} onChange={setAssignName} placeholder="Full name" />
          <Input label="Email Address" value={assignEmail} onChange={setAssignEmail} placeholder="employee@company.com" required />
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setAModal(false)}>Cancel</Btn>
            <Btn onClick={doAssign} disabled={!assignEmail}>Assign</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={!!quizModal} onClose={() => setQuizModal(null)} title={quizModal?.title || "Preview"}>
        {quizModal && !submitted && (
          <div className="space-y-4">
            {quizModal.sections?.length > 0 && (
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Content</div>
                {quizModal.sections.map((s, i) => <div key={i} className="text-sm text-slate-300 py-1">📋 {s}</div>)}
              </div>
            )}
            {quizModal.questions?.map((q, i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl p-4">
                <div className="text-sm font-medium text-slate-200 mb-3">{i + 1}. {q.q}</div>
                {q.options?.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer py-1.5">
                    <input type="radio" name={`q${i}`} value={opt} onChange={() => setQuizAnswers({ ...quizAnswers, [i]: opt })} className="accent-cyan-500" />
                    <span className="text-sm text-slate-300">{opt}</span>
                  </label>
                ))}
              </div>
            ))}
            <Btn onClick={() => submitQuiz(quizModal)} disabled={Object.keys(quizAnswers).length < quizModal.questions?.length}>Submit Answers</Btn>
          </div>
        )}
        {submitted && (
          <div className="text-center py-8">
            <div className={`text-5xl font-bold mb-3 ${submitted.passed ? "text-emerald-400" : "text-red-400"}`}>{submitted.pct}%</div>
            <div className={`text-lg font-semibold mb-2 ${submitted.passed ? "text-emerald-300" : "text-red-300"}`}>{submitted.passed ? "✓ PASSED" : "✗ FAILED"}</div>
            <div className="text-slate-400 text-sm">{submitted.correct} / {submitted.total} correct</div>
            <div className="text-slate-500 text-xs mt-1">Pass mark: {quizModal?.passMark}%</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE 8 — RISK ASSESSMENTS
// ════════════════════════════════════════════════════════════════════════════
const RiskModule = () => {
  const [risks, setRisks] = useStorage("risk_assessments", []);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", activity: "", hazard: "", who: "", likelihood: 3, severity: 3, controls: "", residualL: 1, residualS: 2, responsible: "", reviewDate: "", status: "Draft" });

  const riskScore = (l, s) => l * s;
  const riskLevel = (score) => score <= 4 ? { label: "Low", color: "green" } : score <= 9 ? { label: "Medium", color: "amber" } : score <= 16 ? { label: "High", color: "red" } : { label: "Critical", color: "red" };

  const save = () => {
    if (!form.title || !form.hazard) return;
    const initial = riskScore(form.likelihood, form.severity);
    const residual = riskScore(form.residualL, form.residualS);
    setRisks([...risks, { ...form, id: uid(), initial, residual, date: today() }]);
    setForm({ title: "", activity: "", hazard: "", who: "", likelihood: 3, severity: 3, controls: "", residualL: 1, residualS: 2, responsible: "", reviewDate: "", status: "Draft" });
    setModal(false);
  };

  const matrix = [[1,2,3,4,5],[2,4,6,8,10],[3,6,9,12,15],[4,8,12,16,20],[5,10,15,20,25]];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Risk Assessments</h2>
        <Btn onClick={() => setModal(true)}><Icon d={icons.plus} size={16} />New Risk Assessment</Btn>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total" value={risks.length} color="cyan" />
        <StatCard label="Critical / High" value={risks.filter(r => riskLevel(r.initial).label === "Critical" || riskLevel(r.initial).label === "High").length} color="red" />
        <StatCard label="Medium" value={risks.filter(r => riskLevel(r.initial).label === "Medium").length} color="amber" />
        <StatCard label="Low" value={risks.filter(r => riskLevel(r.initial).label === "Low").length} color="emerald" />
      </div>

      {/* Risk Matrix */}
      <Card>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">5×5 Risk Matrix (Likelihood × Severity)</div>
        <div className="overflow-x-auto">
          <table className="text-xs">
            <thead>
              <tr>
                <th className="text-slate-500 pr-2 text-right pb-1">L\S</th>
                {[1,2,3,4,5].map(s => <th key={s} className="w-10 text-center text-slate-400 pb-1">{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {[5,4,3,2,1].map(l => (
                <tr key={l}>
                  <td className="text-slate-400 pr-2 text-right py-0.5">{l}</td>
                  {[1,2,3,4,5].map(s => {
                    const score = l * s;
                    const level = riskLevel(score);
                    return (
                      <td key={s} className={`w-10 h-8 text-center rounded font-bold text-xs ${level.label === "Low" ? "bg-emerald-900/60 text-emerald-300" : level.label === "Medium" ? "bg-amber-900/60 text-amber-300" : "bg-red-900/60 text-red-300"}`}>{score}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-2">
        {risks.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-6">No risk assessments yet.</p></Card>}
        {risks.map(r => {
          const iLevel = riskLevel(r.initial);
          const rLevel = riskLevel(r.residual);
          return (
            <Card key={r.id}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-100">{r.title}</span>
                    <Badge label={`Initial: ${iLevel.label} (${r.initial})`} color={iLevel.color} />
                    <Badge label={`Residual: ${rLevel.label} (${r.residual})`} color={rLevel.color} />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{r.activity} • {r.date}</div>
                  <p className="text-xs text-slate-300 mt-1.5"><strong className="text-slate-400">Hazard:</strong> {r.hazard}</p>
                  <p className="text-xs text-slate-400 mt-0.5"><strong>Who:</strong> {r.who} | <strong>Controls:</strong> {r.controls}</p>
                  {r.responsible && <div className="text-xs text-slate-500 mt-0.5">Responsible: {r.responsible}</div>}
                </div>
                <button onClick={() => setRisks(risks.filter(x => x.id !== r.id))} className="text-slate-600 hover:text-red-400 transition">
                  <Icon d={icons.trash} size={16} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="New Risk Assessment" width="max-w-3xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Assessment Title" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="e.g. Working at Height" required />
            <Input label="Activity / Task" value={form.activity} onChange={v => setForm({ ...form, activity: v })} placeholder="e.g. Roof maintenance" />
          </div>
          <Textarea label="Hazard Description" value={form.hazard} onChange={v => setForm({ ...form, hazard: v })} placeholder="Describe the hazard in detail…" rows={2} required />
          <Input label="Who is at Risk" value={form.who} onChange={v => setForm({ ...form, who: v })} placeholder="e.g. Operatives, visitors" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Initial Risk</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Likelihood (1-5): <strong className="text-slate-300">{form.likelihood}</strong></label>
                  <input type="range" min={1} max={5} value={form.likelihood} onChange={e => setForm({ ...form, likelihood: +e.target.value })} className="w-full accent-cyan-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Severity (1-5): <strong className="text-slate-300">{form.severity}</strong></label>
                  <input type="range" min={1} max={5} value={form.severity} onChange={e => setForm({ ...form, severity: +e.target.value })} className="w-full accent-cyan-500" />
                </div>
              </div>
              <div className={`mt-2 text-center rounded-lg py-2 text-sm font-bold ${riskLevel(riskScore(form.likelihood, form.severity)).label === "Low" ? "bg-emerald-900/40 text-emerald-300" : riskLevel(riskScore(form.likelihood, form.severity)).label === "Medium" ? "bg-amber-900/40 text-amber-300" : "bg-red-900/40 text-red-300"}`}>
                Score: {riskScore(form.likelihood, form.severity)} — {riskLevel(riskScore(form.likelihood, form.severity)).label}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Residual Risk (after controls)</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Likelihood: <strong className="text-slate-300">{form.residualL}</strong></label>
                  <input type="range" min={1} max={5} value={form.residualL} onChange={e => setForm({ ...form, residualL: +e.target.value })} className="w-full accent-emerald-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Severity: <strong className="text-slate-300">{form.residualS}</strong></label>
                  <input type="range" min={1} max={5} value={form.residualS} onChange={e => setForm({ ...form, residualS: +e.target.value })} className="w-full accent-emerald-500" />
                </div>
              </div>
              <div className={`mt-2 text-center rounded-lg py-2 text-sm font-bold ${riskLevel(riskScore(form.residualL, form.residualS)).label === "Low" ? "bg-emerald-900/40 text-emerald-300" : riskLevel(riskScore(form.residualL, form.residualS)).label === "Medium" ? "bg-amber-900/40 text-amber-300" : "bg-red-900/40 text-red-300"}`}>
                Score: {riskScore(form.residualL, form.residualS)} — {riskLevel(riskScore(form.residualL, form.residualS)).label}
              </div>
            </div>
          </div>
          <Textarea label="Control Measures" value={form.controls} onChange={v => setForm({ ...form, controls: v })} placeholder="List the controls in place to reduce this risk…" rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Responsible Person" value={form.responsible} onChange={v => setForm({ ...form, responsible: v })} placeholder="Name" />
            <Input label="Review Date" value={form.reviewDate} onChange={v => setForm({ ...form, reviewDate: v })} type="date" />
          </div>
          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title || !form.hazard}>Save Risk Assessment</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};


// ════════════════════════════════════════════════════════════════════════════
// MODULE: ADMINISTRATION
// ════════════════════════════════════════════════════════════════════════════
const FEATURE_LIST = [
  { id: "ppe_view",       label: "PPE — View",              module: "ppe" },
  { id: "ppe_issue",      label: "PPE — Issue / Edit",      module: "ppe" },
  { id: "obs_view",       label: "Observations — View",     module: "obs" },
  { id: "obs_create",     label: "Observations — Create",   module: "obs" },
  { id: "legal_view",     label: "Legal Register — View",   module: "legal" },
  { id: "legal_edit",     label: "Legal Register — Edit",   module: "legal" },
  { id: "audit_complete", label: "Audits — Complete",       module: "audit" },
  { id: "audit_create",   label: "Audits — Create Templates", module: "audit" },
  { id: "asset_view",     label: "Assets — View",           module: "asset" },
  { id: "asset_edit",     label: "Assets — Edit",           module: "asset" },
  { id: "training_view",  label: "Training — View",         module: "training" },
  { id: "training_manage",label: "Training — Manage",       module: "training" },
  { id: "induction_take", label: "Inductions — Take",       module: "induction" },
  { id: "induction_build",label: "Inductions — Build",      module: "induction" },
  { id: "risk_view",      label: "Risk Assessments — View", module: "risk" },
  { id: "risk_create",    label: "Risk Assessments — Create", module: "risk" },
  { id: "permit_complete",label: "Permits to Work — Complete", module: "permit" },
  { id: "permit_create",  label: "Permits to Work — Create", module: "permit" },
  { id: "admin",          label: "Administration",          module: "admin" },
];

const SUPER_USER_DEFAULTS = Object.fromEntries(FEATURE_LIST.map(f => [f.id, true]));
const USER_DEFAULTS = Object.fromEntries(FEATURE_LIST.map(f => [f.id,
  ["ppe_view","obs_view","obs_create","audit_complete","asset_view","training_view","induction_take","risk_view","permit_complete"].includes(f.id)
]));

const AdminModule = () => {
  const [users, setUsers] = useStorage("admin_users", []);
  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "user", permissions: { ...USER_DEFAULTS } });

  const openNew = () => {
    setEditUser(null);
    setForm({ name: "", email: "", role: "user", permissions: { ...USER_DEFAULTS } });
    setModal(true);
  };
  const openEdit = (u) => {
    setEditUser(u);
    setForm({ name: u.name, email: u.email, role: u.role, permissions: { ...u.permissions } });
    setModal(true);
  };
  const setRole = (role) => {
    setForm(f => ({ ...f, role, permissions: role === "superuser" ? { ...SUPER_USER_DEFAULTS } : { ...USER_DEFAULTS } }));
  };
  const togglePerm = (id) => {
    setForm(f => ({ ...f, permissions: { ...f.permissions, [id]: !f.permissions[id] } }));
  };
  const save = () => {
    if (!form.name || !form.email) return;
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u));
    } else {
      setUsers([...users, { ...form, id: uid(), created: today() }]);
    }
    setModal(false);
  };
  const remove = (id) => setUsers(users.filter(u => u.id !== id));

  const modules = [...new Set(FEATURE_LIST.map(f => f.module))];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Administration</h2>
        <Btn onClick={openNew}><Icon d={icons.plus} size={16} />Add User</Btn>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total Users" value={users.length} color="cyan" icon={icons.user} />
        <StatCard label="Super Users" value={users.filter(u => u.role === "superuser").length} color="amber" icon={icons.star} />
        <StatCard label="Standard Users" value={users.filter(u => u.role === "user").length} color="slate" icon={icons.user} />
      </div>

      <div className="space-y-2">
        {users.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-6">No users added yet. Add users to manage their access.</p></Card>}
        {users.map(u => {
          const permCount = Object.values(u.permissions).filter(Boolean).length;
          return (
            <Card key={u.id} className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${u.role === "superuser" ? "bg-amber-900/40 border border-amber-700/40" : "bg-slate-700/50 border border-slate-600/40"}`}>
                  <Icon d={icons.user} size={18} color={u.role === "superuser" ? "#fbbf24" : "#94a3b8"} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{u.name}</span>
                    <Badge label={u.role === "superuser" ? "Super User" : "User"} color={u.role === "superuser" ? "amber" : "slate"} />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{u.email}</div>
                  <div className="text-xs text-slate-500 mt-1">{permCount} / {FEATURE_LIST.length} permissions enabled</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {modules.map(mod => {
                      const modPerms = FEATURE_LIST.filter(f => f.module === mod);
                      const enabled = modPerms.some(f => u.permissions[f.id]);
                      if (!enabled) return null;
                      return <Badge key={mod} label={mod.charAt(0).toUpperCase() + mod.slice(1)} color="blue" />;
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(u)} className="text-slate-500 hover:text-cyan-400 transition"><Icon d={icons.edit} size={16} /></button>
                <button onClick={() => remove(u.id)} className="text-slate-500 hover:text-red-400 transition"><Icon d={icons.trash} size={16} /></button>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editUser ? "Edit User" : "Add User"} width="max-w-3xl">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Full Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="John Smith" required />
            <Input label="Email Address" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="john@company.com" required />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">User Role</label>
            <div className="grid grid-cols-2 gap-3">
              {["user", "superuser"].map(role => (
                <button key={role} onClick={() => setRole(role)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition text-left ${form.role === role ? role === "superuser" ? "bg-amber-900/40 border-amber-500/60 text-amber-300" : "bg-cyan-900/30 border-cyan-500/60 text-cyan-300" : "border-slate-600 text-slate-400 hover:border-slate-500"}`}>
                  <div className="font-semibold">{role === "superuser" ? "⭐ Super User" : "👤 Standard User"}</div>
                  <div className="text-xs mt-0.5 opacity-70">{role === "superuser" ? "Full access to all modules" : "Limited access — customise below"}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-3">Feature Permissions</label>
            <div className="space-y-4">
              {modules.map(mod => {
                const modFeatures = FEATURE_LIST.filter(f => f.module === mod);
                return (
                  <div key={mod} className="bg-slate-900/40 rounded-xl p-3">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">{mod.charAt(0).toUpperCase() + mod.slice(1)}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {modFeatures.map(f => (
                        <label key={f.id} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={!!form.permissions[f.id]} onChange={() => togglePerm(f.id)}
                            className="w-4 h-4 rounded accent-cyan-500" />
                          <span className="text-xs text-slate-300 group-hover:text-slate-100 transition">{f.label.split(" — ")[1] || f.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.name || !form.email}>{editUser ? "Save Changes" : "Add User"}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MODULE: PERMIT TO WORK
// ════════════════════════════════════════════════════════════════════════════
const PERMIT_TYPES = {
  "Breaking Ground": {
    icon: "M3 12h18M3 6h18M3 18h18",
    color: "amber",
    checks: [
      "Underground services located and marked (gas, electric, water, telecoms)",
      "Dial Before You Dig / utility search completed",
      "Exclusion zone established and barriers in place",
      "Competent supervisor appointed and on site",
      "Appropriate PPE issued (safety boots, gloves, hi-vis, hard hat)",
      "Ground conditions assessed — no risk of collapse or subsidence",
      "Spoil heap located safely away from excavation edge",
      "Emergency rescue plan in place",
      "Weather conditions assessed — no flooding risk",
      "Plant and equipment pre-use checks completed",
    ],
  },
  "Confined Space": {
    icon: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM12 8v4M12 16h.01",
    color: "red",
    checks: [
      "Confined space risk assessment reviewed and signed",
      "Atmosphere tested — O2 level 19.5–23.5%, no toxic/flammable gases",
      "Continuous atmospheric monitoring in place during entry",
      "Ventilation provided and confirmed effective",
      "Rescue plan and equipment in place (including non-entry rescue)",
      "Standby person stationed outside at all times",
      "Communication system established (voice, radio)",
      "Entry log being maintained",
      "All isolations confirmed (mechanical, electrical, process)",
      "Emergency services informed / on standby if required",
      "Entrants trained and medically fit for confined space work",
    ],
  },
  "Chemical Processing": {
    icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18",
    color: "purple",
    checks: [
      "COSHH assessment reviewed for all chemicals involved",
      "Safety Data Sheets (SDS) available on site",
      "Appropriate RPE selected, fitted and face-fit tested",
      "Chemical resistant PPE (gloves, goggles, apron) in use",
      "Spill containment and clean-up equipment on standby",
      "Eyewash station and emergency shower identified",
      "Ventilation confirmed adequate for chemical in use",
      "Incompatible chemicals segregated",
      "Waste disposal method confirmed and compliant",
      "Emergency procedures communicated to all personnel",
      "First aider aware and on standby",
    ],
  },
  "Lock Out Tag Out": {
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    color: "red",
    checks: [
      "All energy sources identified (electrical, hydraulic, pneumatic, thermal, gravitational, chemical)",
      "Equipment shut down following correct procedure",
      "All energy isolation points locked out",
      "Personal lock(s) applied by each worker entering",
      "Tags applied at each isolation point",
      "Stored energy dissipated (bled, discharged, blocked, supported)",
      "Zero energy state verified before work begins",
      "All affected personnel notified",
      "Equipment tested to confirm de-energised (try-start)",
      "LOTO removal procedure understood by all workers",
    ],
  },
  "Work at Height": {
    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 0-2-2z",
    color: "amber",
    checks: [
      "Work at Height risk assessment reviewed",
      "Hierarchy of control applied — elimination/substitution considered",
      "Access equipment inspected and in-date (scaffold, MEWP, ladder)",
      "MEWP operator holds valid IPAF / PASMA certification",
      "Harness and fall arrest equipment inspected, in-date, correctly fitted",
      "Anchor points inspected by competent person",
      "Exclusion zone below work area established and signed",
      "Edge protection / guardrails in place where practicable",
      "Weather conditions assessed — no work in high winds or ice",
      "Rescue plan in place for a fallen worker",
      "Equipment / tools secured to prevent falling objects",
    ],
  },
  "Radiation Equipment": {
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h4M18 12h4M12 2v4M12 18v4",
    color: "green",
    checks: [
      "Radiation Protection Supervisor (RPS) notified and on site",
      "Radiation Protection Adviser (RPA) consulted if required",
      "IRR17 local rules reviewed and understood",
      "Controlled and supervised areas established and signed",
      "Personal dosimetry worn by all classified workers",
      "Radiation monitor calibration in date and operative",
      "Source / equipment shielding in place and verified",
      "Source accountability completed (inventory checked)",
      "Emergency procedures for radiation incident posted on site",
      "Work plan reviewed and approved by RPS",
    ],
  },
  "Hot Works": {
    icon: "M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z",
    color: "red",
    checks: [
      "Hot works risk assessment completed",
      "Fire watch person designated — present during and 60 mins after works",
      "All combustibles removed or protected within 10m radius",
      "Flammable liquids / gases removed from work area",
      "Fire extinguisher(s) appropriate to risk within 2m",
      "Fire alarm system isolated in work area (and re-enabled after)",
      "Sprinkler system — any impairment authorised and logged",
      "Welding screens / flash curtains in place",
      "Hot works equipment inspected — leads, torch, regulators",
      "Gas cylinders secured upright, valves off when not in use",
      "Building / site fire warden informed",
      "Work area inspected and signed off before leaving site",
    ],
  },
};

const PermitModule = () => {
  const [permits, setPermits] = useStorage("permits", []);
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [form, setForm] = useState({
    type: "",
    location: "",
    description: "",
    startDate: today(),
    startTime: "08:00",
    endDate: today(),
    endTime: "17:00",
    performingAuth: "",
    performingAuthRole: "",
    areaAuth: "",
    areaAuthRole: "",
    checks: {},
    photos: [],
    emailPerforming: "",
    emailArea: "",
    paSig: "",
    aaSig: "",
  });

  const selectType = (type) => {
    const checks = Object.fromEntries(PERMIT_TYPES[type].checks.map((c, i) => [i, false]));
    setForm(f => ({ ...f, type, checks }));
  };

  const toggleCheck = (i) => setForm(f => ({ ...f, checks: { ...f.checks, [i]: !f.checks[i] } }));

  const allChecked = form.type && Object.values(form.checks).every(Boolean);

  const save = () => {
    if (!form.type || !form.paSig || !form.aaSig) return;
    setPermits([...permits, { ...form, id: uid(), issued: today(), status: "Active" }]);
    setForm({
      type: "", location: "", description: "", startDate: today(), startTime: "08:00",
      endDate: today(), endTime: "17:00", performingAuth: "", performingAuthRole: "",
      areaAuth: "", areaAuthRole: "", checks: {}, photos: [], emailPerforming: "", emailArea: "", paSig: "", aaSig: "",
    });
    setModal(false);
  };

  const closePermit = (id) => setPermits(permits.map(p => p.id === id ? { ...p, status: "Closed", closedDate: today() } : p));

  const exportPermitText = (p) => {
    const lines = [
      `PERMIT TO WORK`,
      `═══════════════════════════════════`,
      `Type: ${p.type}`,
      `Location: ${p.location || "N/A"}`,
      `Description: ${p.description || "N/A"}`,
      `Valid: ${p.startDate} ${p.startTime} → ${p.endDate} ${p.endTime}`,
      `Status: ${p.status}`,
      ``,
      `PERFORMING AUTHORITY`,
      `Name: ${p.performingAuth}  Role: ${p.performingAuthRole}`,
      `Signature: ${p.paSig}`,
      ``,
      `AREA AUTHORITY`,
      `Name: ${p.areaAuth}  Role: ${p.areaAuthRole}`,
      `Signature: ${p.aaSig}`,
      ``,
      `PRE-COMMENCEMENT CHECKS`,
      ...(PERMIT_TYPES[p.type]?.checks || []).map((c, i) => `[${p.checks[i] ? "✓" : "✗"}] ${c}`),
      ``,
      `Issued: ${p.issued}`,
    ];
    return lines.join("\n");
  };

  const downloadPermit = (p) => {
    const text = exportPermitText(p);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `permit-${p.type.replace(/\s+/g, "-").toLowerCase()}-${p.issued}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activePermits = permits.filter(p => p.status === "Active");
  const colorMap = { amber: "text-amber-400", red: "text-red-400", purple: "text-purple-400", green: "text-emerald-400" };
  const bgMap = { amber: "bg-amber-900/20 border-amber-700/30", red: "bg-red-900/20 border-red-700/30", purple: "bg-purple-900/20 border-purple-700/30", green: "bg-emerald-900/20 border-emerald-700/30" };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Permits to Work</h2>
        <Btn onClick={() => setModal(true)}><Icon d={icons.plus} size={16} />New Permit</Btn>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Active Permits" value={activePermits.length} color="amber" icon={icons.alert} />
        <StatCard label="Total Issued" value={permits.length} color="cyan" icon={icons.audit} />
        <StatCard label="Closed" value={permits.filter(p => p.status === "Closed").length} color="emerald" icon={icons.check} />
      </div>

      {activePermits.length > 0 && (
        <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl p-4">
          <div className="text-amber-300 font-semibold text-sm mb-1">⚠ {activePermits.length} Active Permit{activePermits.length > 1 ? "s" : ""} in Progress</div>
          <div className="text-amber-400/70 text-xs">Ensure all active permits are closed out when work is complete</div>
        </div>
      )}

      <div className="space-y-2">
        {permits.length === 0 && <Card><p className="text-slate-500 text-sm text-center py-6">No permits issued. Create a permit to authorise high-risk work.</p></Card>}
        {permits.slice().reverse().map(p => {
          const pt = PERMIT_TYPES[p.type];
          const col = pt?.color || "slate";
          return (
            <Card key={p.id} className={`border ${p.status === "Active" ? bgMap[col] || "border-slate-700/50" : "border-slate-700/30"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-bold text-sm ${p.status === "Active" ? colorMap[col] || "text-slate-300" : "text-slate-400"}`}>{p.type}</span>
                    <Badge label={p.status} color={p.status === "Active" ? "amber" : "green"} />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{p.location || "No location"} • {p.startDate} {p.startTime} → {p.endDate} {p.endTime}</div>
                  <div className="text-xs text-slate-500 mt-1">PA: {p.performingAuth} | AA: {p.areaAuth}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge label={`${Object.values(p.checks).filter(Boolean).length}/${Object.values(p.checks).length} checks`} color="slate" />
                    <Badge label="✓ PA Signed" color="slate" />
                    <Badge label="✓ AA Signed" color="slate" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <Btn size="sm" variant="secondary" onClick={() => setViewModal(p)}><Icon d={icons.audit} size={14} />View</Btn>
                  <Btn size="sm" variant="secondary" onClick={() => downloadPermit(p)}><Icon d={icons.download} size={14} />Export</Btn>
                  {p.status === "Active" && <Btn size="sm" variant="secondary" onClick={() => closePermit(p.id)}>Close Out</Btn>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* New Permit Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="New Permit to Work" width="max-w-3xl">
        <div className="space-y-5">
          {!form.type ? (
            <div>
              <div className="text-sm text-slate-400 mb-4">Select the type of permit required:</div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PERMIT_TYPES).map(([type, cfg]) => (
                  <button key={type} onClick={() => selectType(type)}
                    className={`p-4 rounded-xl border text-left transition hover:scale-[1.02] ${bgMap[cfg.color] || "border-slate-600"}`}>
                    <div className={`font-semibold text-sm ${colorMap[cfg.color]}`}>{type}</div>
                    <div className="text-xs text-slate-500 mt-1">{cfg.checks.length} pre-checks required</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Badge label={form.type} color={PERMIT_TYPES[form.type]?.color || "slate"} />
                <button onClick={() => setForm(f => ({ ...f, type: "", checks: {} }))} className="text-xs text-slate-500 hover:text-slate-300">← Change type</button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input label="Work Location" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} placeholder="Building / area / plant number" />
                <Textarea label="Description of Work" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} rows={1} placeholder="Brief description of work to be carried out" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Start Date" value={form.startDate} onChange={v => setForm(f => ({ ...f, startDate: v }))} type="date" />
                  <Input label="Start Time" value={form.startTime} onChange={v => setForm(f => ({ ...f, startTime: v }))} type="time" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input label="End Date" value={form.endDate} onChange={v => setForm(f => ({ ...f, endDate: v }))} type="date" />
                  <Input label="End Time" value={form.endTime} onChange={v => setForm(f => ({ ...f, endTime: v }))} type="time" />
                </div>
              </div>

              {/* Pre-checks */}
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Pre-Commencement Checks — {Object.values(form.checks).filter(Boolean).length} / {PERMIT_TYPES[form.type].checks.length} complete
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {PERMIT_TYPES[form.type].checks.map((check, i) => (
                    <label key={i} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition ${form.checks[i] ? "bg-emerald-900/20 border border-emerald-700/30" : "bg-slate-900/40 border border-slate-700/30"}`}>
                      <input type="checkbox" checked={!!form.checks[i]} onChange={() => toggleCheck(i)} className="mt-0.5 w-4 h-4 accent-emerald-500 flex-shrink-0" />
                      <span className={`text-sm ${form.checks[i] ? "text-emerald-300 line-through opacity-70" : "text-slate-300"}`}>{check}</span>
                    </label>
                  ))}
                </div>
              </div>

              <PhotoUpload photos={form.photos} onAdd={p => setForm(f => ({ ...f, photos: [...f.photos, p] }))} />

              {/* Authorities */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Performing Authority</div>
                  <Input label="Name" value={form.performingAuth} onChange={v => setForm(f => ({ ...f, performingAuth: v }))} placeholder="Full name" />
                  <Input label="Role / Trade" value={form.performingAuthRole} onChange={v => setForm(f => ({ ...f, performingAuthRole: v }))} placeholder="e.g. Electrician" />
                  <Input label="Email" value={form.emailPerforming} onChange={v => setForm(f => ({ ...f, emailPerforming: v }))} placeholder="pa@company.com" />
                  <Input label="Signature (type full name)" value={form.paSig} onChange={v => setForm(f => ({ ...f, paSig: v }))} placeholder="Type full name to sign" />
                </div>
                <div className="bg-slate-900/40 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Area Authority</div>
                  <Input label="Name" value={form.areaAuth} onChange={v => setForm(f => ({ ...f, areaAuth: v }))} placeholder="Full name" />
                  <Input label="Role / Title" value={form.areaAuthRole} onChange={v => setForm(f => ({ ...f, areaAuthRole: v }))} placeholder="e.g. Site Manager" />
                  <Input label="Email" value={form.emailArea} onChange={v => setForm(f => ({ ...f, emailArea: v }))} placeholder="aa@company.com" />
                  <Input label="Signature (type full name)" value={form.aaSig} onChange={v => setForm(f => ({ ...f, aaSig: v }))} placeholder="Type full name to sign" />
                </div>
              </div>

              {!allChecked && (
                <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl p-3 text-xs text-amber-300">
                  ⚠ All pre-commencement checks must be completed before issuing this permit
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn>
                <Btn onClick={save} disabled={!form.paSig || !form.aaSig || !allChecked}>Issue Permit</Btn>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* View Permit Modal */}
      <Modal open={!!viewModal} onClose={() => setViewModal(null)} title={`Permit: ${viewModal?.type}`} width="max-w-2xl">
        {viewModal && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-slate-500 text-xs">Location</span><div className="text-slate-200">{viewModal.location || "N/A"}</div></div>
              <div><span className="text-slate-500 text-xs">Status</span><div><Badge label={viewModal.status} color={viewModal.status === "Active" ? "amber" : "green"} /></div></div>
              <div><span className="text-slate-500 text-xs">Valid From</span><div className="text-slate-200">{viewModal.startDate} {viewModal.startTime}</div></div>
              <div><span className="text-slate-500 text-xs">Valid Until</span><div className="text-slate-200">{viewModal.endDate} {viewModal.endTime}</div></div>
            </div>
            {viewModal.description && <div><span className="text-slate-500 text-xs">Description</span><div className="text-slate-300">{viewModal.description}</div></div>}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 rounded-xl p-3">
                <div className="text-xs font-semibold text-cyan-400 mb-2">Performing Authority</div>
                <div className="text-slate-200">{viewModal.performingAuth}</div>
                <div className="text-slate-500 text-xs">{viewModal.performingAuthRole}</div>
                <div className="text-slate-400 text-xs mt-1">Signed: {viewModal.paSig}</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-3">
                <div className="text-xs font-semibold text-amber-400 mb-2">Area Authority</div>
                <div className="text-slate-200">{viewModal.areaAuth}</div>
                <div className="text-slate-500 text-xs">{viewModal.areaAuthRole}</div>
                <div className="text-slate-400 text-xs mt-1">Signed: {viewModal.aaSig}</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Pre-Commencement Checks</div>
              <div className="space-y-1">
                {PERMIT_TYPES[viewModal.type]?.checks.map((c, i) => (
                  <div key={i} className={`flex items-start gap-2 text-xs py-1 ${viewModal.checks[i] ? "text-emerald-400" : "text-red-400"}`}>
                    <span className="flex-shrink-0">{viewModal.checks[i] ? "✓" : "✗"}</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Btn variant="secondary" onClick={() => downloadPermit(viewModal)}><Icon d={icons.download} size={16} />Export Permit</Btn>
              {viewModal.status === "Active" && <Btn variant="amber" onClick={() => { closePermit(viewModal.id); setViewModal(null); }}>Close Out Permit</Btn>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};


// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════════════════
const Dashboard = ({ navigate }) => {
  const [ppeItems] = useStorage("ppe_items", []);
  const [observations] = useStorage("obs_records", []);
  const [assets] = useStorage("assets", []);
  const [certs] = useStorage("training_certs", []);
  const [risks] = useStorage("risk_assessments", []);
  const [audits] = useStorage("completed_audits", []);

  const ppeOverdue = ppeItems.filter(i => i.nextCheck && daysFrom(i.nextCheck) < 0).length;
  const ppeDue = ppeItems.filter(i => i.nextCheck && daysFrom(i.nextCheck) >= 0 && daysFrom(i.nextCheck) <= 7).length;
  const openObs = observations.filter(o => o.status === "Open").length;
  const incidents = observations.filter(o => o.type === "Incident").length;
  const certExpiring = certs.filter(c => c.expiry && daysFrom(c.expiry) <= 30).length;
  const highRisks = risks.filter(r => r.initial >= 12).length;

  const alerts = [
    ppeOverdue > 0 && { msg: `${ppeOverdue} PPE item${ppeOverdue > 1 ? "s" : ""} overdue for check`, level: "red", module: "ppe" },
    ppeDue > 0 && { msg: `${ppeDue} PPE item${ppeDue > 1 ? "s" : ""} due for check this week`, level: "amber", module: "ppe" },
    openObs > 0 && { msg: `${openObs} open observation${openObs > 1 ? "s" : ""} need action`, level: "amber", module: "obs" },
    certExpiring > 0 && { msg: `${certExpiring} certificate${certExpiring > 1 ? "s" : ""} expiring within 30 days`, level: "amber", module: "training" },
    highRisks > 0 && { msg: `${highRisks} high/critical risk${highRisks > 1 ? "s" : ""} in register`, level: "red", module: "risk" },
  ].filter(Boolean);

  const [permits] = useStorage("permits", []);
  const [adminUsers] = useStorage("admin_users", []);
  const modules = [
    { id: "ppe", label: "PPE", icon: icons.ppe, color: "cyan", stat: ppeItems.length, sub: "items issued" },
    { id: "obs", label: "Observations", icon: icons.obs, color: "blue", stat: observations.length, sub: "recorded" },
    { id: "permit", label: "Permits to Work", icon: icons.permit, color: "amber", stat: permits.filter(p=>p.status==="Active").length, sub: "active" },
    { id: "legal", label: "Legal Register", icon: icons.legal, color: "purple", stat: "DB", sub: "offline" },
    { id: "audit", label: "Audits", icon: icons.audit, color: "emerald", stat: audits.length, sub: "completed" },
    { id: "asset", label: "Assets", icon: icons.asset, color: "slate", stat: assets.length, sub: "registered" },
    { id: "training", label: "Training", icon: icons.training, color: "blue", stat: certs.length, sub: "certificates" },
    { id: "induction", label: "Inductions", icon: icons.induction, color: "cyan", stat: "", sub: "manage" },
    { id: "risk", label: "Risk Assessments", icon: icons.risk, color: "amber", stat: risks.length, sub: "assessments" },
    { id: "admin", label: "Administration", icon: icons.admin, color: "purple", stat: adminUsers.length, sub: "users" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-bold text-slate-100">Good morning 👋</div>
        <div className="text-slate-400 text-sm mt-0.5">Here's your compliance overview for today</div>
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">⚡ Action Required</div>
          {alerts.map((a, i) => (
            <button key={i} onClick={() => navigate(a.module)} className={`w-full text-left flex items-center gap-3 rounded-xl px-4 py-3 border transition hover:opacity-90 ${a.level === "red" ? "bg-red-900/30 border-red-700/50" : "bg-amber-900/30 border-amber-700/50"}`}>
              <Icon d={icons.alert} size={16} color={a.level === "red" ? "#f87171" : "#fbbf24"} />
              <span className={`text-sm ${a.level === "red" ? "text-red-300" : "text-amber-300"}`}>{a.msg}</span>
              <Icon d={icons.chevron} size={14} color="#64748b" className="ml-auto" />
            </button>
          ))}
        </div>
      )}

      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Modules</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {modules.map(m => {
            const colors = { cyan: "text-cyan-400 bg-cyan-900/20 border-cyan-800/30", blue: "text-blue-400 bg-blue-900/20 border-blue-800/30", purple: "text-purple-400 bg-purple-900/20 border-purple-800/30", emerald: "text-emerald-400 bg-emerald-900/20 border-emerald-800/30", slate: "text-slate-300 bg-slate-700/30 border-slate-600/30", amber: "text-amber-400 bg-amber-900/20 border-amber-800/30" };
            return (
              <button key={m.id} onClick={() => navigate(m.id)}
                className={`p-4 rounded-xl border text-left hover:scale-[1.02] transition-transform ${colors[m.color]}`}>
                <Icon d={m.icon} size={22} />
                <div className="text-xl font-bold mt-2">{m.stat || "→"}</div>
                <div className="text-xs mt-0.5 opacity-70">{m.sub}</div>
                <div className="text-sm font-semibold mt-1">{m.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <Card>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Stats</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">{risks.length > 0 ? Math.round(risks.filter(r => r.initial <= 4).length / risks.length * 100) : 0}%</div>
            <div className="text-xs text-slate-400 mt-1">Low Risk Assessments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">{observations.filter(o => o.status === "Closed").length}</div>
            <div className="text-xs text-slate-400 mt-1">Observations Closed</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ════════════════════════════════════════════════════════════════════════════
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: icons.dashboard },
  { id: "ppe", label: "PPE", icon: icons.ppe },
  { id: "obs", label: "Observations", icon: icons.obs },
  { id: "permit", label: "Permits", icon: icons.permit },
  { id: "legal", label: "Legal", icon: icons.legal },
  { id: "audit", label: "Audits", icon: icons.audit },
  { id: "asset", label: "Assets", icon: icons.asset },
  { id: "training", label: "Training", icon: icons.training },
  { id: "induction", label: "Inductions", icon: icons.induction },
  { id: "risk", label: "Risk", icon: icons.risk },
  { id: "admin", label: "Admin", icon: icons.admin },
];

const MOBILE_NAV = [
  { id: "dashboard", label: "Home", icon: icons.dashboard },
  { id: "obs", label: "Observe", icon: icons.obs },
  { id: "permit", label: "Permits", icon: icons.permit },
  { id: "audit", label: "Audits", icon: icons.audit },
  { id: "risk", label: "Risk", icon: icons.risk },
];

const usePWAInstall = () => {
  const [prompt, setPrompt] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setPrompt(e); setShow(true); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setShow(false);
  };
  return { show, install, dismiss: () => setShow(false) };
};

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { show: showInstall, install, dismiss } = usePWAInstall();

  const PAGES = {
    dashboard: <Dashboard navigate={setActive} />,
    ppe: <PPEModule />,
    obs: <ObservationModule />,
    permit: <PermitModule />,
    legal: <LegalModule />,
    audit: <AuditModule />,
    asset: <AssetModule />,
    training: <TrainingModule />,
    induction: <InductionModule />,
    risk: <RiskModule />,
    admin: <AdminModule />,
  };

  const navigate = (id) => { setActive(id); setMobileMenuOpen(false); };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* MOBILE HEADER */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-40" style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center">
            <Icon d={icons.legal} size={14} color="#0f172a" strokeWidth={2.5} />
          </div>
          <div className="font-bold text-slate-100 text-sm">SafeWork <span className="text-cyan-400">Pro</span></div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-400 hover:text-slate-200 transition p-1">
          <Icon d={mobileMenuOpen ? icons.x : icons.menu} size={22} />
        </button>
      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800" style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}>
            <div className="font-bold text-slate-100">All Modules</div>
            <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 p-1"><Icon d={icons.x} size={22} /></button>
          </div>
          <nav className="p-4 grid grid-cols-2 gap-3 overflow-y-auto">
            {NAV.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition ${active === n.id ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600"}`}>
                <Icon d={n.icon} size={24} color={active === n.id ? "#22d3ee" : "currentColor"} />
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className={`hidden md:flex ${sidebarOpen ? "w-56" : "w-14"} flex-shrink-0 bg-slate-900/70 border-r border-slate-800 flex-col transition-all duration-300`}>
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-800 ${!sidebarOpen && "justify-center px-0"}`}>
          <div className="w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center flex-shrink-0">
            <Icon d={icons.legal} size={16} color="#0f172a" strokeWidth={2.5} />
          </div>
          {sidebarOpen && <div className="font-bold text-slate-100 text-sm leading-tight">SafeWork<br /><span className="text-cyan-400 font-semibold">Pro</span></div>}
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all rounded-lg mx-1 ${!sidebarOpen && "justify-center px-0 mx-0"} ${active === n.id ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
              style={{ width: sidebarOpen ? "calc(100% - 8px)" : "100%" }}>
              <Icon d={n.icon} size={18} color={active === n.id ? "#22d3ee" : "currentColor"} />
              {sidebarOpen && <span className="font-medium">{n.label}</span>}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-800 p-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition py-2">
            <Icon d={icons.menu} size={18} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {PAGES[active]}
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {MOBILE_NAV.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition ${active === n.id ? "text-cyan-400" : "text-slate-500"}`}>
            <Icon d={n.icon} size={20} color={active === n.id ? "#22d3ee" : "currentColor"} />
            <span className="font-medium">{n.label}</span>
          </button>
        ))}
        <button onClick={() => setMobileMenuOpen(true)}
          className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition ${mobileMenuOpen ? "text-cyan-400" : "text-slate-500"}`}>
          <Icon d={icons.menu} size={20} />
          <span className="font-medium">More</span>
        </button>
      </nav>

      {/* PWA INSTALL BANNER */}
      {showInstall && (
        <div className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center flex-shrink-0">
            <Icon d={icons.legal} size={18} color="#0f172a" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-100 text-sm">Install SafeWork Pro</div>
            <div className="text-xs text-slate-400 mt-0.5">Add to your home screen for offline access</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <button onClick={install} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold text-xs px-3 py-1.5 rounded-lg transition">Install</button>
            <button onClick={dismiss} className="text-slate-500 hover:text-slate-300 text-xs px-3 py-1 transition">Not now</button>
          </div>
        </div>
      )}
    </div>
  );
}