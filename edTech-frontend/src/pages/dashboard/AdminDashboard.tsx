import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
  BookOpen, Users, GraduationCap, ClipboardList, Video,
  FileText, FolderOpen, Plus, ArrowRight, TrendingUp,
  Calendar, Award
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import DashboardCard from '../../components/ui/DashboardCard';
import { getAllCourses } from '../../modules/course/services/courseApi';
import { getAllBatches } from '../../modules/batch/services/batchApi';
import { getAllExams } from '../../modules/exam/services/examService';
import { getAllVideos } from '../../modules/video/services/videoApi';
import { getAllAssignments } from '../../modules/assignment/services/assignmentApi';
import { getAllMaterials } from '../../modules/material/services/materialApi';
import axios from '../../services/axiosConfig';
import './AdminDashboard.css';

const CHART_COLORS = ['#6366F1', '#10B981', '#F59E0B', '#06B6D4', '#F43F5E', '#8B5CF6'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    courses: 0,
    batches: 0,
    exams: 0,
    videos: 0,
    assignments: 0,
    materials: 0,
    results: 0,
  });
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [
        coursesRes, batchesRes, examsRes, videosRes,
        assignmentsRes, materialsRes, resultsRes
      ] = await Promise.all([
        getAllCourses().catch(() => ({ data: [] })),
        getAllBatches().catch(() => ({ data: [] })),
        getAllExams().catch(() => ({ data: [] })),
        getAllVideos().catch(() => ({ data: [] })),
        getAllAssignments().catch(() => ({ data: [] })),
        getAllMaterials().catch(() => ({ data: [] })),
        axios.get('http://localhost:8080/api/results').catch(() => ({ data: [] })),
      ]);

      setStats({
        courses: coursesRes.data.length,
        batches: batchesRes.data.length,
        exams: examsRes.data.length,
        videos: videosRes.data.length,
        assignments: assignmentsRes.data.length,
        materials: materialsRes.data.length,
        results: resultsRes.data.length,
      });

      setCourses(coursesRes.data.slice(0, 5));
      setBatches(batchesRes.data.slice(0, 5));
      setRecentResults(resultsRes.data.slice(0, 6));
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate chart data from stats
  const moduleChartData = [
    { name: 'Courses', value: stats.courses, fill: '#6366F1' },
    { name: 'Batches', value: stats.batches, fill: '#10B981' },
    { name: 'Exams', value: stats.exams, fill: '#F59E0B' },
    { name: 'Videos', value: stats.videos, fill: '#06B6D4' },
    { name: 'Materials', value: stats.materials, fill: '#8B5CF6' },
  ];

  const performanceData = [
    { name: 'Mon', score: 72 },
    { name: 'Tue', score: 85 },
    { name: 'Wed', score: 68 },
    { name: 'Thu', score: 90 },
    { name: 'Fri', score: 78 },
    { name: 'Sat', score: 88 },
    { name: 'Sun', score: 92 },
  ];

  const quickActions = [
    { label: 'Create Course', desc: 'Add new course', icon: <BookOpen size={20} />, path: '/create-course', color: 'var(--primary-500)' },
    { label: 'Create Batch', desc: 'Set up batch', icon: <Users size={20} />, path: '/create-batch', color: 'var(--accent-500)' },
    { label: 'Create Exam', desc: 'New exam', icon: <ClipboardList size={20} />, path: '/create', color: 'var(--amber-500)' },
    { label: 'Upload Video', desc: 'Add video', icon: <Video size={20} />, path: '/create-video', color: 'var(--cyan-500)' },
    { label: 'Add Material', desc: 'Study material', icon: <FolderOpen size={20} />, path: '/create-material', color: 'var(--primary-400)' },
    { label: 'Assignment', desc: 'New assignment', icon: <FileText size={20} />, path: '/create-assignment', color: 'var(--rose-500)' },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="stats-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-line w-1-2" />
              <div className="skeleton skeleton-line w-1-4" style={{ height: '28px', marginTop: '12px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Courses"
          value={stats.courses}
          change={12}
          changeLabel="vs last month"
          icon={<BookOpen size={20} />}
          color="primary"
          delay={0}
        />
        <StatCard
          title="Active Batches"
          value={stats.batches}
          change={8}
          changeLabel="vs last month"
          icon={<Users size={20} />}
          color="accent"
          delay={1}
        />
        <StatCard
          title="Total Exams"
          value={stats.exams}
          change={5}
          changeLabel="vs last month"
          icon={<ClipboardList size={20} />}
          color="amber"
          delay={2}
        />
        <StatCard
          title="Video Library"
          value={stats.videos}
          change={15}
          changeLabel="vs last month"
          icon={<Video size={20} />}
          color="cyan"
          delay={3}
        />
      </div>

      {/* Charts Row */}
      <div className="dashboard-grid-2">
        <DashboardCard
          title="Platform Overview"
          subtitle="Content distribution across modules"
          delay={4}
        >
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={moduleChartData} barSize={36} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border-primary)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {moduleChartData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Performance Trend"
          subtitle="Average student scores this week"
          delay={5}
        >
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border-primary)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Quick Actions + Recent Results */}
      <div className="dashboard-grid-2">
        <DashboardCard
          title="Quick Actions"
          subtitle="Frequently used shortcuts"
          delay={6}
        >
          <div className="quick-access-grid">
            {quickActions.map((action) => (
              <div
                key={action.path}
                className="quick-access-card"
                onClick={() => navigate(action.path)}
              >
                <div
                  className="quick-access-icon"
                  style={{ background: `${action.color}15`, color: action.color }}
                >
                  {action.icon}
                </div>
                <div className="quick-access-info">
                  <div className="quick-access-title">{action.label}</div>
                  <div className="quick-access-desc">{action.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Recent Results"
          subtitle="Latest exam submissions"
          action={
            <button className="btn-premium btn-ghost" onClick={() => navigate('/results')}>
              View All <ArrowRight size={14} />
            </button>
          }
          delay={7}
        >
          {recentResults.length > 0 ? (
            <div className="results-list">
              {recentResults.map((r, i) => (
                <div key={r.id || i} className="activity-item">
                  <div className={`activity-dot ${r.score >= 70 ? 'accent' : r.score >= 40 ? 'amber' : 'rose'}`} />
                  <div className="activity-content">
                    <div className="activity-text">
                      <strong>{r.studentName}</strong> scored {r.score}% in Exam #{r.examId}
                    </div>
                    <div className="activity-time">
                      {r.correctAnswers}/{r.totalQuestions} correct
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon"><Award size={28} /></div>
              <div className="empty-state-title">No results yet</div>
              <div className="empty-state-desc">Results will appear here once students attempt exams</div>
            </div>
          )}
        </DashboardCard>
      </div>

      {/* Batches Overview */}
      {batches.length > 0 && (
        <DashboardCard
          title="Active Batches"
          subtitle="Overview of your running batches"
          action={
            <button className="btn-premium btn-ghost" onClick={() => navigate('/batches')}>
              View All <ArrowRight size={14} />
            </button>
          }
          delay={8}
          noPadding
        >
          <div className="premium-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Course</th>
                  <th>Teacher</th>
                  <th>Students</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {batches.map(batch => (
                  <tr key={batch.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/batch-students/${batch.id}`)}>
                    <td style={{ fontWeight: 500 }}>{batch.batchName}</td>
                    <td>{batch.courseName}</td>
                    <td>{batch.teacherName}</td>
                    <td>{batch.studentCount}</td>
                    <td>
                      <span className={`status-badge ${batch.active ? 'success' : 'danger'}`}>
                        {batch.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      )}
    </div>
  );
};

export default AdminDashboard;
