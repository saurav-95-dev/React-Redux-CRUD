import React, { useState } from "react";

export default function Create() {
  const [users, setUsers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock navigation and dispatch for demo
  const navigate = (path) => console.log('Navigate to:', path);
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
      dispatch({ type: 'createUser', payload: users });
      
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
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
      
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Create New User</h1>
            <p className="text-white/80 text-lg">Join our community by filling out the form below</p>
          </div>

          {/* Main Form Card */}
          <div className="backdrop-blur-lg bg-white/95 rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
            <div className="p-8">
              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
                    <svg className="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={users.name || ''}
                      onChange={getUserData}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-0 focus:bg-white focus:shadow-lg focus:scale-[1.02] ${
                        errors.name ? 'border-red-400 bg-red-50/50' : 
                        users.name ? 'border-green-400 bg-green-50/50' : 
                        'border-gray-200 focus:border-purple-400'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {users.name && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center animate-pulse">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
                    <svg className="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={users.email || ''}
                      onChange={getUserData}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-0 focus:bg-white focus:shadow-lg focus:scale-[1.02] ${
                        errors.email ? 'border-red-400 bg-red-50/50' : 
                        users.email ? 'border-green-400 bg-green-50/50' : 
                        'border-gray-200 focus:border-purple-400'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {users.email && !errors.email && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center animate-pulse">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Age Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
                    <svg className="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Age
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={users.age || ''}
                      onChange={getUserData}
                      min="1"
                      max="120"
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-0 focus:bg-white focus:shadow-lg focus:scale-[1.02] ${
                        errors.age ? 'border-red-400 bg-red-50/50' : 
                        users.age ? 'border-green-400 bg-green-50/50' : 
                        'border-gray-200 focus:border-purple-400'
                      }`}
                      placeholder="Enter your age"
                    />
                    {users.age && !errors.age && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.age && (
                    <p className="mt-2 text-sm text-red-600 flex items-center animate-pulse">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      {errors.age}
                    </p>
                  )}
                </div>

                {/* Gender Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    <svg className="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                    Gender
                  </label>
                  <div className="flex gap-4">
                    {['Male', 'Female'].map((gender) => (
                      <label key={gender} className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          onChange={getUserData}
                          checked={users.gender === gender}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                          users.gender === gender 
                            ? 'border-purple-500 bg-purple-50 shadow-lg scale-105' 
                            : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center justify-center space-x-2">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              users.gender === gender 
                                ? 'border-purple-500 bg-purple-500' 
                                : 'border-gray-300'
                            }`}>
                              {users.gender === gender && (
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className={`font-medium ${
                              users.gender === gender ? 'text-purple-700' : 'text-gray-600'
                            }`}>
                              {gender}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-600 flex items-center animate-pulse">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Create User
                      </div>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-200 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Cancel
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        
        .floating-shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }
        
        .shape-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation: float 6s ease-in-out infinite;
        }
        
        .shape-2 {
          width: 120px;
          height: 120px;
          top: 20%;
          right: 15%;
          animation: floatReverse 8s ease-in-out infinite;
        }
        
        .shape-3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 20%;
          animation: float 7s ease-in-out infinite;
        }
        
        .shape-4 {
          width: 100px;
          height: 100px;
          bottom: 10%;
          right: 10%;
          animation: floatReverse 5s ease-in-out infinite;
        }
        
        .group:focus-within label {
          color: #9333ea;
        }
      `}</style>
    </div>
  );
}