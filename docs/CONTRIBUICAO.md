# Fluxo de contribuição

O histórico deve mostrar alterações reais do projeto, com cada integrante usando a própria conta GitHub. Isso mantém a autoria correta e facilita a conferência da participação individual.

## Criar um passo em branch

Use uma branch por etapa e faça nela um commit pequeno, relacionado ao conteúdo alterado:

```bash
git switch main
git pull
git switch -c STEP-1
# editar arquivos e revisar o diff
git add caminho/do/arquivo
git commit -m "descreve a alteração realizada"
git push -u origin STEP-1
```

Para uma nova etapa, abra uma branch sequencial a partir da branch atualizada, por exemplo `STEP-2`, e mantenha cada commit ligado a uma mudança verificável.

## Integrar ao projeto

Abra um Pull Request da branch de etapa para `main`, revise o diff e faça o merge após a validação. Repita o processo para as próximas etapas. Evite commits vazios, alterações apenas cosméticas sem propósito e commits feitos em nome de outro integrante.

Depois do merge, confira se a integração automática da Vercel terminou o deploy de produção.
