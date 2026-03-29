import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  GitMerge, 
  Cpu, 
  Receipt, 
  Megaphone, 
  Settings 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Roles & Hierarchy', path: '/hierarchy', icon: <Network size={20} /> },
    { name: 'Approval Workflows', path: '/workflows', icon: <GitMerge size={20} /> },
    { name: 'Rules Engine', path: '/rules', icon: <Cpu size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <Receipt size={20} /> },
    { name: 'Updates', path: '/updates', icon: <Megaphone size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="footer-text">ExpenseFlow Admin Panel</div>
        <div className="footer-sub">Control everything. Miss nothing.</div>
      </div>
    </aside>
  );
};

export default Sidebar;
