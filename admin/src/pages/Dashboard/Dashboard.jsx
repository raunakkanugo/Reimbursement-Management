import React from 'react';
import { Users, UserCheck, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Jan', expenses: 4000 },
  { name: 'Feb', expenses: 3000 },
  { name: 'Mar', expenses: 2000 },
  { name: 'Apr', expenses: 2780 },
  { name: 'May', expenses: 1890 },
  { name: 'Jun', expenses: 2390 },
  { name: 'Jul', expenses: 3490 },
];

const StatCard = ({ title, value, icon, trend }) => (
  <div className="card stat-card">
    <div className="stat-header">
      <div className="stat-icon">{icon}</div>
      <div className="stat-trend positive">{trend}</div>
    </div>
    <div className="stat-info">
      <h3 className="stat-value">{value}</h3>
      <p className="stat-title">{title}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Control Center</h1>
          <p className="page-subtitle">Welcome back. Here is the system-wide overview.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Employees" value="1,248" icon={<Users className="icon-color-1" />} trend="+12%" />
        <StatCard title="Active Managers" value="84" icon={<UserCheck className="icon-color-2" />} trend="+4%" />
        <StatCard title="Pending Approvals" value="342" icon={<Clock className="icon-color-3" />} trend="-5%" />
        <StatCard title="Monthly Expenses" value="$124,500" icon={<DollarSign className="icon-color-4" />} trend="+18%" />
        <StatCard title="Reimbursements Completed" value="892" icon={<CheckCircle className="icon-color-5" />} trend="+8%" />
      </div>

      <div className="dashboard-content">
        <div className="card chart-card">
          <div className="card-header">
            <h3>Monthly Expenses Overview</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
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
    </div>
  );
};

export default Dashboard;
