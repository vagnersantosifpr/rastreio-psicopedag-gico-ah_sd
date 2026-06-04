<div align="center">
<img width="1200" height="475" alt="Rastreio Psicopedagógico para Altas Habilidades/Superdotação" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />

# 🎯 Rastreio Psicopedagógico para Altas Habilidades/Superdotação (AHSD)

[![React](https://img.shields.io/badge/React-19.0.1-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2.3-purple?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-blue?logo=tailwindcss)](https://tailwindcss.com)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-AI-orange)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](#licença)

</div>

---

## 📋 Visão Geral

**Rastreio Psicopedagógico AHSD** é uma aplicação web interativa desenvolvida em **React + TypeScript** que facilita a identificação e avaliação de crianças com **Altas Habilidades/Superdotação** através de questionários estruturados com análise de dados em tempo real.

A aplicação foi projetada para ser acessível, intuitiva e offline-first, permitindo que **pais, professores e os próprios alunos** contribuam com perspectivas complementares sobre o desenvolvimento cognitivo e criativo.

### 🎯 Objetivo Principal

Subsidiar profissionais da educação e psicopedagogia com dados estruturados para identificação de crianças com indicadores de altas habilidades, baseado em três eixos fundamentais:
- **Habilidade**: Capacidade intelectual e aprendizagem rápida
- **Criatividade**: Pensamento divergente e inovação
- **Envolvimento**: Motivação e comprometimento com tarefas

---

## ✨ Características Principais

### 🌟 Recursos Core
- ✅ **Três módulos de avaliação**: Perspectiva de Pais, Professores e Autoavaliação
- ✅ **Análise multi-dimensional**: Avalia habilidade, criatividade e envolvimento
- ✅ **Escala Likert 1-5**: Respostas padronizadas para melhor comparabilidade
- ✅ **Dashboard de resultados**: Visualização intuitiva com gráficos e métricas
- ✅ **Armazenamento local (LocalStorage)**: Funciona offline, dados persistem entre sessões
- ✅ **Exportação de dados**: Download de relatórios em múltiplos formatos
- ✅ **Interface responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Animações suaves**: Transições visuais com Motion.js para melhor UX

### 🔧 Características Técnicas
- ⚡ **Hot Module Replacement (HMR)**: Desenvolvimento rápido com reload automático
- 🎨 **Tailwind CSS**: Estilo moderno e altamente customizável
- 📱 **Progressive Web App (PWA)**: Pronto para instalação offline
- 🔒 **Type-safe**: TypeScript em 100% do código
- 🚀 **Build otimizado**: Vite para compras e builds ultrarrápidos
- 🧪 **Estrutura escalável**: Componentes reutilizáveis e bem organizados

---

## 🏗️ Estrutura do Projeto

```
rastreio-psicopedagogico-ah_sd/
├── src/
│   ├── components/                    # Componentes React reutilizáveis
│   │   ├── DiagnosticDashboard.tsx    # Painel de resultados e análise
│   │   ├── HomeConsent.tsx            # Tela de consentimento inicial
│   │   ├── ModuleSelection.tsx        # Seleção de módulos de avaliação
│   │   └── QuestionnaireCard.tsx      # Card individual de questões
│   ├── utils/
│   │   └── exportTemplate.ts          # Utilidades para exportação de dados
│   ├── App.tsx                        # Componente raiz da aplicação
│   ├── main.tsx                       # Ponto de entrada
│   ├── types.ts                       # Definições de tipos TypeScript
│   └── index.css                      # Estilos globais
├── assets/                            # Imagens, ícones e recursos estáticos
├── public/                            # Arquivos públicos (favicon, etc)
├── index.html                         # HTML principal
├── package.json                       # Dependências e scripts
├── tsconfig.json                      # Configuração TypeScript
├── vite.config.ts                     # Configuração Vite
├── tailwind.config.ts                 # Configuração Tailwind CSS
├── .env.local                         # Variáveis de ambiente (API keys)
├── README.md                          # Este arquivo
├── LICENSE                            # Licença MIT
└── metadata.json                      # Metadados do projeto
```

---

## 🛠️ Stack de Tecnologias

### Frontend
- **React 19.0.1**: Biblioteca de UI moderna
- **TypeScript 5.8**: Tipagem estática para maior segurança
- **Vite 6.2.3**: Build tool ultra-rápido
- **Tailwind CSS 4.1.14**: Utility-first CSS framework
- **Motion.js 12.23.24**: Animações fluidas e interativas

### Backend/APIs
- **Google Gemini AI**: Integração com IA para análise avançada
- **Express.js 4.21.2**: Server-side (opcional)

### Desenvolvimento
- **Node.js**: Runtime JavaScript
- **npm**: Gerenciador de pacotes
- **Autoprefixer**: Suporte a prefixos CSS automático

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior) - [Download](https://nodejs.org/)
- **npm** (geralmente vem com Node.js)
- **Git** (para clonar o repositório)
- **Chave de API do Google Gemini** - [Obter chave](https://ai.google.dev/pricing)

### Verificar versões instaladas

```bash
# Verificar Node.js
node --version
# Deve ser v16.0.0 ou superior

# Verificar npm
npm --version
# Deve ser 7.0.0 ou superior

# Verificar Git
git --version
```

---

## 🚀 Instalação e Configuração

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/vagnersantosifpr/rastreio-psicopedag-gico-ah_sd.git
cd rastreio-psicopedag-gico-ah_sd
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

Isso instalará todas as dependências listadas em `package.json`:
- React e React DOM
- Vite e plugins
- Tailwind CSS
- Google Gemini AI SDK
- Motion.js para animações
- TypeScript
- E outras bibliotecas necessárias

### 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
touch .env.local
```

Abra o arquivo e adicione sua chave de API do Google Gemini:

```env
VITE_GEMINI_API_KEY=sua_chave_de_api_aqui
```

**Como obter sua chave de API:**
1. Acesse [Google AI Studio](https://ai.google.dev/aistudio)
2. Clique em "Create API Key"
3. Crie uma nova chave no Google Cloud
4. Copie a chave e adicione ao `.env.local`

⚠️ **Importante**: Nunca compartilhe sua chave de API em repositórios públicos!

### 4️⃣ Verificar a Instalação

```bash
npm run lint
```

Isso executará o TypeScript sem emitir código, verificando se há erros de tipo.

---

## 💻 Executar a Aplicação

### Modo Desenvolvimento (Recomendado para desenvolvimento)

```bash
npm run dev
```

Isso irá:
- Iniciar o servidor Vite na porta **3000**
- Ativar Hot Module Replacement (HMR)
- Abrir automaticamente no navegador
- Recarregar ao detectar mudanças nos arquivos

**Acessar:**
- Local: `http://localhost:3000/`
- Rede: `http://192.168.0.111:3000/` (substitua pelo IP da sua máquina)

### Build para Produção

```bash
npm run build
```

Isso irá:
- Compilar o código TypeScript
- Minificar assets
- Gerar versão otimizada em `dist/`
- Exigir ~30-50MB menos espaço em disco

### Visualizar Build de Produção

```bash
npm run preview
```

Serve a versão de produção localmente para testar antes de fazer deploy.

### Limpar Arquivos de Build

```bash
npm run clean
```

Remove pasta `dist/` e outros arquivos de build para fazer um build limpo.

---

## 📱 Como Usar a Aplicação

### Fluxo de Uso

```
1. Tela Inicial (Home)
   ↓
2. Leitura e Consentimento
   ↓
3. Seleção de Módulo
   ├── Pais
   ├── Professores
   └── Autoavaliação
   ↓
4. Responder Questões (Escala 1-5)
   ↓
5. Análise de Resultados
   └── Ver Dashboard
```

### Passo a Passo

#### 1. **Tela Inicial**
   - Leia a introdução sobre o rastreio
   - Confirme que compreendeu o objetivo

#### 2. **Módulos de Avaliação**
   - Escolha entre: **Pais**, **Professores** ou **Autoavaliação**
   - Cada módulo contém ~15 questões

#### 3. **Questionário**
   - Responda cada questão usando a escala Likert (1-5):
     - **1** = Discordo totalmente
     - **2** = Discordo
     - **3** = Neutro/Não sei
     - **4** = Concordo
     - **5** = Concordo totalmente

#### 4. **Dashboard de Resultados**
   - Visualize os resultados em três dimensões:
     - **Habilidade**: Capacidade intelectual
     - **Criatividade**: Pensamento divergente
     - **Envolvimento**: Motivação e interesse
   - Exporte os dados para análise posterior

---

## 💾 Gerenciar Dados

### Armazenamento Local
Os dados são salvos automaticamente em `LocalStorage`:
- **Chave**: `ahsd_ras_state`
- **Formato**: JSON
- **Persistência**: Até que o usuário limpe o cache do navegador

### Exportar Dados

Clique em "Exportar" no dashboard para baixar um relatório contendo:
- Respostas de todos os módulos
- Pontuações por eixo
- Timestamp da avaliação
- Metadados do rastreio

### Reiniciar Rastreio

Clique em "Reiniciar" para:
- Limpar todas as respostas
- Deletar dados do LocalStorage
- Começar uma nova avaliação
- ⚠️ Ação irreversível!

---

## 🐛 Troubleshooting (Resolução de Problemas)

### Erro: "Cannot find module 'react'"

```bash
# Solução: Reinstalar dependências
rm -rf node_modules
npm install
```

### HMR não funciona

```bash
# Verificar se a porta 3000 está livre
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Usar porta alternativa
npm run dev -- --port 3001
```

### Dados não persistem após fechar navegador

```bash
# Verificar se LocalStorage está habilitado
# Chrome DevTools → Application → Local Storage
```

### Build falha com erro TypeScript

```bash
# Verificar erros de tipo
npm run lint

# Forçar build ignorando erros (não recomendado)
npm run build -- --force
```

### Chave de API Gemini inválida

```bash
# Verificar se .env.local está na raiz do projeto
# Verificar se VITE_GEMINI_API_KEY está configurada
# Reiniciar servidor: Ctrl+C e npm run dev
```

---

## 📊 Estrutura de Dados

### Formato de Respostas (QuizResponse)

```typescript
{
  "pais_hab_1": 4,
  "pais_hab_2": 5,
  "pais_cri_1": 3,
  "pais_env_1": 5,
  "professores_hab_1": 4,
  ...
}
```

### Formato de Resultados

```typescript
{
  "habilidade": 82.5,      // 0-100%
  "criatividade": 78.0,    // 0-100%
  "envolvimento": 90.0     // 0-100%
}
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga o fluxo abaixo:

### 1. Fork o Repositório
```bash
# Clique em "Fork" no GitHub
```

### 2. Criar uma Branch para sua Feature
```bash
git checkout -b feature/minha-feature
```

### 3. Commit suas Mudanças
```bash
git commit -m "feat: descrição clara da mudança"
```

### 4. Push para a Branch
```bash
git push origin feature/minha-feature
```

### 5. Abrir um Pull Request
- Descreva as mudanças em detalhes
- Inclua screenshots se houver mudanças de UI
- Referencie issues relacionadas

### Diretrizes de Código
- Use **TypeScript** para todo novo código
- Siga a estrutura de componentes existentes
- Mantenha componentes pequenos e reutilizáveis
- Escreva comentários claros onde necessário
- Teste localmente antes de fazer commit

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja [LICENSE](LICENSE) para detalhes.

### Resumo da Licença MIT
- ✅ Uso comercial
- ✅ Modificação
- ✅ Distribuição
- ✅ Uso privado
- ❌ Sem responsabilidade
- ❌ Sem garantia

---

## 👨‍💼 Sobre o Projeto

**Desenvolvido por**: [Vagner Santos](https://github.com/vagnersantosifpr)

**Instituição**: Instituto Federal do Paraná (IFPR)

**Propósito**: Ferramenta educacional de código aberto para rastreio de superdotação

---

## ❓ FAQ (Perguntas Frequentes)

### P: A aplicação funciona offline?
**R:** Sim! Após o primeiro carregamento, a aplicação funciona completamente offline. Os dados são salvos localmente.

### P: Posso usar em produção?
**R:** Sim, mas recomenda-se revisão profissional dos critérios de avaliação antes.

### P: Os dados são enviados para servidores?
**R:** Não, por padrão. Os dados ficam apenas no navegador do usuário (LocalStorage).

### P: Qual navegador usar?
**R:** Chrome, Firefox, Safari ou Edge (versões recentes). Não testado em IE.

### P: Posso modificar as questões?
**R:** Sim! Edite o arquivo `types.ts` na constante `QUESTIONNAIRES`.

### P: Como fazer deploy?
**R:** Faça build (`npm run build`) e hospede a pasta `dist/` em qualquer servidor web (Vercel, Netlify, GitHub Pages, etc).

---

## 🔗 Links Úteis

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev)
- [Motion.js Documentation](https://www.framer.com/motion)

---

## 📞 Suporte e Contato

- **Issues**: [GitHub Issues](../../issues)
- **Discussões**: [GitHub Discussions](../../discussions)
- **Email**: Aberto para contribuições e dúvidas

---

## 🎓 Referências Científicas

Este projeto se baseia em modelos de identificação de superdotação:
- Modelo dos Três Anéis de Renzulli
- Teorias de Inteligências Múltiplas (Gardner)
- Escalas de Avaliação de Comportamento Superdotado

---

## 📝 Changelog

### v0.0.0
- ✨ Versão inicial
- 📱 Interface responsiva
- 💾 Armazenamento local
- 📊 Dashboard de resultados

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

**Desenvolvido com ❤️ por [Vagner Santos](https://github.com/vagnersantosifpr)**

</div>
