# Reuniões Holy Cook

Página das reuniões e projetos da Holy Cook. Cada projeto é um card; ao abrir,
mostra o que foi falado sobre ele, as ações com prazo e o que ficou em aberto.
A ata completa de cada reunião fica na seção "Reuniões".

**No ar:** https://fredpetrutche.github.io/holy-cook-reunioes/

## Como funciona

A página é montada a partir de arquivos compartilhados, para as duas páginas
nunca divergirem:

| arquivo | o que tem |
|---|---|
| `dados.js` | `REUNIOES` e `PROJETOS` — todo o texto das atas, projetos e ações |
| `app.js` | conexão com o banco, datas, componentes de ação e as grades de card |
| `base.css` | estilos comuns |
| `index.html` + `render-home.js` | a home: cards de projeto, lista de reuniões, diálogo |
| `cardapio-verao/index.html` | a página do projeto Cardápio de Verão, em abas |
| `cardapio-verao/fotos/` | referências de produto: capa do reel (`og:image`), foto do cardápio digital ou modelo de mercado |

Cada página define o seu próprio `redesenhar()` — o `salvar()` do `app.js`
chama esse nome depois de gravar — e chama `iniciar()` no fim.

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

## Campos que mudam o layout do diálogo

- **`grupo`** numa ação: as ações passam a ser exibidas em cards de frente
  (um por grupo), abrindo um de cada vez — nunca uma lista comprida. Com
  menos de dois grupos distintos, cai de volta na lista simples.
- **`produtos`** no projeto: grade de cards com foto. Cada produto aceita
  `tag` (conservação), `base` (o que já está definido), `ref` (link externo),
  `foto`, `fotoFonte` e `perguntas`. O caminho de `foto` é **a partir da raiz
  do site** — cada página ajusta `RAIZ` (`""` na home, `"../"` na subpágina),
  senão a mesma grade quebra quando aparece dentro de uma ata.
- **`produtosDe: "<id do projeto>"`** numa seção de ata: insere ali a grade de
  produtos daquele projeto, em vez de repetir a lista dentro do texto.
- **`link` + `linkTxt`** numa ação: vira um botão para onde o trabalho
  acontece de verdade (ex.: o laboratório de CMV, no Sistema HC).
- **`pagina: "<pasta>/"`** no projeto: o card da home passa a abrir essa
  página em vez do diálogo. É o caminho quando o projeto tem informação
  demais para caber num pop-up.

Nenhum dos dois usa o atributo `hidden` — o nível fechado simplesmente não é
construído. O que está aberto vive em `uiAberto`, fora do DOM, porque
`redesenhar()` reconstrói o diálogo inteiro a cada mudança vinda do banco.

## Banco

Migration em `supabase/migrations/`. Para aplicar num projeto novo:

```bash
supabase link --project-ref <ref>
supabase db push --linked
```
