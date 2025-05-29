import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from 'react-router-dom';
import { deleteUser } from "../features/userDetailsSlice";

export default function Read() {
    const dispatch = useDispatch();

    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [genderFilter, setGenderFilter] = useState('All');

    const { users, loading, searchData } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(showUser())
    }, [])

    const handleGenderChange = (gender) => {
        setGenderFilter(gender);
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
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        border: '4px solid #3b82f6',
                        borderTop: '4px solid transparent',
                        borderRadius: '50%',
                        margin: '0 auto 1rem auto',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>Loading users...</h2>
                    <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Please wait while we fetch the data</p>
                </div>
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)'
        }}>
            {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
            
            <div className="container mx-auto" style={{ padding: '2rem 1rem' }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '64px',
                        height: '64px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        marginBottom: '1rem'
                    }}>
                        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                            <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"/>
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                        User Management
                    </h1>
                    <p style={{ color: '#6b7280' }}>Manage and view all registered users</p>
                </div>

                {/* Filter Section */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <svg width="20" height="20" fill="#6b7280" viewBox="0 0 24 24">
                            <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 2v-2.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"/>
                        </svg>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>Filter by Gender</h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {['All', 'Male', 'Female'].map((gender) => (
                            <label key={gender} style={{ cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={genderFilter === gender}
                                    onChange={() => handleGenderChange(gender)}
                                    style={{ display: 'none' }}
                                />
                                <div style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '9999px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s',
                                    background: genderFilter === gender ? '#3b82f6' : '#f3f4f6',
                                    color: genderFilter === gender ? 'white' : '#6b7280',
                                    transform: genderFilter === gender ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: genderFilter === gender ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                                }}>
                                    {gender}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Users Count */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ color: '#6b7280' }}>
                        Showing <span style={{ fontWeight: '600', color: '#2563eb' }}>{filteredUsers.length}</span> user{filteredUsers.length !== 1 ? 's' : ''}
                        {genderFilter !== 'All' && ` (${genderFilter})`}
                    </p>
                </div>

                {/* Users Grid */}
                {filteredUsers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <div style={{
                            width: '96px',
                            height: '96px',
                            background: '#e5e7eb',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem auto'
                        }}>
                            <svg width="48" height="48" fill="#9ca3af" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>
                            No users found
                        </h3>
                        <p style={{ color: '#9ca3af' }}>Try adjusting your filters or search criteria</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s',
                                    height: '100%',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 25px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                                }}>
                                    <div style={{ padding: '1.5rem' }}>
                                        {/* User Avatar */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '64px',
                                            height: '64px',
                                            background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
                                            borderRadius: '50%',
                                            margin: '0 auto 1rem auto'
                                        }}>
                                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>

                                        {/* User Info */}
                                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                                                {user.name}
                                            </h3>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                                                    <span style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%' }}></span>
                                                    {user.email}
                                                </p>
                                                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                                                    <span style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%' }}></span>
                                                    Age: {user.age}
                                                </p>
                                                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                                                    <span style={{ 
                                                        width: '8px', 
                                                        height: '8px', 
                                                        background: user.gender === 'Male' ? '#60a5fa' : '#f472b6', 
                                                        borderRadius: '50%' 
                                                    }}></span>
                                                    {user.gender}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => [setId(user.id), setShowPopup(true)]}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    background: '#3b82f6',
                                                    color: 'white',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontWeight: '500',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                                                onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                                            >
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                                                </svg>
                                                View Details
                                            </button>
                                            
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Link
                                                    to={`/edit/${user.id}`}
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                        background: '#f59e0b',
                                                        color: 'white',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '8px',
                                                        textDecoration: 'none',
                                                        fontWeight: '500',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.background = '#d97706'}
                                                    onMouseLeave={(e) => e.target.style.background = '#f59e0b'}
                                                >
                                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"/>
                                                    </svg>
                                                    Edit
                                                </Link>
                                                
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this user?')) {
                                                            dispatch(deleteUser(user.id));
                                                        }
                                                    }}
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '8px',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: '500',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                                                    onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                                                >
                                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"/>
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
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