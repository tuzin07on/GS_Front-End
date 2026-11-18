# ESPECIFICACAO — Fila Zero Front

## Fonte de verdade

Este front segue a especificação `GS_FilaZero_Especificacao.pdf`.

## Regras preservadas no front

- RN01: horário lotado é validado pela API.
- RN02: oferta da unidade é validada pela API.
- RN03: futuro, horário de funcionamento e horário cheio ou :30 são validados pela API.
- RN04: duplicidade de agendamento é validada pela API.
- RN05: cancelamento até 2 horas antes é validado pela API.
- RN06: status final não pode ser alterado, validado pela API.
- RN07: exclusões com agendamentos são tratadas pela API.

## Convenções

- Java/TypeScript/JSON: camelCase.
- Datas: ISO 8601.
- Requisições: Fetch API.
- URL da API: `VITE_API_URL`.
- Termos oficiais: cidadão, unidade, serviço, oferta, atendente, agendamento, status, guichê.

## Escopo de telas

Institucionais:
- Home
- Integrantes
- Sobre
- FAQ
- Contato

Solução:
- Unidades
- Detalhe da unidade
- Agendamento
- Meus agendamentos

## Estados obrigatórios

Telas que consomem API possuem loading, erro e estado vazio.

Formulários possuem validação antes do envio, mensagens de erro/sucesso e feedback da API.

## Responsividade

Alvo de teste:
- 390×844
- 768×1024
- 1440×900

Sem rolagem horizontal.

## Integrantes

Arthur Cordão — 570313 — 1TDSR  
Guilherme Novaes — 570444 — 1TDSR  
Jeferson Faria — 573038 — 1TDSR  
Josué Menezes — 569220 — 1TDSR

