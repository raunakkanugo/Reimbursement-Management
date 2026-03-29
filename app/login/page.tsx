"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../(dashboard)/employee/employee.css"; // Reuse the global CSS

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F7F8FA' }}>
      <div className="form-card" style={{ maxWidth: "400px", margin: "0", padding: "40px" }}>
        <h2 className="section-title" style={{ fontSize: "32px" }}>Sign In</h2>
        <p className="section-subtitle" style={{ marginBottom: "24px" }}>Welcome back to ExpenseFlow</p>
        
        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "16px", textAlign: "center" }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Email</label>
            <input type="email" required className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary btn--full">Sign In</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" }}>
          Don't have an account? <Link href="/signup" style={{ color: "var(--c-secondary)", fontWeight: "bold" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
