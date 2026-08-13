# Reuniões Holy Cook

Página das reuniões e projetos da Holy Cook. Cada projeto é um card; ao abrir,
mostra o que foi falado sobre ele, as ações com prazo e o que ficou em aberto.
A ata completa de cada reunião fica na seção "Reuniões".

**No ar:** https://fredpetrutche.github.io/holy-cook-reunioes/

## Como funciona

`index.html` é a página inteira — texto das atas, projetos e ações ficam nele.
Só o **estado de uso** (ação marcada como feita e prazo definido) vai para o
Supabase, na tabela `hc_acoes`, e sincroniza entre todo mundo em tempo real.

A chave `anon` do Supabase está no HTML. Isso é esperado: ela é pública por
natureza e o projeto para o qual ela aponta **contém apenas a tabela
`hc_acoes`** — nenhum dado pessoal ou financeiro. A RLS permite ler, inserir e
atualizar; não permite apagar linhas.

⚠️ **Qualquer pessoa com o link pode editar.** Foi uma decisão consciente para
o time não precisar de login. Se algum dia precisar de trava, o caminho é uma
policy de RLS com um código compartilhado.

## Registrar uma nova reunião

Tudo dentro de `index.html`, no bloco `DADOS DA ATA`:

1. Em `REUNIOES`, acrescente um objeto com `data`, `titulo`, `participantes`,
   `ausentes` e `ata` — a ata dividida por assunto. A seção que trata de um
   projeto leva `projetoId` para ligar ao card.
2. Em `PROJETOS`, acrescente as ações novas no projeto correspondente, com
   `reuniao` apontando para o id da reunião.

O `id` de cada ação é a chave que liga a linha do banco à ação certa —
**nunca reaproveite nem renomeie um id existente**, senão a marcação de feito
vai parar na ação errada.

## Banco

Migration em `supabase/migrations/`. Para aplicar num projeto novo:

```bash
supabase link --project-ref <ref>
supabase db push --linked
```
