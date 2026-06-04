import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';
import HomeConsent from './components/HomeConsent';
import ModuleSelection from './components/ModuleSelection';
import QuestionnaireCard from './components/QuestionnaireCard';
import DiagnosticDashboard from './components/DiagnosticDashboard';
import { QuizResponse, MODULES } from './types';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'modules' | 'questionnaire' | 'results'>('home');
  const [answers, setAnswers] = useState<QuizResponse>({});
  const [activeModuleId, setActiveModuleId] = useState<'pais' | 'professores' | 'autoavaliacao' | null>(null);

  // Restore state from LocalStorage on mount to provide offline-first consistency
  useEffect(() => {
    const saved = localStorage.getItem('ahsd_ras_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed);
          // If we had answers, we can skip directly to modules board
          setScreen('modules');
        }
      } catch (e) {
        console.error('Error recovering local questionnaire answers', e);
      }
    }
  }, []);

  // Handler for selecting a module to answer
  const handleSelectModule = (moduleId: 'pais' | 'professores' | 'autoavaliacao') => {
    setActiveModuleId(moduleId);
    setScreen('questionnaire');
  };

  // Handler for saving questionnaire progress for a single module
  const handleSaveModule = (moduleAnswers: QuizResponse) => {
    const updatedAnswers = { ...answers, ...moduleAnswers };
    setAnswers(updatedAnswers);
    localStorage.setItem('ahsd_ras_state', JSON.stringify(updatedAnswers));
    setScreen('modules');
  };

  // Handler for resetting all state to perform a fresh screening
  const handleResetAll = () => {
    if (window.confirm('Deseja realmente reiniciar todo o rastreio? Isso irá apagar temporariamente todas as respostas registradas.')) {
      setAnswers({});
      localStorage.removeItem('ahsd_ras_state');
      setScreen('modules');
    }
  };

  const activeModuleObj = MODULES.find((m) => m.id === activeModuleId);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white" id="main-app-container">
      
      {/* Header (No-print so it hides on report print-outs) */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-40 shadow-xs no-print">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl border border-teal-100 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-teal-650" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                Rastreio AH/SD
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Módulo Clínico de Diagnóstico e Rastreamento Psicopedagógico
              </p>
            </div>
          </div>

          {/* Badge indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
              Análise Renzulli
            </span>
          </div>
        </div>
      </header>

      {/* Main viewport Container with screen transitions */}
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <div key="home">
              <HomeConsent
                onConsentComplete={() => setScreen('modules')}
              />
            </div>
          )}

          {screen === 'modules' && (
            <div key="modules">
              <ModuleSelection
                answers={answers}
                onSelectModule={handleSelectModule}
                onNavigateToResults={() => setScreen('results')}
              />
            </div>
          )}

          {screen === 'questionnaire' && activeModuleObj && (
            <div key="questionnaire">
              <QuestionnaireCard
                module={activeModuleObj}
                answers={answers}
                onSave={handleSaveModule}
                onCancel={() => setScreen('modules')}
              />
            </div>
          )}

          {screen === 'results' && (
            <div key="results">
              <DiagnosticDashboard
                answers={answers}
                onNavigateToModules={() => setScreen('modules')}
                onResetAll={handleResetAll}
              />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer copyright */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-6xl mx-auto space-y-2">
          <p>
            <strong>Portal Rastreio AH/SD</strong> — Desenvolvido em conformidade científica com a Teoria de Três Anéis de Renzulli.
          </p>
          <p className="text-[10px]">
            Livre de cookies terceiros. Processado localmente sob as diretrizes da LGPD (Lei Geral de Proteção de Dados).
          </p>
        </div>
      </footer>
    </div>
  );
}
