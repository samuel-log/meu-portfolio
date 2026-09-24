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
    ] // Adicione prints em ./img/ e liste aqui, ex.: "./img/foodpay1.png"
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

  const slides = d.imagens.map((src, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="${src}" class="d-block w-100 rounded" alt="Print ${i + 1} do projeto ${d.titulo}" loading="lazy">
    </div>`).join('');
  const controles = d.imagens.length > 1 ? `
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselProjetoModal" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselProjetoModal" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Próximo</span>
    </button>` : '';
  cont.innerHTML = `<div id="carouselProjetoModal" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">${slides}</div>${controles}</div>`;
}

// ===== Parallax com ajuste de posição do LeBron =====
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const botaoTopo = document.getElementById('topo');
let ticking = false;

function aoRolar() {
  const y = window.scrollY;
  if (!semMovimento) {
    document.querySelectorAll('.parallax-bg').forEach(el => {
      if (el.id === 'hobby') {
        // Ajuste exclusivo para o LeBron:
        // O '-150' define a posição inicial (quanto mais negativo, mais a imagem sobe/mostra o topo).
        // O '0.25' controla a velocidade do parallax dele.
        let posicaoY = -440 + (y - el.offsetTop) * 0.25;
        el.style.backgroundPosition = `center ${posicaoY}px`;
      } else {
        // Cálculo padrão para as outras seções do site
        let posicaoY = (y - el.offsetTop) * 0.35;
        el.style.backgroundPosition = `center ${posicaoY}px`;
      }
    });
  }
  botaoTopo.style.display = y > 400 ? 'block' : 'none';
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(aoRolar); ticking = true; }
}, { passive: true });

botaoTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Fecha o menu lateral ao clicar num link =====
document.querySelectorAll('#menuLateral .nav-link').forEach(link =>
  link.addEventListener('click', () => bootstrap.Offcanvas.getInstance(document.getElementById('menuLateral'))?.hide()));

// ===== Animação de entrada =====
const alvos = document.querySelectorAll('.card, .skill, .hobby-card, #formContato');
alvos.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((itens) => itens.forEach(i => {
    if (i.isIntersecting) { i.target.classList.add('visivel'); obs.unobserve(i.target); }
  }), { threshold: 0.15 });
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

// ===== Scroll Spy via JavaScript (Destacar menu ativo) =====
const secoes = document.querySelectorAll('section[id], header[id]'); // pega as seções que têm ID
const linksMenu = document.querySelectorAll('.navbar-nav .nav-link');

function destacarMenuAtivo() {
  const scrollY = window.pageYOffset;

  secoes.forEach(secao => {
    const alturaSecao = secao.offsetHeight;
    const topoSecao = secao.offsetTop - 100; // margem de tolerância de 100px
    const idSecao = secao.getAttribute('id');

    if (scrollY >= topoSecao && scrollY < topoSecao + alturaSecao) {
      linksMenu.forEach(link => {
        link.classList.remove('ativo');
        // Se o href do link corresponder ao id da seção, ativa ele
        if (link.getAttribute('href') === `#${idSecao}`) {
          link.classList.add('ativo');
        }
      });
    }
  });
}

// Adiciona o evento de scroll aproveitando o mesmo otimizador que já temos (ticking / requestAnimationFrame)
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      aoRolar();
      destacarMenuAtivo();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });


