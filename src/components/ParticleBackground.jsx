import React, { useEffect, useState } from 'react';

const ParticleBackground = () => {
    const [particles, setParticles] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const createParticles = () => {
            const newParticles = [];
            const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
            const types = ['circle', 'star', 'snowflake', 'diamond'];

            for (let i = 0; i < 120; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 4 + 2,
                    speedX: (Math.random() - 0.5) * 1.2,
                    speedY: (Math.random() - 0.5) * 1.2,
                    opacity: Math.random() * 0.7 + 0.2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    type: types[Math.floor(Math.random() * types.length)],
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 4,
                });
            }
            setParticles(newParticles);
        };

        createParticles();

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleResize = () => {
            createParticles();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => {
                // Calculate distance from mouse
                const dx = mousePosition.x - particle.x;
                const dy = mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Mouse interaction - attract particles within range
                let newX = particle.x + particle.speedX;
                let newY = particle.y + particle.speedY;

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    const attraction = 0.5;
                    newX += (dx / distance) * force * attraction;
                    newY += (dy / distance) * force * attraction;
                }

                // Add slight drift and floating motion
                newX += Math.sin(Date.now() * 0.001 + particle.id) * 0.5;
                newY += Math.cos(Date.now() * 0.0008 + particle.id) * 0.5;

                return {
                    ...particle,
                    x: (newX + window.innerWidth) % window.innerWidth,
                    y: (newY + window.innerHeight) % window.innerHeight,
                    rotation: particle.rotation + particle.rotationSpeed,
                    opacity: Math.sin(Date.now() * 0.002 + particle.id) * 0.3 + 0.5,
                };
            }));
        }, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [mousePosition]);

    const renderParticle = (particle) => {
        const baseStyle = {
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            color: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
        };

        switch (particle.type) {
            case 'snowflake':
                return (
                    <div
                        key={particle.id}
                        className="absolute animate-pulse pointer-events-none"
                        style={baseStyle}
                    >
                        <div
                            className="relative w-full h-full"
                            style={{
                                color: particle.color,
                                fontSize: `${particle.size}px`,
                                filter: 'drop-shadow(0 0 2px currentColor)',
                            }}
                        >
                            ❄️
                        </div>
                    </div>
                );
            case 'star':
                return (
                    <div
                        key={particle.id}
                        className="absolute animate-pulse pointer-events-none"
                        style={baseStyle}
                    >
                        <div
                            className="relative w-full h-full"
                            style={{
                                color: particle.color,
                                fontSize: `${particle.size}px`,
                                filter: 'drop-shadow(0 0 2px currentColor)',
                            }}
                        >
                            ✨
                        </div>
                    </div>
                );
            case 'diamond':
                return (
                    <div
                        key={particle.id}
                        className="absolute pointer-events-none"
                        style={baseStyle}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundColor: particle.color,
                                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                                filter: 'drop-shadow(0 0 4px currentColor)',
                            }}
                        />
                    </div>
                );
            default:
                return (
                    <div
                        key={particle.id}
                        className="absolute rounded-full animate-pulse pointer-events-none"
                        style={{
                            ...baseStyle,
                            backgroundColor: particle.color,
                            filter: 'drop-shadow(0 0 4px currentColor)',
                        }}
                    />
                );
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map(renderParticle)}
        </div>
    );
};

export default ParticleBackground;
