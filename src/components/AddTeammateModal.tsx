// src/components/AddTeammateModal.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, AtSign, Camera, Mail, Globe, User, ChevronDown } from "lucide-react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addTeammate } from "../store/slices/    teammatesSlice";

const TIMEZONES = [
  { label: "UTC+0 — London", value: "Europe/London", city: "London" },
  { label: "UTC+1 — Madrid", value: "Europe/Madrid", city: "Madrid" },
  { label: "UTC+2 — Berlin", value: "Europe/Berlin", city: "Berlin" },
  { label: "UTC+3 — Moscow", value: "Europe/Moscow", city: "Moscow" },
  { label: "UTC+5:30 — Mumbai", value: "Asia/Kolkata", city: "Mumbai" },
  { label: "UTC+7 — Bangkok", value: "Asia/Bangkok", city: "Bangkok" },
  { label: "UTC+8 — Singapore", value: "Asia/Singapore", city: "Singapore" },
  { label: "UTC+9 — Tokyo", value: "Asia/Tokyo", city: "Tokyo" },
  { label: "UTC+10 — Sydney", value: "Australia/Sydney", city: "Sydney" },
  { label: "UTC-3 — Buenos Aires", value: "America/Argentina/Buenos_Aires", city: "Buenos Aires" },
  { label: "UTC-5 — New York", value: "America/New_York", city: "New York" },
  { label: "UTC-6 — Chicago", value: "America/Chicago", city: "Chicago" },
  { label: "UTC-8 — Los Angeles", value: "America/Los_Angeles", city: "Los Angeles" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingInput = ({
  label, placeholder, value, onChange, type = "text", icon,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: React.ReactNode;
}) => (
  <div className="relative pt-3">
    <div className="absolute top-0 left-3 z-10 px-2.5 py-0.5 rounded-full border border-universe-blue/30 bg-[#0d1529]">
      <span className="text-[9px] text-universe-blue font-bold tracking-widest uppercase">
        {label}
      </span>
    </div>
    <div className="flex items-center gap-3 border border-white/10 rounded-2xl px-4 py-3.5 bg-white/[0.03] focus-within:border-universe-blue/40 transition-colors">
      {icon && (
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none"
      />
    </div>
  </div>
);

const SectionTitle = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="text-universe-blue">{icon}</div>
    <span className="text-universe-blue text-[10px] font-black tracking-[0.25em] uppercase">
      {label}
    </span>
  </div>
);

const Divider = () => <div className="border-t border-white/5 my-5" />;

export const AddTeammateModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [contactOpen, setContactOpen] = useState(true);
  const [form, setForm] = useState({
    name: "", city: "", timezone: TIMEZONES[0].value,
    whatsapp: "", slack: "", instagram: "",
    email: "", website: "",
  });
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (v: string) =>
    setForm(f => ({ ...f, [key]: v }));

  const handleSubmit = () => {
    if (!form.name.trim()) { setError("Name is required"); return; }
    const selectedTz = TIMEZONES.find(tz => tz.value === form.timezone) ?? TIMEZONES[0];
    const city = form.city.trim() || selectedTz.city;

    dispatch(addTeammate({
      id: Date.now().toString(),
      name: form.name.trim(),
      role: form.slack.trim() ? `@${form.slack.trim()}` : "Team Member",
      email: form.email.trim(),
      timezone: selectedTz.value,
      city,
      location: city,
      delay: `${(Math.random() * 3 + 1).toFixed(1)}s`,
    }));

    setForm({
      name: "", city: "", timezone: TIMEZONES[0].value,
      whatsapp: "", slack: "", instagram: "", email: "", website: "",
    });
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl z-10 overflow-hidden"
            style={{ background: "#0d1529" }}
          >
            {/* Scroll sin scrollbar */}
            <div
              className="max-h-[88vh] overflow-y-auto px-6 py-6"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>

              {/* ── Header ── */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-white font-black text-2xl tracking-tight leading-tight">
                    ADD NEW TEAM<br />MEMBER
                  </h2>
                  <p className="text-white/30 text-xs mt-1">
                    Enterprise Data Integration Protocol
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors mt-1"
                >
                  <X size={15} className="text-white/50" />
                </button>
              </div>

              <Divider />

              {/* ── Identity Details ── */}
              <SectionTitle icon={<User size={13} />} label="Identity Details" />
              <div className="flex flex-col gap-7">
                <FloatingInput
                  label="Full Name"
                  placeholder="Orion Vance"
                  value={form.name}
                  onChange={set("name")}
                />
                <div className="grid grid-cols-2 gap-5">
                  <FloatingInput
                    label="City"
                    placeholder="Tokyo"
                    value={form.city}
                    onChange={set("city")}
                  />
                  {/* Timezone select */}
                  <div className="relative pt-3">
                    <div className="absolute top-0 left-3 z-10 px-2.5 py-0.5 rounded-full border border-universe-blue/30 bg-[#0d1529]">
                      <span className="text-[9px] text-universe-blue font-bold tracking-widest uppercase">
                        Timezone
                      </span>
                    </div>
                    <select
                      value={form.timezone}
                      onChange={e => set("timezone")(e.target.value)}
                      className="w-full border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-universe-blue/50 transition-colors appearance-none"
                      style={{ background: "#0d1529" }}
                    >
                      {TIMEZONES.map(tz => (
                        <option key={tz.value} value={tz.value} style={{ background: "#0d1529" }}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Divider />

              {/* ── Primary Social Channels ── */}
              <SectionTitle icon={<AtSign size={13} />} label="Primary Social Channels" />
              <div className="flex flex-col gap-7">
                <FloatingInput
                  label="WhatsApp"
                  placeholder="+1 000 000 0000"
                  value={form.whatsapp}
                  onChange={set("whatsapp")}
                  icon={<MessageSquare size={13} className="text-white/30" />}
                />
                <FloatingInput
                  label="Slack ID"
                  placeholder="@username"
                  value={form.slack}
                  onChange={set("slack")}
                  icon={<AtSign size={13} className="text-white/30" />}
                />
                <FloatingInput
                  label="Instagram"
                  placeholder="@username"
                  value={form.instagram}
                  onChange={set("instagram")}
                  icon={<Camera size={13} className="text-white/30" />}
                />
              </div>

              <Divider />

              {/* ── Additional Contact Methods — colapsable ── */}
              <button
                onClick={() => setContactOpen(o => !o)}
                className="flex items-center justify-between w-full mb-4 group"
              >
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-universe-blue" />
                  <span className="text-universe-blue text-[10px] font-black tracking-[0.25em] uppercase">
                    Additional Contact Methods
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: contactOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} className="text-universe-blue/60" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {contactOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="flex flex-col gap-7 pb-2">
                      <FloatingInput
                        label="Corporate Email"
                        placeholder="orion@company.com"
                        value={form.email}
                        onChange={set("email")}
                        type="email"
                        icon={<Mail size={13} className="text-white/30" />}
                      />
                      <FloatingInput
                        label="Portfolio Website"
                        placeholder="https://orion.dev"
                        value={form.website}
                        onChange={set("website")}
                        icon={<Globe size={13} className="text-white/30" />}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <p className="text-red-400 text-xs mt-3 font-medium">{error}</p>
              )}

              <Divider />

              {/* ── Buttons ── */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 rounded-2xl border border-white/10 text-white/40 text-xs font-black tracking-widest hover:bg-white/5 transition-colors"
                >
                  CANCEL
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  className="flex-1 py-3.5 rounded-2xl bg-universe-blue text-white text-xs font-black tracking-widest hover:bg-universe-blue/80 transition-colors flex items-center justify-center gap-2"
                >
                  ADD TO UNIVERSE
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};