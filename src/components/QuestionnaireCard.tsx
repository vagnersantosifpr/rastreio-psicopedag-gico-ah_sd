import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { Module, QuizResponse } from '../types';

interface QuestionnaireCardProps {
  module: Module;
  answers: QuizResponse;
  onSave: (moduleAnswers: QuizResponse) => void;
  onCancel: () => void;
}

export default function QuestionnaireCard({
  module,
  answers,
  onSave,
  onCancel
}: QuestionnaireCardProps) {
  // Local state to store questionnaire responses during active edits
  const [localAnswers, setLocalAnswers] = useState<QuizResponse>({});
  const [showValidationWarning, setShowValidationWarning] = useState(false);

  // Load parent answers on mount/module change
  useEffect(() => {
    const initial: QuizResponse = {};
    module.questions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        initial[q.id] = answers[q.id];
      }
    });
    setLocalAnswers(initial);
    setShowValidationWarning(false);
  }, [module, answers]);

  const handleSelectOption = (questionId: string, value: number) => {
    setLocalAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const getAnsweredCount = () => {
    let count = 0;
    module.questions.forEach((q) => {
      if (localAnswers[q.id] !== undefined) count++;
    });
    return count;
  };

  const handleFinalize = () => {
    const answeredCount = getAnsweredCount();
    const total = module.questions.length;

    if (answeredCount < total) {
      setShowValidationWarning(true);
      // Auto-scroll to warning or bottom
      const warningElement = document.getElementById('warning-banner');
      warningElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Call upstream trigger to persist memory
    onSave(localAnswers);
  };

  const answeredCount = getAnsweredCount();
  const totalQuestions = module.questions.length;
  const isComplete = answeredCount === totalQuestions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
      id="questionnaire-card"
    >
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onCancel}
            className="group inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition duration-150 font-semibold mb-2"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar aos Módulos
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {module.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {module.subtitle}
          </p>
        </div>

        {/* Floating progress pill */}
        <div className="shrink-0 bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3 shadow-3xs">
          <div className="text-right">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Progresso</span>
            <span className="text-xs text-slate-500 font-semibold">{Math.round((answeredCount / totalQuestions) * 100)}% concluído</span>
          </div>
          <span className="text-lg font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
            {answeredCount}/{totalQuestions}
          </span>
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-4">
        {module.questions.map((q, index) => {
          const selectedValue = localAnswers[q.id];
          
          // Custom color styling based on the Renzulli category the question belongs to
          let axisColor = "bg-teal-50 border-teal-100 text-teal-700";
          let axisName = "Habilidade Acima da Média";
          if (q.axis === 'criatividade') {
            axisColor = "bg-emerald-50 border-emerald-100 text-emerald-700";
            axisName = "Criatividade";
          } else if (q.axis === 'envolvimento') {
            axisColor = "bg-sky-50 border-sky-100 text-sky-700";
            axisName = "Envolvimento com a Tarefa";
          }

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-3xs space-y-4"
              id={`question-card-${q.id}`}
            >
              {/* Card Meta details */}
              <div className="flex items-center justify-between gap-4">
                <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${axisColor}`}>
                  {axisName}
                </span>
                <span className="text-xs font-black text-slate-400">
                  Questão {index + 1} de {totalQuestions}
                </span>
              </div>

              {/* Question Headline */}
              <p className="text-slate-900 border-l-2 border-slate-200 pl-3 leading-snug font-medium text-sm sm:text-base">
                {q.text}
              </p>

              {/* Likert Scale radio selector */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 border border-slate-200/60 p-4 rounded-xl gap-4">
                  <span className="text-xs text-slate-400 font-bold shrink-0">1 — Nunca</span>
                  
                  <div className="flex justify-around items-center gap-2 sm:gap-4 w-full">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isActive = selectedValue === val;
                      return (
                        <label
                          key={val}
                          className={`flex flex-col items-center gap-1 cursor-pointer group select-none`}
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name={`q-${q.id}`}
                              value={val}
                              checked={isActive}
                              onChange={() => handleSelectOption(q.id, val)}
                              className="sr-only"
                            />
                            {/* Visual Indicator Radio */}
                            <motion.div
                              whileTap={{ scale: 0.9 }}
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm border transition-all duration-100 ${
                                isActive
                                  ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-600'
                              }`}
                            >
                              {val}
                            </motion.div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <span className="text-xs text-slate-400 font-bold shrink-0">5 — Sempre</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Control / Saving panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Alerts in-place */}
        <div id="warning-banner">
          {showValidationWarning ? (
            <span className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              Preencha todos as 9 respostas para poder finalizar e integrar os dados.
            </span>
          ) : (
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <HelpCircle className="w-4 h-4 text-slate-300 shrink-0" />
              Marque todas as situações com a nota observada de 1 a 5.
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="w-full sm:w-auto flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold transition"
          >
            Cancelar
          </button>
          <button
            id="btn-finalize-module"
            onClick={handleFinalize}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black tracking-tight transition duration-155 shadow-xs ${
              isComplete
                ? 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Finalizar e Salvar Módulo
          </button>
        </div>
      </div>
    </motion.div>
  );
}
