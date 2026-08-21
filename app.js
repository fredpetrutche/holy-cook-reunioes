/* ═══════════════════════════════════════════════════════════════════════
   Comum às duas páginas: conexão com o banco, datas, componentes de ação e
   as grades de card. Cada página define o seu próprio redesenhar(), que o
   salvar() chama depois de gravar, e chama iniciar() no fim.
   ═══════════════════════════════════════════════════════════════════════ */

/* ═══ CONFIG ══════════════════════════════════════════════════════════════
   Projeto Supabase que guarda só o estado das ações desta página.
   A chave abaixo é a `anon` — pública por natureza. O projeto para o qual
   ela aponta NÃO contém nenhum dado pessoal: só a tabela `hc_acoes`.
   ════════════════════════════════════════════════════════════════════════ */
const SUPABASE_URL  = "https://mkajvxyiyqxotiydkylq.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYWp2eHlpeXF4b3RpeWRreWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NTgzNzcsImV4cCI6MjEwMjAzNDM3N30.vfHCb8BRcshufnp_7eAt9ch4aVEMpcbVA5u16IS0Kao";
const TABELA = "hc_acoes";

/* ═══ SINCRONIZAÇÃO ═══════════════════════════════════════════════════════ */

let remoto = {};              // id -> {feita, prazo, atualizado_por, atualizado_em}
let salvando = new Set();     // ids com gravação em voo
let cliente = null;
let modoPolling = false;

const identInput = document.getElementById("ident");
const identField = document.getElementById("ident-field");
identInput.value = localStorage.getItem("hc-quem") || "";
identField.classList.toggle("vazio", !identInput.value.trim());
identInput.addEventListener("input", () => {
  localStorage.setItem("hc-quem", identInput.value.trim());
  identField.classList.toggle("vazio", !identInput.value.trim());
});
const quemSou = () => identInput.value.trim() || null;

function conexao(estado, texto) {
  const c = document.getElementById("conn");
  c.className = "conn " + estado;
  document.getElementById("conn-txt").textContent = texto;
}

function mostrarErro(msg) {
  const e = document.getElementById("erro");
  document.getElementById("erro-txt").textContent = msg;
  e.classList.add("on");
  clearTimeout(mostrarErro._t);
  mostrarErro._t = setTimeout(() => e.classList.remove("on"), 6000);
}

const headers = () => ({
  "apikey": SUPABASE_ANON,
  "Authorization": "Bearer " + SUPABASE_ANON,
  "Content-Type": "application/json"
});

async function buscarTudo() {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + TABELA + "?select=*", { headers: headers() });
  if (!r.ok) throw new Error("HTTP " + r.status);
  const linhas = await r.json();
  remoto = {};
  linhas.forEach(l => { remoto[l.id] = l; });
}

async function salvar(id, patch) {
  const anterior = remoto[id] ? { ...remoto[id] } : null;

  // otimista: aplica na hora, desfaz se falhar
  remoto[id] = Object.assign({ id: id, feita: false, prazo: null }, remoto[id], patch, {
    atualizado_por: quemSou(),
    atualizado_em: new Date().toISOString()
  });
  salvando.add(id);
  redesenhar();

  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/" + TABELA, {
      method: "POST",
      headers: Object.assign(headers(), { "Prefer": "resolution=merge-duplicates,return=representation" }),
      body: JSON.stringify([{
        id: id,
        feita: remoto[id].feita,
        prazo: remoto[id].prazo,
        atualizado_por: quemSou()
      }])
    });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const [linha] = await r.json();
    if (linha) remoto[id] = linha;
  } catch (e) {
    if (anterior) remoto[id] = anterior; else delete remoto[id];
    mostrarErro("Não consegui salvar. Verifique a conexão e tente de novo.");
  } finally {
    salvando.delete(id);
    redesenhar();
  }
}

async function iniciar() {
  try {
    await buscarTudo();
    conexao("on", "ao vivo");
    redesenhar();
  } catch (e) {
    conexao("off", "sem conexão");
    mostrarErro("Não consegui carregar os dados.");
    redesenhar();
    setTimeout(iniciar, 5000);
    return;
  }

  if (window.supabase && window.supabase.createClient) {
    cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    cliente.channel("hc-acoes")
      .on("postgres_changes", { event: "*", schema: "public", table: TABELA }, payload => {
        if (payload.new && payload.new.id) {
          if (salvando.has(payload.new.id)) return;   // não atropela gravação própria
          remoto[payload.new.id] = payload.new;
          redesenhar();
        }
      })
      .subscribe(status => {
        if (status === "SUBSCRIBED") conexao("on", "ao vivo");
        else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") ativarPolling();
      });
  } else {
    ativarPolling();
  }

  // rede de segurança: recarrega ao voltar para a aba
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) buscarTudo().then(redesenhar).catch(() => {});
  });
}

function ativarPolling() {
  if (modoPolling) return;
  modoPolling = true;
  conexao("slow", "atualiza a cada 5s");
  setInterval(() => {
    buscarTudo().then(redesenhar).catch(() => conexao("off", "sem conexão"));
  }, 5000);
}

/* estado efetivo de uma ação = o que está no banco por cima do que veio da ata */
const viva = a => {
  const r = remoto[a.id];
  return {
    ...a,
    feita: r ? !!r.feita : false,
    prazo: (r && r.prazo) || a.prazo,
    quem: r ? r.atualizado_por : null,
    quando: r ? r.atualizado_em : null,
    salvando: salvando.has(a.id)
  };
};
const acoesDe = p => p.acoes.map(viva);

/* ═══ DATAS ═══════════════════════════════════════════════════════════════ */

const MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
const DIAS_SEMANA = ["dom","seg","ter","qua","qui","sex","sáb"];

const parseDate = iso => { const [y,m,d] = iso.split("-").map(Number); return new Date(y, m-1, d); };
const hoje = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
const fmtCurto = iso => { const d = parseDate(iso); return String(d.getDate()).padStart(2,"0") + "/" + String(d.getMonth()+1).padStart(2,"0"); };
const fmtLongo = iso => { const d = parseDate(iso); return String(d.getDate()).padStart(2,"0") + " " + MESES[d.getMonth()] + " · " + DIAS_SEMANA[d.getDay()]; };
const diasAte = iso => Math.round((parseDate(iso) - hoje()) / 86400000);

function severidade(iso) {
  if (!iso) return "idle";
  const d = diasAte(iso);
  if (d < 0) return "late";
  if (d <= 14) return "warn";
  return "ok";
}
function textoPrazo(iso) {
  const d = diasAte(iso);
  if (d < 0) return "há " + Math.abs(d) + (Math.abs(d) === 1 ? " dia" : " dias");
  if (d === 0) return "hoje";
  if (d === 1) return "amanhã";
  return "em " + d + " dias";
}
function desde(ts) {
  const min = Math.round((Date.now() - new Date(ts).getTime()) / 60000);
  if (min < 1) return "agora";
  if (min < 60) return "há " + min + " min";
  const h = Math.round(min / 60);
  if (h < 24) return "há " + h + "h";
  const d = Math.round(h / 24);
  return "há " + d + (d === 1 ? " dia" : " dias");
}

function proximaAcao(p) {
  const abertas = acoesDe(p).map((a, i) => ({ a, i })).filter(x => !x.a.feita);
  if (!abertas.length) return null;
  const peso = x => x.a.status === "bloqueia" ? -1e6 : (x.a.prazo ? diasAte(x.a.prazo) : 1e5);
  abertas.sort((x, y) => (peso(x) - peso(y)) || (x.i - y.i));
  return abertas[0].a;
}

function el(tag, cls, txt) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (txt != null) n.textContent = txt;
  return n;
}

/* ═══ COMPONENTES ═════════════════════════════════════════════════════════ */

function campoData(a) {
  const cell = el("div", "prazo-cell");

  const wrap = el("label", "dateedit" + (a.prazo ? "" : " empty"));
  const input = document.createElement("input");
  input.type = "date";
  input.value = a.prazo || "";
  input.setAttribute("aria-label", "Prazo de: " + a.o);
  input.addEventListener("change", () => salvar(a.id, { prazo: input.value || null }));
  input.addEventListener("click", e => e.stopPropagation());
  wrap.append(input);
  cell.append(wrap);

  if (!a.prazo && a.prazoTxt) cell.append(el("span", "prazo-hint", a.prazoTxt));
  if (a.prazo) {
    const sev = a.feita ? "ok" : severidade(a.prazo);
    cell.append(el("span", "chip " + sev, a.feita ? "Feita" : textoPrazo(a.prazo)));
  } else if (a.status === "bloqueia" && !a.feita) {
    cell.append(el("span", "chip late", "Bloqueia"));
  }
  return cell;
}

function listaAcoes(acoes) {
  const box = el("div", "acoes");

  acoes.forEach(a => {
    const row = el("div", "acao"
      + (a.feita ? " feita" : "")
      + (a.status === "bloqueia" ? " bloqueia" : "")
      + (a.salvando ? " salvando" : ""));

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "acao-check";
    cb.checked = a.feita;
    cb.setAttribute("aria-label", "Marcar como feita: " + a.o);
    cb.addEventListener("change", () => salvar(a.id, { feita: cb.checked }));
    row.append(cb);

    row.append(el("div", "acao-txt", a.o));

    if (a.link) {
      const l = el("a", "acao-link", (a.linkTxt || "Abrir") + " →");
      l.href = a.link;
      l.target = "_blank";
      l.rel = "noopener noreferrer";
      l.addEventListener("click", e => e.stopPropagation());
      row.append(l);
    }

    const meta = el("div", "acao-meta");
    meta.append(campoData(a));
    if (a.quando) {
      const quem = a.quem ? a.quem : "alguém";
      meta.append(el("div", "acao-quem", "por " + quem + " · " + desde(a.quando)));
    }
    row.append(meta);

    box.append(row);
  });

  return box;
}

/* ═══ NAVEGAÇÃO EM CARD ═══════════════════════════════════════════════════
   Nenhuma tela comprida: cada nível é uma grade de cards e só o card aberto
   mostra o conteúdo. O que está aberto vive aqui fora, e não no DOM, porque
   redesenhar() reconstrói o diálogo inteiro a cada mudança vinda do banco.
   ════════════════════════════════════════════════════════════════════════ */

const uiAberto = {};
const estaAberto = (chave, id) => uiAberto[chave] === id;
function alternar(chave, id) {
  uiAberto[chave] = uiAberto[chave] === id ? null : id;
  redesenhar();
}

/* raiz do site vista pela página atual: "" na home, "../" numa subpágina */
let RAIZ = "";

/* grade de produtos de um projeto: card → foto, o que já está definido e o
   que o teste ainda tem de responder */
function gradeProdutos(p) {
  const nivel = el("div", "nivel");
  const chave = "produto:" + p.id;

  const grade = el("div", "grade-itens");
  p.produtos.forEach(pr => {
    const b = el("button", "item-btn" + (estaAberto(chave, pr.id) ? " on" : ""));
    b.type = "button";
    const capa = el("span", "item-capa" + (pr.foto ? "" : " vazia"));
    if (pr.foto) {
      const img = document.createElement("img");
      img.src = RAIZ + pr.foto;
      img.alt = "";
      img.loading = "lazy";
      capa.append(img);
    } else {
      capa.append(el("span", "item-capa-txt", "sem foto"));
    }
    b.append(capa);
    b.append(el("span", "item-nome-btn", pr.nome));
    if (pr.tag) b.append(el("span", "item-tag", pr.tag));
    b.addEventListener("click", () => alternar(chave, pr.id));
    grade.append(b);
  });
  nivel.append(grade);

  const pr = p.produtos.find(x => estaAberto(chave, x.id));
  if (!pr) return nivel;

  const painel = el("div", "item-visor");
  painel.append(el("div", "item-titulo", pr.nome));

  if (pr.foto) {
    const fig = el("figure", "item-foto");
    const img = document.createElement("img");
    img.src = RAIZ + pr.foto;
    img.alt = "Referência de " + pr.nome;
    fig.append(img);
    if (pr.fotoFonte) fig.append(el("figcaption", null, pr.fotoFonte));
    painel.append(fig);
  } else if (pr.fotoFonte) {
    painel.append(el("p", "item-semfoto", pr.fotoFonte));
  }

  if (pr.base) painel.append(el("p", "item-base", pr.base));
  if (pr.ref) {
    const link = el("a", "item-ref", "Ver a referência no Instagram →");
    link.href = pr.ref;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    painel.append(link);
  }

  painel.append(el("span", "visor-rot", "A responder no teste"));
  const ul = el("ul", "openlist");
  pr.perguntas.forEach(q => ul.append(el("li", null, q)));
  painel.append(ul);

  nivel.append(painel);
  return nivel;
}

/* ações em grupos: abre no grupo da próxima ação, um grupo por vez */
function acoesEmGrupos(p) {
  const acoes = acoesDe(p);
  const nomes = [];
  acoes.forEach(a => { if (a.grupo && nomes.indexOf(a.grupo) < 0) nomes.push(a.grupo); });
  if (nomes.length < 2) return listaAcoes(acoes);

  const chave = "grupo-acao:" + p.id;
  if (!(chave in uiAberto)) {
    const prox = proximaAcao(p);
    uiAberto[chave] = prox && prox.grupo ? prox.grupo : nomes[0];
  }

  const nivel = el("div", "nivel");
  const grade = el("div", "grade-grupos");

  nomes.forEach(n => {
    const doGrupo = acoes.filter(a => a.grupo === n);
    const feitas = doGrupo.filter(a => a.feita).length;
    const trava = doGrupo.some(a => !a.feita && a.status === "bloqueia");

    const b = el("button", "grupo-btn" + (estaAberto(chave, n) ? " on" : ""));
    b.type = "button";
    b.append(el("span", "grupo-nome", n));
    const meta = el("div", "grupo-meta");
    meta.append(el("span", "grupo-cont", feitas + "/" + doGrupo.length));
    if (feitas === doGrupo.length)  meta.append(el("span", "chip ok", "Feito"));
    else if (trava)                 meta.append(el("span", "chip late", "Bloqueia"));
    else {
      const comData = doGrupo.filter(a => !a.feita && a.prazo).sort((x, y) => x.prazo < y.prazo ? -1 : 1)[0];
      if (comData) meta.append(el("span", "chip " + severidade(comData.prazo), fmtCurto(comData.prazo)));
    }
    b.append(meta);
    b.addEventListener("click", () => alternar(chave, n));
    grade.append(b);
  });
  nivel.append(grade);

  const aberto = nomes.find(n => estaAberto(chave, n));
  if (aberto) {
    const visor = el("div", "grupo-visor");
    visor.append(listaAcoes(acoes.filter(a => a.grupo === aberto)));
    nivel.append(visor);
  }
  return nivel;
}
