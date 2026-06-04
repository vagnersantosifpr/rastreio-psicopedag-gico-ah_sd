import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldCheck, HelpCircle, Layers, Lightbulb, Zap } from 'lucide-react';

interface HomeConsentProps {
  onConsentComplete: () => void;
}

export default function HomeConsent({ onConsentComplete }: HomeConsentProps) {
  const [consentGranted, setConsentGranted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-8"
      id="home-consent"
    >
      {/* Intro Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            Fundamentação Clínica e Científica
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Plataforma de Rastreio Psicopedagógico — AH/SD
          </h1>
          <p className="text-slate-650 leading-relaxed text-sm sm:text-base">
            Seja bem-vindo a este instrumento digital de triagem preliminar de 
            <strong> Altas Habilidades / Superdotação (AH/SD)</strong>. Esta ferramenta destina-se a 
            psicopedagogos, educadores e pais na condução do rastreamento unificado multi-perspectiva.
          </p>
        </div>

        {/* Joseph Renzulli's Three Rings Concept Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Ring 1 */}
          <div className="p-5 bg-teal-50/40 rounded-2xl border border-teal-150 flex flex-col space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center border border-teal-200">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Habilidade Acima da Média</h3>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                Raciocínio lógico estruturado, velocidade de aprendizado, boa memória de longa duração e alta facilidade para abstração verbal.
              </p>
            </div>
          </div>

          {/* Ring 2 */}
          <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-150 flex flex-col space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Criatividade Elevada</h3>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                Produção abundante de ideias, originalidade em soluções escolares, curiosidade aguçada e pensamento flexível não rústico.
              </p>
            </div>
          </div>

          {/* Ring 3 */}
          <div className="p-5 bg-sky-50/40 rounded-2xl border border-sky-150 flex flex-col space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-sky-700 flex items-center justify-center border border-sky-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Envolvimento com a Tarefa</h3>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                Dedicação apaixonada (hiperfoco), autodisciplina rígida, compromisso com excelência produtiva e persistência resiliente.
              </p>
            </div>
          </div>
        </div>

        {/* Explain Method Text Info */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
          <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
            A Teoria dos Três Anéis de Joseph Renzulli
          </h3>
          <p>
            O modelo conceitual do psicólogo norte-americano Joseph Renzulli propõe que a superdotação não é um traço fixo 
            focado estritamente no quociente de inteligência (QI), mas sim o resultado da interação equilibrada entre estes três 
            agrupamentos de traços humanos corporificados.
          </p>
          <p>
            Esta plataforma de rastreio consolida as percepções de <strong>Pais</strong>, de <strong>Professores</strong> e da 
            <strong> Autoavaliação do Estudante</strong> para plotar os eixos em um gráfico clínico unificado.
          </p>
        </div>

        {/* LGPD Compliance Section */}
        <div className="pt-4 border-t border-slate-100">
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                id="check-consent"
                checked={consentGranted}
                onChange={(e) => setConsentGranted(e.target.checked)}
                className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500 transition cursor-pointer"
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline-block shrink-0" />
                Declaração de Consentimento Livre e Esclarecido (LGPD)
              </span>
              Entendo que meus dados de avaliação coletados não serão enviados para servidores de rede. 
              Eles são processados localmente, de forma totalmente anônima, em conformidade com a 
              Lei Geral de Proteção de Dados Pessoais (LGPD), e armazenados exclusivamente na memória deste navegador.
            </div>
          </label>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            id="start-tracking-btn"
            disabled={!consentGranted}
            onClick={onConsentComplete}
            className="w-full sm:w-auto px-10 py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-2xl tracking-tight transition duration-155 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:shadow-none"
          >
            Iniciar Rastreio
          </button>
        </div>
      </div>
    </motion.div>
  );
}
