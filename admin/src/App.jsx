import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import UserManagement from './pages/Users/UserManagement';
import RoleHierarchy from './pages/Hierarchy/RoleHierarchy';
import WorkflowBuilder from './pages/Workflow/WorkflowBuilder';
import RuleEngine from './pages/Rules/RuleEngine';
import GlobalExpenses from './pages/Expenses/GlobalExpenses';
import UpdatesCenter from './pages/Updates/UpdatesCenter';
import Settings from './pages/Settings/Settings';
import Auth from './pages/Auth/Auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="hierarchy" element={<RoleHierarchy />} />
          <Route path="workflows" element={<WorkflowBuilder />} />
          <Route path="rules" element={<RuleEngine />} />
          <Route path="expenses" element={<GlobalExpenses />} />
          <Route path="updates" element={<UpdatesCenter />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
