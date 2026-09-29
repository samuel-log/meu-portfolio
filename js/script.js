// ===== Dados dos projetos =====
const projetos = {
  foodPay: {
    titulo: "Food-Pay",
    tags: ["React 18", "Vite", ".NET 8 / C#", "SQL Server", "JWT", "Stripe"],
    descricao: `<p><strong>Food-Pay</strong> é um sistema de gestão financeira para alimentação escolar.
        Ele controla pagamentos, alunos e o acompanhamento financeiro da merenda.
        Foi desenvolvido por Paulo Ricardo, Samuel Sousa, Yann Freire e Lavynia Vitoria.</p>
      <p><strong>Meu papel:</strong> desenvolvimento do frontend (React).</p>
      <p class="mb-0"><strong>Estrutura:</strong> três pastas na raiz:
        <code>Food-Pay/</code> (frontend), <code>FoodPay_API/</code> (backend) e <code>database/</code> (scripts SQL).</p>`,
    linkRepo: "https://github.com/PauloRicardo00/Food-Pay",
    linkSite: "https://pauloricardo00.github.io/Food-Pay/#/",
    imagens: [
      "./img/food-pay.png",
      "./img/food-pay-responsavel.png"
    ]
  },

  landingPage: {
    titulo: "Landing Page",
    tags: ["HTML", "Bootstrap"],
    descricao: `<p>Landing page do nosso produto do Projeto Integrador: uma plataforma web que funciona como uma "torre de controle" para a manutenção preditiva em refinarias de petróleo, desenvolvida com HTML e Bootstrap.</p>
    <h6>O que ele faz?</h6>
    <ul>
      <li><b>Coleta dados:</b> Conecta sensores industriais e sistemas antigos (SCADA) via protocolos industriais (OPC UA / MQTT).</li>
      <li><b>Prevê falhas:</b> Usa Ciência de Dados para identificar anomalias e prever quebras antes que a produção pare.</li>
      <li><b>Exibe no Dashboard:</b> Mostra tudo em tempo real através de painéis simples, gerando alertas, métricas de confiabilidade (MTBF/MTTR) e ordens de serviço.</li>
    </ul>`,
    linkRepo: "https://github.com/brugnoloJoao/projeto-integrador-landing-page",
    linkSite: "https://brugnolojoao.github.io/projeto-integrador-landing-page/",
    imagens: ["./img/landing-page2.png", "./img/landing-page3.png", "./img/landing-page4.png",
              "./img/landing-page5.png", "./img/landing-page6.png", "./img/landing-page7.png"]
  }
};

// ===== Pré-carrega e decodifica as imagens antes de exibi-las =====
// Guarda as imagens em um Map para o navegador não descartar do cache e
// usa decode() para que o slide já esteja pronto para pintar (sem piscada).
const imagensPrecarregadas = new Map();
function precarregarImagens(lista) {
  lista.forEach(src => {
    if (imagensPrecarregadas.has(src)) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    imagensPrecarregadas.set(src, img);
    if (img.decode) img.decode().catch(() => {});
  });
}

function abrirDetalhes(idProjeto) {
  const d = projetos[idProjeto];
  if (!d) return;

  document.getElementById('modalTitulo').innerText = d.titulo;
  document.getElementById('modalDescricao').innerHTML = d.descricao;
  document.getElementById('modalTags').innerHTML =
    d.tags.map(t => `<span class="badge text-bg-secondary me-1">${t}</span>`).join('');

  const repo = document.getElementById('modalAcessar');
  const site = document.getElementById('modalAcessarSite');
  repo.classList.toggle('d-none', !d.linkRepo);
  site.classList.toggle('d-none', !d.linkSite);
  if (d.linkRepo) repo.href = d.linkRepo;
  if (d.linkSite) site.href = d.linkSite;

  const cont = document.getElementById('containerModalCarrossel');
  if (!d.imagens.length) { cont.innerHTML = ''; return; }

  // Pré-carrega TODAS as imagens do projeto assim que o modal abre.
  precarregarImagens(d.imagens);

  // Sem loading="lazy" de propósito: essas imagens só existem quando o
  // usuário já pediu pra ver, então adiar o carregamento só causa piscada.
  const slides = d.imagens.map((src, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="${src}" class="d-block w-100 rounded" alt="Print ${i + 1} do projeto ${d.titulo}">
    </div>`).join('');
  const controles = d.imagens.length > 1 ? `
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselProjetoModal" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselProjetoModal" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Próximo</span>
    </button>` : '';
  // "carousel-fade" = transição por dissolução (crossfade) entre os slides.
  cont.innerHTML = `<div id="carouselProjetoModal" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">${slides}</div>${controles}</div>`;
}

// =========================================================
// CONFIGURAÇÃO DE SCROLL + PARALLAX
// =========================================================
const CONFIG = {
  // --- Scroll suave forçado (roda do mouse, teclado e âncoras) ---
  passoRoda: 1.1,        // multiplicador do deslocamento por "notch" da roda
  maxPorEvento: 120,     // limite (px) de cada evento de roda: ignora "linhas por rolagem" do sistema
  suavidadeScroll: 8,    // maior = alcança o destino mais rápido (menor = mais "flutuante")
  offsetAncora: 70,      // altura da navbar sticky

  // --- Parallax ---
  parallaxSuavidade: 10, // suavização do movimento do fundo
  parallaxMax: 120,      // deslocamento máximo (px) do fundo em relação à seção
  parallaxMaxHobby: 90   // idem para a seção Hobby (um pouco mais sutil)
  // OBS: o CSS reserva 140px de sobra acima/abaixo da imagem (.parallax-bg::before),
  // então parallaxMax precisa ser sempre menor que 140.
};

const botaoTopo = document.getElementById('topo');
const secoesMenu = document.querySelectorAll('section[id], header[id]');
const linksMenu = document.querySelectorAll('.navbar-nav .nav-link');

// Só entram no parallax as seções que realmente têm imagem de fundo.
const itensParallax = Array.from(document.querySelectorAll('.parallax-bg'))
  .filter(secao => getComputedStyle(secao).backgroundImage !== 'none')
  .map(secao => ({
    el: secao,
    max: secao.id === 'hobby' ? CONFIG.parallaxMaxHobby : CONFIG.parallaxMax,
    atual: null,
    alvo: 0
  }));

// Estado do motor de scroll suave.
const motor = {
  atual: window.scrollY,   // posição "suavizada" que estamos aplicando
  alvo: window.scrollY,    // para onde queremos chegar
  escrito: window.scrollY, // última posição enviada ao navegador
  tween: null              // animação por duração (usada nos links de âncora)
};

let raf = 0;
let ultimoFrame = 0;
let ultimoIdAtivo;

const limitar = (v, min, max) => Math.min(max, Math.max(min, v));
const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

// ---------- Loop de animação (roda só enquanto algo está se movendo) ----------
function acordar() {
  if (raf) return;
  ultimoFrame = performance.now();
  raf = requestAnimationFrame(frame);
}

function frame(agora) {
  raf = 0;
  const dt = limitar((agora - ultimoFrame) / 1000, 0.001, 0.064);
  ultimoFrame = agora;
  let movendo = false;

  // 1) Motor de scroll suave
  if (motor.tween) {
    const t = limitar((agora - motor.tween.inicio) / motor.tween.duracao, 0, 1);
    motor.atual = motor.tween.de + (motor.tween.para - motor.tween.de) * easeInOutCubic(t);
    if (t >= 1) {
      motor.atual = motor.alvo = motor.tween.para;
      motor.tween = null;
    } else {
      movendo = true;
    }
  } else {
    const dif = motor.alvo - motor.atual;
    if (Math.abs(dif) > 0.3) {
      // Suavização independente da taxa de quadros (60/120/144 Hz se comportam igual).
      motor.atual += dif * (1 - Math.exp(-dt * CONFIG.suavidadeScroll));
      movendo = true;
    } else {
      motor.atual = motor.alvo;
    }
  }
  if (motor.atual !== motor.escrito) {
    window.scrollTo(0, motor.atual);
    motor.escrito = motor.atual;
  }

  // 2) LEITURAS do layout (todas juntas, antes de escrever no DOM)
  const y = window.scrollY;
  const vh = window.innerHeight;
  const visiveis = itensParallax.map(item => {
    const r = item.el.getBoundingClientRect();
    if (r.bottom < -300 || r.top > vh + 300) return null; // longe da tela: não calcula
    // progresso: -1 (seção entrando por baixo) → 0 (centralizada) → +1 (saindo por cima)
    const p = limitar((vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2), -1, 1);
    return p * item.max;
  });
  const idAtivo = descobrirSecaoAtiva(y);

  // 3) ESCRITAS
  itensParallax.forEach((item, i) => {
    const alvo = visiveis[i];
    if (alvo === null) { item.atual = null; return; } // ao voltar à tela, já entra na posição certa
    item.alvo = alvo;
    if (item.atual === null) {
      item.atual = alvo;
    } else {
      const dif = alvo - item.atual;
      if (Math.abs(dif) > 0.05) {
        item.atual += dif * (1 - Math.exp(-dt * CONFIG.parallaxSuavidade));
        movendo = true;
      } else {
        item.atual = alvo;
      }
    }
    item.el.style.setProperty('--parallax-y', item.atual.toFixed(2) + 'px');
  });

  botaoTopo.classList.toggle('mostrar', y > 400);

  if (idAtivo !== ultimoIdAtivo) {
    ultimoIdAtivo = idAtivo;
    linksMenu.forEach(link => {
      link.classList.toggle('ativo', Boolean(idAtivo && link.getAttribute('href') === `#${idAtivo}`));
    });
  }

  if (movendo) raf = requestAnimationFrame(frame);
}

function descobrirSecaoAtiva(y) {
  let ativa = null;
  secoesMenu.forEach(secao => {
    const topo = secao.offsetTop - 110;
    if (y >= topo && y < topo + secao.offsetHeight) ativa = secao.id;
  });
  return ativa;
}

// ---------- Ações do motor ----------
function empurrar(delta) {
  if (motor.tween) { motor.tween = null; motor.alvo = motor.atual; }
  motor.alvo = limitar(motor.alvo + delta, 0, maxScroll());
  acordar();
}

function rolarPara(y) {
  const destino = limitar(y, 0, maxScroll());
  const dist = Math.abs(destino - motor.atual);
  if (dist < 1) return;
  motor.tween = {
    de: motor.atual,
    para: destino,
    inicio: performance.now(),
    duracao: limitar(dist * 0.6, 600, 1400)
  };
  motor.alvo = destino;
  acordar();
}

// Rolagem interna nativa (modal, menu lateral, textarea...) não deve ser sequestrada.
function deveUsarRolagemNativa(el) {
  if (document.body.classList.contains('modal-open') || document.querySelector('.offcanvas.show')) return true;
  for (let n = el; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
    const estilo = getComputedStyle(n);
    if (/(auto|scroll)/.test(estilo.overflowY) && n.scrollHeight > n.clientHeight + 1) return true;
  }
  return false;
}

// ---------- Eventos ----------
// Roda do mouse / trackpad: normaliza o delta e aplica a mesma suavização sempre,
// não importa a configuração de rolagem do mouse/sistema do usuário.
window.addEventListener('wheel', e => {
  if (e.ctrlKey || e.defaultPrevented) return;                 // Ctrl + roda = zoom
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;          // rolagem horizontal
  if (deveUsarRolagemNativa(e.target)) return;

  e.preventDefault();
  let d = e.deltaY;
  if (e.deltaMode === 1) d *= 35;                               // linhas -> px
  if (e.deltaMode === 2) d *= window.innerHeight;               // páginas -> px
  else d = limitar(d, -CONFIG.maxPorEvento, CONFIG.maxPorEvento);
  empurrar(d * CONFIG.passoRoda);
}, { passive: false });

// Teclado
window.addEventListener('keydown', e => {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
  if (document.body.classList.contains('modal-open') || document.querySelector('.offcanvas.show')) return;
  const alvoEl = e.target;
  if (alvoEl.closest && alvoEl.closest('input, textarea, select, [contenteditable="true"]')) return;

  const pagina = window.innerHeight * 0.9;
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); empurrar(80); break;
    case 'ArrowUp':   e.preventDefault(); empurrar(-80); break;
    case 'PageDown':  e.preventDefault(); empurrar(pagina); break;
    case 'PageUp':    e.preventDefault(); empurrar(-pagina); break;
    case ' ':
    case 'Spacebar':
      if (alvoEl.closest && alvoEl.closest('button, a, summary')) return;
      e.preventDefault(); empurrar(e.shiftKey ? -pagina : pagina); break;
    case 'Home': e.preventDefault(); rolarPara(0); break;
    case 'End':  e.preventDefault(); rolarPara(maxScroll()); break;
  }
});

// Links de âncora (#sobre, #projetos...) com animação própria (não depende do navegador).
document.addEventListener('click', e => {
  const link = e.target.closest && e.target.closest('a[href^="#"]');
  if (!link || link.closest('#modalProjeto') || link.target === '_blank') return;
  if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;

  const hash = link.getAttribute('href');
  let destino;
  if (hash === '#') {
    destino = 0;
  } else {
    const alvoEl = document.getElementById(hash.slice(1));
    if (!alvoEl) return;
    destino = alvoEl.getBoundingClientRect().top + window.scrollY - CONFIG.offsetAncora;
  }
  e.preventDefault();
  rolarPara(destino);
});

// Scroll que NÃO veio do motor (toque no celular, barra de rolagem, Tab...): só sincroniza.
window.addEventListener('scroll', () => {
  if (Math.abs(window.scrollY - motor.atual) > 3) {
    motor.atual = motor.alvo = motor.escrito = window.scrollY;
    motor.tween = null;
  }
  acordar();
}, { passive: true });

window.addEventListener('resize', () => {
  motor.alvo = limitar(motor.alvo, 0, maxScroll());
  acordar();
});
window.addEventListener('load', acordar);

botaoTopo.addEventListener('click', () => rolarPara(0));

// ===== Fecha o menu lateral ao clicar num link =====
document.querySelectorAll('#menuLateral .nav-link').forEach(link =>
  link.addEventListener('click', () => bootstrap.Offcanvas.getInstance(document.getElementById('menuLateral'))?.hide()));

// ===== Animação de entrada =====
const alvos = document.querySelectorAll('.card, .skill, .hobby-card, #formContato');
alvos.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((itens) => itens.forEach(i => {
    if (i.isIntersecting) { i.target.classList.add('visivel'); obs.unobserve(i.target); }
  }), { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  alvos.forEach(el => obs.observe(el));
} else alvos.forEach(el => el.classList.add('visivel'));

// ===== Currículo: só aparece se o PDF existir em docs/curriculo-samuel.pdf =====
fetch('./docs/curriculo-samuel.pdf', { method: 'HEAD' })
  .then(r => { if (r.ok) document.querySelectorAll('.btn-curriculo').forEach(b => b.classList.remove('d-none')); })
  .catch(() => {});

// ===== Formulário de contato (abre o app de e-mail, sem back-end) =====
document.getElementById('formContato').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!this.checkValidity()) { this.classList.add('was-validated'); return; }
  const nome = document.getElementById('cNome').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  const corpo = `${msg}\n\n— ${nome} (${email})`;
  window.location.href = `mailto:santossamuel1401@gmail.com?subject=${encodeURIComponent('Contato pelo portfólio - ' + nome)}&body=${encodeURIComponent(corpo)}`;
});

// Garante o estado correto caso a página seja aberta já no meio do conteúdo.
acordar();