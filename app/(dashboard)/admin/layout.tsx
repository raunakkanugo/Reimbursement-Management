import "./admin.css"; // The legacy admin CSS
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="admin-scope" style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>
      {/* For simplicity we will render the top Navbar directly here or inside the components */}
      <nav style={{ padding: '1rem 2rem', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>ExpenseFlow Admin</h2>
        <div>
          <span style={{ marginRight: '1rem', fontWeight: 600 }}>{session.user.name}</span>
          <a href="/api/auth/signout" className="btn btn-outline" style={{ display: 'inline-block' }}>Logout</a>
        </div>
      </nav>
      <div style={{ padding: '2rem' }}>
        {children}
      </div>
    </div>
  );
}
