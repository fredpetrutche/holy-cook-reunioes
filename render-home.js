/* ═══ RENDER ══════════════════════════════════════════════════════════════ */

function renderCards() {
  const box = document.getElementById("cards");
  box.replaceChildren();

  PROJETOS.forEach(p => {
    const acoes = acoesDe(p);
    const abertas = acoes.filter(a => !a.feita);
    const bloqueado = abertas.some(a => a.status === "bloqueia");
    const prox = proximaAcao(p);

    const card = el("button", "card");
    card.type = "button";
    card.setAttribute("aria-label", "Abrir " + p.nome);

    const top = el("div", "card-top");
    top.append(el("h3", "card-title", p.nome));

    let chipTxt, chipCls;
    if (!abertas.length)         { chipTxt = "Concluído"; chipCls = "ok"; }
    else if (bloqueado)          { chipTxt = "Bloqueado"; chipCls = "late"; }
    else if (prox && prox.prazo) {
      const d = diasAte(prox.prazo);
      chipTxt = d < 0 ? "Atrasado" : (d <= 14 ? "Próximo" : "No prazo");
      chipCls = severidade(prox.prazo);
    } else                       { chipTxt = "Sem data"; chipCls = "idle"; }
    top.append(el("span", "chip " + chipCls, chipTxt));
    card.append(top);

    card.append(el("p", "card-summary", p.resumo));

    const next = el("div", "card-next" + (prox ? "" : " done"));
    next.append(el("span", "next-label", prox ? "Próxima ação" : "Situação"));
    if (prox) {
      next.append(el("span", "next-when",
        prox.prazo ? fmtLongo(prox.prazo) + " · " + textoPrazo(prox.prazo)
                   : (prox.status === "bloqueia" ? "sem data · está travando o projeto" : "sem data · " + (prox.prazoTxt || "a definir"))));
      next.append(el("span", "next-what", prox.o));
    } else {
      next.append(el("span", "next-what", "Todas as ações foram marcadas como feitas."));
    }
    card.append(next);

    const foot = el("div", "card-foot");
    const feitas = acoes.length - abertas.length;
    foot.append(el("span", "open-count", feitas + " de " + acoes.length + " feitas"));
    foot.append(el("span", "card-cta", p.pagina ? "Abrir a página →" : "Abrir →"));
    card.append(foot);

    card.addEventListener("click", () => {
      if (p.pagina) location.href = p.pagina;
      else abrirProjeto(p);
    });
    box.append(card);
  });
}

function renderMeetings() {
  const box = document.getElementById("meetings");
  box.replaceChildren();
  REUNIOES.forEach(r => {
    const total = PROJETOS.reduce((s,p) => s + p.acoes.filter(a => a.reuniao === r.id).length, 0);
    const row = el("button", "meeting");
    row.type = "button";
    row.append(el("span", "meeting-date", fmtLongo(r.data)));
    const body = el("div", "meeting-body");
    body.append(el("div", "meeting-title", r.titulo));
    body.append(el("div", "meeting-meta", r.participantes + (r.ausentes ? " · ausente: " + r.ausentes : "") + " · " + total + " ações"));
    row.append(body);
    row.append(el("span", "meeting-cta", "Ver ata completa →"));
    row.addEventListener("click", () => abrirReuniao(r));
    box.append(row);
  });
}

/* ── Diálogo ── */
const sheet = document.getElementById("sheet");
const sheetBody = document.getElementById("sheet-body");
const sheetTitle = document.getElementById("sheet-title");
const sheetOrigin = document.getElementById("sheet-origin");
let sheetAtual = null;

document.getElementById("sheet-close").addEventListener("click", () => sheet.close());
sheet.addEventListener("click", e => { if (e.target === sheet) sheet.close(); });
sheet.addEventListener("close", () => { sheetAtual = null; });

function abrirProjeto(p) {
  sheetAtual = { tipo: "projeto", ref: p };
  sheetOrigin.textContent = "Projeto";
  sheetTitle.textContent = p.nome;
  sheetBody.replaceChildren();


  if (p.produtos && p.produtos.length) {
    sheetBody.append(el("h3", null, "Os " + p.produtos.length + " produtos"));
    sheetBody.append(gradeProdutos(p));
  }

  sheetBody.append(el("h3", null, "O que foi falado"));
  p.detalhe.forEach(par => sheetBody.append(el("p", "resumo", par)));

  sheetBody.append(el("h3", null, "Ações e prazos"));
  sheetBody.append(el("p", "owner-note", "Todas do " + p.responsavel + ". O que você marcar aqui aparece para todo mundo na hora."));
  sheetBody.append(acoesEmGrupos(p));

  if (p.abertos && p.abertos.length) {
    sheetBody.append(el("h3", null, "Ainda em aberto"));
    const ul = el("ul", "openlist");
    p.abertos.forEach(o => ul.append(el("li", null, o)));
    sheetBody.append(ul);
  }

  REUNIOES.filter(r => r.ata.some(s => s.projetoId === p.id)).forEach(r => {
    const b = el("button", "linkata");
    b.type = "button";
    b.textContent = "Ler a ata completa de " + fmtCurto(r.data) + " neste assunto →";
    b.addEventListener("click", () => abrirReuniao(r, p.id));
    sheetBody.append(b);
  });

  if (!sheet.open) { sheet.showModal(); sheetBody.scrollTop = 0; }
}

function abrirReuniao(r, ancora, rolar) {
  sheetAtual = { tipo: "reuniao", ref: r, ancora: ancora };
  sheetOrigin.textContent = "Ata completa · " + fmtLongo(r.data) + " de " + parseDate(r.data).getFullYear();
  sheetTitle.textContent = r.titulo;
  sheetBody.replaceChildren();

  sheetBody.append(el("h3", null, "Presentes"));
  sheetBody.append(el("p", "resumo", r.participantes + "." + (r.ausentes ? " Ausente: " + r.ausentes + "." : "")));

  const doc = el("div", "ata-doc");

  r.ata.forEach((sec, idx) => {
    const bloco = el("section", "ata-sec" + (ancora && ancora === sec.projetoId ? " alvo" : ""));
    bloco.id = "ata-" + sec.id;

    const h = el("h4", null, sec.titulo);
    const p = sec.projetoId ? PROJETOS.find(x => x.id === sec.projetoId) : null;
    if (p) h.append(el("span", "chip brand", p.nome));
    bloco.append(h);

    sec.paragrafos.forEach(par => bloco.append(el("p", null, par)));

    if (sec.produtosDe) {
      const dono = PROJETOS.find(x => x.id === sec.produtosDe);
      if (dono && dono.produtos) bloco.append(gradeProdutos(dono));
    }

    const ehUltimaDoProjeto = p && !r.ata.slice(idx + 1).some(s => s.projetoId === sec.projetoId);
    if (ehUltimaDoProjeto) {
      const acoes = acoesDe(p).filter(a => a.reuniao === r.id);
      if (acoes.length) {
        bloco.append(el("h3", null, "Ações · " + p.responsavel));
        bloco.append(listaAcoes(acoes));
      }
    }
    doc.append(bloco);
  });

  sheetBody.append(doc);

  if (!sheet.open) { sheet.showModal(); sheetBody.scrollTop = 0; }

  if (ancora && rolar !== false) {
    const alvo = r.ata.find(s => s.projetoId === ancora);
    if (alvo) {
      const node = sheetBody.querySelector("#ata-" + alvo.id);
      if (node) requestAnimationFrame(() => node.scrollIntoView({ block: "start", behavior: "instant" }));
    }
  }
}

function redesenhar() {
  renderCards();
  if (sheetAtual) {
    const topo = sheetBody.scrollTop;
    if (sheetAtual.tipo === "projeto") abrirProjeto(sheetAtual.ref);
    else abrirReuniao(sheetAtual.ref, sheetAtual.ancora, false);
    sheetBody.scrollTop = topo;
  }
}

renderMeetings();
redesenhar();
iniciar();
