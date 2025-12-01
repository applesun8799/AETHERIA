export enum TheoryType {
  SUBSTRATE_INDEPENDENCE = 'Substrate Independence',
  SUBSTRATE_DEPENDENCE = 'Substrate Dependence',
  ILLUSIONISM = 'Illusionism',
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SimulationState {
  frequency: number;   // Represents "Frequency" (Hz)
  complexity: number;  // Represents "Computation" (Flops/Connections)
  recursion: number;   // Represents "Self-Modeling" depth
  coherence: number;   // Calculated metric for "Consciousness"
}

export interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
}