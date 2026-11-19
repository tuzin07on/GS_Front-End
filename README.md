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
- Aplicação publicada na Vercel: https://gs-fila-zero-front.vercel.app
- Vídeo de demonstração no YouTube (até 3 minutos): https://youtu.be/5EeyktJ0Lx8
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
VITE_CONTACT_EMAIL=seu-email@exemplo.com
```

A variável `VITE_API_URL` aponta para a API Java publicada no Render. Configure `VITE_CONTACT_EMAIL` com a caixa que receberá as mensagens; o formulário abre o aplicativo de e-mail da pessoa para confirmar o envio. Variáveis `VITE_*` são incluídas no código do front-end, então não coloque segredos nelas.

## Execução

```bash
npm install
npm run dev
```

Build de produção:

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

## Recursos de usabilidade e acessibilidade

- Busca de unidades por nome, bairro ou cidade (sem diferenciar acentos).
- Máscaras de CPF e celular no cadastro; a API recebe só os dígitos.
- Documentos necessários e duração do serviço exibidos antes de confirmar, com resumo do agendamento.
- Código do cidadão exibido após o primeiro agendamento, com opção de trocar o código salvo no aparelho.
- Link "Pular para o conteúdo" para quem navega por teclado, título da aba por página e menu mobile indicando a página atual.

## Documentação complementar

- [Configuração e deploy na Vercel](docs/DEPLOY.md)
- [Registro de validação e pendências](docs/VALIDACAO.md)
- [Fluxo de contribuição por etapas](docs/CONTRIBUICAO.md)

## Checklist da entrega

- [x] Configurar `VITE_API_URL` e `VITE_CONTACT_EMAIL` no projeto Vercel.
- [x] Executar `npm run build` sem erros.
- [x] Preencher GitHub e LinkedIn dos integrantes em `src/pages/Integrantes.tsx`.
- [x] Mostrar os avatares públicos dos perfis GitHub na página Integrantes.
- [x] Confirmar os GETs públicos de unidades, serviços e horários disponíveis (HTTP 200).
- [x] Publicar o site na Vercel e confirmar resposta HTTP 200.
- [x] Gerar o ZIP sem `node_modules` e com menos de 50 MB.
- [x] Validar visualmente nos tamanhos 390×844, 768×1024 e 1440×900 (10 rotas, sem rolagem horizontal).
- [ ] Gravar e publicar vídeo de até 3 minutos no YouTube; todos os integrantes devem participar da gravação.
- [ ] Completar o histórico com pelo menos 5 commits por integrante e 15 no total; esta sequência registra as cinco etapas de Arthur e o histórico do restante da equipe ainda precisa ser conferido.

## Integrantes

- Arthur Cordão — RM 570313 — 1TDSR
- Guilherme Novaes — RM 570444 — 1TDSR
- Jefferson Faria — RM 573038 — 1TDSR
- Josué Menezes — RM 569220 — 1TDSR

## Observação

O projeto foi estruturado conforme `GS_FilaZero_Especificacao.pdf` e os critérios de Front-End Design Engineering da Global Solution 2026/2. Não foram adicionados endpoints fora do contrato da API.
