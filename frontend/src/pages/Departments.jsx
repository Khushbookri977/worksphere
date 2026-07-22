import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { departmentAPI } from '../services/api';
import { FiPlus, FiTrash2, FiBriefcase } from 'react-icons/fi';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', location: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const res = await departmentAPI.getAll();
      setDepartments(res.data);
    } catch (err) {
      console.error('Failed to load departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await departmentAPI.create(form);
      setForm({ name: '', location: '' });
      setShowModal(false);
      loadDepartments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create department');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      try {
        await departmentAPI.delete(id);
        loadDepartments();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete department');
      }
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="page-header">
        <h2><span>🏢</span> Departments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary-custom"
        >
          <FiPlus size={18} style={{ marginRight: '8px' }} />
          Add Department
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-container">
          {departments.length === 0 ? (
            <div className="empty-state">
              <FiBriefcase className="empty-state-icon" />
              <div className="empty-state-text">No departments yet</div>
              <small className="text-muted">Create your first department to get started</small>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th className="fw-600">ID</th>
                  <th className="fw-600">Name</th>
                  <th className="fw-600">Location</th>
                  <th className="fw-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(dept => (
                  <tr key={dept.id}>
                    <td className="fw-600">#{dept.id}</td>
                    <td className="fw-500">{dept.name}</td>
                    <td>{dept.location || '—'}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="btn btn-delete btn-action"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-700">➕ Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-600">Department Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Engineering"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-600">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Pune"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-100 btn btn-primary-custom"
              disabled={submitting}
            >
              {submitting ? '⏳ Creating...' : '✓ Create Department'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}