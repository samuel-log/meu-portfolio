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