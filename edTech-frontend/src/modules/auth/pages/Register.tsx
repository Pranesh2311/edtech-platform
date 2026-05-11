import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, GraduationCap, ArrowRight, Eye, EyeOff, Users } from "lucide-react";
import { registerUser } from "../services/authService";
import "./Auth.css";

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        role: "STUDENT"
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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Password and Confirm Password do not match!");
            return;
        }

        setLoading(true);

        try {
            await registerUser(form);
            navigate("/login");
        } catch (error) {
            setError("Registration failed. Please try again.");
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
                            Start your learning journey
                        </h1>
                        <p className="auth-brand-desc">
                            Join thousands of learners already growing with our platform. Create your account in seconds.
                        </p>
                        <div className="auth-brand-features">
                            <div className="brand-feature">
                                <div className="brand-feature-dot" />
                                <span>Free to get started</span>
                            </div>
                            <div className="brand-feature">
                                <div className="brand-feature-dot" />
                                <span>Access all courses</span>
                            </div>
                            <div className="brand-feature">
                                <div className="brand-feature-dot" />
                                <span>Track your progress</span>
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
                            <h2>Create account</h2>
                            <p>Fill in your details to get started</p>
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

                        <form onSubmit={handleRegister} className="auth-form">
                            <div className="auth-field">
                                <label>Full Name</label>
                                <div className="auth-input-wrap">
                                    <User size={18} className="auth-input-icon" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="John Doe"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Email Address</label>
                                <div className="auth-input-wrap">
                                    <Mail size={18} className="auth-input-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Mobile</label>
                                <div className="auth-input-wrap">
                                    <Phone size={18} className="auth-input-icon" />
                                    <input
                                        type="text"
                                        name="mobile"
                                        placeholder="+91 XXXXXXXXXX"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Password</label>
                                <div className="auth-input-wrap">
                                    <Lock size={18} className="auth-input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
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

                            <div className="auth-field">
                                <label>Confirm Password</label>
                                <div className="auth-input-wrap">
                                    <Lock size={18} className="auth-input-icon" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Role</label>
                                <div className="auth-input-wrap">
                                    <Users size={18} className="auth-input-icon" />
                                    <select
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '11px 14px 11px 44px',
                                            border: '1px solid var(--border-primary)',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--bg-input)',
                                            color: 'var(--text-primary)',
                                            fontSize: 'var(--font-size-sm)',
                                            fontFamily: 'var(--font-family)',
                                            outline: 'none',
                                            appearance: 'none',
                                        }}
                                    >
                                        <option value="STUDENT">Student</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="TEACHER">Teacher</option>
                                    </select>
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
                                        Create Account
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Already have an account?{" "}
                                <Link to="/login" className="auth-link">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;