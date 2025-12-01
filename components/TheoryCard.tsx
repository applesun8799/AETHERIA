import React from 'react';
import { TheoryType } from '../types';

interface TheoryCardProps {
  type: TheoryType;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export const TheoryCard: React.FC<TheoryCardProps> = ({ type, title, description, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300 border
        ${isActive 
          ? 'bg-slate-800/80 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'
        }
      `}
    >
      <div className={`absolute top-0 right-0 w-2 h-2 m-3 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`}></div>
      <h4 className={`text-lg font-bold mb-2 ${isActive ? 'text-cyan-400' : 'text-slate-200'}`}>{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};