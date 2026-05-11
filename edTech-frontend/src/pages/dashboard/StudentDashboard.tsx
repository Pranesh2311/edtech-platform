import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  ClipboardList, Video, FileText, Award, ArrowRight, Play,
  BookOpen, Target, Clock, CheckCircle2, Trophy
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import DashboardCard from '../../components/ui/DashboardCard';
import { getAllExams } from '../../modules/exam/services/examService';
import { getAllVideos } from '../../modules/video/services/videoApi';
import axios from '../../services/axiosConfig';
import './StudentDashboard.css';

const COLORS = ['#10B981', '#F59E0B', '#F43F5E'];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || '';
  const fullName = localStorage.getItem('fullName') || 'Student';

  const [exams, setExams] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [examsRes, videosRes, resultsRes] = await Promise.all([
        getAllExams().catch(() => ({ data: [] })),
        getAllVideos().catch(() => ({ data: [] })),
        axios.get(`http://localhost:8080/api/results/student?email=${email}`).catch(() => ({ data: [] })),
      ]);

      setExams(examsRes.data);
      setVideos(videosRes.data);
      setResults(Array.isArray(resultsRes.data) ? resultsRes.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const avgScore = results.length > 0
    ? Math.round(results.reduce((sum: number, r: any) => sum + (r.score || 0), 0) / results.length)
    : 0;

  const totalAttempted = results.length;
  const passed = results.filter((r: any) => r.score >= 40).length;

  const scoreData = results.slice(-7).map((r: any, i: number) => ({
    name: `Test ${i + 1}`,
    score: r.score || 0,
  }));

  const pieData = [
    { name: 'Passed', value: passed },
    { name: 'Average', value: results.filter((r: any) => r.score >= 20 && r.score < 40).length },
    { name: 'Failed', value: results.filter((r: any) => r.score < 20).length },
  ].filter(d => d.value > 0);

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
    <div className="student-dashboard">
      {/* Welcome Banner */}
      <motion.div
        className="welcome-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="welcome-content">
          <div className="welcome-text">
            <h2>Welcome back, {fullName.split(' ')[0]}! 🎓</h2>
            <p>Continue your learning journey. You have {exams.length} exams available and {videos.length} videos to explore.</p>
          </div>
          <div className="welcome-actions">
            <button className="btn-premium btn-filled" onClick={() => navigate('/exams')}>
              <Play size={16} /> Start Learning
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          title="Exams Available"
          value={exams.length}
          icon={<ClipboardList size={20} />}
          color="primary"
          delay={0}
        />
        <StatCard
          title="Tests Attempted"
          value={totalAttempted}
          icon={<Target size={20} />}
          color="accent"
          delay={1}
        />
        <StatCard
          title="Average Score"
          value={`${avgScore}%`}
          icon={<Trophy size={20} />}
          color="amber"
          delay={2}
        />
        <StatCard
          title="Videos Available"
          value={videos.length}
          icon={<Video size={20} />}
          color="cyan"
          delay={3}
        />
      </div>

      {/* Charts + Quick Access */}
      <div className="dashboard-grid-2">
        <DashboardCard
          title="Score Trend"
          subtitle="Your recent test performance"
          delay={4}
        >
          {scoreData.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={scoreData}>
                  <defs>
                    <linearGradient id="studentScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} axisLine={{ stroke: 'var(--border-primary)' }} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '13px' }} />
                  <Area type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#studentScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon"><Award size={28} /></div>
              <div className="empty-state-title">No scores yet</div>
              <div className="empty-state-desc">Attempt exams to see your performance trend</div>
            </div>
          )}
        </DashboardCard>

        <DashboardCard
          title="Quick Access"
          subtitle="Jump to your most used features"
          delay={5}
        >
          <div className="quick-access-grid">
            <div className="quick-access-card" onClick={() => navigate('/exams')}>
              <div className="quick-access-icon" style={{ background: 'var(--primary-50)', color: 'var(--primary-600)' }}>
                <ClipboardList size={20} />
              </div>
              <div className="quick-access-info">
                <div className="quick-access-title">Mock Tests</div>
                <div className="quick-access-desc">{exams.length} available</div>
              </div>
            </div>
            <div className="quick-access-card" onClick={() => navigate('/videos')}>
              <div className="quick-access-icon" style={{ background: 'var(--cyan-50)', color: 'var(--cyan-500)' }}>
                <Video size={20} />
              </div>
              <div className="quick-access-info">
                <div className="quick-access-title">Video Library</div>
                <div className="quick-access-desc">{videos.length} videos</div>
              </div>
            </div>
            <div className="quick-access-card" onClick={() => navigate('/my-results')}>
              <div className="quick-access-icon" style={{ background: 'var(--accent-50)', color: 'var(--accent-600)' }}>
                <Award size={20} />
              </div>
              <div className="quick-access-info">
                <div className="quick-access-title">My Results</div>
                <div className="quick-access-desc">{results.length} attempts</div>
              </div>
            </div>
            <div className="quick-access-card" onClick={() => navigate('/assignments')}>
              <div className="quick-access-icon" style={{ background: 'var(--amber-50)', color: 'var(--amber-500)' }}>
                <FileText size={20} />
              </div>
              <div className="quick-access-info">
                <div className="quick-access-title">Assignments</div>
                <div className="quick-access-desc">View tasks</div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Available Exams */}
      {exams.length > 0 && (
        <DashboardCard
          title="Available Exams"
          subtitle="Start a test to check your knowledge"
          action={
            <button className="btn-premium btn-ghost" onClick={() => navigate('/exams')}>
              View All <ArrowRight size={14} />
            </button>
          }
          delay={6}
          noPadding
        >
          <div className="premium-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exam Title</th>
                  <th>Duration</th>
                  <th>Total Marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exams.slice(0, 5).map((exam, i) => (
                  <tr key={exam.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{exam.title}</td>
                    <td><Clock size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />{exam.duration} mins</td>
                    <td>{exam.totalMarks}</td>
                    <td>
                      <button className="btn-premium btn-filled btn-sm" onClick={() => navigate(`/attempt/${exam.id}`)}>
                        Attempt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      )}

      {/* Recent Videos */}
      {videos.length > 0 && (
        <DashboardCard
          title="Recent Videos"
          subtitle="Continue watching"
          action={
            <button className="btn-premium btn-ghost" onClick={() => navigate('/videos')}>
              View All <ArrowRight size={14} />
            </button>
          }
          delay={7}
        >
          <div className="video-cards-grid">
            {videos.slice(0, 4).map((video) => (
              <motion.div
                key={video.id}
                className="video-mini-card"
                whileHover={{ y: -2 }}
                onClick={() => navigate(`/watch-video/${video.id}`, { state: video })}
              >
                <div className="video-mini-thumb">
                  {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.title} />
                  ) : (
                    <div className="video-thumb-placeholder">
                      <Play size={24} />
                    </div>
                  )}
                  <div className="video-duration-badge">
                    {video.duration} min
                  </div>
                </div>
                <div className="video-mini-info">
                  <h4>{video.title}</h4>
                  <p>{video.batchName}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      )}
    </div>
  );
};

export default StudentDashboard;
