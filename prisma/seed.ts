import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

// 1. Criar o Pool de conexões do driver PostgreSQL nativo
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Instanciar o adaptador exigido pelo Prisma 7
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando a carga inicial de dados (Seed)...');

  // 1. Cria o Psicopedagogo (Você)
  const professional = await prisma.professional.upsert({
    where: { email: 'contato@seusite.com.br' },
    update: {},
    create: {
      name: 'Vagner Santos',
      email: 'contato@seusite.com.br',
    },
  });

  // 2. Cria um Aluno de Teste vinculado a você
  const student = await prisma.student.create({
    data: {
      professionalId: professional.id,
      fullName: 'Joãozinho Silva (Paciente Teste)',
      dateOfBirth: new Date('2012-05-15'),
      schoolName: 'Escola Municipal de Testes',
      grade: '6º Ano',
    },
  });

  console.log('✅ Carga inicial concluída com sucesso!');
  console.log(`Profissional criado com ID: ${professional.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Fecha as conexões do pool para que o script finalize limpo

  });
