"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManagerDashboardClient({ user, metrics, pendingApprovals, allTeamExpenses }: { user: any, metrics: any, pendingApprovals: any[], allTeamExpenses: any[] }) {
  const router = useRouter();
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [comment, setComment] = useState("");

  const handleOpenPanel = (expense: any) => {
    setSelectedExpense(expense);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedExpense(null);
    setComment("");
  };

  const handleApprovalAction = async (decision: "APPROVED" | "REJECTED") => {
    if (!selectedExpense) return;
    setActionLoading(true);

    try {
      const res = await fetch("/api/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expenseId: selectedExpense.id,
          decision,
          comment
        })
      });

      if (res.ok) {
        alert("Expense " + decision.toLowerCase() + " successfully.");
        handleClosePanel();
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to process approval");
      }
    } catch (e) {
      console.error(e);
      alert("Error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <span>ExpenseFlow Manager</span>
          </div>
          <ul className="nav-links">
            <li className="active"><a href="#">Dashboard</a></li>
            <li><a href="#">Approvals</a></li>
            <li><a href="#">Team Expenses</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="profile-menu">
            <span className="manager-name">{user.name}</span>
            <a href="/api/auth/signout" style={{ color: "white", textDecoration: "underline", marginLeft: "1rem", fontSize: "14px" }}>Logout</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>Manage approvals with <span className="highlight-underline">clarity.</span></h1>
          <p>Review expenses, apply rules, and approve claims faster with full visibility.</p>
        </div>
      </header>

      <main className="dashboard-core">
        <section className="summary-cards">
          <div className="card summary-card pending-card">
            <div className="card-data">
              <span className="card-title">Pending Approvals</span>
              <span className="card-value">{metrics.pending}</span>
            </div>
          </div>
          <div className="card summary-card approved-card">
            <div className="card-data">
              <span className="card-title">Approved Today</span>
              <span className="card-value">{metrics.approved}</span>
            </div>
          </div>
          <div className="card summary-card rejected-card">
            <div className="card-data">
              <span className="card-title">Rejected Today</span>
              <span className="card-value">{metrics.rejected}</span>
            </div>
          </div>
          <div className="card summary-card time-card">
            <div className="card-data">
              <span className="card-title">Total Team Claims</span>
              <span className="card-value">{allTeamExpenses.length}</span>
            </div>
          </div>
        </section>

        <div className="main-content-grid">
          <section className="pending-list-section card">
            <div className="section-header">
              <h2>Pending Approval Requests</h2>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Expense Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map(expense => (
                    <tr key={expense.id}>
                      <td>{expense.employee.fullName}</td>
                      <td><span className="expense-title">{expense.title}</span></td>
                      <td><span className="expense-badge">{expense.category}</span></td>
                      <td>
                        <div className="amount-cell">
                          <span className="amount-main">{expense.originalCurrency} {expense.amountOriginal}</span>
                        </div>
                      </td>
                      <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                      <td>
                        <button className="btn-view" onClick={() => handleOpenPanel(expense)}>Review</button>
                      </td>
                    </tr>
                  ))}
                  {pendingApprovals.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "#666" }}>No pending approvals. great job!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="side-widgets">
            <section className="team-overview card">
              <div className="section-header">
                <h2>Team Expense Overview</h2>
              </div>
              <div className="overview-stats">
                <div className="stat">
                  <span className="stat-label">Total Claims Count</span>
                  <span className="stat-value">{allTeamExpenses.length}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className={`panel-overlay ${isPanelOpen ? "active" : ""}`} onClick={handleClosePanel}></div>
      <aside className={`detail-panel ${isPanelOpen ? "open" : ""}`}>
        {selectedExpense && (
          <>
            <div className="panel-header">
              <h2>Expense Details</h2>
              <button className="close-btn" onClick={handleClosePanel}>X</button>
            </div>
            
            <div className="panel-content">
              <div className="employee-summary">
                <div className="employee-info">
                  <h3>{selectedExpense.employee.fullName}</h3>
                </div>
                <div className="submission-time">
                  Submitted: {new Date(selectedExpense.submittedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="expense-breakdown">
                <div className="amount-card">
                  <span className="amount-label">Requested Amount</span>
                  <h3>{selectedExpense.originalCurrency} {selectedExpense.amountOriginal}</h3>
                  <span className="conversion">(Approx INR {selectedExpense.amountInCompanyCurrency})</span>
                </div>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="label">Date</span>
                    <span className="value">{new Date(selectedExpense.expenseDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Category</span>
                    <span className="value">{selectedExpense.category}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="label">Title</span>
                    <span className="value">{selectedExpense.title}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="label">Description & Notes</span>
                    <p className="value notes">{selectedExpense.description || "No description provided."}</p>
                    <p className="value notes" style={{ marginTop: "10px" }}>{selectedExpense.notes}</p>
                  </div>
                </div>
              </div>
              
              <div className="action-panel" style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                <div className="comment-box" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                  <label style={{ fontSize: "14px", fontWeight: "600" }}>Add comment (optional)</label>
                  <textarea 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="e.g. Approved, great work!"
                    style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", resize: "vertical", minHeight: "80px" }}
                  ></textarea>
                </div>
                <div className="action-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                  <button 
                    style={{ padding: "0.75rem 1.5rem", borderRadius: "8px", background: "#E11D48", color: "white", border: "none", cursor: "pointer" }}
                    onClick={() => handleApprovalAction("REJECTED")}
                    disabled={actionLoading}
                  >
                    Reject
                  </button>
                  <button 
                    style={{ padding: "0.75rem 1.5rem", borderRadius: "8px", background: "#017E84", color: "white", border: "none", cursor: "pointer" }}
                    onClick={() => handleApprovalAction("APPROVED")}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Processing..." : "Approve"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
