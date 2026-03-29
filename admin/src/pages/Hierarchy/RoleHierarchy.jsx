import React, { useState } from 'react';
import { User, ChevronDown, ChevronRight, Briefcase } from 'lucide-react';
import './RoleHierarchy.css';

const MOCK_HIERARCHY = [
  {
    id: 'd1',
    name: 'David Kim',
    role: 'Director of Engineering',
    type: 'manager',
    children: [
      {
        id: 'm1',
        name: 'Sarah Jenkins',
        role: 'Engineering Manager',
        type: 'manager',
        children: [
          { id: 'e1', name: 'Michael Chen', role: 'Frontend Engineer', type: 'employee' },
          { id: 'e2', name: 'Lisa Wang', role: 'Backend Engineer', type: 'employee' }
        ]
      },
      {
        id: 'm2',
        name: 'Tom Harris',
        role: 'QA Manager',
        type: 'manager',
        children: [
          { id: 'e3', name: 'James Wilson', role: 'QA Tester', type: 'employee' }
        ]
      }
    ]
  }
];

const TreeNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="tree-node-container">
      <div className={`tree-node ${node.type}`}>
        {hasChildren ? (
          <button className="expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="expand-spacer"></div>
        )}
        
        <div className="node-content card">
          <div className="node-avatar">
            {node.type === 'manager' ? <Briefcase size={16} /> : <User size={16} />}
          </div>
          <div className="node-info">
            <span className="node-name">{node.name}</span>
            <span className="node-role">{node.role}</span>
          </div>
          <div className="node-actions">
            <select className="assign-select" defaultValue={node.type === 'employee' ? 'assign' : ''}>
              <option value="" disabled>Change Manager</option>
              <option value="assign" disabled hidden>Assigned</option>
              <option value="d1">David Kim</option>
              <option value="m1">Sarah Jenkins</option>
              <option value="m2">Tom Harris</option>
            </select>
          </div>
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const RoleHierarchy = () => {
  return (
    <div className="hierarchy-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reporting Structure</h1>
          <p className="page-subtitle">This defines the first level of approval. Assign employees to their respective managers.</p>
        </div>
      </div>

      <div className="hierarchy-container">
        <div className="hierarchy-tree">
          {MOCK_HIERARCHY.map((rootNode) => (
            <TreeNode key={rootNode.id} node={rootNode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleHierarchy;
