import React from "react";

export function Navbar({ user }: { user: any }) {
  return (
    <nav className="navbar" id="main-navbar">
      <div className="nav-inner">
        <a href="#" className="nav-logo" id="nav-logo">
          <svg className="nav-logo-icon" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#fff" strokeWidth="2" />
            <path d="M9 14l4 4 6-8" stroke="#F0A500" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>ExpenseFlow</span>
        </a>
        <button className="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul className="nav-links" id="nav-links">
          <li><a href="#dashboard" className="nav-link active">Dashboard</a></li>
          <li><a href="#submit-expense" className="nav-link">Submit Expense</a></li>
          <li><a href="#recent-claims" className="nav-link">My Claims</a></li>
          <li><a href="#approval-tracker" className="nav-link">Approvals</a></li>
        </ul>
        <div className="nav-actions">
          <span className="nav-login" style={{ cursor: "default" }}>{user.name}</span>
          <a href="/api/auth/signout" className="nav-cta-btn">Logout</a>
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1 className="hero-heading">
            All your business on<br />
            <span className="hero-highlight">one platform.</span>
          </h1>
          <p className="hero-subheading">
            Simple, efficient, yet <span className="squiggle-word">affordable</span>!
          </p>
          <p className="hero-paragraph">
            Submit expenses in seconds, track approvals clearly, and manage reimbursements without spreadsheets, delays, or confusion.
          </p>
          <div className="hero-cta-group">
            <a href="#submit-expense" className="btn btn-primary" id="hero-submit-btn">Submit your first expense</a>
          </div>
        </div>
        <div className="hero-preview">
          <div className="preview-stack">
            {/* Minimal mockup from legacy */}
            <div className="preview-card preview-card--summary">
              <div className="preview-card-row">
                <div className="mini-stat mini-stat--teal">
                  <span className="mini-stat-value">3</span>
                  <span className="mini-stat-label">Pending</span>
                </div>
                <div className="mini-stat mini-stat--purple">
                  <span className="mini-stat-value">₹24,500</span>
                  <span className="mini-stat-label">Approved</span>
                </div>
              </div>
            </div>
            {/* Form */}
            <div className="preview-card preview-card--form">
              <div className="preview-card-title">New Expense</div>
              <div className="preview-form-row"><span className="preview-label">Title</span><span className="preview-input">Client Dinner</span></div>
              <div className="preview-form-row"><span className="preview-label">Amount</span><span className="preview-input">₹3,200</span></div>
              <div className="preview-badge">Travel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DashboardMetrics({ metrics }: { metrics: any }) {
  return (
    <section className="section" id="dashboard">
      <div className="container">
        <h2 className="section-title">My Expense Dashboard</h2>
        <div className="dashboard-grid">
          <div className="dash-card">
            <div className="dash-card-accent dash-card-accent--blue"></div>
            <div className="dash-card-icon">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" /><path d="M7 12h10M7 8h6M7 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <span className="dash-card-value">{metrics.totalSubmitted}</span>
            <span className="dash-card-label">Total Submitted</span>
          </div>
          <div className="dash-card">
            <div className="dash-card-accent dash-card-accent--teal"></div>
            <div className="dash-card-icon dash-card-icon--teal">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span className="dash-card-value">{metrics.pending}</span>
            <span className="dash-card-label">Pending Approval</span>
          </div>
          <div className="dash-card">
            <div className="dash-card-accent dash-card-accent--purple"></div>
            <div className="dash-card-icon dash-card-icon--purple">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span className="dash-card-value">{metrics.approved}</span>
            <span className="dash-card-label">Approved Claims</span>
          </div>
          <div className="dash-card">
            <div className="dash-card-accent dash-card-accent--yellow"></div>
            <div className="dash-card-icon dash-card-icon--yellow">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span className="dash-card-value">{metrics.reimbursedAmount}</span>
            <span className="dash-card-label">Reimbursed Amount</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function QuickActions() {
  return (
    <section className="section section--light" id="quick-actions">
      <div className="container">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <a href="#submit-expense" className="qa-card">
            <div className="qa-icon qa-icon--teal">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </div>
            <span className="qa-label">New Expense</span>
          </a>
          <a href="#ocr-upload" className="qa-card">
            <div className="qa-icon qa-icon--purple">
              <svg viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span className="qa-label">Upload Receipt</span>
          </a>
          <a href="#recent-claims" className="qa-card">
            <div className="qa-icon qa-icon--yellow">
              <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span className="qa-label">View Claims</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function RecentClaims({ expenses }: { expenses: any[] }) {
  if (!expenses?.length) {
    return (
      <section className="section section--light" id="recent-claims">
        <div className="container">
          <h2 className="section-title">Recent Claims</h2>
          <p style={{ textAlign: "center", color: "#666" }}>No expenses found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--light" id="recent-claims">
      <div className="container">
        <h2 className="section-title">Recent Claims</h2>
        <div className="table-wrapper">
          <table className="claims-table" id="claims-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense: any) => (
                <tr key={expense.id}>
                  <td data-label="Title"><span className="claim-id">{expense.title}</span></td>
                  <td data-label="Category">{expense.category}</td>
                  <td data-label="Date">{new Date(expense.expenseDate).toLocaleDateString()}</td>
                  <td data-label="Amount">{expense.originalCurrency} {expense.amountOriginal}</td>
                  <td data-label="Status">
                    <span className={`status-pill status-pill--${expense.status.toLowerCase()}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td data-label="Notes" className="comment-cell">{expense.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ApprovalTracker({ recentExpense }: { recentExpense: any }) {
  if (!recentExpense) return null;
  return (
    <section className="section" id="approval-tracker">
      <div className="container">
        <h2 className="section-title">Approval Journey</h2>
        <div className="tracker-card">
          <div className="tracker-claim-info">
            <span className="claim-id">{recentExpense.title}</span>
            <span className="tracker-category">{recentExpense.category} — {recentExpense.amountOriginal}</span>
          </div>
          <div className="tracker-stepper">
            <div className="step step--done">
              <div className="step-dot"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#017E84" /><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <span className="step-label">Submitted</span>
            </div>
            <div className="step-connector step-connector--done"></div>
            <div className={`step ${recentExpense.status === "APPROVED" || recentExpense.status === "REIMBURSED" ? "step--done" : "step--active"}`}>
              <div className="step-dot"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#fff" stroke="#017E84" strokeWidth="2" /><circle cx="8" cy="8" r="3" fill="#017E84" /></svg></div>
              <span className="step-label">Manager Review</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${recentExpense.status === "REIMBURSED" ? "step--done" : "step--pending"}`}>
              <div className="step-dot"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#fff" stroke="#DADADA" strokeWidth="2" /></svg></div>
              <span className="step-label">Reimbursed</span>
            </div>
          </div>
          <div className="tracker-note">
            <p>Current Status: <strong>{recentExpense.status}</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OcrUpload() {
  return (
    <section className="section section--light" id="ocr-upload">
      <div className="container">
        <h2 className="section-title">Smart Receipt Scan</h2>
        <p className="section-subtitle">Upload a receipt and let OCR auto-fill amount, date, vendor, and expense details.</p>
        <div className="ocr-grid">
          <div className="ocr-drop-zone">
            <div className="ocr-drop-inner">
              <svg viewBox="0 0 48 48" fill="none" width="56" height="56"><rect x="6" y="10" width="36" height="28" rx="4" stroke="#714B67" strokeWidth="2" /><path d="M6 30l10-8 8 6 8-10 10 12" stroke="#017E84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16" cy="19" r="3" stroke="#F0A500" strokeWidth="2" /></svg>
              <p className="ocr-drop-text">Drag & drop your receipt here</p>
              <span className="ocr-drop-formats">JPG, PNG, PDF supported</span>
              <input type="file" className="form-file-input" accept="image/*,.pdf" />
            </div>
          </div>
          <div className="ocr-result-card" style={{ opacity: 0.5 }}>
            <h3 className="ocr-result-title">Extracted Details (Demo)</h3>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "1rem" }}>OCR Feature is a placeholder per requirements</p>
            <button className="btn btn-primary btn--full" disabled>Auto-fill from receipt</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="nav-logo footer-logo">
            <svg className="nav-logo-icon" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="12" stroke="#714B67" strokeWidth="2" /><path d="M9 14l4 4 6-8" stroke="#F0A500" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ color: "var(--c-primary)", fontWeight: "bold" }}>ExpenseFlow</span>
          </a>
          <p className="footer-tagline">Expense reimbursements made simple.</p>
        </div>
        <p className="footer-copy">&copy; 2026 Odoo Reimbursement Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}
