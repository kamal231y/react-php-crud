import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Administrator",
    remember: false
  });

  // Page refresh par session retain rakhne ke liye
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost/REACT-PHP-CRUD/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        localStorage.setItem("user", JSON.stringify(result.user));
        setCurrentUser(result.user);
      } else {
        setErrorMsg(result.message || "Login failed");
      }
    } catch (err) {
      setErrorMsg("Server Error! XAMPP/PHP server chal raha hai na check karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  // Agar user logged in hai to Dashboard dikhao
  if (currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  // Warna Login Form dikhao
  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="brand-content">
          <div className="school-logo"><span>SC</span></div>
          <div className="brand-name">
            <h2>School<span>CRM</span></h2>
            <p>Smart School Management</p>
          </div>
          <div className="brand-heading">
            <span>WELCOME BACK</span>
            <h1>Manage your school <br /> <strong>smarter.</strong></h1>
            <p>One powerful platform to manage students, teachers, attendance, fees, examinations and everything your school needs.</p>
          </div>
          <div className="feature-list">
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Complete School Management</strong>
                <small>Everything in one secure platform</small>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Real-time Reports</strong>
                <small>Track your school's performance easily</small>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Secure & Reliable</strong>
                <small>Your school data stays protected</small>
              </div>
            </div>
          </div>
          <div className="brand-footer">© 2026 SchoolCRM. All rights reserved.</div>
        </div>
      </div>

      <div className="login-area">
        <div className="login-card">
          <div className="mobile-logo">
            <div className="school-logo"><span>SC</span></div>
            <div>
              <h2>School<span>CRM</span></h2>
              <p>Smart School Management</p>
            </div>
          </div>

          <div className="login-header">
            <span className="welcome-tag">SECURE LOGIN</span>
            <h1>Welcome back</h1>
            <p>Sign in to access your school dashboard.</p>
          </div>

          {errorMsg && <div style={{ color: "red", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Login as</label>
              <div className="select-wrapper">
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="Administrator">Administrator</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Receptionist">Receptionist</option>
                </select>
                <span>⌄</span>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">@</span>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@school.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                <a href="#forgot">Forgot password?</a>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">• • •</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="remember-row">
              <label className="remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Sign in to Dashboard"} <span>→</span>
            </button>
          </form>

          <div className="login-help">
            <span>Need help?</span>
            <a href="#support">Contact your administrator</a>
          </div>

          <div className="security-note">
            <span>🔒</span> Your connection is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;