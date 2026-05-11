import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Edit3, Trash2, ToggleLeft, BookOpen, Image } from "lucide-react";
import { deleteCourse, getAllCourses, searchCourses, toggleCourseStatus } from "../services/courseApi";

const CourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => { fetchCourses(); }, []);

    const fetchCourses = async () => {
        try { const res = await getAllCourses(); setCourses(res.data); } catch (e) { console.log(e); }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this course?")) {
            await deleteCourse(id); fetchCourses();
        }
    };

    const handleSearch = async () => {
        if (keyword.trim() === "") { fetchCourses(); return; }
        try { const res = await searchCourses(keyword); setCourses(res.data); } catch (e) { console.log(e); }
    };

    const handleToggle = async (id: number) => {
        await toggleCourseStatus(id); fetchCourses();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Courses</h2>
                    <p>{courses.length} course{courses.length !== 1 ? 's' : ''} available</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-filled" onClick={() => navigate("/create-course")}>
                        <Plus size={16} /> Create Course
                    </button>
                </div>
            </div>

            <div className="search-filter-bar">
                <div className="search-field">
                    <Search size={16} />
                    <input type="text" placeholder="Search courses..." value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
                <button className="btn-premium btn-outline" onClick={handleSearch}>Search</button>
            </div>

            {courses.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Batches</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, i) => (
                                <tr key={course.id}>
                                    <td>{i + 1}</td>
                                    <td>
                                        {course.thumbnail ? (
                                            <img src={course.thumbnail} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                                        ) : (
                                            <div style={{ width: 60, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image size={16} style={{ color: 'var(--text-tertiary)' }} />
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{course.title}</td>
                                    <td>₹{course.price}</td>
                                    <td>{course.durationInMonths} months</td>
                                    <td>{course.batchCount}</td>
                                    <td>
                                        <span className={`status-badge ${course.active ? 'success' : 'danger'}`}>
                                            {course.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button className="btn-premium btn-outline btn-sm" onClick={() => navigate(`/edit-course/${course.id}`)}>
                                                <Edit3 size={13} />
                                            </button>
                                            <button className="btn-premium btn-outline btn-sm" onClick={() => handleToggle(course.id)}>
                                                <ToggleLeft size={13} />
                                            </button>
                                            <button className="btn-premium btn-danger btn-sm" onClick={() => handleDelete(course.id)}>
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><BookOpen size={28} /></div>
                    <div className="empty-state-title">No courses yet</div>
                    <div className="empty-state-desc">Create your first course to get started</div>
                </div>
            )}
        </motion.div>
    );
};

export default CourseList;