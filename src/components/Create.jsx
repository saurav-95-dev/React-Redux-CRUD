import React, { useState } from "react";

export default function Create() {
  const [users, setUsers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // Mock navigation and dispatch functions for demo
  const navigate = (path) => alert(`Navigating to: ${path}`);
  const dispatch = (action) => console.log("Dispatching:", action);

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
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const userData = { ...users, id: Date.now() }; // Mock user creation
      dispatch({ type: 'CREATE_USER', payload: userData });
      await new Promise(resolve => setTimeout(resolve, 800));
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

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Create New User</h1>
            <p className="text-purple-200 text-lg">Enter you tickets here</p>
          </div>

          {/* Form Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
            <div onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'transform -translate-y-1' : ''}`}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    onChange={getUserData}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    value={users.name || ''}
                    className={`w-full px-6 py-4 bg-white bg-opacity-90 rounded-2xl border-2 transition-all duration-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:scale-105 ${
                      errors.name 
                        ? 'border-red-400 focus:border-red-500' 
                        : users.name 
                          ? 'border-green-400 focus:border-green-500' 
                          : 'border-transparent focus:border-purple-400'
                    }`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {errors.name && (
                  <div className="mt-2 text-red-300 text-sm flex items-center animate-slide-down">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'transform -translate-y-1' : ''}`}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    onChange={getUserData}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    value={users.email || ''}
                    className={`w-full px-6 py-4 pl-14 bg-white bg-opacity-90 rounded-2xl border-2 transition-all duration-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:scale-105 ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : users.email 
                          ? 'border-green-400 focus:border-green-500' 
                          : 'border-transparent focus:border-purple-400'
                    }`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <div className="mt-2 text-red-300 text-sm flex items-center animate-slide-down">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Age Field */}
              <div className="relative">
                <div className={`relative transition-all duration-300 ${focusedField === 'age' ? 'transform -translate-y-1' : ''}`}>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Enter your age"
                    onChange={getUserData}
                    onFocus={() => handleFocus('age')}
                    onBlur={handleBlur}
                    value={users.age || ''}
                    min="1"
                    max="120"
                    className={`w-full px-6 py-4 pl-14 bg-white bg-opacity-90 rounded-2xl border-2 transition-all duration-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:scale-105 ${
                      errors.age 
                        ? 'border-red-400 focus:border-red-500' 
                        : users.age 
                          ? 'border-green-400 focus:border-green-500' 
                          : 'border-transparent focus:border-purple-400'
                    }`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                {errors.age && (
                  <div className="mt-2 text-red-300 text-sm flex items-center animate-slide-down">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.age}
                  </div>
                )}
              </div>

              {/* Gender Field */}
              <div className="space-y-4">
                <label className="text-white font-semibold text-lg flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`relative cursor-pointer transition-all duration-300 ${users.gender === 'Male' ? 'scale-105' : 'hover:scale-102'}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={getUserData}
                      checked={users.gender === 'Male'}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                      users.gender === 'Male' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg' 
                        : 'bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-opacity-30'
                    }`}>
                      <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 8.5l7 7m0 0V9m0 6.5H9" />
                      </svg>
                      <span className="font-medium">Male</span>
                    </div>
                  </label>
                  <label className={`relative cursor-pointer transition-all duration-300 ${users.gender === 'Female' ? 'scale-105' : 'hover:scale-102'}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={getUserData}
                      checked={users.gender === 'Female'}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                      users.gender === 'Female' 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-transparent text-white shadow-lg' 
                        : 'bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-opacity-30'
                    }`}>
                      <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v6m0 6v6m6-6h-6m0 0H6" />
                      </svg>
                      <span className="font-medium">Female</span>
                    </div>
                  </label>
                </div>
                {errors.gender && (
                  <div className="text-red-300 text-sm flex items-center animate-slide-down">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.gender}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating User...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create User
                      </>
                    )}
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="sm:w-auto px-6 py-4 bg-white bg-opacity-20 text-white font-medium rounded-2xl border-2 border-white border-opacity-30 transition-all duration-300 hover:bg-opacity-30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}