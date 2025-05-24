import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailsSlice";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [users, setUsers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(createUser(users));
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
    <div className="min-vh-100" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card shadow-lg border-0" style={{
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-header text-center py-4" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px 20px 0 0',
                border: 'none'
              }}>
                <h2 className="mb-0 text-white fw-bold">
                  <i className="fas fa-user-plus me-2"></i>
                  Create New User
                </h2>
                <p className="text-white-50 mb-0 mt-1">Fill in the details below</p>
              </div>

              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Name Field */}
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : users.name ? 'is-valid' : ''}`}
                          name="name"
                          id="name"
                          placeholder="Enter full name"
                          onChange={getUserData}
                          value={users.name || ''}
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <label htmlFor="name">
                          <i className="fas fa-user me-2 text-primary"></i>
                          Full Name
                        </label>
                        {errors.name && (
                          <div className="invalid-feedback d-block">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.name}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : users.email ? 'is-valid' : ''}`}
                          name="email"
                          id="email"
                          placeholder="Enter email address"
                          onChange={getUserData}
                          value={users.email || ''}
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <label htmlFor="email">
                          <i className="fas fa-envelope me-2 text-primary"></i>
                          Email Address
                        </label>
                        {errors.email && (
                          <div className="invalid-feedback d-block">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Age Field */}
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="number"
                          className={`form-control ${errors.age ? 'is-invalid' : users.age ? 'is-valid' : ''}`}
                          name="age"
                          id="age"
                          placeholder="Enter age"
                          onChange={getUserData}
                          value={users.age || ''}
                          min="1"
                          max="120"
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <label htmlFor="age">
                          <i className="fas fa-calendar-alt me-2 text-primary"></i>
                          Age
                        </label>
                        {errors.age && (
                          <div className="invalid-feedback d-block">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.age}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gender Field */}
                    <div className="col-12">
                      <label className="form-label fw-bold text-dark mb-3">
                        <i className="fas fa-venus-mars me-2 text-primary"></i>
                        Gender
                      </label>
                      <div className="d-flex gap-4">
                        <div className="form-check form-check-custom">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="Male"
                            onChange={getUserData}
                            checked={users.gender === 'Male'}
                            style={{
                              transform: 'scale(1.2)',
                              accentColor: '#667eea'
                            }}
                          />
                          <label className="form-check-label fw-medium ms-2" htmlFor="male">
                            <i className="fas fa-mars me-1 text-primary"></i>
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-custom">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="Female"
                            onChange={getUserData}
                            checked={users.gender === 'Female'}
                            style={{
                              transform: 'scale(1.2)',
                              accentColor: '#667eea'
                            }}
                          />
                          <label className="form-check-label fw-medium ms-2" htmlFor="female">
                            <i className="fas fa-venus me-1 text-primary"></i>
                            Female
                          </label>
                        </div>
                      </div>
                      {errors.gender && (
                        <div className="text-danger mt-2">
                          <i className="fas fa-exclamation-circle me-1"></i>
                          {errors.gender}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3 mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary flex-fill py-3 fw-bold"
                      style={{
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
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
                      className="btn btn-outline-secondary py-3 px-4 fw-bold"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #6c757d',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="fas fa-times me-2"></i>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
          transform: translateY(-2px);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
        }
        
        .btn-outline-secondary:hover {
          transform: translateY(-2px);
          background-color: #6c757d;
          color: white;
        }
        
        .form-check-input:checked {
          background-color: #667eea;
          border-color: #667eea;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }
        
        .form-floating > label {
          color: #6c757d;
          font-weight: 500;
        }
        
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: #667eea;
        }
      `}</style>
    </div>
  );
}