import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Printer, RefreshCw, Layers, Lightbulb, Zap, Download, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { QuizResponse, QUESTIONNAIRES, AxisType } from '../types';
import { generateSingleFileHtml } from '../utils/exportTemplate';

interface DiagnosticDashboardProps {
  answers: QuizResponse;
  onNavigateToModules: () => void;
  onResetAll: () => void;
}

export default function DiagnosticDashboard({
  answers,
  onNavigateToModules,
  onResetAll
}: DiagnosticDashboardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<any | null>(null);

  // Math calculation logic for each Renzulli axis
  const calculateAxisPercentage = (axis: AxisType): number => {
    let totalScore = 0;
    let questionsCount = 0;

    // Collate answers from all files/types
    const modulesKeys = ['pais', 'professores', 'autoavaliacao'];
    modulesKeys.forEach((mKey) => {
      const questionsList = QUESTIONNAIRES[mKey];
      questionsList.forEach((q) => {
        if (q.axis === axis && answers[q.id] !== undefined) {
          totalScore += answers[q.id];
          questionsCount++;
        }
      });
    });

    if (questionsCount === 0) return 0;
    
    // Average score (1.0 to 5.0) mapped to percentage (0% to 100%)
    const average = totalScore / questionsCount;
    return Math.round((average / 5) * 100);
  };

  const scoreHabilidade = calculateAxisPercentage('habilidade');
  const scoreCriatividade = calculateAxisPercentage('criatividade');
  const scoreEnvolvimento = calculateAxisPercentage('envolvimento');
  const scoreAverage = Math.round((scoreHabilidade + scoreCriatividade + scoreEnvolvimento) / 3);

  // Instantiating Chart.js radar chart from CDN script
  useEffect(() => {
    const ChartClass = (window as any).Chart;
    if (!ChartClass || !canvasRef.current) return;

    // Safety destroy to prevent redraw overlap
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new ChartClass(ctx, {
      type: 'radar',
      data: {
        labels: ['Habilidade', 'Criatividade', 'Envolvimento'],
        datasets: [{
          label: 'Percentual Observado',
          data: [scoreHabilidade, scoreCriatividade, scoreEnvolvimento],
          backgroundColor: 'rgba(20, 184, 166, 0.22)', // transparent teal
          borderColor: 'rgb(20, 184, 166)',             // Solid teal stroke
          borderWidth: 3,
          pointBackgroundColor: 'rgb(13, 148, 136)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(13, 148, 136)',
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true,
              color: '#f1f5f9'
            },
            grid: {
              color: '#e2e8f0'
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              showLabelBackdrop: false,
              font: {
                size: 9,
                weight: 'bold'
              }
            },
            pointLabels: {
              font: {
                size: 11,
                family: "'Inter', sans-serif",
                weight: 'bold'
              },
              color: '#334155'
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [scoreHabilidade, scoreCriatividade, scoreEnvolvimento]);

  // Handles exporting filled system to the user as single-file HTML
  const handleExportHtmlFile = () => {
    const compiledCode = generateSingleFileHtml(answers);
    const blob = new Blob([compiledCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'sistema_rastreio_ahsd.html';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  // Determine clinical diagnosis category output
  let resultKind: 'global' | 'especifico' | 'monitoramento' = 'monitoramento';
  if (scoreAverage > 75) {
    resultKind = 'global';
  } else if (scoreHabilidade > 80) {
    resultKind = 'especifico';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
      id="diagnostic-dashboard"
    >
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <button
            onClick={onNavigateToModules}
            className="group inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition duration-150 font-semibold mb-1"
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Painel de Módulos
          </button>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Parecer de Rastreamento Consolidade
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Análise comportamental das potencialidades e comportamentos com foco na Teoria dos Três Anéis.
          </p>
        </div>

        {/* Top actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportHtmlFile}
            title="Download full self-contained single-page file"
            className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold rounded-lg border border-emerald-200 transition duration-150 flex items-center gap-1.5 shadow-3xs"
          >
            <Download className="w-4 h-4" />
            Baixar Sistema HTML Offline
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-lg border border-slate-200 transition duration-150 flex items-center gap-1.5 shadow-3xs"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Printing title markup */}
      <div className="hidden print:block border-b-2 border-slate-300 pb-4 mb-6">
        <h1 class="text-2xl font-black text-slate-900">RELATÓRIO PSICOPEDAGÓGICO DE RASTREAMENTO</h1>
        <p class="text-sm text-slate-550 mt-1 uppercase tracking-wider">Fundamentação: Triagem Baseada na Teoria dos Três Anéis de Renzulli</p>
      </div>

      {/* Radar Section Bento and Diagnosis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* RADAR CHART BOX */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm print-card">
          <div className="text-center sm:text-left">
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">Gráfico Sintético (Renzulli Radar)</h3>
            <p className="text-[11px] text-slate-450">Interseção das respostas percentualizadas por vértice clínico.</p>
          </div>
          
          {/* Radar Drawing Canvas */}
          <div className="relative flex items-center justify-center p-2 min-h-[260px] max-h-[300px]" style={{ height: '280px' }}>
            <canvas ref={canvasRef}></canvas>
          </div>

          {/* Mini values metrics */}
          <div className="bg-slate-50/60 p-3 rounded-2xl border border-slate-200/50 flex justify-between items-center text-center divide-x divide-slate-100">
            <div className="flex-1">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Habilidade</span>
              <span className="text-sm font-black text-teal-600">{scoreHabilidade}%</span>
            </div>
            <div className="flex-1">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Criatividade</span>
              <span className="text-sm font-black text-emerald-600">{scoreCriatividade}%</span>
            </div>
            <div className="flex-1">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Envolvimento</span>
              <span className="text-sm font-black text-sky-600">{scoreEnvolvimento}%</span>
            </div>
          </div>
        </div>

        {/* CLINICAL SUMMARY CONTAINER */}
        <div className="flex flex-col justify-between gap-4">
          
          {/* Dynamic diagnosis container */}
          {resultKind === 'global' && (
            <div className="bg-teal-50 text-teal-950 p-6 rounded-3xl border border-teal-200/80 flex flex-col justify-between flex-grow space-y-4 print-card">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  Perfil Indutivo Compatível
                </span>
                <h3 className="text-xl font-extrabold tracking-tight text-teal-950">
                  Perfil Sugestivo de AH/SD Global
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  O estudante demonstra notas altamente elevadas de forma simultânea nos três domínios do modelo Renzulliano 
                  (capacidade acentuada, criatividade na concepção e envolvimento com as tarefas de interesse). 
                  Existe indicação robusta de comportamento de superdotação global que requer suporte pedagógico imediato.
                </p>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border border-teal-150 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-teal-950 flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  Plano de Trabalho Pedagógico Sugerido
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <li>• <strong>Aceleração Parcial / Suplementação:</strong> Alocação em Sala de Recursos Multifuncionais para enriquecimento.</li>
                  <li>• <strong>Projetos Independentes:</strong> Fornecer oportunidades para projetos Tipo III (foco em investigações práticas reais).</li>
                  <li>• <strong>Canalização Emocional:</strong> Atenção clínica contra Burnout estudantil ou ansiedade.</li>
                </ul>
              </div>
            </div>
          )}

          {resultKind === 'especifico' && (
            <div className="bg-indigo-50 text-indigo-950 p-6 rounded-3xl border border-indigo-200/80 flex flex-col justify-between flex-grow space-y-4 print-card">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                  <BookOpen className="w-3.5 h-3.5" />
                  Talento Cognitivo Destacado
                </span>
                <h3 className="text-xl font-extrabold tracking-tight text-indigo-950">
                  Indicativo de Talento Específico
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  Observa-se um comportamento com alta pontuação focada na Habilidade Acima da Média (&gt; 80%), demonstrando memorização exemplar, 
                  estruturação lógica rápida e verbalização superior. Embora a criatividade ou o engajamento com as tarefas curriculares tradicionais apareçam 
                  em patamar mediano, este talento focadamente acadêmico se beneficiará imensamente de suplementação de conteúdo.
                </p>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border border-indigo-150 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Recomendações Curriculares
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <li>• <strong>Desafio de Monitoria:</strong> Conceder posição de liderança acadêmica no auxílio a pares escolares.</li>
                  <li>• <strong>Nível Teórico Elevado:</strong> Oferecer apostilas adicionais e desafios matemáticos/críticos em classe.</li>
                  <li>• <strong>Condução Criativa:</strong> Provocar o engajamento através de gamificação e projetos opcionais.</li>
                </ul>
              </div>
            </div>
          )}

          {resultKind === 'monitoramento' && (
            <div className="bg-slate-100 text-slate-900 p-6 rounded-3xl border border-slate-200/80 flex flex-col justify-between flex-grow space-y-4 print-card">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-700 border border-slate-300">
                  <ChevronRight className="w-4 h-4" />
                  Acompanhamento Pedagógico ativo
                </span>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Análise e Desenvolvimento de Potenciais
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  As pontuações consolidadas não superaram os limites analíticos concomitantes para traçar um diagnóstico sugestivo eminente 
                  (Média global &gt; 75% ou Habilidade &gt; 80%). No entanto, traços saudáveis de motivação ou inventividade merecem ser observados. 
                  Recomenda-se incentivar a autonomia do estudante em matérias de sua livre escolha.
                </p>
              </div>

              <div className="bg-white/95 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-emerald-650" />
                  Próximos Passos recomendados
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <li>• <strong>Enriquecimento Estímulo:</strong> Disponibilizar oficinas eletivas de música, artes, robótica ou lógica.</li>
                  <li>• <strong>Fomente a perseverança:</strong> Auxiliá-lo na conclusão espontânea de tarefas difíceis autopostas.</li>
                  <li>• <strong>Nova aplicação:</strong> Reaplique o rastreio psicopedagógico na próxima virada de semestre letivo.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Axis cards informative details */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm print-card space-y-4">
        <div className="space-y-1">
          <h3 className="font-extrabold text-slate-950 text-base tracking-tight leading-tight">Detalhamento dos Três Eixos Clínicos</h3>
          <p className="text-xs text-slate-500">Métricas analíticas detalhadas do comportamento avaliado.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Box Habilidade */}
          <div className="space-y-2 border-r border-slate-100 pr-2 last:border-r-0">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-teal-650" />
                Habilidade Acadêmica
              </h4>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-100 text-teal-700">
                {scoreHabilidade}%
              </span>
            </div>
            <p className="text-xs text-slate-550 leading-relaxed">
              Expressa a velocidade de apreensão abstrata, vocabulário avançado, facilidade de autogestão intelectual e memória de longa duração de dados técnicos.
            </p>
          </div>

          {/* Box Criatividade */}
          <div className="space-y-2 border-r border-slate-100 pr-2 last:border-r-0">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                Criatividade Geral
              </h4>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700">
                {scoreCriatividade}%
              </span>
            </div>
            <p className="text-xs text-slate-550 leading-relaxed">
              Avalia a amplitude do pensamento lateral, propostas originais inesperadas para situações corriqueiras e abundância de raciocínios metafóricos ou artísticos.
            </p>
          </div>

          {/* Box Envolvimento */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-600" />
                Envolvimento com as Tarefas
              </h4>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-sky-700">
                {scoreEnvolvimento}%
              </span>
            </div>
            <p className="text-xs text-slate-550 leading-relaxed">
              Mapeia a resiliência produtiva frente a dilemas complexos, graus espontâneos de autonomia resolutiva, e perseverança focado em áreas eletivas de interesse (hiperfoco).
            </p>
          </div>
        </div>
      </div>

      {/* Psychological Warning Footer notice */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-205/60 text-xs text-slate-500 space-y-2.5 leading-relaxed">
        <p className="font-bold text-slate-800">Nota Legal Importante:</p>
        <p>
          Este software e seu relatório impresso associado constituem uma triagem (rastreamento) comportamental educacional preliminária 
          fundamentada no modelo dos três anéis de Renzulli. Esta triagem não substitui, sob hipótese alguma, as avaliações médicas formais, 
          neurológicas ou consultas a neuropediatras e psicólogos especialistas credenciados. O parecer deve servir exclusivamente para direcionamento 
          pedagógico proativo e fomento de metodologias inclusivas em classe escolar.
        </p>
      </div>

      {/* Buttons navigation panel back to start */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100 no-print">
        <button
          onClick={onNavigateToModules}
          className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition duration-150 flex items-center justify-center gap-2 shadow-sm"
        >
          <BarChart3Icon className="w-4 h-4" />
          Responder Outros Módulos / Voltar ao Painel
        </button>

        <button
          onClick={onResetAll}
          className="w-full sm:w-auto px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-100 transition duration-150 shadow-3xs"
        >
          <RefreshCw className="w-3.5 h-3.5 inline-block mr-1" />
          Reiniciar Todo o Rastreio
        </button>
      </div>
    </motion.div>
  );
}

// Inline mini helper components
function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function BarChart3Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
    </svg>
  );
}
