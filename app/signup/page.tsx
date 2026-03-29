"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../(dashboard)/employee/employee.css"; 

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    country: "India",
    fullName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Account created! Please log in.");
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to sign up");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F7F8FA' }}>
      <div className="form-card" style={{ maxWidth: "450px", margin: "0", padding: "40px" }}>
        <h2 className="section-title" style={{ fontSize: "32px" }}>Sign Up</h2>
        <p className="section-subtitle" style={{ marginBottom: "24px" }}>Create your company account</p>
        
        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "16px", textAlign: "center" }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Company Name</label>
            <input type="text" required className="form-input" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
          </div>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Country</label>
            <select className="form-input form-select" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Admin Full Name</label>
            <input type="text" required className="form-input" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Admin Email</label>
            <input type="email" required className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary btn--full" disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" }}>
          Already have an account? <Link href="/login" style={{ color: "var(--c-secondary)", fontWeight: "bold" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
