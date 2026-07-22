import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { employeeAPI, departmentAPI } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    joiningDate: '',
    status: 'ACTIVE',
    departmentId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, [page]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await employeeAPI.getAll(page, 10);
      setEmployees(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to load employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await departmentAPI.getAll();
      setDepartments(res.data);
    } catch (err) {
      console.error('Failed to load departments:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ...form,
        salary: Number(form.salary),
        departmentId: Number(form.departmentId)
      };

      if (editEmployee) {
        await employeeAPI.update(editEmployee.id, payload);
      } else {
        await employeeAPI.create(payload);
      }

      setShowModal(false);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        salary: '',
        joiningDate: '',
        status: 'ACTIVE',
        departmentId: ''
      });
      setEditEmployee(null);
      loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      try {
        await employeeAPI.delete(id);
        loadEmployees();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  const openAdd = () => {
    setEditEmployee(null);
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      salary: '',
      joiningDate: '',
      status: 'ACTIVE',
      departmentId: ''
    });
    setShowModal(true);
  };

  const openEdit = (emp) => {
    setEditEmployee(emp);
    setForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      salary: emp.salary,
      joiningDate: emp.joiningDate || '',
      status: emp.status,
      departmentId: emp.departmentId
    });
    setShowModal(true);
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="page-header">
        <h2><span>👔</span> Employees</h2>
        <button onClick={openAdd} className="btn btn-primary-custom">
          <FiPlus size={18} style={{ marginRight: '8px' }} />
          Add Employee
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
          {employees.length === 0 ? (
            <div className="empty-state">
              <FiUsers className="empty-state-icon" />
              <div className="empty-state-text">No employees yet</div>
              <small className="text-muted">Add your first employee to get started</small>
            </div>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className="fw-600">Name</th>
                    <th className="fw-600">Email</th>
                    <th className="fw-600">Department</th>
                    <th className="fw-600">Salary</th>
                    <th className="fw-600">Status</th>
                    <th className="fw-600 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td className="fw-500">{emp.firstName} {emp.lastName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.departmentName}</td>
                      <td className="fw-600">₹{emp.salary?.toLocaleString('en-IN')}</td>
                      <td>
                        <span className={emp.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => openEdit(emp)}
                          className="btn btn-edit btn-action"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="btn btn-delete btn-action"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Page navigation" className="mt-4">
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setPage(i)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-700">
            {editEmployee ? '✏️ Edit Employee' : '➕ Add New Employee'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-600">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-600">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-600">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-600">Salary (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.salary}
                  onChange={e => setForm({ ...form, salary: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-600">Joining Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.joiningDate}
                  onChange={e => setForm({ ...form, joiningDate: e.target.value })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-600">Department</label>
                <select
                  className="form-select"
                  value={form.departmentId}
                  onChange={e => setForm({ ...form, departmentId: e.target.value })}
                  required
                >
                  <option value="">Select department...</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-600">Status</label>
                <select
                  className="form-select"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-100 btn btn-primary-custom"
              disabled={submitting}
            >
              {submitting ? '⏳ Saving...' : editEmployee ? '✓ Update Employee' : '✓ Add Employee'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}