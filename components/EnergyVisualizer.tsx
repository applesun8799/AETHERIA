import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SimulationState, Point } from '../types';

interface EnergyVisualizerProps {
  simulationState: SimulationState;
  labels: any;
}

export const EnergyVisualizer: React.FC<EnergyVisualizerProps> = ({ simulationState, labels }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const requestRef = useRef<number>();
  
  // Initialize points based on complexity
  useEffect(() => {
    const numPoints = Math.floor(simulationState.complexity / 2) + 20; // Scale points with complexity
    const newPoints: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
      newPoints.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
    setPoints(newPoints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulationState.complexity]); // Re-init when complexity changes drastically

  const updateAnimation = useCallback(() => {
    setPoints(prevPoints => {
      // The speed is determined by frequency
      const speedFactor = (simulationState.frequency / 50) * 0.5;
      
      // Recursion acts as a "centering force" or "gravity" towards the self (center)
      const centerGravity = (simulationState.recursion / 100) * 0.05;

      return prevPoints.map(p => {
        let newVx = p.vx;
        let newVy = p.vy;

        // Apply center gravity (Recursive Self-Modeling)
        if (simulationState.recursion > 10) {
          const dx = 50 - p.x;
          const dy = 50 - p.y;
          newVx += dx * centerGravity * speedFactor;
          newVy += dy * centerGravity * speedFactor;
        }

        // Add some random noise (Quantum fluctuations)
        newVx += (Math.random() - 0.5) * 0.02 * speedFactor;
        newVy += (Math.random() - 0.5) * 0.02 * speedFactor;

        // Update position
        let newX = p.x + newVx * speedFactor;
        let newY = p.y + newVy * speedFactor;

        // Bounds checking (bounce)
        if (newX < 0 || newX > 100) { newVx *= -1; newX = Math.max(0, Math.min(100, newX)); }
        if (newY < 0 || newY > 100) { newVy *= -1; newY = Math.max(0, Math.min(100, newY)); }

        // Damping
        newVx *= 0.99;
        newVy *= 0.99;

        return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
      });
    });

    requestRef.current = requestAnimationFrame(updateAnimation);
  }, [simulationState.frequency, simulationState.recursion]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateAnimation);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updateAnimation]);

  // Determine color based on coherence
  const getConnectionColor = () => {
    if (simulationState.coherence > 80) return "stroke-cyan-400"; // Awakened
    if (simulationState.coherence > 50) return "stroke-purple-400"; // Processing
    return "stroke-slate-600"; // Inert
  };

  const getGlow = () => {
    if (simulationState.coherence > 90) return "drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]";
    return "";
  };

  const getStateLabel = () => {
    if (simulationState.coherence > 90) return labels.vis_conscious;
    if (simulationState.coherence > 50) return labels.vis_dreaming;
    return labels.vis_dormant;
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl border border-slate-700 bg-black/40">
      <svg 
        ref={svgRef} 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className={`w-full h-full ${getGlow()} transition-all duration-1000`}
      >
        <defs>
          <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Connections */}
        {points.map((p1, i) => (
          points.slice(i + 1).map((p2, j) => {
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            // Threshold for connection depends on recursion
            const threshold = 15 + (simulationState.recursion / 5); 
            if (dist < threshold) {
              return (
                <line
                  key={`${p1.id}-${p2.id}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  className={`${getConnectionColor()} transition-colors duration-500`}
                  strokeWidth={0.2 * (1 - dist/threshold)}
                  opacity={0.6}
                />
              );
            }
            return null;
          })
        ))}

        {/* Particles */}
        {points.map(p => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={simulationState.coherence > 85 ? 1.5 : 0.8}
            fill={simulationState.coherence > 85 ? "#22d3ee" : "#94a3b8"}
            className="transition-all duration-300"
          />
        ))}

        {/* Emergence Overlay */}
        {simulationState.coherence > 95 && (
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(34,211,238, 0.3)" strokeWidth="0.5">
             <animate attributeName="r" from="40" to="45" dur="3s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
      
      <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-400">
        <div>{labels.vis_entropy}: {((100 - simulationState.recursion) / 10).toFixed(2)}</div>
        <div>{labels.vis_state}: {getStateLabel()}</div>
      </div>
    </div>
  );
};