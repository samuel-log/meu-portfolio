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
    imagem: "./img/fundo-dark-lebron.jpg"
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
    link: "https://github.com/brugnoloJoao/projeto-integrador-landing-page.git",
    imagem: "./img/landing-page.png"
  }
}


function abrirDetalhes (idProjeto) {
  const dados = projetos[idProjeto]

  if (dados) {
    document.getElementById('modalTitulo').innerText = dados.titulo;
    document.getElementById('modalDescricao').innerHTML = dados.descricao;
    document.getElementById('modalAcessar').href = dados.link;
    document.getElementById('modalImagem').src = dados.imagem;
    document.getElementById('modalImagem').alt = `Print do projeto ${dados.titulo}`;
  }
}

window.addEventListener('scroll', function () {
  // Busca todas as seções que têm a classe .parallax-bg
  const parallaxElements = document.querySelectorAll('.parallax-bg');

  parallaxElements.forEach(function (el) {
    const scrollPosition = window.scrollY; // Distância do scroll em pixels
    const elementOffset = el.offsetTop;    // Posição inicial da seção em relação ao topo
    const speed = 0.35;                    // Velocidade da imagem (quanto menor, mais suave)

    // Calcula a nova posição do fundo
    const yPos = (scrollPosition - elementOffset) * speed;

    // Aplica no estilo inline do elemento
    el.style.backgroundPosition = `center ${yPos}px`;
  });
});
