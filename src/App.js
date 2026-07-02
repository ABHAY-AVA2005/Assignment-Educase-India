import React, { useState } from 'react';
import marryDoeImg from './assets/marry_doe.png';

function App() {
  const [screen, setScreen] = useState('welcome'); // welcome, login, signup, profile
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: 'yes', // 'yes' or 'no'
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle Signup changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Login changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validations
  const isSignupValid =
    formData.fullName.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.trim() !== '';

  const isLoginValid =
    loginData.email.trim() !== '' &&
    loginData.password.trim() !== '';

  // Submit Handlers
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (isSignupValid) {
      setScreen('profile');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (isLoginValid) {
      // Simulate populating the profile with login details if no signup was done
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || 'Marry Doe',
        email: loginData.email,
      }));
      setScreen('profile');
    }
  };

  return (
    <div className="phone-container">
      {/* Welcome Screen */}
      {screen === 'welcome' && (
        <div className="app-screen welcome-screen fade-in">
          <div className="welcome-content">
            <h1>Welcome to PopX</h1>
            <p className="subtitle">
              Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,
            </p>
          </div>
          <div className="welcome-buttons">
            <button
              onClick={() => setScreen('signup')}
              className="btn btn-primary"
            >
              Create Account
            </button>
            <button
              onClick={() => setScreen('login')}
              className="btn btn-secondary"
            >
              Already Registered? Login
            </button>
          </div>
        </div>
      )}

      {/* Login Screen */}
      {screen === 'login' && (
        <div className="app-screen fade-in">
          <h1 style={{ marginTop: '10px' }}>Signin to your PopX account</h1>
          <p className="subtitle">
            Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <label>
                Email Address<span className="required-asterisk">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <label>
                Password<span className="required-asterisk">*</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isLoginValid}
              style={{ marginTop: '10px', backgroundColor: isLoginValid ? '#6C25E9' : '#CBCBCB' }}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setScreen('welcome')}
              className="btn btn-secondary"
              style={{ marginTop: '12px' }}
            >
              Back
            </button>
          </form>
        </div>
      )}

      {/* Signup Screen */}
      {screen === 'signup' && (
        <div className="app-screen fade-in">
          <h1 style={{ marginTop: '10px', marginBottom: '20px' }}>Create your PopX account</h1>

          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder=" "
                value={formData.fullName}
                onChange={handleSignupChange}
                required
              />
              <label>
                Full Name<span className="required-asterisk">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder=" "
                value={formData.phone}
                onChange={handleSignupChange}
                required
              />
              <label>
                Phone number<span className="required-asterisk">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleSignupChange}
                required
              />
              <label>
                Email address<span className="required-asterisk">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleSignupChange}
                required
              />
              <label>
                Password<span className="required-asterisk">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="company"
                placeholder=" "
                value={formData.company}
                onChange={handleSignupChange}
              />
              <label>Company name</label>
            </div>

            <div className="radio-section-title">
              Are you an Agency?<span className="required-asterisk">*</span>
            </div>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === 'yes'}
                  onChange={handleSignupChange}
                  className="radio-input"
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === 'no'}
                  onChange={handleSignupChange}
                  className="radio-input"
                />
                No
              </label>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isSignupValid}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setScreen('welcome')}
                className="btn btn-secondary"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Profile / Account Settings Screen */}
      {screen === 'profile' && (
        <div className="app-screen profile-view fade-in">
          <div className="profile-header">
            <span className="profile-header-title">Account Settings</span>
          </div>

          <div className="profile-info-container">
            <div className="profile-row">
              <div className="avatar-wrapper">
                <img
                  src={marryDoeImg}
                  alt="Marry Doe"
                  className="profile-avatar"
                />
                <div className="camera-badge" title="Change photo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              </div>
              <div className="profile-details">
                <h3>{formData.fullName || 'Marry Doe'}</h3>
                <p>{formData.email || 'Marry@Gmail.Com'}</p>
              </div>
            </div>

            <p className="profile-bio">
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
            </p>
          </div>

          <div className="profile-body">
            <div className="dotted-line"></div>
            {formData.company && (
              <div style={{ marginTop: '16px' }}>
                <strong style={{ fontSize: '14px', color: '#1D2229' }}>Company:</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{formData.company}</p>
              </div>
            )}
            <div style={{ marginTop: '16px' }}>
              <strong style={{ fontSize: '14px', color: '#1D2229' }}>Agency status:</strong>
              <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
                {formData.isAgency === 'yes' ? 'Agency Account' : 'Individual Account'}
              </p>
            </div>
            {formData.phone && (
              <div style={{ marginTop: '16px' }}>
                <strong style={{ fontSize: '14px', color: '#1D2229' }}>Phone:</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{formData.phone}</p>
              </div>
            )}
            <div className="dotted-line" style={{ marginTop: '24px' }}></div>
          </div>

          <div className="logout-container">
            <button
              onClick={() => {
                setScreen('welcome');
                setFormData({
                  fullName: '',
                  phone: '',
                  email: '',
                  password: '',
                  company: '',
                  isAgency: 'yes',
                });
                setLoginData({
                  email: '',
                  password: '',
                });
              }}
              className="btn btn-logout"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
