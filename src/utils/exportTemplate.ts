import { QUESTIONNAIRES } from '../types';

export function generateSingleFileHtml(currentAnswers: Record<string, number> = {}): string {
  // Serialize the questionnaires object safely for embedded JS
  const serializedQuestionnaires = JSON.stringify(QUESTIONNAIRES);
  
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma de Rastreio Psicopedagógico - AH/SD</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        @media print {
            .no-print {
                display: none !important;
            }
            .print-card {
                border: 1px solid #e2e8f0 !important;
                box-shadow: none !important;
                background: white !important;
            }
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col">

    <!-- Header / Navbar (Professional Clinical Look) -->
    <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-40 shadow-xs no-print">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-3">
                <div class="p-2.5 bg-teal-50 text-teal-600 rounded-xl border border-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0L6.41 14.54A2 2 0 0 1 4.48 16H2"/></svg>
                </div>
                <div>
                    <h1 class="text-base font-bold text-slate-900 tracking-tight leading-tight">Rastreio AH/SD</h1>
                    <p class="text-xs text-slate-500 font-medium">Instrumento Clínico de Diagnóstico e Apoio Escolar</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                    Versão 1.0 (Offline MVP)
                </span>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">

        <!-- SCREEN 1: HOME AND CONSENT -->
        <section id="screen-home" class="space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-sm space-y-6">
                <div class="space-y-3">
                    <span class="text-xs font-semibold py-1 px-3 bg-teal-50 text-teal-700 rounded-full border border-teal-100 uppercase tracking-widest inline-block">Fundamentação Científica</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Plataforma de Rastreio Psicopedagógico - AH/SD</h2>
                    <p class="text-slate-600 leading-relaxed text-sm sm:text-base">
                        Este é um instrumento digital preliminar projetado para identificar comportamentos e características associadas a indivíduos com <strong>Altas Habilidades / Superdotação (AH/SD)</strong>. 
                        A plataforma apoia a triagem educacional a partir de múltiplas perspectivas: a família, a escola e o próprio indivíduo.
                    </p>
                </div>

                <!-- Three Rings Concept Bento -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div class="p-5 bg-teal-50/50 rounded-xl border border-teal-100 space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">1</div>
                        <h3 class="font-bold text-slate-900 text-sm">Habilidade Acima da Média</h3>
                        <p class="text-xs text-slate-600 leading-relaxed">Capacidade intelectual geral, raciocínio abstrato avançado, velocidade de processamento e excelente memória.</p>
                    </div>
                    <div class="p-5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">2</div>
                        <h3 class="font-bold text-slate-900 text-sm">Criatividade Elevada</h3>
                        <p class="text-xs text-slate-600 leading-relaxed">Originalidade de ideias, flexibilidade de pensamento, curiosidade excepcional e soluções fora do convencional.</p>
                    </div>
                    <div class="p-5 bg-sky-50/50 rounded-xl border border-sky-100 space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">3</div>
                        <h3 class="font-bold text-slate-900 text-sm">Envolvimento com a Tarefa</h3>
                        <p class="text-xs text-slate-600 leading-relaxed">Perseverança, dedicação, hiperfoco em áreas de interesse, autodisciplina e altos níveis de motivação intrínseca.</p>
                    </div>
                </div>

                <div class="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/60 text-xs sm:text-sm text-slate-600 space-y-3">
                    <h4 class="font-bold text-slate-900 flex items-center gap-2">
                        <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Teoria dos Três Anéis de Joseph Renzulli
                    </h4>
                    <p class="leading-relaxed">
                        De acordo com a teoria articulada pelo psicólogo Joseph Renzulli, a superdotação manifesta-se através da interseção harmônica de três eixos específicos de comportamento. 
                        Este questionário coleta dados para analisar esses três eixos. <strong>Nota:</strong> Trata-se de uma triagem de rastreamento pedagógico preliminar, não substituindo uma avaliação neuropsicológica formal.
                    </p>
                </div>

                <!-- General Data Warning and Consent (LGPD compliance) -->
                <div class="pt-2 border-t border-slate-100">
                    <label class="flex items-start gap-3 cursor-pointer select-none">
                        <input type="checkbox" id="consent-check" class="mt-1 w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500 cursor-pointer">
                        <div class="text-xs sm:text-sm text-slate-600">
                            <strong>Declaro consentimento quanto ao uso de dados (LGPD):</strong> 
                            Estou ciente de que os dados recolhidos neste questionário serão armazenados de forma estrita em memória local (offline) no meu próprio navegador para elaboração do parecer psicopedagógico preliminar, não sendo transmitidos a nenhum servidor externo.
                        </div>
                    </label>
                </div>

                <!-- Action Button -->
                <div class="pt-2 flex justify-end">
                    <button id="btn-start" disabled class="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl tracking-tight transition duration-150 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
                        Iniciar Rastreio
                    </button>
                </div>
            </div>
        </section>

        <!-- SCREEN 2: MODULE SELECTION -->
        <section id="screen-modules" class="hidden space-y-6">
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Módulos de Avaliação</h2>
                <p class="text-slate-500 text-sm">Selecione e responda os módulos abaixo para alimentar o Gráfico de Radar de Renzulli. Quanto mais perspectivas respondidas, mais rico será o parecer.</p>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <!-- Module Pais -->
                <div class="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-200 transition duration-150 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 leading-tight">Módulo A: Pais e Responsáveis</h3>
                            <p class="text-xs text-slate-500 mt-0.5">Perspectiva do ambiente familiar e marcos iniciais.</p>
                        </div>
                    </div>
                    <div class="w-full sm:w-auto flex items-center gap-3 shrink-0">
                        <span id="badge-pais" class="text-xs px-2.5 py-1 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-100">Pendente</span>
                        <button onclick="startModule('pais')" class="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-teal-600 font-medium text-xs transition transition-all">
                            Responder
                        </button>
                    </div>
                </div>

                <!-- Module Profes -->
                <div class="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-200 transition duration-150 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 leading-tight">Módulo B: Professores e Educadores</h3>
                            <p class="text-xs text-slate-500 mt-0.5">Visão do ambiente escolar e desempenho coletivo.</p>
                        </div>
                    </div>
                    <div class="w-full sm:w-auto flex items-center gap-3 shrink-0">
                        <span id="badge-professores" class="text-xs px-2.5 py-1 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-100">Pendente</span>
                        <button onclick="startModule('professores')" class="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-teal-600 font-medium text-xs transition transition-all">
                            Responder
                        </button>
                    </div>
                </div>

                <!-- Module Auto -->
                <div class="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-200 transition duration-150 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 leading-tight">Módulo C: Autoavaliação do Estudante</h3>
                            <p class="text-xs text-slate-500 mt-0.5">Autopercepção das potencialidades, imaginação e motivação.</p>
                        </div>
                    </div>
                    <div class="w-full sm:w-auto flex items-center gap-3 shrink-0">
                        <span id="badge-autoavaliacao" class="text-xs px-2.5 py-1 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-100">Pendente</span>
                        <button onclick="startModule('autoavaliacao')" class="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-teal-600 font-medium text-xs transition transition-all">
                            Responder
                        </button>
                    </div>
                </div>
            </div>

            <!-- View Results / Diagnostics Callout -->
            <div id="results-partial-card" class="bg-emerald-50 text-emerald-950 p-6 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div class="space-y-1 text-center sm:text-left">
                    <h4 class="font-bold text-emerald-900">Análise de Dados Disponível</h4>
                    <p class="text-xs text-emerald-700">Você já pode consultar o parecer preliminar com as respostas registradas ou completar os módulos pendentes para máxima acurácia matemática.</p>
                </div>
                <button onclick="goToResults()" class="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition duration-150">
                    Acessar Dashboard
                </button>
            </div>
        </section>

        <!-- SCREEN 3: DYNAMIC QUESTIONNAIRE -->
        <section id="screen-questionnaire" class="hidden space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <button onclick="goBackToModules()" class="group inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition duration-150 font-medium pb-2">
                        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Voltar aos Módulos
                    </button>
                    <h2 id="quest-module-title" class="text-2xl font-extrabold text-slate-900 tracking-tight">Título do Módulo</h2>
                    <p id="quest-module-subtitle" class="text-xs text-slate-500 mt-1">Subtítulo do Módulo</p>
                </div>
                <div class="shrink-0 bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block text-right">Progresso</span>
                    <span id="quest-progress-text" class="text-sm font-black text-teal-600">0/9</span>
                </div>
            </div>

            <!-- Dynamic Question Cards Wrapper -->
            <div id="questions-wrapper" class="space-y-4">
                <!-- Injected dynamically by JS -->
            </div>

            <!-- Questionnaire Control Panel -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <span id="validation-warning" class="text-xs font-semibold text-rose-600 hidden flex items-center gap-1">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    Por favor, preencha todas as perguntas pendentes antes de fechar este módulo.
                </span>
                <span id="all-good-info" class="text-xs text-slate-500 font-medium">Avalie as 9 situações usando a escala Likert.</span>
                
                <div class="w-full sm:w-auto flex justify-end gap-3 shrink-0">
                    <button onclick="goBackToModules()" class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold">Cancelar</button>
                    <button onclick="saveCurrentModule()" class="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black tracking-tight transition duration-150 shadow-sm">
                        Finalizar e Salvar Módulo
                    </button>
                </div>
            </div>
        </section>

        <!-- SCREEN 4: DASHBOARD & REPORT -->
        <section id="screen-results" class="hidden space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
                <div>
                    <button onclick="goBackToModules()" class="group inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition duration-150 font-medium pb-1">
                        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Painel de Módulos
                    </button>
                    <h2 class="text-2xl font-black text-slate-900 tracking-tight">Parecer Clínico e Diagnóstico</h2>
                    <p class="text-xs text-slate-500 mt-1">Consolidação matemática obtida por meio dos questionários respondidos.</p>
                </div>
                <!-- Action Tools -->
                <div class="flex items-center gap-2 shrink-0">
                    <button onclick="window.print()" class="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 shadow-sm hover:bg-slate-200 transition duration-150 flex items-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Imprimir / PDF
                    </button>
                </div>
            </div>

            <!-- Print Header -->
            <div class="hidden print:block border-b-2 border-slate-300 pb-4 mb-6">
                <h1 class="text-2xl font-black text-slate-900">RELATÓRIO DE RASTREIO PSICOPEDAGÓGICO - AH/SD</h1>
                <p class="text-sm text-slate-500">Fundamentação: Teoria dos Três Anéis de Joseph Renzulli</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <!-- Column 1: The Radar Chart Card -->
                <div class="bg-white p-6 rounded-2xl border border-slate-200 print-card flex flex-col justify-between space-y-4 shadow-sm">
                    <div class="text-center sm:text-left">
                        <h3 class="font-extrabold text-slate-950 text-sm tracking-tight">O Gráfico de Renzulli (Radar)</h3>
                        <p class="text-[11px] text-slate-500 mt-0.5">Distribuição percentual simplificada de cada vértice.</p>
                    </div>
                    <!-- Chart canvas container -->
                    <div class="relative flex items-center justify-center p-2 flex-grow min-h-[280px]" style="position: relative; margin: auto; height:280px; width:280px;">
                        <canvas id="canvas-radar"></canvas>
                    </div>
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center justify-between text-center divide-x divide-slate-200">
                        <div class="flex-1">
                            <span class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Habilidade</span>
                            <span id="score-text-habilidade" class="text-sm font-black text-teal-600">0%</span>
                        </div>
                        <div class="flex-1">
                            <span class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Criatividade</span>
                            <span id="score-text-criatividade" class="text-sm font-black text-emerald-600">0%</span>
                        </div>
                        <div class="flex-1">
                            <span class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Envolvimento</span>
                            <span id="score-text-envolvimento" class="text-sm font-black text-sky-600">0%</span>
                        </div>
                    </div>
                </div>

                <!-- Column 2: Clinical Summary Output -->
                <div class="space-y-4 flex flex-col justify-between">
                    <!-- Diagnostic Container alert -->
                    <div id="diagnostic-outcome-container" class="p-6 rounded-2xl border flex-grow flex flex-col justify-between space-y-4">
                        <div class="space-y-3">
                            <span id="diagnostic-badge" class="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border">
                                Status da Avaliação
                            </span>
                            <h3 id="diagnostic-title" class="text-xl font-extrabold tracking-tight">Análise</h3>
                            <p id="diagnostic-description" class="text-sm leading-relaxed text-slate-700">Explicação diagnóstica detalhada.</p>
                        </div>
                        <div id="diagnostic-recommendations" class="bg-white/60 p-4 rounded-xl border space-y-2 mt-4">
                            <h4 class="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-1">
                                <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Recomendações Associadas
                            </h4>
                            <p id="diagnostic-recs-text" class="text-xs leading-relaxed text-slate-600">Passos posteriores para enriquecimento pedagógico do estudante.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Eixos Informational Breakdown Table -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 print-card space-y-4 shadow-sm">
                <div class="space-y-1">
                    <h3 class="font-extrabold text-slate-950 text-base tracking-tight">Detalhamento dos Três Eixos</h3>
                    <p class="text-xs text-slate-500">Compreensão aprofundada baseada nas respostas coletadas.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div class="space-y-2 border-r border-slate-100 pr-2 last:border-r-0">
                        <div class="flex justify-between items-center">
                            <h4 class="font-bold text-slate-900 text-xs sm:text-sm">Habilidade Acima da Média</h4>
                            <span id="breakdown-badge-habilidade" class="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">0%</span>
                        </div>
                        <p class="text-xs text-slate-600 leading-relaxed">Avalia cognição rápida, memória de longo prazo, capacidade de abstração intelectual e verbalização avançada para a idade.</p>
                    </div>
                    <div class="space-y-2 border-r border-slate-100 pr-2 last:border-r-0">
                        <div class="flex justify-between items-center">
                            <h4 class="font-bold text-slate-900 text-xs sm:text-sm">Criatividade</h4>
                            <span id="breakdown-badge-criatividade" class="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">0%</span>
                        </div>
                        <p class="text-xs text-slate-600 leading-relaxed">Reflete originalidade, flexibilidade de pensamento para abordar dilemas e inventividade para gerar ideias ricas ou narrativas raras.</p>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <h4 class="font-bold text-slate-900 text-xs sm:text-sm">Envolvimento com a Tarefa</h4>
                            <span id="breakdown-badge-envolvimento" class="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">0%</span>
                        </div>
                        <p class="text-xs text-slate-600 leading-relaxed">Identifica os traços determinantes de perseverança, hiperfoco persistente em temas complexos e níveis profundos de motivação intrínseca.</p>
                    </div>
                </div>
            </div>

            <!-- Footer Clinical Notes -->
            <div class="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/60 text-xs text-slate-500 space-y-2 leading-relaxed">
                <p><strong>Nota importante sobre o Rastreio:</strong></p>
                <p>Este relatório fornece um indicativo puramente pedagógico de AH/SD fundamentado na somatória do comportamento observado de pais, educadores e autopercepção. Ele não constitui um laudo definitivo ou veredito psicológico imutável. Recomenda-se o encaminhamento ao núcleo de atendimento a altas habilidades (NAAH/S), neuropsicólogos credenciados ou serviços educacionais de apoio especializado (SALA DE RECURSOS BILINGUE/MULTIFUNCIONAL) para o acompanhamento cabível.</p>
            </div>

            <!-- Bottom navigation back to modules -->
            <div class="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-slate-100 no-print">
                <button onclick="goBackToModules()" class="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition duration-150 shadow-sm flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    Responder Outros Módulos
                </button>
                <div class="flex flex-col sm:flex-row gap-2">
                    <button id="btn-reset" onclick="resetAllData()" class="w-full sm:w-auto px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-100 transition duration-150">
                        Reiniciar Tudo
                    </button>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer Clinical brand -->
    <footer class="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-500 no-print mt-auto">
        <div class="max-w-6xl mx-auto space-y-2">
            <p><strong>Plataforma Rastreio AH/SD</strong> — Desenvolvida com fins pedagógicos de rastreio simplificado.</p>
            <p class="text-[10px]">Livre de cookies invasivos. Dados processados localmente em conformidade com a LGPD brasileira.</p>
        </div>
    </footer>

    <!-- Client-side state scripts -->
    <script>
        // Injected data and state
        const QUESTIONNAIRES = ${serializedQuestionnaires};
        
        let answers = ${JSON.stringify(currentAnswers)};
        let activeModule = null;
        let chartInstance = null;

        document.addEventListener("DOMContentLoaded", () => {
            // Load state from localStorage if exists
            const saved = localStorage.getItem("ahsd_ras_state");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed && typeof parsed === 'object') {
                        answers = { ...answers, ...parsed };
                    }
                } catch(e) { console.error("Error recovering local data", e); }
            }

            // Bind Event Listeners
            const consentCheck = document.getElementById("consent-check");
            const btnStart = document.getElementById("btn-start");

            if (consentCheck) {
                consentCheck.addEventListener("change", (e) => {
                    btnStart.disabled = !e.target.checked;
                });
            }

            if (btnStart) {
                btnStart.addEventListener("click", () => {
                    navigateTo("screen-modules");
                });
            }

            // Sync with current state
            updateModulesProgressBadges();
        });

        // Toggle Screens
        function navigateTo(screenId) {
            const screens = ["screen-home", "screen-modules", "screen-questionnaire", "screen-results"];
            screens.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    if (id === screenId) {
                        el.classList.remove("hidden");
                        // Fade animations
                        el.style.opacity = 0;
                        setTimeout(() => {
                            el.style.transition = "opacity 0.2s ease-in-out";
                            el.style.opacity = 1;
                        }, 50);
                    } else {
                        el.classList.add("hidden");
                    }
                }
            });

            // If navigating to modules screen, update badges and partial view
            if (screenId === "screen-modules") {
                updateModulesProgressBadges();
            }
        }

        // Check Progress
        function checkModuleProgress(moduleId) {
            const questions = QUESTIONNAIRES[moduleId] || [];
            let answeredCount = 0;
            questions.forEach(q => {
                if (answers[q.id] !== undefined) answeredCount++;
            });
            return {
                total: questions.length,
                answered: answeredCount,
                percent: (answeredCount / questions.length) * 100,
                completed: answeredCount === questions.length
            };
        }

        function updateModulesProgressBadges() {
            const modules = ['pais', 'professores', 'autoavaliacao'];
            let hasAtLeastOneSelection = false;

            modules.forEach(m => {
                const prog = checkModuleProgress(m);
                const badge = document.getElementById("badge-" + m);
                if (badge) {
                    if (prog.completed) {
                        badge.innerText = "Completo";
                        badge.className = "text-xs px-2.5 py-1 rounded-full font-semibold bg-teal-50 text-teal-700 border border-teal-100";
                        hasAtLeastOneSelection = true;
                    } else if (prog.answered > 0) {
                        badge.innerText = "Em andamento (" + prog.answered + "/9)";
                        badge.className = "text-xs px-2.5 py-1 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-100";
                        hasAtLeastOneSelection = true;
                    } else {
                        badge.innerText = "Pendente";
                        badge.className = "text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-100 text-slate-500 border border-slate-200";
                    }
                }
            });

            const resultsCard = document.getElementById("results-partial-card");
            if (resultsCard) {
                if (hasAtLeastOneSelection) {
                    resultsCard.classList.remove("hidden");
                } else {
                    resultsCard.classList.add("hidden");
                }
            }
        }

        // Start answering
        function startModule(moduleId) {
            activeModule = moduleId;
            const questCardTitles = {
                pais: { title: "Módulo A: Pais e Responsáveis", subtitle: "Análise sob perspectiva familiar e marcos iniciais do comportamento." },
                professores: { title: "Módulo B: Educadores e Professores", subtitle: "Análise ambiental escolar do aprendizado, complexidade e liderança." },
                autoavaliacao: { title: "Módulo C: Autoavaliação do Estudante", subtitle: "O próprio estudante aponta interesses, imaginação criativa e dedicação." }
            };

            const info = questCardTitles[moduleId];
            document.getElementById("quest-module-title").innerText = info.title;
            document.getElementById("quest-module-subtitle").innerText = info.subtitle;

            // Generate questions list
            const questions = QUESTIONNAIRES[moduleId] || [];
            const wrapper = document.getElementById("questions-wrapper");
            wrapper.innerHTML = "";

            questions.forEach((q, index) => {
                const savedVal = answers[q.id];
                const card = document.createElement("div");
                card.className = "bg-white p-5 rounded-2xl border border-slate-200 shadow-3xs space-y-4";
                
                // Axis Badge Colors
                let axisColor = "bg-teal-50 border-teal-100 text-teal-700";
                let axisName = "Habilidade";
                if (q.axis === "criatividade") {
                    axisColor = "bg-emerald-50 border-emerald-100 text-emerald-700";
                    axisName = "Criatividade";
                } else if (q.axis === "envolvimento") {
                    axisColor = "bg-sky-50 border-sky-100 text-sky-700";
                    axisName = "Envolvimento";
                }

                card.innerHTML = \`
                    <div class="flex items-center justify-between gap-4">
                        <span class="inline-block text-[10px] font-bold px-2 py-0.5 rounded border \${axisColor} uppercase tracking-wider">\${axisName}</span>
                        <span class="text-xs font-black text-slate-400">Questão \${index + 1}/9</span>
                    </div>
                    <p class="text-slate-900 border-l-2 border-slate-100 pl-3 leading-snug font-medium text-sm sm:text-base">\${q.text}</p>
                    
                    <!-- Likert Radio Container -->
                    <div class="pt-2">
                        <div class="flex flex-col sm:flex-row justify-between items-center bg-slate-50 border border-slate-200/60 p-4 rounded-xl gap-4">
                            <span class="text-xs text-slate-400 font-bold shrink-0">1 - Nunca</span>
                            <div class="flex justify-around items-center gap-2 sm:gap-4 w-full">
                                \${[1,2,3,4,5].map(v => {
                                    const activeCheck = savedVal === v ? 'checked' : '';
                                    return \`
                                        <label class="flex flex-col items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="q-\${q.id}" value="\${v}" \${activeCheck} onchange="setAnswer('\${q.id}', \${v})" class="w-5 h-5 text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer">
                                            <span class="text-xs font-bold text-slate-500">\${v}</span>
                                        </label>
                                    \`;
                                }).join('')}
                            </div>
                            <span class="text-xs text-slate-400 font-bold shrink-0">5 - Sempre</span>
                        </div>
                    </div>
                \`;
                wrapper.appendChild(card);
            });

            updateQuestionProgressBar();
            document.getElementById("validation-warning").classList.add("hidden");
            navigateTo("screen-questionnaire");
        }

        function setAnswer(questId, val) {
            answers[questId] = val;
            // Persist to local storage helper
            localStorage.setItem("ahsd_ras_state", JSON.stringify(answers));
            updateQuestionProgressBar();
        }

        function updateQuestionProgressBar() {
            const prog = checkModuleProgress(activeModule);
            document.getElementById("quest-progress-text").innerText = prog.answered + "/9";
        }

        function goBackToModules() {
            navigateTo("screen-modules");
        }

        function saveCurrentModule() {
            const prog = checkModuleProgress(activeModule);
            if (!prog.completed) {
                document.getElementById("validation-warning").classList.remove("hidden");
                return;
            }
            document.getElementById("validation-warning").classList.add("hidden");
            navigateTo("screen-modules");
        }

        // RESULTS & CHART COMPILATION
        function calculateEixoScore(axis) {
            let totalScore = 0;
            let totalQuestions = 0;

            const modules = ["pais", "professores", "autoavaliacao"];
            modules.forEach(m => {
                const questions = QUESTIONNAIRES[m];
                questions.forEach(q => {
                    if (q.axis === axis && answers[q.id] !== undefined) {
                        totalScore += answers[q.id];
                        totalQuestions++;
                    }
                });
            });

            if (totalQuestions === 0) return 0;
            // Normalize so that average of points (1-5) maps to %
            const average = totalScore / totalQuestions;
            // 1 -> 20%, 5 -> 100%
            return Math.round((average / 5) * 100);
        }

        function goToResults() {
            const habScore = calculateEixoScore('habilidade');
            const criScore = calculateEixoScore('criatividade');
            const envScore = calculateEixoScore('envolvimento');

            // Text Updates
            document.getElementById("score-text-habilidade").innerText = habScore + "%";
            document.getElementById("score-text-criatividade").innerText = criScore + "%";
            document.getElementById("score-text-envolvimento").innerText = envScore + "%";

            document.getElementById("breakdown-badge-habilidade").innerText = habScore + "%";
            document.getElementById("breakdown-badge-criatividade").innerText = criScore + "%";
            document.getElementById("breakdown-badge-envolvimento").innerText = envScore + "%";

            // Diagnostic logic
            const averageOverall = (habScore + criScore + envScore) / 3;
            const container = document.getElementById("diagnostic-outcome-container");
            const badge = document.getElementById("diagnostic-badge");
            const title = document.getElementById("diagnostic-title");
            const description = document.getElementById("diagnostic-description");
            const recsText = document.getElementById("diagnostic-recs-text");

            if (averageOverall > 75) {
                // Perfil Sugestivo Global
                container.className = "p-6 rounded-2xl border flex-grow flex flex-col justify-between space-y-4 bg-emerald-50 text-emerald-950 border-emerald-200 print-card";
                badge.className = "inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border bg-emerald-100 text-emerald-800 border-emerald-200";
                badge.innerText = "Altas Habilidades Indicado";
                title.innerText = "Perfil Sugestivo de AH/SD Global";
                description.innerText = "O estudante apresenta patamares altamente expressivos nos três eixos interdependentes de Renzulli (Habilidade, Criatividade e Envolvimento com a Tarefa). Estão reunidos os componentes do comportamento superdotado tradicional, sugerindo potencial para excelente desempenho autônomo, produções originais e rápida abstração. Recomenda-se acompanhamento psicopedagógico estruturado para fomento de suas habilidades.";
                recsText.innerHTML = "<strong>1. Enriquecimento Curricular:</strong> Introduzir projetos de pesquisa independente (tipo II e III de Renzulli).<br><strong>2. Apoio Psicológico:</strong> Acompanhamento focado em inteligência socioemocional e prevenção do perfeccionismo disfuncional.<br><strong>3. Articulação Escolar:</strong> Encaminhamento ao Núcleo de Educação de Altas Habilidades (NAAH/S).";
            } else if (habScore > 80) {
                // Talento Específico
                container.className = "p-6 rounded-2xl border flex-grow flex flex-col justify-between space-y-4 bg-teal-50 text-teal-900 border-teal-200 print-card";
                badge.className = "inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border bg-teal-100 text-teal-800 border-teal-200";
                badge.innerText = "Talento Intelectual Destacado";
                title.innerText = "Indicativo de Talento Específico";
                description.innerText = "O estudante apresenta um desempenho acentuado em Habilidade Acima da Média (superior a 80%), demonstrando facilidade para absorver conteúdos abstratos acadêmicos e facilidade de codificação/memória. Contudo, os eixos de Criatividade e Envolvimento mostraram-se mais brandos. Isso aponta para um talento cognitivo/acadêmico focado, beneficiando-se muito de aceleração parcial de matérias ou monitorias.";
                recsText.innerHTML = "<strong>1. Monitoria Acadêmica:</strong> Estimular o estudante a atuar como monitor de conteúdo avançado.<br><strong>2. Flexibilidade em Aula:</strong> Oferecer desafios específicos em matérias onde há teto cognitivo obsoleto.<br><strong>3. Integração Criativa:</strong> Estimular a participação em clubes de ciências ou oficinas criativas.";
            } else {
                // Outros casos / Monitoramento
                container.className = "p-6 rounded-2xl border flex-grow flex flex-col justify-between space-y-4 bg-slate-100 text-slate-800 border-slate-300 print-card";
                badge.className = "inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border bg-slate-200 text-slate-700 border-slate-300";
                badge.innerText = "Análise Preliminar em Andamento";
                title.innerText = "Monitoramento e Desenvolvimento de Potencial";
                description.innerText = "As pontuações obtidas não ultrapassaram os limiares críticos simultâneos definidos para caracterizar perfil sugestivo evidente de AH/SD global (média global > 75%) ou acadêmico (Habilidade > 80%). No entanto, existem focos de aptidões secundárias que merecem enriquecimento ativo. Recomenda-se incentivar o estudante com estratégias de envolvimento e novos problemas práticos.";
                recsText.innerHTML = "<strong>1. Motivação Guiada:</strong> Apresentar desafios baseados na paixão/interesse do paciente.<br><strong>2. Workshops Gerais:</strong> Participação em projetos livres multidisciplinares.<br><strong>3. Reavaliação:</strong> Nova aplicação do rastreio em 6 meses para capturar evolução.";
            }

            // Navigate to screen
            navigateTo("screen-results");

            // Build or Redraw Radar Chart
            setTimeout(() => {
                renderRadarChart(habScore, criScore, envScore);
            }, 100);
        }

        // Render standard Chart.js Radar Chart
        function renderRadarChart(hab, cri, env) {
            const ctx = document.getElementById('canvas-radar');
            if (!ctx) return;

            if (chartInstance) {
                chartInstance.destroy();
            }

            // Standard config matching clinical styling
            chartInstance = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Habilidade', 'Criatividade', 'Envolvimento'],
                    datasets: [{
                        label: 'Pontuação Realizada',
                        data: [hab, cri, env],
                        backgroundColor: 'rgba(20, 184, 166, 0.25)', // Teal background transparent
                        borderColor: 'rgb(20, 184, 166)',             // Teal primary stroke
                        borderWidth: 2.5,
                        pointBackgroundColor: 'rgb(13, 148, 136)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(13, 148, 136)',
                        pointRadius: 5
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
                                color: '#1e293b'
                            }
                        }
                    }
                }
            });
        }

        // Clear everything
        function resetAllData() {
            if (confirm("Deseja realmente apagar todas as respostas e redefinir o formulário?")) {
                answers = {};
                localStorage.removeItem("ahsd_ras_state");
                updateModulesProgressBadges();
                navigateTo("screen-modules");
            }
        }
    </script>
</body>
</html>`;
}
