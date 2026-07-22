import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { employeeAPI } from '../services/api';
import { FiUsers, FiTrendingUp, FiTrendingDown, FiMaximize2 } from 'react-icons/fi';

const COLORS = ['#667eea', '#2ecc71', '#f39c12', '#9b59b6', '#e74c3c'];

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className={`stat-card ${color}`}>
        <Icon size={32} style={{ color: '#667eea', marginBottom: '10px' }} />
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [deptData, setDeptData] = useState([]);
  const [salaryStats, setSalaryStats] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [depts, salary, emps] = await Promise.all([
        employeeAPI.getDeptSummary(),
        employeeAPI.getSalaryStats(),
        employeeAPI.getAll(0, 1)
      ]);

      const chartData = depts.data.map(d => ({
        name: d.department,
        employees: Number(d.employeeCount)
      }));

      setDeptData(chartData);
      setSalaryStats(salary.data);
      setTotalEmployees(emps.data.totalElements);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (val) => (val !== null && val !== undefined && val > 0)
    ? `₹${Math.round(val).toLocaleString('en-IN')}`
    : '₹0';

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4">
      <div className="page-header">
        <h2><span>📊</span> Analytics Overview</h2>
      </div>

      {/* Stat Cards */}
      <div className="row mb-5">
        <StatCard
          icon={FiUsers}
          label="Total Employees"
          value={totalEmployees}
          color="blue"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Avg Salary"
          value={fmt(salaryStats?.average)}
          color="green"
        />
        <StatCard
          icon={FiTrendingDown}
          label="Min Salary"
          value={fmt(salaryStats?.min)}
          color="orange"
        />
        <StatCard
          icon={FiMaximize2}
          label="Max Salary"
          value={fmt(salaryStats?.max)}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="row">
        <div className="col-lg-7">
          <div className="chart-container">
            <h5 className="chart-title">👥 Headcount by Department</h5>
            {deptData.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <div className="empty-state-text">No departments yet</div>
                <small className="text-muted">Create departments to see analytics</small>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deptData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ecf0f1" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: '#7f8c8d', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#7f8c8d', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #ecf0f1',
                      borderRadius: '6px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="employees" fill="#667eea" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="chart-container">
            <h5 className="chart-title">🥧 Department Distribution</h5>
            {deptData.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <div className="empty-state-text">No data available</div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deptData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, employees }) => `${name}: ${employees}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="employees"
                  >
                    {deptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}