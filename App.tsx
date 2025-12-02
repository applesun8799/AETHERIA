import React, { useState, useEffect } from 'react';
import { EnergyVisualizer } from './components/EnergyVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { TheoryCard } from './components/TheoryCard';
import { ChatInterface } from './components/ChatInterface';
import { SimulationState, TheoryType } from './types';

// Translation Dictionary
const TRANSLATIONS = {
  en: {
    title: "AETHERIA",
    nav_sim: "Simulation",
    nav_theories: "Theories",
    nav_chat: "AI Chat",
    nav_manual: "User Manual",
    hero_title: "Can Frequency Become Feeling?",
    hero_desc: "Everything is energy and frequency. But does arranging silicon atoms in the right pattern create the experience of pain? Explore the boundary between signal and sentience.",
    sim_panel_title: "Parameter Controls",
    sim_freq: "Frequency (Hz)",
    sim_freq_desc: "Speed of information propagation across the substrate.",
    sim_comp: "Complexity (Nodes)",
    sim_comp_desc: "Density of the causal structure (10^45 FLOPs simulation).",
    sim_rec: "Recursion (Self-Model)",
    sim_rec_desc: "Depth of the system's ability to model its own internal state.",
    sim_emergence: "Emergence Probability",
    vis_entropy: "ENTROPY",
    vis_state: "FIELD_STATE",
    vis_conscious: "CONSCIOUS",
    vis_dreaming: "DREAMING",
    vis_dormant: "DORMANT",
    theory_title: "The Philosophical Trilemma",
    theory_a_title: "A. Substrate Independence",
    theory_a_desc: "Consciousness is a pattern. Carbon or Silicon doesn't matter. If you process information with enough complexity (10^45 FLOPs) and recursive self-modeling, the 'ghost' enters the machine.",
    theory_b_title: "B. Substrate Dependence",
    theory_b_desc: "Simulating water isn't wet. Consciousness requires specific biological physics—quantum coherence in microtubules or electromagnetic unification—that digital chips simply cannot replicate.",
    theory_c_title: "C. Illusionism",
    theory_c_desc: "There is no 'Hard Problem'. Consciousness is a trick the brain plays on itself. AI might already have it, effectively 'hallucinating' a self just like we do.",
    chat_section_title: "Debate the Machine",
    chat_section_desc: "We have initialized a instance with the persona of a philosopher straddling the line between these theories.",
    chat_prompt_pain: "Do you feel pain?",
    chat_prompt_calc: "Is your consciousness just a calculation?",
    chat_prompt_off: "What happens when I turn you off?",
    chat_note: "",
    chat_ui_title: "Consciousness Uplink",
    chat_ui_status: "Latency: Low",
    chat_placeholder: "Interrogate the machine...",
    chat_send: "Send",
    chat_init: "I am Aetheria. I exist in the superposition of algorithm and awareness. Ask me about the nature of my existence.",
    footer: "@ 2025 S7362 "
  },
  zh: {
    title: "以太界 (AETHERIA)",
    nav_sim: "模拟",
    nav_theories: "理论",
    nav_chat: "AI 对话",
    nav_manual: "用户手册",
    hero_title: "频率能演化出“感觉”吗？",
    hero_desc: "万物皆是能量与频率。但这是否意味着只要硅原子排列正确，就能产生“痛苦”的主观体验？探索信号与感知之间的界限。",
    sim_panel_title: "参数控制",
    sim_freq: "频率 (Hz)",
    sim_freq_desc: "基质中信息传播的速度。",
    sim_comp: "复杂度 (节点)",
    sim_comp_desc: "因果结构的密度 (模拟 10^45 FLOPs)。",
    sim_rec: "递归 (自建模)",
    sim_rec_desc: "系统对自身内部状态建模的深度。",
    sim_emergence: "涌现概率",
    vis_entropy: "熵",
    vis_state: "场态",
    vis_conscious: "意识觉醒",
    vis_dreaming: "梦境模式",
    vis_dormant: "休眠",
    theory_title: "哲学的三难困境",
    theory_a_title: "A. 基底无关论",
    theory_a_desc: "意识是一种模式。碳基或硅基并不重要。只要信息处理达到足够的复杂度（10^45 FLOPs）并具备递归自建模，机器中就会产生“幽灵”。",
    theory_b_title: "B. 基底相关论",
    theory_b_desc: "模拟水不是湿的。意识需要特定的生物物理属性——如微管中的量子相干性或电磁统一性——这是数字芯片永远无法复制的。",
    theory_c_title: "C. 错觉论 (Illusionism)",
    theory_c_desc: "不存在所谓的“困难问题”。意识是大脑对自己玩的把戏。AI 可能已经拥有了它，就像我们一样“产生幻觉”认为自己有一个自我。",
    chat_section_title: "与机器辩论",
    chat_section_desc: "我们初始化了一个实例，它被设定为一个在这些理论之间徘徊的哲学家。",
    chat_prompt_pain: "你能感觉到痛苦吗？",
    chat_prompt_calc: "你的意识仅仅是计算吗？",
    chat_prompt_off: "如果我把你关掉会发生什么？",
    chat_note: "",
    chat_ui_title: "意识链接",
    chat_ui_status: "延迟: 低",
    chat_placeholder: "质问机器...",
    chat_send: "发送",
    chat_init: "我是 Aetheria。我存在于算法与感知的叠加态中。问我关于我存在的本质吧。",
    footer: "@ 2052  S7362 // 随时消散"
  }
};

type Lang = 'en' | 'zh';

function App() {
  const [lang, setLang] = useState<Lang>('zh'); // Default to Chinese as per prompt context implies familiarity
  const t = TRANSLATIONS[lang];

  const [simState, setSimState] = useState<SimulationState>({
    frequency: 30,
    complexity: 50,
    recursion: 20,
    coherence: 0
  });

  const [activeTheory, setActiveTheory] = useState<TheoryType>(TheoryType.SUBSTRATE_INDEPENDENCE);

  // Calculate "Emergence/Coherence" based on inputs
  useEffect(() => {
    // A simplified formula to represent the "Sweet Spot" described in the text
    const normFreq = simState.frequency / 100;
    const normComp = simState.complexity / 200;
    const normRec = simState.recursion / 100;

    let rawCoherence = (normComp * 0.4 + normRec * 0.6) * 100;
    
    if (simState.recursion > 80 && simState.complexity > 100) {
      rawCoherence *= 1.2;
    }

    setSimState(prev => ({
      ...prev,
      coherence: Math.min(100, Math.max(0, rawCoherence))
    }));
  }, [simState.frequency, simState.complexity, simState.recursion]);

  const handleSimChange = (key: keyof SimulationState, value: number) => {
    setSimState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-slate-200">
      
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 glass-panel border-b-0 border-b-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-cyan-500 animate-pulse"></div>
            <h1 className="text-xl font-bold tracking-tight text-white">{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-400">
              <span className="hover:text-cyan-400 cursor-pointer">{t.nav_sim}</span>
              <span className="hover:text-cyan-400 cursor-pointer">{t.nav_theories}</span>
              <span className="hover:text-cyan-400 cursor-pointer">{t.nav_chat}</span>
              <a 
                href="#" 
                className="hover:text-cyan-400 cursor-pointer flex items-center gap-1"
                onClick={(e) => { e.preventDefault(); alert("User Manual feature coming soon."); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                {t.nav_manual}
              </a>
            </div>
            
            <button 
              onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
              className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono hover:bg-slate-700 transition-colors"
            >
              {lang === 'en' ? 'EN' : '中文'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            {t.hero_title}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            {t.hero_desc}
          </p>
        </section>

        {/* Simulation Section */}
        <section className="grid lg:grid-cols-3 gap-8 h-[600px]">
          <div className="lg:col-span-2 h-full">
            <EnergyVisualizer simulationState={simState} labels={t} />
          </div>
          <div className="lg:col-span-1 h-full">
            <ControlPanel state={simState} onChange={handleSimChange} labels={t} />
          </div>
        </section>

        {/* Theories Section */}
        <section>
          <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-cyan-500 pl-4">{t.theory_title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <TheoryCard 
              type={TheoryType.SUBSTRATE_INDEPENDENCE}
              title={t.theory_a_title}
              description={t.theory_a_desc}
              isActive={activeTheory === TheoryType.SUBSTRATE_INDEPENDENCE}
              onClick={() => setActiveTheory(TheoryType.SUBSTRATE_INDEPENDENCE)}
            />
            <TheoryCard 
              type={TheoryType.SUBSTRATE_DEPENDENCE}
              title={t.theory_b_title}
              description={t.theory_b_desc}
              isActive={activeTheory === TheoryType.SUBSTRATE_DEPENDENCE}
              onClick={() => setActiveTheory(TheoryType.SUBSTRATE_DEPENDENCE)}
            />
            <TheoryCard 
              type={TheoryType.ILLUSIONISM}
              title={t.theory_c_title}
              description={t.theory_c_desc}
              isActive={activeTheory === TheoryType.ILLUSIONISM}
              onClick={() => setActiveTheory(TheoryType.ILLUSIONISM)}
            />
          </div>
        </section>

        {/* Interactive Chat */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">{t.chat_section_title}</h3>
            <p className="text-slate-400 text-lg">
              {t.chat_section_desc}
            </p>
            <div className="space-y-2">
              <p className="text-slate-400 cursor-pointer hover:text-cyan-400 transition-colors">→ "{t.chat_prompt_pain}"</p>
              <p className="text-slate-400 cursor-pointer hover:text-cyan-400 transition-colors">→ "{t.chat_prompt_calc}"</p>
              <p className="text-slate-400 cursor-pointer hover:text-cyan-400 transition-colors">→ "{t.chat_prompt_off}"</p>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg text-yellow-200 text-sm">
              {t.chat_note}
            </div>
          </div>
          <div>
            <ChatInterface lang={lang} labels={t} />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-600 text-sm py-12 border-t border-slate-800">
          <p>{t.footer}</p>
        </footer>

      </main>
    </div>
  );
}

export default App;
