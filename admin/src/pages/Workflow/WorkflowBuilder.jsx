import React, { useState } from 'react';
import { Plus, GripVertical, X, ArrowDown, Shield, Users, Briefcase } from 'lucide-react';
import './WorkflowBuilder.css';

const INITIAL_STEPS = [
  { id: '1', title: 'Manager Approval', role: 'Direct Manager', type: 'manager' },
  { id: '2', title: 'Finance Review', role: 'Finance Department', type: 'finance' },
  { id: '3', title: 'Director Sign-off', role: 'Department Director', type: 'director' },
];

const AVAILABLE_ROLES = [
  { value: 'Direct Manager', label: 'Direct Manager' },
  { value: 'Department Director', label: 'Department Director' },
  { value: 'Finance Department', label: 'Finance Department' },
  { value: 'HR Department', label: 'HR Department' },
  { value: 'CEO', label: 'CEO' },
];

const WorkflowBuilder = () => {
  const [steps, setSteps] = useState(INITIAL_STEPS);

  const moveStep = (index, direction) => {
    const newSteps = [...steps];
    if (direction === 'up' && index > 0) {
      [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    } else if (direction === 'down' && index < steps.length - 1) {
      [newSteps[index + 1], newSteps[index]] = [newSteps[index], newSteps[index + 1]];
    }
    setSteps(newSteps);
  };

  const removeStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const addStep = () => {
    setSteps([...steps, { id: Date.now().toString(), title: 'New Approval Step', role: 'Direct Manager', type: 'manager' }]);
  };

  const updateStepRole = (id, newRole) => {
    setSteps(steps.map(step => step.id === id ? { ...step, role: newRole } : step));
  };

  return (
    <div className="workflow-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Approval Workflow Setup</h1>
          <p className="page-subtitle">Configure the sequence of approvals for expense reimbursements.</p>
        </div>
        <button className="btn btn-primary btn-with-icon" onClick={addStep}>
          <Plus size={18} /> Add New Step
        </button>
      </div>

      <div className="workflow-container">
        <div className="workflow-timeline">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="workflow-step-card card">
                <div className="step-drag-handle">
                  <GripVertical size={20} />
                </div>
                
                <div className="step-number">{index + 1}</div>
                
                <div className="step-content">
                  <div className="step-header">
                    <div className="step-title-group">
                      {step.type === 'manager' && <Users size={18} className="step-icon manager" />}
                      {step.type === 'finance' && <Briefcase size={18} className="step-icon finance" />}
                      {step.type === 'director' && <Shield size={18} className="step-icon director" />}
                      <h3>{step.title}</h3>
                    </div>
                    
                    <div className="step-actions">
                      <button 
                        className="btn-icon" 
                        onClick={() => moveStep(index, 'up')} 
                        disabled={index === 0}
                      >
                        <ArrowDown size={16} className="rotate-180" />
                      </button>
                      <button 
                        className="btn-icon" 
                        onClick={() => moveStep(index, 'down')} 
                        disabled={index === steps.length - 1}
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button className="btn-icon text-danger" onClick={() => removeStep(step.id)}>
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="step-body">
                    <div className="form-group">
                      <label>Approver Role</label>
                      <select 
                        value={step.role} 
                        onChange={(e) => updateStepRole(step.id, e.target.value)}
                        className="role-select"
                      >
                        {AVAILABLE_ROLES.map(role => (
                          <option key={role.value} value={role.value}>{role.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="workflow-connector">
                  <ArrowDown size={24} />
                </div>
              )}
            </React.Fragment>
          ))}
          
          <div className="workflow-end">
            <div className="end-badge">
              <Shield size={16} /> Final Approval
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
