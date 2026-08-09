// src/Students.jsx
import React, { useState, useEffect } from "react";

function Students({ onBack }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ admission_no: "", name: "", email: "", class: "10th", section: "A" });

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost/REACT-PHP-CRUD/api/students.php");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost/REACT-PHP-CRUD/api/students.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ admission_no: "", name: "", email: "", class: "10th", section: "A" });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await fetch(`http://localhost/REACT-PHP-CRUD/api/students.php?id=${id}`, { method: "DELETE" });
      fetchStudents();
    }
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      {/* Top Bar */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <button onClick={onBack} className="btn btn-outline-secondary d-flex align-items-center gap-2">
          ← Back to Dashboard
        </button>
        <h3 className="fw-bold m-0 text-dark">Manage Students</h3>
      </div>

      {/* Add Student Card Form */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h5 className="card-title fw-bold m-0 text-primary">➕ Add New Student</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12 col-sm-6 col-md-2">
              <label className="form-label small fw-semibold">Admission No</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 1001"
                value={form.admission_no}
                onChange={(e) => setForm({ ...form, admission_no: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <label className="form-label small fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Student Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <label className="form-label small fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="student@school.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-sm-3 col-md-2">
              <label className="form-label small fw-semibold">Class</label>
              <input
                type="text"
                className="form-control"
                placeholder="Class"
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-sm-3 col-md-2">
              <label className="form-label small fw-semibold">Section</label>
              <input
                type="text"
                className="form-control"
                placeholder="Section"
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                required
              />
            </div>
            <div className="col-12 d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-success px-4 fw-semibold">
                Save Student
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Students List Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="card-title fw-bold m-0 text-dark">📋 Student Records</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className="ps-3">ID</th>
                  <th scope="col">Adm. No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Class & Section</th>
                  <th scope="col" className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((stu) => (
                    <tr key={stu.id}>
                      <th scope="row" className="ps-3">{stu.id}</th>
                      <td><span className="badge bg-secondary">{stu.admission_no}</span></td>
                      <td className="fw-semibold">{stu.name}</td>
                      <td>{stu.email}</td>
                      <td>
                        <span className="badge bg-info text-dark">{stu.class} ({stu.section})</span>
                      </td>
                      <td className="text-end pe-3">
                        <button
                          onClick={() => handleDelete(stu.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No student records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;