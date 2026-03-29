import React from 'react';
import { Bell, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" className="navbar-brand">
          ExpenseFlow
        </a>
      </div>
      
      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>
        
        <button className="navbar-icon-btn" aria-label="Settings">
          <Settings size={20} />
        </button>

        <div className="navbar-profile">
          <div className="avatar">AD</div>
          <div className="admin-info">
            <span className="admin-name">Admin User</span>
            <span className="admin-role">Super Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
