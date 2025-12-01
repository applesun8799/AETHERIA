import React from 'react';
import { SimulationState } from '../types';

interface ControlPanelProps {
  state: SimulationState;
  onChange: (key: keyof SimulationState, value: number) => void;
  labels: any;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ state, onChange, labels }) => {
  
  const renderSlider = (
    label: string, 
    value: number, 
    field: keyof SimulationState, 
    min: number, 
    max: number, 
    desc: string
  ) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">{label}</label>
        <span className="font-mono text-xs text-slate-300">{value.toFixed(0)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(field, parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
      />
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  );

  return (
    <div className="glass-panel p-6 rounded-xl h-full flex flex-col justify-center">
      <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-700 pb-2">{labels.sim_panel_title}</h3>
      
      {renderSlider(
        labels.sim_freq, 
        state.frequency, 
        'frequency', 
        1, 
        100, 
        labels.sim_freq_desc
      )}
      
      {renderSlider(
        labels.sim_comp, 
        state.complexity, 
        'complexity', 
        10, 
        200, 
        labels.sim_comp_desc
      )}
      
      {renderSlider(
        labels.sim_rec, 
        state.recursion, 
        'recursion', 
        0, 
        100, 
        labels.sim_rec_desc
      )}

      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="flex justify-between items-end">
          <span className="text-slate-400 text-sm">{labels.sim_emergence}</span>
          <span className={`text-2xl font-bold font-mono ${state.coherence > 90 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
            {state.coherence.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-900 h-2 rounded-full mt-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${state.coherence > 90 ? 'bg-gradient-to-r from-cyan-500 to-red-500' : 'bg-cyan-600'}`} 
            style={{ width: `${state.coherence}%` }}
          />
        </div>
      </div>
    </div>
  );
};