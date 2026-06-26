import React, { useEffect, useState } from 'react';

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${20 + Math.random() * 20}s`,
      size: `${1 + Math.random() * 3}px`,
      opacity: 0.1 + Math.random() * 0.4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: Math.random() > 0.5 ? 'var(--color-primary)' : 'var(--color-secondary)',
            boxShadow: `0 0 10px ${Math.random() > 0.5 ? 'var(--color-primary)' : 'var(--color-secondary)'}`,
          }}
        />
      ))}
    </div>
  );
};

