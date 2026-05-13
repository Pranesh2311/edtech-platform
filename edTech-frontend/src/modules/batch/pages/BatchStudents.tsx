import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Users } from "lucide-react";
import { useParams } from "react-router-dom";

import { assignStudent, getBatchStudents, removeStudent } from "../services/batchApi";
import { getStudents } from "../../../services/userApi";

const BatchStudents = () => {
    const { id } = useParams();
    const [students, setStudents] = useState<any[]>([]);
    const [allStudents, setAllStudents] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        fetchBatchStudents();
        fetchAllStudents();
    }, []);

    const fetchBatchStudents = async () => {
        const response = await getBatchStudents(Number(id));
        setStudents(response.data);
    };

    const fetchAllStudents = async () => {
        const response = await getStudents();
        setAllStudents(response.data);
    };

    const handleAssign = async () => {
        await assignStudent(Number(id), Number(selectedStudent));
        fetchBatchStudents();
    };

    const handleRemove = async (studentId: number) => {
        await removeStudent(Number(id), studentId);
        fetchBatchStudents();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Batch Students</h2>
                    <p>{students.length} student{students.length !== 1 ? 's' : ''} enrolled</p>
                </div>
            </div>

            {/* Assign Student Bar */}
            <div className="search-filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <select
                    className="premium-input"
                    style={{ flex: 1 }}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                >
                    <option value="">Select a student to assign...</option>
                    {allStudents.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
                <button className="btn-premium btn-filled" onClick={handleAssign}>
                    Assign
                </button>
            </div>

            {/* Table */}
            {students.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <button
                                            className="btn-premium btn-danger btn-sm"
                                            onClick={() => handleRemove(student.id)}
                                        >
                                            <Trash2 size={13} /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><Users size={28} /></div>
                    <div className="empty-state-title">No students enrolled</div>
                    <div className="empty-state-desc">
                        Select a student from the dropdown above and click Assign to enroll them
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default BatchStudents;