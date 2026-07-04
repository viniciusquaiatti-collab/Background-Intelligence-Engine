# Feature workflow

Cada nova feature deve nascer com estes itens prontos:

1. Codigo da feature no escopo correto.
2. Teste automatizado cobrindo o comportamento principal.
3. Debug claro com logs ou mensagens objetivas quando fizer sentido.
4. Request no Insomnia para validar o fluxo HTTP manualmente.
5. Commit pequeno seguindo Conventional Commits.

Antes do commit, rode:

```bash
npm run lint
npm test
npm run build
```
