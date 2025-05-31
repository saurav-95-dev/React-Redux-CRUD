import React, { useState } from "react";

export default function Create() {
  const [users, setUsers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock navigation and dispatch for demo
  const navigate = (path) => console.log(`Navigate to: ${path}`);
  const dispatch = (action) => console.log('Dispatch:', action);

  const validateForm = () => {
    const newErrors = {};
    
    if (!users.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!users.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(users.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!users.age) {
      newErrors.age = "Age is required";
    } else if (users.age < 1 || users.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }
    
    if (!users.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getUserData = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    console.log(users);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("users", users);
      // Mock dispatch for demo
      dispatch({ type: 'CREATE_USER', payload: users });
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('User created successfully!');
      navigate("/read");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/read");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ 
      background: 'linear-gradient(145deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="main-card shadow-lg border-0">
              {/* Header with enhanced design */}
              <div className="card-header text-center">
                <div className="header-icon mb-3">
                  <div className="icon-circle">
                    <i className="fas fa-user-plus"></i>
                  </div>
                </div>
                <h2 className="mb-2 text-white fw-bold">Create New User</h2>
                <p className="text-white-75 mb-0">Fill in the details below to get started</p>
              </div>

              <div className="card-body p-5">
                <div onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Name Field */}
                    <div className="col-12">
                      <div className="input-group-modern">
                        <div className="input-icon">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control modern-input ${errors.name ? 'is-invalid' : users.name ? 'is-valid' : ''}`}
                            name="name"
                            id="name"
                            placeholder="Enter full name"
                            onChange={getUserData}
                            value={users.name || ''}
                          />
                          <label htmlFor="name">Full Name</label>
                        </div>
                        {errors.name && (
                          <div className="error-message">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.name}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-12">
                      <div className="input-group-modern">
                        <div className="input-icon">
                          <i className="fas fa-envelope"></i>
                        </div>
                        <div className="form-floating">
                          <input
                            type="email"
                            className={`form-control modern-input ${errors.email ? 'is-invalid' : users.email ? 'is-valid' : ''}`}
                            name="email"
                            id="email"
                            placeholder="Enter email address"
                            onChange={getUserData}
                            value={users.email || ''}
                          />
                          <label htmlFor="email">Email Address</label>
                        </div>
                        {errors.email && (
                          <div className="error-message">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Age Field */}
                    <div className="col-12">
                      <div className="input-group-modern">
                        <div className="input-icon">
                          <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="form-floating">
                          <input
                            type="number"
                            className={`form-control modern-input ${errors.age ? 'is-invalid' : users.age ? 'is-valid' : ''}`}
                            name="age"
                            id="age"
                            placeholder="Enter age"
                            onChange={getUserData}
                            value={users.age || ''}
                            min="1"
                            max="120"
                          />
                          <label htmlFor="age">Age</label>
                        </div>
                        {errors.age && (
                          <div className="error-message">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.age}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gender Field */}
                    <div className="col-12">
                      <div className="gender-section">
                        <label className="section-label">
                          <i className="fas fa-venus-mars me-2"></i>
                          Gender
                        </label>
                        <div className="gender-options">
                          <div className="gender-card">
                            <input
                              className="gender-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="Male"
                              onChange={getUserData}
                              checked={users.gender === 'Male'}
                            />
                            <label className="gender-label" htmlFor="male">
                              <div className="gender-icon male-icon">
                                <i className="fas fa-mars"></i>
                              </div>
                              <span>Male</span>
                            </label>
                          </div>
                          <div className="gender-card">
                            <input
                              className="gender-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="Female"
                              onChange={getUserData}
                              checked={users.gender === 'Female'}
                            />
                            <label className="gender-label" htmlFor="female">
                              <div className="gender-icon female-icon">
                                <i className="fas fa-venus"></i>
                              </div>
                              <span>Female</span>
                            </label>
                          </div>
                        </div>
                        {errors.gender && (
                          <div className="error-message mt-2">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.gender}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons mt-5">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn-modern btn-primary-modern"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner-modern me-2"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus-circle me-2"></i>
                          Create User
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-modern btn-secondary-modern"
                    >
                      <i className="fas fa-times me-2"></i>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Floating background shapes */
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 20s infinite ease-in-out;
        }
        
        .shape-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .shape-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 15%;
          animation-delay: -5s;
        }
        
        .shape-3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 20%;
          animation-delay: -10s;
        }
        
        .shape-4 {
          width: 100px;
          height: 100px;
          top: 20%;
          right: 25%;
          animation-delay: -15s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-40px) rotate(180deg); }
          75% { transform: translateY(-20px) rotate(270deg); }
        }

        /* Main card styling */
        .main-card {
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideInUp 0.8s ease-out;
        }

        .main-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header styling */
        .card-header {
          background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
          padding: 3rem 2rem;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .card-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .header-icon {
          position: relative;
          z-index: 2;
        }

        .icon-circle {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          animation: pulse 2s infinite;
        }

        .icon-circle i {
          font-size: 2rem;
          color: white;
        }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }

        .text-white-75 {
          color: rgba(255, 255, 255, 0.85) !important;
        }

        /* Modern input styling */
        .input-group-modern {
          position: relative;
          margin-bottom: 0.5rem;
        }

        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          color: #667eea;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .modern-input {
          border-radius: 16px;
          border: 2px solid #e9ecef;
          padding-left: 3.5rem !important;
          height: 3.5rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
        }

        .modern-input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.15) !important;
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 1);
        }

        .modern-input:focus + label,
        .modern-input:not(:placeholder-shown) + label {
          color: #667eea !important;
          font-weight: 600;
        }

        .modern-input.is-valid {
          border-color: #28a745;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='m2.3 6.73.94-.94 1.48 1.48L7.6 4.39l.94.94L5.66 8.21z'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
        }

        .modern-input.is-invalid {
          border-color: #dc3545;
        }

        .form-floating > label {
          color: #6c757d;
          font-weight: 500;
          padding-left: 3.5rem;
        }

        /* Error message styling */
        .error-message {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          font-weight: 500;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* Gender section styling */
        .gender-section {
          margin-top: 1rem;
        }

        .section-label {
          display: block;
          font-weight: 600;
          color: #495057;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .gender-options {
          display: flex;
          gap: 1rem;
        }

        .gender-card {
          flex: 1;
          position: relative;
        }

        .gender-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .gender-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          font-weight: 600;
          color: #6c757d;
        }

        .gender-label:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .gender-input:checked + .gender-label {
          border-color: #667eea;
          background: linear-gradient(145deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
        }

        .gender-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }

        .male-icon {
          background: linear-gradient(145deg, #3498db, #2980b9);
          color: white;
        }

        .female-icon {
          background: linear-gradient(145deg, #e91e63, #c2185b);
          color: white;
        }

        .gender-input:checked + .gender-label .gender-icon {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        /* Button styling */
        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn-modern {
          border: none;
          border-radius: 16px;
          padding: 1rem 2rem;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 3.5rem;
        }

        .btn-primary-modern {
          flex: 2;
          background: linear-gradient(145deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .btn-primary-modern:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .btn-primary-modern:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-secondary-modern {
          flex: 1;
          background: rgba(108, 117, 125, 0.1);
          color: #6c757d;
          border: 2px solid #e9ecef;
          backdrop-filter: blur(10px);
        }

        .btn-secondary-modern:hover {
          background: #6c757d;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(108, 117, 125, 0.3);
        }

        /* Spinner styling */
        .spinner-modern {
          width: 1.2rem;
          height: 1.2rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .gender-options {
            flex-direction: column;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn-primary-modern,
          .btn-secondary-modern {
            flex: 1;
          }
          
          .card-body {
            padding: 2rem !important;
          }
          
          .card-header {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}