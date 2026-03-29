import React, { useState } from 'react';
import { Globe, DollarSign, Webhook, Save, ToggleLeft, ToggleRight, Check } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [country, setCountry] = useState('US');
  const [currency, setCurrency] = useState('USD');
  const [conversionEnabled, setConversionEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleCountryChange = (e) => {
    const val = e.target.value;
    setCountry(val);
    if (val === 'US') setCurrency('USD');
    else if (val === 'UK') setCurrency('GBP');
    else if (val === 'IN') setCurrency('INR');
    else if (val === 'EU') setCurrency('EUR');
    else if (val === 'JP') setCurrency('JPY');
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Configure regional defaults, integrations, and global platform behavior.</p>
        </div>
        <button className="btn btn-primary btn-with-icon" onClick={handleSave}>
          {saved ? <><Check size={18} /> Saved</> : <><Save size={18} /> Save Settings</>}
        </button>
      </div>

      <div className="settings-grid">
        <div className="settings-section card">
          <div className="section-header">
            <Globe size={20} className="text-secondary" />
            <h3>Regional & Currency Defaults</h3>
          </div>
          <div className="section-body">
            <p className="section-desc">Set the primary location and currency for your organization's financial reporting.</p>
            
            <div className="form-group mb-4">
              <label>Default Country</label>
              <select value={country} onChange={handleCountryChange} className="setting-select">
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="IN">India</option>
                <option value="EU">European Union</option>
                <option value="JP">Japan</option>
              </select>
            </div>

            <div className="form-group">
              <label>Base Currency Preview</label>
              <div className="currency-preview">
                <div className="currency-symbol">
                  {currency === 'USD' ? '$' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '¥'}
                </div>
                <div className="currency-code">{currency}</div>
                <div className="currency-name">
                  {currency === 'USD' ? 'US Dollar' : currency === 'GBP' ? 'British Pound' : currency === 'INR' ? 'Indian Rupee' : currency === 'EUR' ? 'Euro' : 'Japanese Yen'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section card">
          <div className="section-header">
            <DollarSign size={20} className="text-highlight" />
            <h3>Multi-Currency Conversion</h3>
          </div>
          <div className="section-body">
            <div className="toggle-row">
              <div className="toggle-info">
                <h4>Enable Automatic Conversion</h4>
                <p>Automatically convert international expenses submitted by employees to the base currency using real-time API rates.</p>
              </div>
              <button 
                className={`toggle-btn-lg ${conversionEnabled ? 'on' : 'off'}`} 
                onClick={() => setConversionEnabled(!conversionEnabled)}
              >
                {conversionEnabled ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
              </button>
            </div>

            {conversionEnabled && (
              <div className="conversion-sub-settings form-group mt-4">
                <label>Exchange Rate Provider</label>
                <select className="setting-select">
                  <option>Open Exchange Rates (Default)</option>
                  <option>Fixer.io</option>
                  <option>CurrencyLayer</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="settings-section card full-width">
          <div className="section-header">
            <Webhook size={20} className="text-primary" />
            <h3>API Integrations</h3>
          </div>
          <div className="section-body">
            <p className="section-desc mb-4">Connect ExpenseFlow with your accounting and ERP software.</p>
            
            <div className="integration-list">
              <div className="integration-item">
                <div className="integration-info">
                  <div className="integration-logo qb">QB</div>
                  <div>
                    <h4>QuickBooks Online</h4>
                    <p>Sync approved expenses automatically</p>
                  </div>
                </div>
                <button className="btn btn-outline">Connect</button>
              </div>

              <div className="integration-item">
                <div className="integration-info">
                  <div className="integration-logo xero">X</div>
                  <div>
                    <h4>Xero</h4>
                    <p>Export reconciliation reports</p>
                  </div>
                </div>
                <button className="btn btn-outline">Connect</button>
              </div>

              <div className="integration-item">
                <div className="integration-info">
                  <div className="integration-logo slack">S</div>
                  <div>
                    <h4>Slack</h4>
                    <p>Send approval notifications to channels</p>
                  </div>
                </div>
                <button className="btn btn-secondary">Connected</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
