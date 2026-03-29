import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Settings2, ShieldCheck, Percent, HelpCircle } from 'lucide-react';
import './RuleEngine.css';

const INITIAL_RULES = [
  { id: 1, name: 'Standard Consensus', type: 'percentage', value: 60, active: true },
  { id: 2, name: 'Executive Override', type: 'specific', value: 'CFO', active: true },
  { id: 3, name: 'Hybrid Fast-track', type: 'hybrid', percentage: 60, role: 'CFO', active: false },
];

const RuleEngine = () => {
  const [rules, setRules] = useState(INITIAL_RULES);

  const toggleRule = (id) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, active: !rule.active } : rule));
  };

  const getRulePreview = (rule) => {
    if (rule.type === 'percentage') {
      return `This expense will be auto-approved if ${rule.value}% of assigned approvers approve.`;
    } else if (rule.type === 'specific') {
      return `This expense will be auto-approved immediately if ${rule.value} approves.`;
    } else if (rule.type === 'hybrid') {
      return `This expense will be auto-approved if ${rule.role} approves OR ${rule.percentage}% approvals are met.`;
    }
  };

  return (
    <div className="rules-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Smart Approval Rules</h1>
          <p className="page-subtitle">Define intelligent conditions to bypass or accelerate standard workflows.</p>
        </div>
        <button className="btn btn-primary">Add New Rule</button>
      </div>

      <div className="rules-grid">
        {rules.map(rule => (
          <div className={`card rule-card ${rule.active ? 'active-rule' : ''}`} key={rule.id}>
            <div className="rule-header">
              <div className="rule-title-group">
                <div className={`rule-icon ${rule.type}`}>
                  {rule.type === 'percentage' && <Percent size={20} />}
                  {rule.type === 'specific' && <ShieldCheck size={20} />}
                  {rule.type === 'hybrid' && <Settings2 size={20} />}
                </div>
                <h3>{rule.name}</h3>
              </div>
              <button 
                className={`toggle-btn ${rule.active ? 'on' : 'off'}`} 
                onClick={() => toggleRule(rule.id)}
                aria-label="Toggle Rule"
              >
                {rule.active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>
            
            <div className="rule-body">
              <div className="rule-type-badge">
                {rule.type === 'percentage' ? 'Percentage Based' : rule.type === 'specific' ? 'Role Based' : 'Hybrid Rule'}
              </div>

              <div className="rule-config">
                {rule.type === 'percentage' && (
                  <div className="form-group form-group-inline">
                    <label>Approval Threshold (%)</label>
                    <input type="number" defaultValue={rule.value} min="1" max="100" className="rule-input-sm" />
                  </div>
                )}
                
                {rule.type === 'specific' && (
                  <div className="form-group form-group-inline">
                    <label>Auto-Approve Role</label>
                    <select defaultValue={rule.value} className="rule-input-md">
                      <option value="CFO">CFO</option>
                      <option value="CEO">CEO</option>
                      <option value="Director">Director</option>
                    </select>
                  </div>
                )}
                
                {rule.type === 'hybrid' && (
                  <>
                    <div className="form-group form-group-inline">
                      <label>Threshold (%)</label>
                      <input type="number" defaultValue={rule.percentage} className="rule-input-sm" />
                    </div>
                    <span className="or-divider">OR</span>
                    <div className="form-group form-group-inline">
                      <label>Role</label>
                      <select defaultValue={rule.role} className="rule-input-md">
                        <option value="CFO">CFO</option>
                        <option value="CEO">CEO</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="rule-footer">
              <div className="preview-label">
                <HelpCircle size={14} /> Example Preview
              </div>
              <p className="rule-preview-text">"{getRulePreview(rule)}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuleEngine;
