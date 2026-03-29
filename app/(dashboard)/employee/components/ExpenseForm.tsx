"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExpenseForm({ companyId, employeeId }: { companyId: string, employeeId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amountOriginal: "",
    originalCurrency: "INR",
    category: "",
    expenseDate: "",
    description: "",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amountOriginal: parseFloat(formData.amountOriginal),
          status: isDraft ? "DRAFT" : "SUBMITTED"
        }),
      });

      if (response.ok) {
        alert("Expense " + (isDraft ? "saved as draft" : "submitted successfully"));
        setFormData({ title: "", amountOriginal: "", originalCurrency: "INR", category: "", expenseDate: "", description: "", notes: ""});
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to submit expense");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="submit-expense">
      <div className="container">
        <h2 className="section-title">Submit New Expense</h2>
        <div className="form-card">
          <form id="expense-form" autoComplete="off" onSubmit={(e) => handleSubmit(e, false)}>
            <div className="form-grid">
              <div className="form-group form-group--full">
                <label htmlFor="expense-title" className="form-label">Expense Title</label>
                <input required type="text" id="expense-title" className="form-input" placeholder="e.g. Client dinner in Delhi" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="expense-amount" className="form-label">Amount</label>
                <input required type="number" step="0.01" id="expense-amount" className="form-input" placeholder="0.00" value={formData.amountOriginal} onChange={e => setFormData({...formData, amountOriginal: e.target.value})} />
                <span className="form-helper" id="converted-amount">Converted value tracked by system automatically</span>
              </div>
              <div className="form-group">
                <label htmlFor="expense-currency" className="form-label">Currency</label>
                <select id="expense-currency" className="form-input form-select" value={formData.originalCurrency} onChange={e => setFormData({...formData, originalCurrency: e.target.value})}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="expense-category" className="form-label">Category</label>
                <select required id="expense-category" className="form-input form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="" disabled>Select category</option>
                  <option value="Travel">Travel</option>
                  <option value="Meals">Meals</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Client Meeting">Client Meeting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="expense-date" className="form-label">Date</label>
                <input required type="date" id="expense-date" className="form-input" value={formData.expenseDate} onChange={e => setFormData({...formData, expenseDate: e.target.value})} />
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="expense-desc" className="form-label">Description</label>
                <textarea id="expense-desc" className="form-input form-textarea" rows={3} placeholder="Briefly describe the expense…" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea id="expense-notes" className="form-input form-textarea" rows={3} placeholder="Any extra context for the reviewer…" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={(e) => handleSubmit(e, true)} disabled={loading}>Save Draft</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Submitting..." : "Submit Claim"}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
