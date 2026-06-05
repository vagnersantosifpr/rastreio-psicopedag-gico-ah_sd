import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface TestInfo {
  valid: boolean;
  invitationId?: string;
  sessionId?: string;
  role?: 'PARENT' | 'TEACHER' | 'STUDENT';
  studentName?: string;
  error?: string;
}

export function RespondTest() {
  const { token } = useParams<{ token: string }>(); // Pega o token da URL
  const [loading, setLoading] = useState(true);
  const [testInfo, setTestInfo] = useState<TestInfo | null>(null);
  const [consent, setConsent] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    // Busca a validação do token no Back-end ao carregar a página
    fetch(`http://localhost:3001/api/test/validate/${token}`)
      .then((res) => res.json())
      .then((data) => {
        setTestInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setTestInfo({ valid: false, error: 'Erro ao conectar ao servidor.' });
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Você precisa aceitar os termos da LGPD para continuar.');
      return;
    }

    const payload = {
      sessionId: testInfo?.sessionId,
      invitationId: testInfo?.invitationId,
      role: testInfo?.role,
      consentAccepted: consent,
      answersData: answers, // Objeto JSON contendo as notas
    };

    try {
      const response = await fetch('http://localhost:3001/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert('Respostas salvas! Muito obrigado por contribuir.');
      } else {
        alert(result.error);
      }
    } catch {
      alert('Ocorreu um erro ao enviar as respostas.');
    }
  };

  if (loading) return <p className="p-8 text-center">Carregando formulário seguro...</p>;

  if (testInfo && !testInfo.valid) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-red-700 font-bold text-lg mb-2">Acesso Negado</h2>
        <p className="text-red-600">{testInfo.error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
      <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase block mb-1">
        Mapeamento AH/SD ({testInfo?.role})
      </span>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Sondagem de {testInfo?.studentName}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Termo de Consentimento LGPD */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Os dados coletados neste rastreio destinam-se exclusivamente para fins de
            sondagem psicopedagógica e não serão compartilhados publicamente.
          </p>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            />
            <span className="text-sm font-medium text-gray-700">
              Aceito os termos de consentimento e LGPD.
            </span>
          </label>
        </div>

        {/* Exemplo de Pergunta Prática do Teste */}
        <div className="space-y-4">
          <p className="text-gray-700 font-medium">
            1. Encontra usos incomuns para objetos do dia a dia?
          </p>
          <div className="flex justify-between max-w-sm">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name="q1"
                  value={num}
                  onChange={() => setAnswers({ ...answers, q1: num })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-gray-500 mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Enviar Respostas
        </button>
      </form>
    </div>
  );
}