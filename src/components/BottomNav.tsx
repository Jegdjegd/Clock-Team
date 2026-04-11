import { Globe, Users, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { AddTeammateModal } from "./AddTeammateModal";

export const BottomNav = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AddTeammateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Bottom nav — solo mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t-0 rounded-t-[2.5rem] px-8 py-4 z-40">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavItem to="/" icon={<Globe size={22} />} label="ORBIT" active={location.pathname === "/"} />
          <NavItem to="/team" icon={<Users size={22} />} label="TEAM" active={location.pathname === "/team"} />
          <NavItem to="/search" icon={<Search size={22} />} label="SEARCH" active={location.pathname === "/search"} />
          <NavItem to="/me" icon={<User size={22} />} label="ME" active={location.pathname === "/me"} />
        </div>

        {/* Botón + mobile */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setModalOpen(true)}
          className="absolute -top-20 right-5 w-16 h-16 bg-universe-purple rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] border-4 border-universe-dark z-50"
        >
          <span className="text-3xl font-light text-white">+</span>
        </motion.button>
      </nav>

      {/* Botón + desktop — solo visible en md+ */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setModalOpen(true)}
        className="hidden md:flex fixed bottom-8 right-8 w-14 h-14 bg-universe-purple rounded-full items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.5)] border-2 border-universe-purple/50 z-50"
      >
        <span className="text-2xl font-light text-white">+</span>
      </motion.button>
    </>
  );
};

const NavItem = ({ to, icon, label, active }: {
  to: string;
  icon: any;
  label: string;
  active: boolean;
}) => (
  <Link to={to} className="flex flex-col items-center gap-1.5 relative">
    <div className={`transition-all duration-700 ${active ? "text-universe-purple" : "text-white/40"}`}>
      {icon}
    </div>
    <span className={`text-[9px] font-black tracking-widest transition-all ${active ? "text-white" : "text-white/30"}`}>
      {label}
    </span>
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute -bottom-2 w-1 h-1 bg-universe-purple rounded-full"
      />
    )}
  </Link>
);