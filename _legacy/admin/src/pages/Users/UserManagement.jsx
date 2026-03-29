import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, X } from 'lucide-react';
import './UserManagement.css';

const MOCK_USERS = [
  { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@expenseflow.com', role: 'Manager', department: 'Engineering', manager: 'David Kim', status: 'Active' },
  { id: 2, name: 'Michael Chen', email: 'm.chen@expenseflow.com', role: 'Employee', department: 'Engineering', manager: 'Sarah Jenkins', status: 'Active' },
  { id: 3, name: 'Jessica Parker', email: 'jparker@expenseflow.com', role: 'Employee', department: 'Marketing', manager: 'Alex Thorne', status: 'On Leave' },
  { id: 4, name: 'David Kim', email: 'dkim@expenseflow.com', role: 'Director', department: 'Engineering', manager: 'System', status: 'Active' },
  { id: 5, name: 'Amanda Lewis', email: 'alewis@expenseflow.com', role: 'Manager', department: 'Sales', manager: 'System', status: 'Inactive' },
];

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(MOCK_USERS);

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Users</h1>
          <p className="page-subtitle">Add employees, managers, and organize their roles.</p>
        </div>
        <button className="btn btn-primary btn-with-icon" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by name or email..." className="search-input" />
          </div>
          <div className="table-filters">
            <select className="filter-select">
              <option value="">All Roles</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Manager Assigned</th>
                <th>Status</th>
                <th className="action-col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <div className="user-details">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                  <td>{user.department}</td>
                  <td>{user.manager}</td>
                  <td>
                    <span className={`status-badge ${user.status.replace(' ', '-').toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="action-col">
                    <button className="btn-icon"><MoreHorizontal size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form className="user-form" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="e.g. John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <select required>
                      <option value="">Select Role</option>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select required>
                      <option value="">Select Dept</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Assign Manager</label>
                  <select>
                    <option value="">Select Manager</option>
                    <option value="David Kim">David Kim</option>
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
