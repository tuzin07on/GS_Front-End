# Fila Zero — Front-End

CitizenTech da Global Solution 2026/2 — FIAP.

O Fila Zero ajuda o cidadão a encontrar unidades de atendimento público, consultar informações e realizar/acompanhar agendamentos.

## Tecnologias

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Fetch API

**Axios não é utilizado.**

## Links do projeto

- Repositório Front-End: https://github.com/tuzin07on/GS_Front-End
- Repositório/API Java: https://github.com/josue-menezes/fila-zero-api
- API publicada: https://fila-zero-api.onrender.com
- Aplicação na Vercel: pendente de publicação
- Vídeo de demonstração no YouTube (até 3 minutos): pendente de gravação pela equipe
- Contato: formulário na rota `/contato`; o destino é configurado por `VITE_CONTACT_EMAIL`.

## Estrutura

```text
src/
├── components/
├── pages/
├── services/
├── types/
├── lib/
├── App.tsx
├── index.css
└── main.tsx
```

## Rotas

- `/` — Home
- `/integrantes` — Integrantes
- `/sobre` — Sobre e ODS
- `/faq` — FAQ
- `/contato` — Formulário
- `/unidades` — Lista via GET `/unidades`
- `/unidades/:id` — Detalhe via GET `/unidades/{id}`
- `/agendar/:idUnidade` — Agendamento via POST
- `/meus-agendamentos` — Consulta e cancelamento via GET/PUT

## Configuração

Crie `.env.local`:

```env
VITE_API_URL=https://fila-zero-api.onrender.com
VITE_CONTACT_EMAIL=
```

A URL da API é `https://fila-zero-api.onrender.com` (projeto Java no Render). Defina `VITE_CONTACT_EMAIL` com a caixa de entrada da equipe para o formulário preparar um e-mail; o navegador abre o aplicativo de e-mail e a pessoa confirma o envio.

## Execução

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Integração

A camada `src/services` concentra as chamadas HTTP. Os tipos em `src/types/api.ts` seguem o contrato camelCase definido na especificação.

Operações implementadas:
- GET `/unidades`
- GET `/unidades/{id}`
- GET `/unidades/{id}/horarios?data=AAAA-MM-DD` (vagas, lotação e horários passados)
- GET `/servicos`
- GET `/servicos/{id}/unidades` (filtra os serviços oferecidos por unidade)
- POST `/cidadaos`
- POST `/cidadaos/{id}/agendamentos`
- GET `/cidadaos/{id}/agendamentos`
- PUT `/agendamentos/{id}`

A identificação do cidadão é mantida localmente pelo código retornado pela API. Não há login real, conforme o escopo.

## Checklist da entrega

- [ ] Preencher URL da API no `.env.local`/Vercel.
- [x] Executar `npm run build` sem erros.
- [x] Configurar a URL pública da API em `.env.local` e `.env.example`.
- [x] Preencher GitHub e LinkedIn dos integrantes em `src/pages/Integrantes.tsx`.
- [x] Configurar `VITE_CONTACT_EMAIL` localmente no `.env.local` (arquivo ignorado pelo Git).
- [ ] Configurar `VITE_CONTACT_EMAIL` no ambiente de produção antes do deploy (não há endpoint de contato na API).
- [x] Mostrar os avatares públicos dos perfis GitHub na página Integrantes.
- [ ] Testar a API pública em aba anônima.
- [ ] Publicar na Vercel.
- [ ] Gravar e publicar vídeo de até 3 minutos no YouTube; todos os integrantes devem participar da gravação.
- [ ] Completar o histórico com pelo menos 5 commits por integrante e 15 no total.
- [ ] Gerar ZIP sem `node_modules` e com até 50 MB.

## Integrantes

- Arthur Cordão — RM 570313 — 1TDSR
- Guilherme Novaes — RM 570444 — 1TDSR
- Jeferson Faria — RM 573038 — 1TDSR
- Josué Menezes — RM 569220 — 1TDSR

## Observação

O projeto foi estruturado conforme `GS_FilaZero_Especificacao.pdf` e os critérios de Front-End Design Engineering da Global Solution 2026/2. Não foram adicionados endpoints fora do contrato da API.

