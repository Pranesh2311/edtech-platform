import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, GraduationCap, ArrowRight, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/authService";
import "./Auth.css";

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await loginUser(form);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("fullName", response.data.fullName);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("userId", response.data.id);

            window.location.href = "/";

        } catch(error) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Left Panel - Branding */}
                <motion.div
                    className="auth-branding"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="auth-brand-content">
                        <div className="auth-logo">
                            <div className="auth-logo-icon">
                                <GraduationCap size={28} />
                            </div>
                            <span className="auth-logo-text">EduFlow</span>
                        </div>
                        <h1 className="auth-brand-title">
                            Welcome to the future of learning
                        </h1>
                        <p className="auth-brand-desc">
                            A premium EdTech platform designed for modern education. Manage courses, batches, exams, and more in one beautiful interface.
                        </p>
                        <div className="auth-brand-features">
                            <div className="brand-feature">
                                <div className="brand-feature-dot" />
                                <span>Interactive Video Learning</span>
                            </div>
                            <div className="brand-feature">
                                <div className="brand-feature-dot" />
                                <span>Smart Exam Management</span>
                            </div>
                            <div className="brand-feature">
                                <div className="brand-feature-dot" />
                                <span>Real-time Analytics</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel - Form */}
                <motion.div
                    className="auth-form-panel"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="auth-form-wrapper">
                        <div className="auth-form-header">
                            <h2>Sign in</h2>
                            <p>Enter your credentials to access your account</p>
                        </div>

                        {error && (
                            <motion.div
                                className="auth-error"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleLogin} className="auth-form">
                            <div className="auth-field">
                                <label htmlFor="email">Email Address</label>
                                <div className="auth-input-wrap">
                                    <Mail size={18} className="auth-input-icon" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <div className="auth-field-header">
                                    <label htmlFor="password">Password</label>
                                    <Link to="/forget-password" className="auth-forgot-link">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="auth-input-wrap">
                                    <Lock size={18} className="auth-input-icon" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="auth-toggle-pw"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="auth-submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="auth-spinner" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register" className="auth-link">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;