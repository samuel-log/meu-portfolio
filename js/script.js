// Meu objeto
const projetos = {
  foodPay: {
    titulo: "Food-Pay",
    descricao: `<p>
        <strong>Food-Pay</strong> é um sistema de gestão financeira para alimentação escolar. 
        Ele controla pagamentos, alunos e o acompanhamento financeiro da merenda. 
        Foi desenvolvido por Paulo Ricardo, Samuel Sousa, Yann Freire e Lavynia Vitoria.
      </p>

      <h6 class="fw-bold mt-3">Tecnologias</h6>
      <ul class="ps-3">
        <li><strong>Frontend:</strong> React 18 + Vite</li>
        <li><strong>Backend:</strong> .NET 8 / C# (API com Controllers e Models)</li>
        <li><strong>Banco de dados:</strong> SQL Server</li>
        <li><strong>Autenticação:</strong> JWT</li>
        <li><strong>Pagamentos:</strong> Stripe</li>
      </ul>

      <p class="mb-0">
        <strong>Estrutura:</strong> são três pastas na raiz: 
        <code>Food-Pay/</code> (frontend), 
        <code>FoodPay_API/</code> (backend) e 
        <code>database/</code> (scripts SQL).
      </p>
    `,
    link: "https://github.com/PauloRicardo00/Food-Pay.git",
    imagens: ["./img/fundo-dark-lebron.jpg"] // Se tiver mais fotos aqui depois, é só colocar vírgula e adicionar entre aspas
  },

  ladingPage: {
    titulo: "Lading Page",
    descricao: `<p><strong>Landing Page</strong> é uma plataforma web que funciona como uma "torre de controle" para a manutenção preditiva em refinarias de petróleo. 
    Utilizamos o HTML bootstrap no desenvolvimento.</p>
    <h6>O que ele faz?</h6>
    <ul>
      <li><b>Coleta dados:</b> Conecta sensores industriais e sistemas antigos (SCADA) via protocolos industriais (OPC UA / MQTT).</li>
      <li><b>Prevê falhas:</b> Usa Ciência de Dados para identificar anomalias e prever quebras antes que a produção pare.</li>
      <li><b>Exibe no Dashboard:</b> Mostra tudo em tempo real através de painéis simples, gerando alertas, métricas de confiabilidade (MTBF/MTTR) e ordens de serviço.</li>
    </ul>`,
    linkRepo: "https://github.com/brugnoloJoao/projeto-integrador-landing-page.git",
    linkSite: "https://brugnolojoao.github.io/projeto-integrador-landing-page/",
    imagens: [
      "./img/landing-page2.png",
      "./img/landing-page3.png",
      "./img/landing-page4.png",
      "./img/landing-page5.png",
      "./img/landing-page6.png",
      "./img/landing-page7.png"
    ]
  }
}

function abrirDetalhes(idProjeto) {
  const dados = projetos[idProjeto];

  if (dados) {
    document.getElementById('modalTitulo').innerText = dados.titulo;
    document.getElementById('modalDescricao').innerHTML = dados.descricao;
    document.getElementById('modalAcessar').href = dados.linkRepo;
    document.getElementById('modalAcessarSite').href = dados.linkSite;

    // 1. Cria o HTML das imagens em formato de carrossel do Bootstrap
    let slidesHtml = '';
    dados.imagens.forEach((imgSrc, index) => {
      // O primeiro item do carrossel precisa obrigatóriamente ter a classe 'active'
      const classeAtiva = index === 0 ? 'active' : '';
      
      slidesHtml += `
        <div class="carousel-item ${classeAtiva}">
          <img src="${imgSrc}" class="d-block w-100 rounded" alt="Print do projeto ${dados.titulo}">
        </div>
      `;
    });

    // 2. Insere a estrutura completa do carrossel dentro do HTML onde ficava a imagem antiga
    const containerCarrossel = document.getElementById('containerModalCarrossel');
    containerCarrossel.innerHTML = `
      <div id="carouselProjetoModal" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${slidesHtml}
        </div>
        
        <!-- Seta da Esquerda -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselProjetoModal" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        
        <!-- Seta da Direita -->
        <button class="carousel-control-next" type="button" data-bs-target="#carouselProjetoModal" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Próximo</span>
        </button>
      </div>
    `;
  }
}

window.addEventListener('scroll', function () {
  const parallaxElements = document.querySelectorAll('.parallax-bg');

  parallaxElements.forEach(function (el) {
    const scrollPosition = window.scrollY; 
    const elementOffset = el.offsetTop;    
    const speed = 0.35;                   

    const yPos = (scrollPosition - elementOffset) * speed;

    el.style.backgroundPosition = `center ${yPos}px`;
  });
});