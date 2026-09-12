# Meteor Mayhem — migração para Vite/JavaScript

Esta versão migra o HTML monolítico para um projeto Vite com JavaScript ES Modules.

## Rodar

```bash
npm install
npm run dev
```

Para produção:

```bash
npm run build
```

## Persistência

O jogo não usa mais `window.storage`. O código chama `src/storage.js`, que hoje mantém compatibilidade imediata com `localStorage` e deixa o projeto preparado para Supabase.

O ranking continuará local até o backend Supabase ser configurado. O próximo passo é ligar as operações de jogador/ranking ao banco e validar pontuação no servidor.

## Estrutura

- `index.html`: somente a estrutura da interface
- `src/styles.css`: estilos
- `src/main.js`: lógica original do jogo
- `src/storage.js`: camada de persistência
- `src/supabase.js`: cliente Supabase opcional
- `supabase/schema.sql`: base para o backend
- `legacy/meteor-mayhem-5.html`: backup original
