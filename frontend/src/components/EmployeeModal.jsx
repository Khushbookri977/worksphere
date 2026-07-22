import { useState } from 'react';
import { employeeAPI } from '../services/api';

export default function EmployeeModal({ employee, departments, onClose, onSave }) {
  const [form, setForm] = useState(employee
    ? {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        salary: employee.salary,
        joiningDate: employee.joiningDate || '',
        status: employee.status,
        departmentId: employee.departmentId,
      }
    : {
        firstName: '', lastName: '', email: '',
        salary: '', joiningDate: '',
        status: 'ACTIVE', departmentId: '',
      }
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...form, salary: Number(form.salary), departmentId: Number(form.departmentId) };
      if (employee) {
        await employeeAPI.update(employee.id, payload);
      } else {
        await employeeAPI.create(payload);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '9px 12px', marginTop: 4,
    border: '1px solid #e2e8f0', borderRadius: 6,
    fontSize: 14, boxSizing: 'border-box'
  };

  const labelStyle = { fontSize: 13, fontWeight: 500, color: '#475569' };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 28,
        width: 500, maxHeight: '85vh', overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, color: '#1e293b' }}>
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 20,
            cursor: 'pointer', color: '#94a3b8'
          }}>✕</button>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2', color: '#dc2626', padding: '10px 14px',
            borderRadius: 6, marginBottom: 16, fontSize: 14
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>First Name *</label>
              <input style={inputStyle} value={form.firstName}
                onChange={e => set('firstName', e.target.value)} required placeholder="Rahul" />
            </div>
            <div>
              <label style={labelStyle}>Last Name *</label>
              <input style={inputStyle} value={form.lastName}
                onChange={e => set('lastName', e.target.value)} required placeholder="Yadav" />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email *</label>
            <input type="email" style={inputStyle} value={form.email}
              onChange={e => set('email', e.target.value)} required placeholder="rahul@company.com" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Salary (₹) *</label>
              <input type="number" style={inputStyle} value={form.salary}
                onChange={e => set('salary', e.target.value)} required placeholder="700000" />
            </div>
            <div>
              <label style={labelStyle}>Joining Date</label>
              <input type="date" style={inputStyle} value={form.joiningDate}
                onChange={e => set('joiningDate', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Department *</label>
              <select style={inputStyle} value={form.departmentId}
                onChange={e => set('departmentId', e.target.value)} required>
                <option value="">Select department...</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select style={inputStyle} value={form.status}
                onChange={e => set('status', e.target.value)}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{
              padding: '9px 20px', border: '1px solid #e2e8f0',
              background: '#fff', borderRadius: 6, cursor: 'pointer', fontWeight: 500
            }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              padding: '9px 20px', background: '#3b82f6', color: '#fff',
              border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600
            }}>
              {loading ? 'Saving...' : employee ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}