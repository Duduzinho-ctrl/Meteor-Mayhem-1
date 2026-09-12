# Meteor Mayhem — publicação mobile

## Antes de publicar
1. Crie o projeto Supabase e execute `supabase/schema.sql`.
2. Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
3. Rode `npm install` e `npm run build`.
4. Teste o ranking em dois navegadores/dispositivos diferentes.
5. Para Android: `npm run cap:add:android` (uma vez), depois `npm run cap:sync` e `npm run cap:open:android`.
6. Para iOS: `npm run cap:add:ios` (uma vez), depois `npm run cap:sync` e `npm run cap:open:ios` em um Mac com Xcode.

## Importante sobre o ranking
O ranking online agora usa Supabase quando as variáveis de ambiente estão configuradas; localStorage fica como fallback. A versão atual é funcional, mas a escrita pública ainda pode ser fraudada por alguém com conhecimento técnico. Antes de uma competição grande, mova a validação de pontuação para uma Edge Function/RPC no servidor.

## Publicação
- Android: gere um Android App Bundle (`.aab`) assinado no Android Studio e envie pelo Google Play Console.
- iOS: faça Archive/Distribute no Xcode e envie o build para o App Store Connect; depois selecione o build e envie para App Review.

## Conta
Como a conta de desenvolvedor/identidade do publicador envolve requisitos de idade e verificação, um responsável adulto deve ser o titular da conta e fazer as etapas de cadastro/assinatura necessárias. Não tente contornar verificações de idade ou identidade.
