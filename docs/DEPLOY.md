# Publicação do front-end

## Ambiente de produção

- Plataforma: Vercel
- Projeto: `gs-fila-zero-front`
- URL: https://gs-fila-zero-front.vercel.app
- Repositório conectado: https://github.com/tuzin07on/GS_Front-End
- Branch de produção: `main`
- Framework: Vite
- Comando de instalação: `npm install`
- Comando de build: `npm run build`
- Diretório publicado: `dist`

## Variáveis de ambiente

Cadastre as variáveis abaixo nos ambientes Production, Preview e Development do projeto:

| Variável | Uso |
| --- | --- |
| `VITE_API_URL` | URL base da API Java |
| `VITE_CONTACT_EMAIL` | Destino exibido pelo formulário de contato |

Para rodar localmente, copie `.env.example` para `.env.local` e preencha os valores. Não envie `.env.local` ao Git.

As variáveis prefixadas com `VITE_` são incorporadas ao bundle do navegador. Use somente configurações públicas; não armazene senhas, tokens privados ou chaves secretas nelas.

## Nova publicação

Commits enviados à branch `main` podem iniciar uma nova implantação automática pela integração do Vercel com o GitHub. Para validar manualmente antes do envio:

```bash
npm install
npm run build
```

Depois do deploy, abra a URL pública e confirme que a página inicial carrega e que a lista de unidades consegue consultar a API.
