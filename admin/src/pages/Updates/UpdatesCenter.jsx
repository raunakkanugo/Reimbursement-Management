import React, { useState } from 'react';
import { Megaphone, MessageSquare, AlertCircle, FileText, Send, Calendar, User } from 'lucide-react';
import './UpdatesCenter.css';

const INITIAL_UPDATES = [
  { 
    id: 1, 
    title: 'New reimbursement policy for travel updated.', 
    description: 'Starting next month, all international travel requires pre-approval from the department director. The daily meal allowance has also been increased by 15%.', 
    tag: 'Policy', 
    audience: 'All Users',
    author: 'Admin User',
    date: 'Oct 24, 2026',
    icon: <FileText size={20} />
  },
  { 
    id: 2, 
    title: 'Q3 Expense Reports Due', 
    description: 'Please ensure all Q3 expenses are submitted by the end of this week to avoid processing delays in the upcoming financial audit.', 
    tag: 'Finance', 
    audience: 'Managers',
    author: 'Finance Team',
    date: 'Oct 20, 2026',
    icon: <AlertCircle size={20} />
  },
];

const UpdatesCenter = () => {
  const [updates, setUpdates] = useState(INITIAL_UPDATES);
  const [formData, setFormData] = useState({ title: '', description: '', tag: 'Compliance', audience: 'All Users' });

  const handlePublish = (e) => {
    e.preventDefault();
    const newUpdate = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      tag: formData.tag,
      audience: formData.audience,
      author: 'Admin User',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      icon: formData.tag === 'Policy' ? <FileText size={20} /> : formData.tag === 'Finance' ? <AlertCircle size={20} /> : <MessageSquare size={20} />
    };
    setUpdates([newUpdate, ...updates]);
    setFormData({ title: '', description: '', tag: 'Compliance', audience: 'All Users' });
  };

  return (
    <div className="updates-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Updates & Announcements</h1>
          <p className="page-subtitle">Communicate policy changes and important news to your team.</p>
        </div>
      </div>

      <div className="updates-layout">
        <div className="updates-composer card">
          <div className="composer-header">
            <h3><Megaphone size={18} className="text-primary" /> Create New Update</h3>
          </div>
          <form className="composer-form" onSubmit={handlePublish}>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                placeholder="Brief, clear announcement title..." 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea 
                rows="4" 
                placeholder="Provide the details of this announcement..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Category Tag</label>
                <select 
                  value={formData.tag}
                  onChange={e => setFormData({...formData, tag: e.target.value})}
                >
                  <option value="Compliance">Compliance</option>
                  <option value="Policy">Policy</option>
                  <option value="Finance">Finance</option>
                  <option value="General">General News</option>
                </select>
              </div>
              <div className="form-group">
                <label>Visible To</label>
                <select
                  value={formData.audience}
                  onChange={e => setFormData({...formData, audience: e.target.value})}
                >
                  <option value="All Users">All Users (Employees & Managers)</option>
                  <option value="Managers">Managers Only</option>
                  <option value="Employees">Employees Only</option>
                </select>
              </div>
            </div>
            
            <div className="composer-footer">
              <button type="submit" className="btn btn-primary btn-with-icon w-full">
                <Send size={16} /> Publish Update
              </button>
            </div>
          </form>
        </div>

        <div className="updates-feed">
          <h3 className="feed-title">Recent Announcements</h3>
          
          <div className="feed-list">
            {updates.map(update => (
              <div key={update.id} className="update-card card">
                <div className="update-card-header">
                  <div className="update-title-group">
                    <div className={`update-icon ${update.tag.toLowerCase()}`}>
                      {update.icon}
                    </div>
                    <h4>{update.title}</h4>
                  </div>
                  <span className={`tag-badge ${update.tag.toLowerCase()}`}>{update.tag}</span>
                </div>
                
                <div className="update-card-body">
                  <p>{update.description}</p>
                </div>
                
                <div className="update-card-footer">
                  <div className="meta-info">
                    <Calendar size={14} className="meta-icon" /> {update.date}
                  </div>
                  <div className="meta-info">
                    <User size={14} className="meta-icon" /> {update.author}
                  </div>
                  <div className="audience-badge">
                    Visible to: <strong>{update.audience}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesCenter;
