import React, { useState } from 'react';
import { Mail, Lock, User, Building, MapPin, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth action and redirect to dashboard
    navigate('/');
  };

  return (
    <div className="auth-container">
      {/* Left Branding Panel */}
      <div className="auth-brand-panel">
        <div className="brand-content">
          <div className="auth-logo">ExpenseFlow</div>
          <h1 className="auth-heading">
            Control your expenses<br />
            <span className="highlight-wrapper">
              without the chaos.
              <span className="brush-highlight"></span>
            </span>
          </h1>
          <p className="auth-subtext">
            Smart reimbursements. Fast approvals. Full transparency.
          </p>
          
          <div className="floating-ui-mbl">
            <div className="mock-card">
              <div className="mock-avatar">AD</div>
              <div className="mock-line-group">
                <div className="mock-line w-long"></div>
                <div className="mock-line w-short"></div>
              </div>
              <div className="mock-status"></div>
            </div>
            <div className="mock-card delay-1">
              <div className="mock-avatar bg-sec">MC</div>
              <div className="mock-line-group">
                <div className="mock-line w-long"></div>
                <div className="mock-line w-short"></div>
              </div>
              <div className="mock-status bg-green"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="form-card card">
          <div className={`form-transition-wrapper ${isLogin ? 'show-login' : 'show-signup'}`}>
            
            {/* LOGIN FORM */}
            <div className="form-content login-form">
              <h2 className="form-title">Welcome back</h2>
              <p className="form-subtitle">Enter your details to access your dashboard.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                  <label>Email address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input type="email" placeholder="name@company.com" required />
                  </div>
                </div>
                
                <div className="auth-form-group">
                  <div className="flex justify-between items-center mb-1">
                    <label>Password</label>
                    <a href="#" className="forgot-link">Forgot password?</a>
                  </div>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                    <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="auth-form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me for 30 days</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-teal w-full mt-4">Log In</button>
                
                <div className="divider"><span>OR</span></div>
                
                <button type="button" className="btn btn-outline w-full google-btn">
                  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Sign in with Google
                </button>
              </form>
              
              <div className="form-switch-prompt">
                Don't have an account? <button type="button" onClick={handleToggle} className="switch-link">Sign up</button>
              </div>
            </div>

            {/* SIGNUP FORM */}
            <div className="form-content signup-form">
              <h2 className="form-title">Create your account</h2>
              <p className="form-subtitle">Join ExpenseFlow to streamline your company expenses.</p>
              
              <form onSubmit={handleSubmit} className="signup-grid">
                <div className="auth-form-group col-span-2">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input type="text" placeholder="John Doe" required />
                  </div>
                </div>

                <div className="auth-form-group col-span-2">
                  <label>Email address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input type="email" placeholder="name@company.com" required />
                  </div>
                </div>
                
                <div className="auth-form-group col-span-2">
                  <label>Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input type={showPassword ? "text" : "password"} placeholder="Create a strong password" required />
                    <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="password-strength">
                    <div className="strength-bar bg-teal"></div>
                    <div className="strength-bar bg-teal"></div>
                    <div className="strength-bar bg-teal"></div>
                    <div className="strength-bar"></div>
                  </div>
                </div>

                <div className="auth-form-group">
                  <label>Company Name</label>
                  <div className="input-with-icon">
                    <Building size={18} className="input-icon" />
                    <input type="text" placeholder="Acme Corp" required />
                  </div>
                </div>

                <div className="auth-form-group">
                  <label>Country</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="input-icon" />
                    <select className="select-padded" required>
                      <option value="US">United States (USD)</option>
                      <option value="UK">United Kingdom (GBP)</option>
                      <option value="EU">Europe (EUR)</option>
                      <option value="IN">India (INR)</option>
                    </select>
                  </div>
                </div>

                <div className="auth-form-group col-span-2 role-selector-group">
                  <label>I am registering as an:</label>
                  <div className="role-options">
                    <label className="role-radio">
                      <input type="radio" name="role" value="admin" defaultChecked />
                      <div className="role-card">
                        <span className="role-name">Administrator</span>
                      </div>
                    </label>
                    <label className="role-radio">
                      <input type="radio" name="role" value="employee" />
                      <div className="role-card">
                        <span className="role-name">Employee</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-span-2 info-note">
                  <span className="info-icon">i</span>
                  Company and admin will be automatically created on signup.
                </div>

                <button type="submit" className="btn btn-teal w-full col-span-2 mt-2">Create Account</button>
              </form>
              
              <div className="form-switch-prompt mt-4">
                Already have an account? <button type="button" onClick={handleToggle} className="switch-link">Log in</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
