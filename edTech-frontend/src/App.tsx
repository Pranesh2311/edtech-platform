import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";

// Dashboard Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";

// Exam Module
import ExamList from "./modules/exam/pages/ExamList";
import CreateExam from "./modules/exam/pages/ExamForm";
import EditExam from "./modules/exam/pages/ExamForm";

// Question Module
import QuestionList from "./modules/question/pages/QuestionList";
import QuestionForm from "./modules/question/pages/QuestionForm";
import AttemptTest from "./modules/attempt/pages/AttemptTest";

// Result Module
import ResultHistory from "./modules/result/pages/ResultHistory";
import StudentResults from "./modules/result/pages/StudentResults";

// Auth Module
import Login from "./modules/auth/pages/Login";
import Register from "./modules/auth/pages/Register";
import ForgetPassword from "./modules/auth/pages/ForgetPassword";

// Batch Module
import CreateBatch from "./modules/batch/pages/CreateBatch";
import BatchList from "./modules/batch/pages/BatchList";
import EditBatch from "./modules/batch/pages/EditBatch";
import BatchStudents from "./modules/batch/pages/BatchStudents";

// Material Module
import CreateMaterial from "./modules/material/pages/CreateMaterial";
import MaterialList from "./modules/material/pages/MaterialList";

// Course Module
import CreateCourse from "./modules/course/pages/CreateCourse";
import CourseList from "./modules/course/pages/CourseList";
import EditCourse from "./modules/course/pages/EditCourse";

// Assignment Module
import CreateAssignment from "./modules/assignment/pages/CreateAssignment";
import AssignmentList from "./modules/assignment/pages/AssignmentList";
import SubmitAssignment from "./modules/assignment/pages/SubmitAssignment";
import ViewSubmissions from "./modules/assignment/pages/ViewSubmissions";

// Video Module
import CreateVideo from "./modules/video/pages/CreateVideo";
import VideoList from "./modules/video/pages/VideoList";
import WatchVideo from "./modules/video/pages/WatchVideo";

//Payment Module & Subscription
import BuyBatch from "./modules/batch/pages/BuyBatch";
import MySubscriptions from "./modules/subscription/pages/MySubscriptions";
import PaymentHistory from "./modules/payment/pages/PaymentHistory";

// Doubt Module
import CreateDoubt from "./modules/doubt/pages/CreateDoubt";
import DoubtList from "./modules/doubt/pages/DoubtList";
import DoubtDetails from "./modules/doubt/pages/DoubtDetails";

// Notification Module
import NotificationPage from "./modules/notification/pages/NotificationPage";

// AI Chat Module
import AiChat from "./modules/ai/pages/AiChat";


function App() {

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    // Wrap authenticated pages in dashboard layout
    const withLayout = (component: React.ReactNode) => (
        <DashboardLayout>{component}</DashboardLayout>
    );

    return (

        <ThemeProvider>
            <BrowserRouter>

                <Routes>

                    {/* PUBLIC */}

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />

                    {/* STUDENT-PAYMENT-SUBSCRIPTION */}
                    <Route path="/buy-batch" element={withLayout(<BuyBatch />)} />
                    <Route path="/subscriptions" element={withLayout(<MySubscriptions />)} />
                    <Route path="/payments" element={withLayout(<PaymentHistory />)} />

                    <Route path="/notifications" element={withLayout(<NotificationPage />)} />

                    <Route path="/ai-chat" element={<AiChat />} />

                    {/* ADMIN */}

                    {
                        (role === "ADMIN" || role === "TEACHER") && (

                            <>

                                <Route path="/" element={withLayout(<AdminDashboard />)} />

                                <Route path="/exams" element={withLayout(<ExamList />)} />
                                <Route path="/create" element={withLayout(<CreateExam />)} />
                                <Route path="/edit/:id" element={withLayout(<EditExam />)} />

                                <Route path="/questions/:examId" element={withLayout(<QuestionList />)} />
                                <Route path="/questions/:examId/add" element={withLayout(<QuestionForm />)} />
                                <Route path="/questions/:examId/edit/:questionId" element={withLayout(<QuestionForm />)} />

                                <Route path="/results" element={withLayout(<ResultHistory />)} />
                                <Route path="/student-results" element={withLayout(<StudentResults />)} />
                                <Route path="/create-batch" element={withLayout(<CreateBatch />)} />

                                <Route path="/batches" element={withLayout(<BatchList />)} />
                                <Route path="/edit-batch/:id" element={withLayout(<EditBatch />)} />
                                <Route path="/batch-students/:id" element={withLayout(<BatchStudents />)} />

                                <Route path="/materials" element={withLayout(<MaterialList />)} />
                                <Route path="/create-material" element={withLayout(<CreateMaterial />)} />
                                <Route path="/courses" element={withLayout(<CourseList />)} />

                                <Route path="/create-course" element={withLayout(<CreateCourse />)} />
                                <Route path="/edit-course/:id" element={withLayout(<EditCourse />)} />

                                <Route path="/assignments" element={withLayout(<AssignmentList />)} />
                                <Route path="/create-assignment" element={withLayout(<CreateAssignment />)} />
                                <Route path="/assignment-submissions/:assignmentId" element={withLayout(<ViewSubmissions />)} />

                                <Route path="/videos" element={withLayout(<VideoList />)} />
                                <Route path="/create-video" element={withLayout(<CreateVideo />)} />
                                <Route path="/watch-video/:id" element={withLayout(<WatchVideo />)} />

                                <Route path="/doubts" element={withLayout(<DoubtList />)} />
                                <Route path="/doubts/:id" element={withLayout(<DoubtDetails />)} />
                            </>
                        )
                    }

                    {/* STUDENT */}

                    {
                        role === "STUDENT" && (

                            <>

                                <Route
                                    path="/"
                                    element={withLayout(<StudentDashboard />)}
                                />

                                <Route
                                    path="/exams"
                                    element={withLayout(<ExamList />)}
                                />

                                <Route
                                    path="/attempt/:examId"
                                    element={withLayout(<AttemptTest />)}
                                />

                                <Route
                                    path="/my-results"
                                    element={withLayout(<StudentResults />)}
                                />

                                <Route
                                    path="/assignments"
                                    element={withLayout(<AssignmentList />)}
                                />

                                <Route
                                    path="/submit-assignment/:assignmentId"
                                    element={withLayout(<SubmitAssignment />)}
                                />

                                <Route
                                    path="/videos"
                                    element={withLayout(<VideoList />)}
                                />

                                <Route
                                    path="/watch-video/:id"
                                    element={withLayout(<WatchVideo />)}
                                />

                                <Route
                                    path="/create-doubt"
                                    element={withLayout(<CreateDoubt />)}
                                />

                                <Route
                                    path="/doubts"
                                    element={withLayout(<DoubtList />)}
                                />

                                <Route
                                    path="/doubts/:id"
                                    element={withLayout(<DoubtDetails />)}
                                />

                            </>
                        )
                    }

                    {/* FALLBACK */}

                    <Route
                        path="*"
                        element={<Navigate to={token ? "/" : "/login"} />}
                    />

                </Routes>

            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;