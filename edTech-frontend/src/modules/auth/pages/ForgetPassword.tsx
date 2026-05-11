import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";
import { sendForgetPasswordLink } from "../services/authService";
import "./Auth.css";

const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await sendForgetPasswordLink(email);
            setSuccess("Password reset link has been sent to your email. Please check your inbox.");
        } catch (error: any) {
            setError(
                error?.response?.data?.message ||
                "Failed to send reset link. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container" style={{ maxWidth: '480px' }}>
                <motion.div
                    className="auth-form-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ flex: 'none', width: '100%' }}
                >
                    <div className="auth-form-wrapper" style={{ maxWidth: '400px' }}>
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                            <div className="auth-logo" style={{ justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                                <div className="auth-logo-icon" style={{
                                    background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                                }}>
                                    <GraduationCap size={28} />
                                </div>
                            </div>
                        </div>

                        <div className="auth-form-header" style={{ textAlign: 'center' }}>
                            <h2>Reset Password</h2>
                            <p>Enter your email and we'll send you a link to reset your password</p>
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

                        {success && (
                            <motion.div
                                className="auth-success"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {success}
                            </motion.div>
                        )}

                        {!success ? (
                            <form onSubmit={handleSubmit} className="auth-form">
                                <div className="auth-field">
                                    <label>Email Address</label>
                                    <div className="auth-input-wrap">
                                        <Mail size={18} className="auth-input-icon" />
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError("");
                                            }}
                                            required
                                        />
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
                                            Send Reset Link
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <button
                                className="auth-submit-btn"
                                onClick={() => navigate('/login')}
                                style={{ marginTop: 'var(--space-4)' }}
                            >
                                <ArrowLeft size={18} />
                                Back to Sign In
                            </button>
                        )}

                        <div className="auth-footer">
                            <p>
                                Remember your password?{" "}
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

export default ForgetPassword;