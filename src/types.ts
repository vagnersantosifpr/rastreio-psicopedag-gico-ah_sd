export type AxisType = 'habilidade' | 'criatividade' | 'envolvimento';

export interface Question {
  id: string;
  axis: AxisType;
  text: string;
}

export interface Module {
  id: 'pais' | 'professores' | 'autoavaliacao';
  title: string;
  subtitle: string;
  iconName: 'Users' | 'GraduationCap' | 'User';
  questions: Question[];
}

export interface QuizResponse {
  [questionId: string]: number; // Likert scale value 1 to 5
}

export interface ModuleProgress {
  answered: boolean;
  scoreByAxis: {
    habilidade: number; // percentage (0-100)
    criatividade: number; // percentage (0-100)
    envolvimento: number; // percentage (0-100)
  };
}

export interface OverallResults {
  habilidade: number;
  criatividade: number;
  envolvimento: number;
}

export const QUESTIONNAIRES: Record<string, Question[]> = {
  pais: [
    {
      id: 'pais_hab_1',
      axis: 'habilidade',
      text: 'Demonstrou marcos do desenvolvimento precocemente (ex: falar, ler, andar de forma precoce)?'
    },
    {
      id: 'pais_hab_2',
      axis: 'habilidade',
      text: 'Aprende rapidamente coisas novas com o mínimo de instrução ou treinamento formal?'
    },
    {
      id: 'pais_hab_3',
      axis: 'habilidade',
      text: 'Possui um vocabulário rico, avançado para a idade, expressando-se com clareza e desenvoltura?'
    },
    {
      id: 'pais_cri_1',
      axis: 'criatividade',
      text: 'Encontra saídas e soluções originais e fora do comum para problemas práticos do cotidiano?'
    },
    {
      id: 'pais_cri_2',
      axis: 'criatividade',
      text: 'Demonstra curiosidade aguçada, fazendo perguntas profundas ou incomuns sobre "como" e "por quê" as coisas funcionam?'
    },
    {
      id: 'pais_cri_3',
      axis: 'criatividade',
      text: 'Tem imaginação vívida/rica, inventando histórias complexas ou aplicando novos significados a brinquedos ordinários?'
    },
    {
      id: 'pais_env_1',
      axis: 'envolvimento',
      text: 'Apresenta concentração intensa (hiperfoco) e persistente em hobbies ou tarefas de seu grande interesse?'
    },
    {
      id: 'pais_env_2',
      axis: 'envolvimento',
      text: 'Inicia e conclui projetos próprios de forma autônoma sem necessitar de incentivo externo constante?'
    },
    {
      id: 'pais_env_3',
      axis: 'envolvimento',
      text: 'Demonstra desagrado ou forte resistência ao ser interrompido quando está profundamente envolvido em alguma atividade?'
    }
  ],
  professores: [
    {
      id: 'prof_hab_1',
      axis: 'habilidade',
      text: 'Aprende novos conceitos acadêmicos com rapidez e facilidade superior à média dos colegas?'
    },
    {
      id: 'prof_hab_2',
      axis: 'habilidade',
      text: 'Demonstra excelente memória de longo prazo, retendo conceitos detalhados e recuperando-os com facilidade?'
    },
    {
      id: 'prof_hab_3',
      axis: 'habilidade',
      text: 'Compreende relações de causa e efeito complexas e faz conexões abstratas inovadoras?'
    },
    {
      id: 'prof_cri_1',
      axis: 'criatividade',
      text: 'Formula perguntas complexas, provocativas ou incomuns que desafiam o escopo padrão da aula?'
    },
    {
      id: 'prof_cri_2',
      axis: 'criatividade',
      text: 'Apresenta ideias ou produz alternativas originais e pouco convencionais para as tarefas letivas?'
    },
    {
      id: 'prof_cri_3',
      axis: 'criatividade',
      text: 'Demonstra pensamento lateral apurado, senso de humor diferenciado ou capacidade de fazer analogias perspicazes?'
    },
    {
      id: 'prof_env_1',
      axis: 'envolvimento',
      text: 'Persiste apaixonadamente por longos períodos em problemas difíceis ou desafios de alto nível intelectual?'
    },
    {
      id: 'prof_env_2',
      axis: 'envolvimento',
      text: 'Exibe alto grau de exigência produtiva, perfeccionismo e autonomia no cumprimento dos seus objetivos?'
    },
    {
      id: 'prof_env_3',
      axis: 'envolvimento',
      text: 'Fica profundamente imerso nas tarefas científicas, artísticas ou intelectuais, alheio a distrações externas?'
    }
  ],
  autoavaliacao: [
    {
      id: 'auto_hab_1',
      axis: 'habilidade',
      text: 'Sinto que compreendo conceitos e explicações de forma muito mais rápida do que a maioria dos meus colegas?'
    },
    {
      id: 'auto_hab_2',
      axis: 'habilidade',
      text: 'Consigo me lembrar com propriedade de detalhes, fatos específicos ou conhecimentos que outros costumam esquecer?'
    },
    {
      id: 'auto_hab_3',
      axis: 'habilidade',
      text: 'Busco ler, pesquisar ou aprender sobre temas complexos e novos por pura curiosidade intelectual?'
    },
    {
      id: 'auto_cri_1',
      axis: 'criatividade',
      text: 'Crio soluções alternativas ou formas criativas de lidar com metas e desafios que outros acham difíceis?'
    },
    {
      id: 'auto_cri_2',
      axis: 'criatividade',
      text: 'Possuo uma grande variedade de interesses diferentes e ideias que as pessoas acham originais ou curiosas?'
    },
    {
      id: 'auto_cri_3',
      axis: 'criatividade',
      text: 'Costumo usar minha imaginação para desenhar, escrever, compor, programar ou projetar criações originais?'
    },
    {
      id: 'auto_env_1',
      axis: 'envolvimento',
      text: 'Quando estou desenvolvendo algo de que gosto muito, perco a noção do tempo e mantenho o foco por horas?'
    },
    {
      id: 'auto_env_2',
      axis: 'envolvimento',
      text: 'Tenho prazer em concluir tarefas difíceis, mantendo a determinação mesmo se cansarem ou exigirem muito?'
    },
    {
      id: 'auto_env_3',
      axis: 'envolvimento',
      text: 'Estabeleço metas exigentes para mim mesmo e trabalho de forma autônoma e apaixonada para realizá-las?'
    }
  ]
};

export const MODULES: Module[] = [
  {
    id: 'pais',
    title: 'Módulo A: Pais e Responsáveis',
    subtitle: 'Perspectiva do ambiente familiar e desenvolvimento inicial.',
    iconName: 'Users',
    questions: QUESTIONNAIRES.pais
  },
  {
    id: 'professores',
    title: 'Módulo B: Educadores e Professores',
    subtitle: 'Análise do comportamento escolar, acadêmico e interativo.',
    iconName: 'GraduationCap',
    questions: QUESTIONNAIRES.professores
  },
  {
    id: 'autoavaliacao',
    title: 'Módulo C: Autoavaliação do Estudante',
    subtitle: 'Autopercepção das potencialidades e interesses.',
    iconName: 'User',
    questions: QUESTIONNAIRES.autoavaliacao
  }
];

// Helper to convert Likert response score (1-5) to a clinical percentage.
// Linear mapping: 1 -> 20%, 2 -> 40%, 3 -> 60%, 4 -> 80%, 5 -> 100%
export function rateToPercentage(score: number): number {
  return (score / 5) * 100;
}
