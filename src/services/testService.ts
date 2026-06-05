import { supabase } from '../lib/supabaseClient';

/**
 * 1. Valida se o token que veio da URL existe no banco e não expirou
 */
export async function validateToken(token: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select(`
      id,
      role,
      status,
      expires_at,
      session:session_id (
        id,
        student:student_id (
          full_name
        )
      )
    `)
    .eq('token', token)
    .single();

  if (error || !data) {
    return { valid: false, error: 'Token inválido ou não encontrado.' };
  }

  // Verifica se o token já foi usado
  if (data.status === 'completed') {
    return { valid: false, error: 'Este link já foi utilizado para responder ao teste.' };
  }

  // Verifica se o token expirou
  const isExpired = new Date(data.expires_at) < new Date();
  if (isExpired) {
    return { valid: false, error: 'Este link expirou. Solicite um novo reenvio.' };
  }

  return {
    valid: true,
    invitationId: data.id,
    sessionId: data.session[0].id,
    role: data.role,
    studentName: data.session[0].student[0].full_name
  };
}

/**
 * 2. Envia as respostas finais e atualiza o status do convite
 */
export async function submitTestResponse({
  sessionId,
  invitationId,
  role,
  consentAccepted,
  answersData
}: {
  sessionId: string;
  invitationId: string;
  role: string;
  consentAccepted: boolean;
  answersData: Record<string, any>;
}) {
  
  // A. Salva a resposta na tabela de Respostas
  const { error: responseError } = await supabase
    .from('responses')
    .insert({
      session_id: sessionId,
      invitation_id: invitationId,
      role: role,
      consent_accepted: consentAccepted,
      answers_data: answersData
    });

  if (responseError) {
    console.error('Erro ao salvar resposta:', responseError);
    throw new Error('Falha ao enviar respostas do formulário.');
  }

  // B. Atualiza o status do convite na tabela de Convites para "completed"
  const { error: inviteError } = await supabase
    .from('invitations')
    .update({ 
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('id', invitationId);

  if (inviteError) {
    console.error('Erro ao atualizar status do convite:', inviteError);
  }

  // C. Verifica se o teste geral agora está completo (parcial vs concluído)
  // Nota: Isso pode ser feito via uma Edge Function do Supabase ou disparando
  // uma verificação no frontend.
  await updateSessionStatus(sessionId);

  return { success: true };
}

/**
 * 3. Auxiliar: Atualiza o status da sessão principal
 */
async function updateSessionStatus(sessionId: string) {
  // Conta quantas respostas foram concluídas para essa sessão
  const { data: responses, error } = await supabase
    .from('responses')
    .select('id')
    .eq('session_id', sessionId);

  if (error || !responses) return;

  const totalResponses = responses.length;
  let newStatus = 'pending';

  if (totalResponses === 3) {
    newStatus = 'completed';
  } else if (totalResponses > 0) {
    newStatus = 'partial';
  }

  // Atualiza a tabela principal
  await supabase
    .from('assessment_sessions')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', sessionId);
}