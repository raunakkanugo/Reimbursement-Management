import React, { useState } from 'react';
import { Filter, Search, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import './GlobalExpenses.css';

const MOCK_EXPENSES = [
  { id: 'EXP-4829', employee: 'Michael Chen', category: 'Travel', amount: '$1,245.00', status: 'Pending', stage: 'Manager Approval', date: 'Oct 24, 2026' },
  { id: 'EXP-4830', employee: 'Sarah Jenkins', category: 'Software', amount: '$299.00', status: 'Approved', stage: 'Completed', date: 'Oct 23, 2026' },
  { id: 'EXP-4831', employee: 'David Kim', category: 'Meals', amount: '$145.50', status: 'Pending', stage: 'Finance Review', date: 'Oct 23, 2026' },
  { id: 'EXP-4832', employee: 'Jessica Parker', category: 'Travel', amount: '$850.00', status: 'Rejected', stage: 'Manager Approval', date: 'Oct 22, 2026' },
  { id: 'EXP-4833', employee: 'James Wilson', category: 'Equipment', amount: '$2,400.00', status: 'Pending', stage: 'Director Sign-off', date: 'Oct 21, 2026' },
];

const GlobalExpenses = () => {
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleOverride = (id, action) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, status: action === 'approve' ? 'Approved' : 'Rejected', stage: 'Admin Override' } : exp
    ));
    setSelectedExpense(null);
  };

  return (
    <div className="expenses-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Expenses Overview</h1>
          <p className="page-subtitle">Track, monitor, and manage every expense claim in the system.</p>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by employee or ID..." className="search-input" />
          </div>
          <div className="table-filters">
            <div className="filter-group">
              <Filter size={16} className="filter-icon" />
              <select className="filter-select">
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="filter-group">
              <select className="filter-select">
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="filter-group">
              <select className="filter-select">
                <option value="">This Month</option>
                <option value="last">Last Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Approval Stage</th>
                <th>Date</th>
                <th className="action-col"></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className={selectedExpense === expense.id ? 'selected-row' : ''}>
                  <td className="fw-600">{expense.id}</td>
                  <td>{expense.employee}</td>
                  <td>
                    <span className="category-tag">{expense.category}</span>
                  </td>
                  <td className="fw-600">{expense.amount}</td>
                  <td>
                    <span className={`status-badge ${expense.status.toLowerCase()}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="stage-cell">{expense.stage}</td>
                  <td className="date-cell">{expense.date}</td>
                  <td className="action-col">
                    {expense.status === 'Pending' && (
                      <button 
                        className="btn btn-outline btn-sm override-btn"
                        onClick={() => setSelectedExpense(selectedExpense === expense.id ? null : expense.id)}
                      >
                        <ShieldAlert size={14} /> Override
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedExpense && (
        <div className="override-panel card">
          <div className="override-header">
            <h3>Admin Override: {selectedExpense}</h3>
            <button className="btn-icon" onClick={() => setSelectedExpense(null)}>
              <XCircle size={18} />
            </button>
          </div>
          <p className="override-warning">
            You are about to bypass the standard approval workflow. This action will be logged.
          </p>
          <div className="override-actions">
            <button 
              className="btn btn-danger-outline"
              onClick={() => handleOverride(selectedExpense, 'reject')}
            >
              <XCircle size={16} /> Force Reject
            </button>
            <button 
              className="btn btn-success"
              onClick={() => handleOverride(selectedExpense, 'approve')}
            >
              <CheckCircle size={16} /> Force Approve
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalExpenses;
