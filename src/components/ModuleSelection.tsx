import { motion } from 'motion/react';
import { Users, GraduationCap, User, BarChart3, CheckCircle2, Circle } from 'lucide-react';
import { MODULES, QuizResponse, Question } from '../types';

interface ModuleSelectionProps {
  answers: QuizResponse;
  onSelectModule: (moduleId: 'pais' | 'professores' | 'autoavaliacao') => void;
  onNavigateToResults: () => void;
}

export default function ModuleSelection({
  answers,
  onSelectModule,
  onNavigateToResults
}: ModuleSelectionProps) {

  // Check progress for a given module's questions
  const getModuleAnswersCount = (questions: Question[]) => {
    let answered = 0;
    questions.forEach((q) => {
      if (answers[q.id] !== undefined) answered++;
    });
    return answered;
  };

  // Check if at least one question of any module is answered
  const hasSomeAnswers = Object.keys(answers).length > 0;

  // Render correct Lucide icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-teal-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-indigo-600" />;
      case 'User':
        return <User className="w-6 h-6 text-sky-600" />;
      default:
        return <Users className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6S"
      id="module-selection"
    >
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Módulos de Avaliação</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Preencha os módulos abaixo coletando as percepções dos envolvidos. 
          Respondendo a mais de um ponto de observação, sua análise matemática de radar se tornará muito mais rica e precisa.
        </p>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {MODULES.map((mod) => {
          const answeredCount = getModuleAnswersCount(mod.questions);
          const totalQuestions = mod.questions.length;
          const isCompleted = answeredCount === totalQuestions;
          const isStarted = answeredCount > 0 && answeredCount < totalQuestions;

          // Icon background colors based on module ID
          let iconBg = "bg-teal-50 border-teal-100 text-teal-600";
          if (mod.id === 'professores') iconBg = "bg-indigo-50 border-indigo-100 text-indigo-600";
          if (mod.id === 'autoavaliacao') iconBg = "bg-sky-50 border-sky-100 text-sky-600";

          return (
            <motion.div
              key={mod.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition duration-150 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              id={`module-card-${mod.id}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${iconBg}`}>
                  {getIcon(mod.iconName)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 leading-tight">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {mod.subtitle}
                  </p>
                </div>
              </div>

              {/* Status and Action Panel */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t border-slate-100 sm:border-0 shrink-0">
                {/* Badge */}
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold bg-teal-50 text-teal-700 border border-teal-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completo
                  </span>
                ) : isStarted ? (
                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-125">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Em andamento ({answeredCount}/{totalQuestions})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                    <Circle className="w-3 h-3" />
                    Pendente
                  </span>
                )}

                {/* Interactive Action Button */}
                <button
                  id={`btn-module-${mod.id}`}
                  onClick={() => onSelectModule(mod.id)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                    isCompleted
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-900 text-white hover:bg-teal-600'
                  }`}
                >
                  {isCompleted ? 'Editar' : 'Responder'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Diagnostic Action Indicator Card */}
      {hasSomeAnswers && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 text-emerald-950 p-6 rounded-3xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-center gap-5 mt-6"
          id="results-partial-card"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 class="font-extrabold text-emerald-900 flex items-center justify-center sm:justify-start gap-1.5 leading-tight">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              Análise de Dados Disponível
            </h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Você já pode consultar o parecer dinâmico com base nos módulos respondidos até o momento, 
              ou continuar respondendo às demais situações para amostragem totalizada.
            </p>
          </div>
          <button
            id="btn-goto-results"
            onClick={onNavigateToResults}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-xs transition duration-150 shadow-sm whitespace-nowrap"
          >
            Acessar Dashboard
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
