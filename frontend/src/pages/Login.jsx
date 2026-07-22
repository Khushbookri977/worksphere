import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = isRegister
        ? await authAPI.register(form)
        : await authAPI.login(form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          {isRegister ? '📝 Create Account' : '👋 Welcome Back'}
        </h2>
        <p className="login-subtitle">Employee Management System</p>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text" style={{ borderRight: 'none' }}>
                <FiMail size={18} color="#7f8c8d" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                style={{ borderLeft: 'none' }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text" style={{ borderRight: 'none' }}>
                <FiLock size={18} color="#7f8c8d" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ borderLeft: 'none', borderRight: 'none' }}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                style={{ borderLeft: 'none' }}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary-custom w-100 mt-3"
          >
            {loading ? '⏳ Loading...' : isRegister ? '📝 Register' : '🔓 Login'}
          </button>
        </form>

        <hr className="my-4" />

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#7f8c8d' }}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
              setForm({ username: '', password: '' });
            }}
            className="btn btn-link p-0"
            style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}