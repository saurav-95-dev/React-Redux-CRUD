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
                    @keyframes liquidFloat {
                        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                        25% { transform: translateY(-25px) rotate(90deg) scale(1.1); }
                        50% { transform: translateY(-40px) rotate(180deg) scale(0.9); }
                        75% { transform: translateY(-25px) rotate(270deg) scale(1.1); }
                    }
                    @keyframes morphPulse {
                        0%, 100% { opacity: 1; border-radius: 50%; }
                        25% { opacity: 0.7; border-radius: 20%; }
                        50% { opacity: 0.4; border-radius: 0%; }
                        75% { opacity: 0.7; border-radius: 30%; }
                    }
                    @keyframes cosmicShine {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                    @keyframes galaxyRotate {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes starTwinkle {
                        0%, 100% { opacity: 0.3; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                    .cosmic-bg {
                        background: 
                            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
                            linear-gradient(135deg, #0f0c29 0%, #24243e 25%, #302b63 50%, #0f3460 75%, #0f0c29 100%);
                        background-size: 400% 400%;
                        animation: galaxyRotate 30s linear infinite;
                    }
                    .loading-orb {
                        width: 120px;
                        height: 120px;
                        background: conic-gradient(from 0deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #ff006e);
                        border-radius: 50%;
                        position: relative;
                        animation: galaxyRotate 3s linear infinite;
                    }
                    .loading-orb::before {
                        content: '';
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        right: 10px;
                        bottom: 10px;
                        background: linear-gradient(135deg, rgba(15, 12, 41, 0.9) 0%, rgba(48, 43, 99, 0.9) 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .loading-orb::after {
                        content: '✨';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 2rem;
                        z-index: 1;
                        animation: starTwinkle 2s ease-in-out infinite;
                    }
                `}</style>
                <div className="cosmic-bg" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Cosmic particles */}
                    {[...Array(50)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            background: `hsl(${Math.random() * 360}, 70%, 70%)`,
                            borderRadius: '50%',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `liquidFloat ${Math.random() * 8 + 4}s ease-in-out infinite, starTwinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                            boxShadow: `0 0 20px currentColor`
                        }} />
                    ))}
                    
                    <div style={{ 
                        textAlign: 'center', 
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '30px',
                        padding: '4rem 3rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                    }}>
                        <div className="loading-orb" style={{ margin: '0 auto 2rem auto' }}></div>
                        <h2 style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: '900', 
                            background: 'linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem',
                            letterSpacing: '2px'
                        }}>
                            COSMIC LOADING
                        </h2>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '1.2rem',
                            animation: 'morphPulse 3s ease-in-out infinite',
                            fontWeight: '500'
                        }}>
                            Materializing your universe of users...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style jsx>{`
                @keyframes cosmicFlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes levitate {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }
                @keyframes neonGlow {
                    0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.2); }
                    50% { box-shadow: 0 0 50px rgba(59, 130, 246, 0.6), 0 0 100px rgba(147, 51, 234, 0.4); }
                }
                @keyframes materialSlide {
                    0% { opacity: 0; transform: translateY(50px) scale(0.9); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes magneticHover {
                    0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
                    25% { transform: translate3d(-2px,-2px,0) rotate(-0.5deg); }
                    50% { transform: translate3d(-4px,-8px,0) rotate(0deg); }
                    75% { transform: translate3d(-2px,-2px,0) rotate(0.5deg); }
                }
                @keyframes liquidBounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0) scale(1); }
                    40%, 43% { transform: translate3d(0,-20px,0) scale(1.05); }
                    70% { transform: translate3d(0,-10px,0) scale(1.02); }
                    90% { transform: translate3d(0,-4px,0) scale(1.01); }
                }
                @keyframes prismShift {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                .cosmic-main {
                    background: 
                        radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 50% 100%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
                        linear-gradient(135deg, #0f0c29 0%, #24243e 15%, #302b63 35%, #0f3460 65%, #24243e 85%, #0f0c29 100%);
                    background-size: 400% 400%;
                    animation: cosmicFlow 20s ease infinite;
                    position: relative;
                    overflow: hidden;
                }
                .holographic-card {
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 25px;
                    box-shadow: 
                        0 25px 50px rgba(0, 0, 0, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    position: relative;
                    overflow: hidden;
                }
                .holographic-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: all 0.8s ease;
                }
                .holographic-card:hover::before {
                    left: 100%;
                }
                .quantum-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 25px;
                    box-shadow: 
                        0 30px 60px rgba(0, 0, 0, 0.15),
                        0 0 0 1px rgba(255, 255, 255, 0.05);
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation: materialSlide 0.8s ease-out forwards;
                    position: relative;
                    overflow: hidden;
                }
                .quantum-card::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent);
                    border-radius: 25px;
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .quantum-card:hover::before {
                    opacity: 1;
                }
                .quantum-card:hover {
                    transform: translateY(-20px) scale(1.03) rotateX(5deg);
                    box-shadow: 
                        0 40px 80px rgba(0, 0, 0, 0.25),
                        0 0 50px rgba(59, 130, 246, 0.3);
                    border: 1px solid rgba(59, 130, 246, 0.4);
                }
                .prismatic-text {
                    background: linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: prismShift 8s ease-in-out infinite;
                }
                .btn-plasma {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
                    background-size: 200% 200%;
                    border: none;
                    border-radius: 20px;
                    color: white;
                    font-weight: 700;
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    position: relative;
                    overflow: hidden;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                .btn-plasma::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transition: all 0.6s ease;
                }
                .btn-plasma:hover::before {
                    left: 100%;
                }
                .btn-plasma:hover {
                    transform: translateY(-4px) scale(1.05);
                    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
                    background-position: 100% 0;
                }
                .btn-plasma:active {
                    transform: translateY(-2px) scale(1.02);
                }
                .filter-quantum {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    backdrop-filter: blur(10px);
                }
                .filter-quantum::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                    transform: translate(-50%, -50%);
                    transition: all 0.4s ease;
                    border-radius: 50%;
                }
                .filter-quantum:hover::after {
                    width: 200%;
                    height: 200%;
                }
                .filter-quantum:hover {
                    transform: scale(1.08) translateY(-2px);
                }
                .avatar-cosmic {
                    position: relative;
                    background: conic-gradient(from 0deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #ff006e);
                    padding: 4px;
                    border-radius: 50%;
                    animation: neonGlow 4s ease-in-out infinite;
                }
                .avatar-cosmic::before {
                    content: '';
                    position: absolute;
                    top: -8px;
                    left: -8px;
                    right: -8px;
                    bottom: -8px;
                    background: conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
                    border-radius: 50%;
                    z-index: -1;
                    animation: prismShift 6s linear infinite;
                }
                .info-badge {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }
                .info-badge:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.05);
                }
            `}</style>
            
            <div className="cosmic-main" style={{ minHeight: '100vh', position: 'relative' }}>
                {/* Enhanced floating particles */}
                {[...Array(30)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${Math.random() * 25 + 8}px`,
                        height: `${Math.random() * 25 + 8}px`,
                        background: `hsl(${Math.random() * 360}, 70%, 70%)`,
                        borderRadius: Math.random() > 0.5 ? '50%' : `${Math.random() * 30 + 10}%`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `levitate ${Math.random() * 10 + 6}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                        opacity: Math.random() * 0.6 + 0.2,
                        boxShadow: `0 0 30px currentColor`
                    }} />
                ))}

                {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
                
                <div className="container mx-auto" style={{ padding: '4rem 1rem', position: 'relative', zIndex: 2 }}>
                    {/* Cosmic Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="avatar-cosmic" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '130px',
                            height: '130px',
                            borderRadius: '50%',
                            marginBottom: '2rem',
                            animation: 'liquidBounce 3s infinite'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, #0f0c29 0%, #24243e 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="60" height="60" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="prismatic-text" style={{ 
                            fontSize: '5rem', 
                            fontWeight: '900', 
                            marginBottom: '1.5rem',
                            textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            letterSpacing: '3px'
                        }}>
                            QUANTUM USERS ✨
                        </h1>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '1.4rem',
                            fontWeight: '600',
                            textShadow: '0 5px 15px rgba(0,0,0,0.5)',
                            animation: 'levitate 4s ease-in-out infinite'
                        }}>
                            Navigate through the digital cosmos of users 🌌
                        </p>
                    </div>

                    {/* Enhanced Filter Section */}
                    <div className="holographic-card" style={{ padding: '3rem', marginBottom: '4rem' }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1.5rem', 
                            marginBottom: '2rem',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'conic-gradient(from 0deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animation: 'neonGlow 3s ease-in-out infinite',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '80%',
                                    height: '80%',
                                    background: 'linear-gradient(135deg, #0f0c29, #24243e)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                                        <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 2v-2.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"/>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="prismatic-text" style={{ 
                                fontSize: '2rem', 
                                fontWeight: '800',
                                letterSpacing: '2px'
                            }}>
                                DIMENSIONAL FILTER 🎯
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
                                    <div className="filter-quantum" style={{
                                        padding: '1.5rem 2.5rem',
                                        borderRadius: '30px',
                                        fontWeight: '700',
                                        fontSize: '1.2rem',
                                        background: genderFilter === option.value ? option.gradient : 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        border: genderFilter === option.value ? 'none' : '2px solid rgba(255,255,255,0.2)',
                                        boxShadow: genderFilter === option.value ? '0 15px 40px rgba(0,0,0,0.3)' : '0 5px 15px rgba(0,0,0,0.1)',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                        letterSpacing: '1px'
                                    }}>
                                        {option.emoji} {option.label}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced User Count */}
                    <div style={{ 
                        textAlign: 'center', 
                        marginBottom: '3rem'
                    }}>
                        <div className="holographic-card" style={{
                            display: 'inline-block',
                            padding: '1.5rem 3rem',
                            animation: 'levitate 5s ease-in-out infinite'
                        }}>
                            <p style={{ 
                                color: 'white', 
                                fontSize: '1.4rem',
                                fontWeight: '700',
                                margin: 0,
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                letterSpacing: '1px'
                            }}>
                                ✨ Quantum Entities: <span className="prismatic-text" style={{ 
                                    fontWeight: '900', 
                                    fontSize: '1.8rem'
                                }}>
                                    {filteredUsers.length}
                                </span> ✨
                                {genderFilter !== 'All' && (
                                    <span style={{ display: 'block', fontSize: '1.1rem', marginTop: '0.5rem', opacity: 0.8 }}>
                                        🔮 Dimension: {genderFilter}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Users Grid */}
                    {filteredUsers.length === 0 ? (
                        <div className="holographic-card" style={{ 
                            textAlign: 'center', 
                            padding: '5rem 3rem',
                            animation: 'materialSlide 1s ease-out'
                        }}>
                            <div style={{
                                width: '150px',
                                height: '150px',
                                background: 'conic-gradient(from 0deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 3rem auto',
                                animation: 'liquidBounce 4s ease-in-out infinite',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '80%',
                                    height: '80%',
                                    background: 'linear-gradient(135deg, #0f0c29, #24243e)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="60" height="60" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="prismatic-text" style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '900', 
                                marginBottom: '1.5rem',
                                letterSpacing: '2px'
                            }}>
                                🔍 VOID DETECTED
                            </h3>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.8)', 
                                fontSize: '1.3rem',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                fontWeight: '600'
                            }}>
                                Recalibrate your dimensional filters 🌌
                            </p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredUsers.map((user, index) => (
                                <div key={user.id} className="col-