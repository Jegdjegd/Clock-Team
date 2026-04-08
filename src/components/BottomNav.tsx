import { Globe, Users, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const BottomNav = () => {

  const location = useLocation();

  const styNavbar = "fixed bottom-0 left-0 right-0 glass border-t-0 rounded-t-[2.5rem] px-8 py-4 z-50"

  const buttonFloat = "absolute -top-20 right-5 w-16 h-16 bg-universe-purple rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] border-4 border-universe-dark"
  
  const navbaritems = "flex justify-between items-center max-w-md mx-auto"

  const plusAdd = "text-3xl font-light text-white"

  return (

    <nav className={styNavbar}>

      <div className={navbaritems}>

        <NavItem to="/" 
            icon={<Globe size={22} />} 
            label="ORBIT" 
            active={location.pathname === "/"} />

        <NavItem to="/team" 
            icon={<Users size={22} />} 
            label="TEAM" 
            active={location.pathname === "/team"} />

        <NavItem to="/search" 
            icon={<Search size={22} />}
            label="SEARCH" 
            active={location.pathname === "/search"} />

        <NavItem to="/me" 
            icon={<User size={22} />} 
            label="ME" 
            active={location.pathname === "/me"} />
      </div>
      
      {/* simbolo de agregar flotante  */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        className= {buttonFloat}
      >
        <span className={plusAdd}>+</span>
      </motion.button>

    </nav>
  );
};


// variables

const iconsMob = "flex flex-col items-center gap-1.5 relative"
const pointIcons ="absolute -bottom-2 w-1 h-1 bg-universe-purple rounded-full"
const NavItem =  ({ to, icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
// variables
  

  <Link to={to} className={iconsMob} >

    <div 
      className={`
        transition-all duration-300 
          ${active ? 'text-universe-purple' 
          : 'text-white/40'}`
          }>
      {icon}
    </div>
    
    <span 
      className={`
        text-[9px] font-black tracking-widest transition-all 
          ${active ? 'text-white' 
          : 'text-white/30'}`
          }>
      {label}
    </span>

    {active && (
      <motion.div 
        layoutId="activeTab"
        className= {pointIcons}
      />
    )}
  </Link>
);