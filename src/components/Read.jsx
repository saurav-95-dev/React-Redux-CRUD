import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from 'react-router';
import { deleteUser } from "../features/userDetailsSlice";

export default function Read() {
    const dispatch = useDispatch();
    
    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [genderFilter, setGenderFilter] = useState('All');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    
    const { users, loading, searchData } = useSelector((state) => state.userDetail);
    
    useEffect(() => {
        dispatch(showUser())
    }, [])
    
    const handleGenderFilter = (gender) => {
        setGenderFilter(gender);
    };
    
    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
        setDeleteConfirm(null);
    };
    
    const filteredUsers = users?.filter((user) => {
        // Search filter
        const matchesSearch = searchData.length === 0 || 
            user.name.toLowerCase().includes(searchData.toLowerCase());
        
        // Gender filter
        const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
        
        return matchesSearch && matchesGender;
    }) || [];
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-semibold text-gray-700">Loading users...</h2>
                    <p className="text-gray-500 mt-2">Please wait while we fetch the data</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {showPopup && (
                <CustomModal 
                    id={id} 
                    showPopup={showPopup} 
                    setShowPopup={setShowPopup}
                />
            )}
            
            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h3>
                            <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        User Directory
                    </h1>
                    <p className="text-gray-600 text-lg">Manage and explore your user community</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
                </div>
                
                {/* Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter by Gender
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {['All', 'Male', 'Female'].map((gender) => (
                            <label key={gender} className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={genderFilter === gender}
                                    onChange={() => handleGenderFilter(gender)}
                                    className="sr-only"
                                />
                                <div className={`
                                    px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 transform
                                    ${genderFilter === gender 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }
                                `}>
                                    {gender}
                                    {genderFilter === gender && (
                                        <span className="ml-2">✓</span>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                
                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 text-sm">
                        Showing <span className="font-semibold text-blue-600">{filteredUsers.length}</span> 
                        {filteredUsers.length === 1 ? ' user' : ' users'}
                        {genderFilter !== 'All' && ` (${genderFilter.toLowerCase()})`}
                        {searchData && ` matching "${searchData}"`}
                    </p>
                </div>
                
                {/* Users Grid */}
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredUsers.map((user, index) => (
                            <div 
                                key={user.id} 
                                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* User Avatar */}
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-20 relative">
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                                            <span className="text-lg font-bold text-blue-600">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Card Content */}
                                <div className="pt-8 p-6">
                                    <div className="text-center mb-4">
                                        <h5 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                                            {user.name}
                                        </h5>
                                        <div className="flex items-center justify-center text-xs text-gray-500 mb-3">
                                            <span className={`
                                                px-2 py-1 rounded-full text-xs font-medium
                                                ${user.gender === 'Male' 
                                                    ? 'bg-blue-100 text-blue-700' 
                                                    : 'bg-pink-100 text-pink-700'
                                                }
                                            `}>
                                                {user.gender}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mb-6 text-sm">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-1 9a2 2 0 01-2 2H6a2 2 0 01-2-2l-1-9V9a2 2 0 012-2h3z" />
                                            </svg>
                                            <span>{user.age} years old</span>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex flex-col space-y-2">
                                        <button 
                                            onClick={() => [setId(user.id), setShowPopup(true)]}
                                            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            👁️ View Details
                                        </button>
                                        
                                        <div className="flex space-x-2">
                                            <Link 
                                                to={`/edit/${user.id}`}
                                                className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteConfirm(user.id)}
                                                className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}