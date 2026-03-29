"use client";

import { Users, UserCheck, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboardClient({ metrics }: { metrics: any }) {

  // Simple hardcoded data for the chart as before, but you could pass real monthly data here
  const data = [
    { name: 'Jan', expenses: 4000 },
    { name: 'Feb', expenses: 3000 },
    { name: 'Mar', expenses: 2000 },
    { name: 'Apr', expenses: Math.max(2780, metrics.totalCompanyExpenses / 4) },
    { name: 'May', expenses: Math.max(1890, metrics.totalCompanyExpenses / 3) },
    { name: 'Jun', expenses: Math.max(2390, metrics.totalCompanyExpenses / 2) },
    { name: 'Jul', expenses: metrics.totalCompanyExpenses || 3490 },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', margin: 0 }}>System Control Center</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Live analytics and user metrics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <Users style={{ color: "var(--color-primary)" }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{metrics.totalEmployees}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0 }}>Total Employees</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <UserCheck style={{ color: "var(--color-secondary)" }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{metrics.activeManagers}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0 }}>Active Managers</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <Clock style={{ color: "var(--color-highlight)" }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{metrics.pendingApprovals}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0 }}>Pending Approvals</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <DollarSign style={{ color: "var(--color-accent)" }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{metrics.totalCompanyExpenses}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0 }}>Total Company Expenses</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <CheckCircle style={{ color: "mediumseagreen" }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{metrics.completedReimbursements}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0 }}>Reimbursements Completed</p>
        </div>
      </div>

      <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1.5rem', flexShrink: 0 }}>Monthly Expenses Overview</h3>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--color-text-light)" />
              <YAxis stroke="var(--color-text-light)" />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
                itemStyle={{ color: 'var(--color-primary)' }}
              />
              <Area type="monotone" dataKey="expenses" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
