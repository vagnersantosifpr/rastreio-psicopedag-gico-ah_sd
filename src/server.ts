import express from 'express';
import cors from 'cors';
import { prisma } from './db';

const app = express();
app.use(cors()); // Permite que o React (que roda em outra porta) acesse a API
app.use(express.json());

const PORT = process.env.PORT || 3001;

/**
 * ROTA 1: Validar o token que veio da URL
 * Usada quando o pai ou professor clica no link enviado
 */
app.get('/api/test/validate/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: {
        session: {
          include: {
            student: true
          }
        }
      }
    });

    if (!invitation) {
      return res.status(404).json({ valid: false, error: 'Link de teste não encontrado.' });
    }

    if (invitation.status === 'COMPLETED') {
      return res.status(400).json({ valid: false, error: 'Este link já foi utilizado para responder ao teste.' });
    }

    const isExpired = new Date(invitation.expiresAt) < new Date();
    if (isExpired) {
      return res.status(400).json({ valid: false, error: 'Este link de acesso expirou.' });
    }

    // Retorna os dados seguros para o React montar a tela personalizada
    return res.json({
      valid: true,
      invitationId: invitation.id,
      sessionId: invitation.sessionId,
      role: invitation.role,
      studentName: invitation.session.student.fullName
    });

  } catch (error) {
    console.error('Erro na validação do token:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

/**
 * ROTA 2: Receber as respostas do teste
 */
app.post('/api/test/submit', async (req, res) => {
  const { sessionId, invitationId, role, consentAccepted, answersData } = req.body;

  try {
    // 1. Grava as respostas usando transação para garantir consistência
    await prisma.$transaction(async (tx) => {
      
      // Cria o registro na tabela de respostas (JSON)
      await tx.response.create({
        data: {
          sessionId,
          invitationId,
          role,
          consentAccepted,
          answersData // O JSON com os Likert 1-5 e desafios
        }
      });

      // Atualiza o convite do ator correspondente para completo
      await tx.invitation.update({
        where: { id: invitationId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date()
        }
      });

      // Busca todas as respostas daquela sessão para verificar se o teste geral acabou
      const responsesCount = await tx.response.count({
        where: { sessionId }
      });

      // Se já temos as 3 respostas (Pai, Professor, Aluno), marca a sessão como completa
      let sessionStatus: 'PENDING' | 'PARTIAL' | 'COMPLETED' = 'PARTIAL';
      if (responsesCount === 3) {
        sessionStatus = 'COMPLETED';
      }

      await tx.assessmentSession.update({
        where: { id: sessionId },
        data: {
          status: sessionStatus,
          updatedAt: new Date()
        }
      });
    });

    return res.json({ success: true, message: 'Respostas salvas com sucesso!' });

  } catch (error) {
    console.error('Erro ao salvar respostas:', error);
    return res.status(500).json({ error: 'Erro ao processar as respostas.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Back-end rodando na porta http://localhost:${PORT}`);
});