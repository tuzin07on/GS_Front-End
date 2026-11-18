# Registro de validação

Este arquivo registra verificações realizadas no front-end e no ambiente publicado. Itens marcados como pendentes ainda precisam de validação manual.

## Verificações concluídas

- `npm run build`: concluído sem erros.
- Aplicação publicada na Vercel: deployment em estado READY.
- Página raiz `https://gs-fila-zero-front.vercel.app/`: resposta HTTP 200.
- API `GET /unidades`: HTTP 200; a página local exibiu seis unidades.
- API `GET /servicos`: HTTP 200.
- API `GET /servicos/1/unidades`: HTTP 200.
- API `GET /unidades/2/horarios?data=2026-11-20`: HTTP 200.

## Verificações pendentes

- Fazer inspeção visual em 390×844, 768×1024 e 1440×900.
- Repetir o fluxo completo de cadastro e agendamento com dados de teste controlados.
- Confirmar consulta e cancelamento de um agendamento criado no mesmo fluxo.
- Revisar navegação por teclado e mensagens de erro nos formulários.

Os testes de leitura da API não comprovam, por si só, o funcionamento de todas as operações de escrita. Registre os resultados somente depois de concluir cada fluxo.
