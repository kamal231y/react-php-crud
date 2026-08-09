// src/Dashboard.jsx
import React, { useState } from "react";
import Students from "./Students";

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  if (activeTab === "add_student" || activeTab === "student_records") {
    return <Students onBack={() => setActiveTab("dashboard")} />;
  }

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white d-flex flex-column" style={{ width: "260px" }}>
        <div className="p-3 d-flex align-items-center gap-2 border-bottom border-secondary">
          <span className="fs-3">🏫</span>
          <div>
            <h6 className="mb-0 fw-bold">EduManage CRM</h6>
            <small className="text-secondary" style={{ fontSize: "11px" }}>School Management System</small>
          </div>
        </div>

        <nav className="flex-grow-1 overflow-auto py-3">
          <div className="mb-3">
            <small className="text-uppercase text-secondary fw-bold px-3" style={{ fontSize: "11px" }}>MAIN</small>
            <button className={`btn w-100 text-start text-white border-0 py-2 px-3 mt-1 ${activeTab === 'dashboard' ? 'bg-secondary bg-opacity-25' : ''}`} onClick={() => setActiveTab("dashboard")}>
              📊 Dashboard
            </button>
          </div>

          <div className="mb-3">
            <small className="text-uppercase text-secondary fw-bold px-3" style={{ fontSize: "11px" }}>STUDENTS</small>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 mt-1 hover-white" onClick={() => setActiveTab("student_records")}>
              👥 Student Records
            </button>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white" onClick={() => setActiveTab("add_student")}>
              👤+ Add Student
            </button>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white">
              ☑️ Attendance
            </button>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white">
              📄 Report Cards
            </button>
          </div>

          <div className="mb-3">
            <small className="text-uppercase text-secondary fw-bold px-3" style={{ fontSize: "11px" }}>FINANCE</small>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white">
              💵 Fee Collection
            </button>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white">
              📋 Fee Records
            </button>
          </div>

          <div className="mb-3">
            <small className="text-uppercase text-secondary fw-bold px-3" style={{ fontSize: "11px" }}>EXAMINATION</small>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white">
              🎟️ Generate Admit Cards
            </button>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white">
              🕒 Exam Schedules
            </button>
            <button className="btn w-100 text-start text-white-50 border-0 py-2 px-3 hover-white">
              📅 Create Datesheet
            </button>
          </div>
        </nav>

        <div className="p-3 border-top border-secondary">
          <button className="btn btn-outline-danger w-100 text-start d-flex align-items-center gap-2" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0 fw-bold">Dashboard</h5>
            <small className="text-muted">09 Aug 2026, Sunday — School Management</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "36px", height: "36px" }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="fw-semibold small">{user?.name || "admin"} ▾</span>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-grow-1 p-4 overflow-auto">
          {/* Welcome Banner */}
          <div className="mb-4">
            <h2 className="fw-bold">Welcome back, <span className="text-primary">{user?.name || "admin"}</span>!</h2>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold">
              ROLE: {user?.role ? user.role.toUpperCase() : "ADMIN"}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm p-3 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded p-3 fs-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
                    👥
                  </div>
                  <div>
                    <small className="text-muted fw-semibold d-block">Total Students</small>
                    <h3 className="mb-0 fw-bold">408</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm p-3 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success bg-opacity-10 text-success rounded p-3 fs-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
                    ₹
                  </div>
                  <div>
                    <small className="text-muted fw-semibold d-block">Fee Collected (This Month)</small>
                    <h3 className="mb-0 fw-bold">₹0</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm p-3 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-danger bg-opacity-10 text-danger rounded p-3 fs-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
                    ⚠️
                  </div>
                  <div>
                    <small className="text-muted fw-semibold d-block">Fee Pending</small>
                    <h3 className="mb-0 fw-bold">₹5,300</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm p-3 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-info bg-opacity-10 text-info rounded p-3 fs-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
                    📅
                  </div>
                  <div>
                    <small className="text-muted fw-semibold d-block">Today's Attendance</small>
                    <h3 className="mb-0 fw-bold">0%</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h5 className="fw-semibold text-secondary mb-3">Quick Actions</h5>
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100" style={{ cursor: "pointer" }} onClick={() => setActiveTab("add_student")}>
                <div className="fs-1 text-primary mb-2">👤+</div>
                <span className="fw-semibold text-dark">Student Add</span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100" style={{ cursor: "pointer" }}>
                <div className="fs-1 text-success mb-2">💵</div>
                <span className="fw-semibold text-dark">Fee Collect</span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100" style={{ cursor: "pointer" }}>
                <div className="fs-1 text-warning mb-2">📅</div>
                <span className="fw-semibold text-dark">Exam Schedules</span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100" style={{ cursor: "pointer" }}>
                <div className="fs-1 text-info mb-2">📊</div>
                <span className="fw-semibold text-dark">Report Card</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-top px-4 py-3 d-flex justify-content-between align-items-center small text-muted">
          <span>© 2026 EduManage CRM. All rights reserved.</span>
          <span>Powered by School Management System</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;