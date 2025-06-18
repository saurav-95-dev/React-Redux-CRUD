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
                        50% { transform: translateY(-25px) rotate(180deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.7; transform: scale(1.05); }
                    }
                    @keyframes ripple {
                        0% { transform: scale(0.8); opacity: 1; }
                        100% { transform: scale(2.4); opacity: 0; }
                    }
                    @keyframes loading-gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .loading-bg {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 15%, #f093fb 30%, #f5576c 45%, #4facfe 60%, #00f2fe 75%, #a8edea 90%, #fed6e3 100%);
                        background-size: 800% 800%;
                        animation: loading-gradient 20s ease infinite;
                    }
                    .loading-orb {
                        position: relative;
                        width: 120px;
                        height: 120px;
                        margin: 0 auto 2rem;
                    }
                    .loading-orb::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 100%;
                        height: 100%;
                        background: conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #667eea);
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                        animation: float 3s linear infinite;
                    }
                    .loading-orb::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 80%;
                        height: 80%;
                        background: rgba(255, 255, 255, 0.9);
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 1;
                    }
                    .loading-icon {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 2;
                        animation: pulse 2s ease-in-out infinite;
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
                    {/* Enhanced floating particles */}
                    {[...Array(30)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: `${Math.random() * 15 + 8}px`,
                            height: `${Math.random() * 15 + 8}px`,
                            background: `rgba(255,255,255,${Math.random() * 0.5 + 0.2})`,
                            borderRadius: Math.random() > 0.7 ? '50%' : `${Math.random() * 10 + 5}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                            boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                        }} />
                    ))}
                    
                    <div style={{ 
                        textAlign: 'center', 
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '30px',
                        padding: '4rem 3rem',
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.1)'
                    }}>
                        <div className="loading-orb">
                            <div className="loading-icon">
                                <svg width="40" height="40" fill="#667eea" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                        </div>
                        <h2 style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: '900', 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem'
                        }}>
                            Loading Enchantment ✨
                        </h2>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '1.2rem',
                            fontWeight: '500',
                            animation: 'pulse 2s ease-in-out infinite'
                        }}>
                            Weaving digital magic for your experience...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style jsx>{`
                @keyframes cosmic-gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes gentle-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes magical-glow {
                    0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2); }
                    50% { box-shadow: 0 0 50px rgba(59, 130, 246, 0.6), 0 0 100px rgba(139, 92, 246, 0.4); }
                }
                @keyframes slide-up {
                    0% { opacity: 0; transform: translateY(40px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes bounce-in {
                    0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
                    50% { transform: scale(1.05) rotate(5deg); }
                    70% { transform: scale(0.9) rotate(-2deg); }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes orbit {
                    0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
                }
                .cosmic-bg {
                    background: linear-gradient(135deg, 
                        #667eea 0%, 
                        #764ba2 12%, 
                        #f093fb 25%, 
                        #f5576c 37%, 
                        #4facfe 50%, 
                        #00f2fe 62%, 
                        #a8edea 75%, 
                        #fed6e3 87%, 
                        #667eea 100%);
                    background-size: 600% 600%;
                    animation: cosmic-gradient 25s ease infinite;
                    position: relative;
                    overflow: hidden;
                }
                .cosmic-bg::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%);
                    pointer-events: none;
                }
                .premium-glass {
                    background: rgba(255, 255, 255, 0.12);
                    backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    border-radius: 25px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 
                                0 5px 15px rgba(0, 0, 0, 0.08),
                                inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }
                .user-card-enhanced {
                    background: rgba(255, 255, 255, 0.97);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 25px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1), 
                                0 10px 30px rgba(0, 0, 0, 0.05),
                                inset 0 1px 0 rgba(255, 255, 255, 0.8);
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation: slide-up 0.8s ease-out forwards;
                    position: relative;
                    overflow: hidden;
                }
                .user-card-enhanced::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: all 0.8s;
                }
                .user-card-enhanced:hover::before {
                    left: 100%;
                }
                .user-card-enhanced:hover {
                    transform: translateY(-20px) scale(1.03);
                    box-shadow: 0 35px 70px rgba(0, 0, 0, 0.15), 
                                0 15px 40px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.4);
                }
                .cosmic-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
                    background-size: 400% 400%;
                    animation: cosmic-gradient 8s ease infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .btn-cosmic {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    border-radius: 20px;
                    color: white;
                    font-weight: 700;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
                }
                .btn-cosmic::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transition: all 0.6s;
                }
                .btn-cosmic:hover::before {
                    left: 100%;
                }
                .btn-cosmic:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
                }
                .filter-cosmic {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .filter-cosmic:hover {
                    transform: scale(1.08) rotate(1deg);
                }
                .avatar-cosmic {
                    position: relative;
                }
                .avatar-cosmic::before {
                    content: '';
                    position: absolute;
                    top: -4px;
                    left: -4px;
                    right: -4px;
                    bottom: -4px;
                    background: conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea);
                    border-radius: 50%;
                    z-index: -1;
                    animation: magical-glow 4s ease-in-out infinite;
                }
                .avatar-cosmic::after {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    z-index: -1;
                }
                .info-pill {
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                }
                .info-pill:hover {
                    transform: scale(1.02);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }
                .orbit-icon {
                    animation: orbit 8s linear infinite;
                }
            `}</style>
            
            <div className="cosmic-bg" style={{ minHeight: '100vh', position: 'relative' }}>
                {/* Enhanced floating decorative elements */}
                {[...Array(25)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${Math.random() * 25 + 15}px`,
                        height: `${Math.random() * 25 + 15}px`,
                        background: `linear-gradient(45deg, rgba(255,255,255,${Math.random() * 0.4 + 0.2}), rgba(255,255,255,${Math.random() * 0.2 + 0.1}))`,
                        borderRadius: Math.random() > 0.6 ? '50%' : `${Math.random() * 15 + 10}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `gentle-float ${Math.random() * 8 + 6}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 3}s`,
                        boxShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }} />
                ))}

                {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
                
                <div className="container mx-auto" style={{ padding: '4rem 1rem', position: 'relative', zIndex: 2 }}>
                    {/* Epic Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="avatar-cosmic" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '130px',
                            height: '130px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            marginBottom: '2rem',
                            animation: 'bounce-in 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                            position: 'relative'
                        }}>
                            <svg width="60" height="60" fill="white" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            <div className="orbit-icon" style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '15px',
                                height: '15px',
                                background: 'rgba(255,255,255,0.8)',
                                borderRadius: '50%',
                                transformOrigin: '0 0'
                            }}></div>
                        </div>
                        <h1 className="cosmic-text" style={{ 
                            fontSize: '4.5rem', 
                            fontWeight: '900', 
                            marginBottom: '1.5rem',
                            textShadow: '0 0 30px rgba(255,255,255,0.5)',
                            letterSpacing: '-2px'
                        }}>
                            Cosmic User Portal ✨
                        </h1>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.95)', 
                            fontSize: '1.4rem',
                            fontWeight: '600',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Navigate through the digital constellation of users 🌟🚀
                        </p>
                    </div>

                    {/* Premium Filter Section */}
                    <div className="premium-glass" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem', 
                            marginBottom: '2rem',
                            justifyContent: 'center'
                        }}>
                            <div className="avatar-cosmic" style={{
                                width: '50px',
                                height: '50px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                    <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 2v-2.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"/>
                                </svg>
                            </div>
                            <h3 style={{ 
                                fontSize: '1.8rem', 
                                fontWeight: '800', 
                                color: 'white',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                            }}>
                                Cosmic Filter Controls 🎯
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                            {[
                                { label: 'All Beings', value: 'All', emoji: '🌌', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                                { label: 'Male', value: 'Male', emoji: '👨‍🚀', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                                { label: 'Female', value: 'Female', emoji: '👩‍🚀', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }
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
                                    <div className="filter-cosmic" style={{
                                        padding: '1.2rem 2.5rem',
                                        borderRadius: '30px',
                                        fontWeight: '700',
                                        fontSize: '1.2rem',
                                        background: genderFilter === option.value ? option.gradient : 'rgba(255,255,255,0.15)',
                                        color: 'white',
                                        border: genderFilter === option.value ? 'none' : '2px solid rgba(255,255,255,0.4)',
                                        boxShadow: genderFilter === option.value ? '0 15px 35px rgba(0,0,0,0.2)' : 'none',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <span style={{ fontSize: '1.4rem', marginRight: '0.5rem' }}>{option.emoji}</span>
                                        {option.label}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced User Count */}
                    <div style={{ 
                        textAlign: 'center', 
                        marginBottom: '3rem',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '25px',
                        padding: '1.5rem 2rem',
                        display: 'inline-block',
                        margin: '0 auto 3rem auto',
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        <p style={{ 
                            color: 'white', 
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            margin: 0,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            ✨ Displaying <span style={{ 
                                fontWeight: '900', 
                                fontSize: '1.8rem',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: 'none'
                            }}>
                                {filteredUsers.length}
                            </span> cosmic user{filteredUsers.length !== 1 ? 's' : ''} ✨
                            {genderFilter !== 'All' && (
                                <span style={{ display: 'block', fontSize: '1.1rem', marginTop: '0.5rem', opacity: 0.9 }}>
                                    🌟 Filtered by: {genderFilter}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Epic Users Grid */}
                    {filteredUsers.length === 0 ? (
                        <div className="premium-glass" style={{ 
                            textAlign: 'center', 
                            padding: '5rem 3rem',
                            animation: 'slide-up 1s ease-out'
                        }}>
                            <div className="avatar-cosmic" style={{
                                width: '150px',
                                height: '150px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2.5rem auto',
                                animation: 'gentle-float 4s ease-in-out infinite'
                            }}>
                                <svg width="70" height="70" fill="white" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                            </div>
                            <h3 style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '800', 
                                color: 'white', 
                                marginBottom: '1.5rem',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                            }}>
                                🔮 No Cosmic Entities Found
                            </h3>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '1.3rem',
                                textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                            }}>
                                Adjust your dimensional filters to discover new beings ✨🌌
                            </p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredUsers.map((user, index) => (
                                <div key={user.id} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                    <div 
                                        className="user-card-enhanced"
                                        style={{
                                            height: '100%',
                                            animationDelay: `${index * 0.15}s`
                                        }}
                                    >
                                        <div style={{ padding: '2.5rem' }}>
                                            {/* Cosmic Avatar */}
                                            <div className="avatar-cosmic" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '90px',
                                                height: '90px',
                                                background: `linear-gradient(135deg, ${user.gender === 'Male' ? '#4facfe 0%, #00f2fe 100%' : '#f093fb 0%, #f5576c 100%'})`,
                                                borderRadius: '50%',
                                                margin: '0 auto 2rem