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
        const matchesSearch = searchData.length === 0 || 
            user.name.toLowerCase().includes(searchData.toLowerCase());
        const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
        return matchesSearch && matchesGender;
    }) || [];

    if (loading) {
        return (
            <>
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                    .loading-bg {
                        background: linear-gradient(135deg, #667eea 0%,rgb(148, 98, 197) 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
                        background-size: 400% 400%;
                        animation: gradient 15s ease infinite;
                    }
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}</style>
                <div className="loading-bg" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Floating particles */}
                    {[...Array(20)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '50%',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`
                        }} />
                    ))}
                    
                    <div style={{ 
                        textAlign: 'center', 
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '3rem',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            border: '4px solid rgba(255,255,255,0.3)',
                            borderTop: '4px solid #fff',
                            borderRadius: '50%',
                            margin: '0 auto 2rem auto',
                            animation: 'float 2s linear infinite'
                        }}></div>
                        <h2 style={{ 
                            fontSize: '2rem', 
                            fontWeight: '700', 
                            color: 'white',
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            Loading Magic ✨
                        </h2>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '1.1rem',
                            animation: 'pulse 2s ease-in-out infinite'
                        }}>
                            Preparing your amazing experience...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
                }
                @keyframes slideIn {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                    40%, 43% { transform: translate3d(0,-15px,0); }
                    70% { transform: translate3d(0,-7px,0); }
                    90% { transform: translate3d(0,-2px,0); }
                }
                .main-bg {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
                    background-size: 400% 400%;
                    animation: gradient 15s ease infinite;
                    position: relative;
                    overflow: hidden;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }
                .user-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation: slideIn 0.6s ease-out forwards;
                }
                .user-card:hover {
                    transform: translateY(-15px) scale(1.02);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                }
                .gradient-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .btn-magical {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    border-radius: 15px;
                    color: white;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .btn-magical:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transition: all 0.5s;
                }
                .btn-magical:hover:before {
                    left: 100%;
                }
                .btn-magical:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                .filter-pill {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .filter-pill:hover {
                    transform: scale(1.05);
                }
                .avatar-ring {
                    position: relative;
                }
                .avatar-ring:before {
                    content: '';
                    position: absolute;
                    top: -3px;
                    left: -3px;
                    right: -3px;
                    bottom: -3px;
                    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
                    border-radius: 50%;
                    z-index: -1;
                    animation: glow 3s ease-in-out infinite;
                }
            `}</style>
            
            <div className="main-bg" style={{ minHeight: '100vh', position: 'relative' }}>
                {/* Floating decorative elements */}
                {[...Array(15)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${Math.random() * 20 + 10}px`,
                        height: `${Math.random() * 20 + 10}px`,
                        background: `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '20%',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`
                    }} />
                ))}

                {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
                
                <div className="container mx-auto" style={{ padding: '3rem 1rem', position: 'relative', zIndex: 2 }}>
                    {/* Spectacular Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="avatar-ring" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100px',
                            height: '100px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            marginBottom: '2rem',
                            animation: 'bounce 2s infinite'
                        }}>
                            <svg width="50" height="50" fill="white" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <h1 className="gradient-text" style={{ 
                            fontSize: '4rem', 
                            fontWeight: '900', 
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            User Galaxy ✨
                        </h1>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '1.3rem',
                            fontWeight: '500',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}>
                            Discover and manage users in style 🚀
                        </p>
                    </div>

                    {/* Premium Filter Section */}
                    <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem', 
                            marginBottom: '1.5rem',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animation: 'glow 2s ease-in-out infinite'
                            }}>
                                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                                    <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 2v-2.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"/>
                                </svg>
                            </div>
                            <h3 style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: '700', 
                                color: 'white',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                            }}>
                                Filter by Gender 🎯
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                            {[
                                { label: 'All Users', value: 'All', emoji: '👥', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                                { label: 'Male', value: 'Male', emoji: '👨', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                                { label: 'Female', value: 'Female', emoji: '👩', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }
                            ].map((option) => (
                                <label key={option.value} style={{ cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option.value}
                                        checked={genderFilter === option.value}
                                        onChange={() => handleGenderChange(option.value)}
                                        style={{ display: 'none' }}
                                    />
                                    <div className="filter-pill" style={{
                                        padding: '1rem 2rem',
                                        borderRadius: '25px',
                                        fontWeight: '600',
                                        fontSize: '1.1rem',
                                        background: genderFilter === option.value ? option.gradient : 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        border: genderFilter === option.value ? 'none' : '2px solid rgba(255,255,255,0.3)',
                                        boxShadow: genderFilter === option.value ? '0 10px 30px rgba(0,0,0,0.2)' : 'none',
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                                    }}>
                                        {option.emoji} {option.label}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* User Count with Animation */}
                    <div style={{ 
                        textAlign: 'center', 
                        marginBottom: '2rem',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px',
                        padding: '1rem',
                        display: 'inline-block',
                        margin: '0 auto 2rem auto',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <p style={{ 
                            color: 'white', 
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            margin: 0,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}>
                            ✨ Displaying <span style={{ 
                                fontWeight: '800', 
                                fontSize: '1.4rem',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                {filteredUsers.length}
                            </span> amazing user{filteredUsers.length !== 1 ? 's' : ''} ✨
                            {genderFilter !== 'All' && (
                                <span style={{ display: 'block', fontSize: '1rem', marginTop: '0.5rem', opacity: 0.8 }}>
                                    📊 Filtered by: {genderFilter}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Stunning Users Grid */}
                    {filteredUsers.length === 0 ? (
                        <div className="glass-card" style={{ 
                            textAlign: 'center', 
                            padding: '4rem 2rem',
                            animation: 'slideIn 0.8s ease-out'
                        }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem auto',
                                animation: 'float 3s ease-in-out infinite'
                            }}>
                                <svg width="60" height="60" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <h3 style={{ 
                                fontSize: '2rem', 
                                fontWeight: '700', 
                                color: 'white', 
                                marginBottom: '1rem',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}>
                                🔍 No Users Found
                            </h3>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.8)', 
                                fontSize: '1.2rem',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                            }}>
                                Try adjusting your magical filters ✨
                            </p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredUsers.map((user, index) => (
                                <div key={user.id} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                    <div 
                                        className="user-card"
                                        style={{
                                            height: '100%',
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                    >
                                        <div style={{ padding: '2rem' }}>
                                            {/* Magical Avatar */}
                                            <div className="avatar-ring" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '80px',
                                                height: '80px',
                                                background: `linear-gradient(135deg, ${user.gender === 'Male' ? '#4facfe 0%, #00f2fe 100%' : '#f093fb 0%, #f5576c 100%'})`,
                                                borderRadius: '50%',
                                                margin: '0 auto 1.5rem auto',
                                                position: 'relative'
                                            }}>
                                                <span style={{ 
                                                    color: 'white', 
                                                    fontWeight: '900', 
                                                    fontSize: '1.8rem',
                                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                                }}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>

                                            {/* User Info with Style */}
                                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                                <h3 style={{ 
                                                    fontSize: '1.4rem', 
                                                    fontWeight: '800', 
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    marginBottom: '1rem'
                                                }}>
                                                    {user.name}
                                                </h3>
                                                <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                                                    <div style={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center', 
                                                        gap: '0.5rem', 
                                                        margin: '0.8rem 0',
                                                        background: 'rgba(59, 130, 246, 0.1)',
                                                        padding: '0.5rem',
                                                        borderRadius: '10px'
                                                    }}>
                                                        <span style={{ fontSize: '1.2rem' }}>📧</span>
                                                        <span style={{ fontWeight: '600' }}>{user.email}</span>
                                                    </div>
                                                    <div style={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center', 
                                                        gap: '0.5rem', 
                                                        margin: '0.8rem 0',
                                                        background: 'rgba(34, 197, 94, 0.1)',
                                                        padding: '0.5rem',
                                                        borderRadius: '10px'
                                                    }}>
                                                        <span style={{ fontSize: '1.2rem' }}>🎂</span>
                                                        <span style={{ fontWeight: '600' }}>Age: {user.age}</span>
                                                    </div>
                                                    <div style={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center', 
                                                        gap: '0.5rem', 
                                                        margin: '0.8rem 0',
                                                        background: user.gender === 'Male' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(236, 72, 153, 0.1)',
                                                        padding: '0.5rem',
                                                        borderRadius: '10px'
                                                    }}>
                                                        <span style={{ fontSize: '1.2rem' }}>{user.gender === 'Male' ? '👨' : '👩'}</span>
                                                        <span style={{ fontWeight: '600' }}>{user.gender}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Premium Action Buttons */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                                <button
                                                    onClick={() => [setId(user.id), setShowPopup(true)]}
                                                    className="btn-magical"
                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                        padding: '0.8rem 1rem',
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '1.2rem' }}>👁️</span>
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
                                                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                            color: 'white',
                                                            padding: '0.8rem 1rem',
                                                            borderRadius: '15px',
                                                            textDecoration: 'none',
                                                            fontWeight: '600',
                                                            transition: 'all 0.3s ease',
                                                            position: 'relative',
                                                            overflow: 'hidden'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = 'translateY(-2px)';
                                                            e.target.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.4)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    >
                                                        <span style={{ fontSize: '1.1rem' }}>✏️</span>
                                                        Edit
                                                    </Link>
                                                    
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('🗑️ Are you sure you want to delete this user? This action cannot be undone!')) {
                                                                dispatch(deleteUser(user.id));
                                                            }
                                                        }}
                                                        style={{
                                                            flex: 1,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '0.5rem',
                                                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                            color: 'white',
                                                            padding: '0.8rem 1rem',
                                                            borderRadius: '15px',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontWeight: '600',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = 'translateY(-2px)';
                                                            e.target.style.boxShadow = '0 10px 25px rgba(240, 96, 96, 0.4)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    >
                                                        <span style={{ fontSize: '1.1rem' }}>🗑️</span>
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
        </>
    );
}