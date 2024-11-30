document.addEventListener('DOMContentLoaded', () => {
  const symbols = [
    './images/anao1.png',
    './images/anao2.png',
    './images/anao3.png',
    './images/anao4.png',
    './images/anao5.png',
  ];

  const spinSound = document.getElementById('spinSound');
  const winSound = document.getElementById('winSound');
  const depositElement = document.getElementById('deposit-value');
  const spinButton = document.querySelector('.spin-button');
  let deposit = 0;

  // Evento de clique no botão
  spinButton.addEventListener('click', () => {
    spinButton.disabled = true;  // Desativa o botão durante o giro
    startSpin();  // Inicia a rotação
  });

  function startSpin() {
    let slot1 = document.getElementById('slot1');
    let slot2 = document.getElementById('slot2');
    let slot3 = document.getElementById('slot3');
    const winMessage = document.getElementById("win-message");

    winMessage.style.display = 'none'; // Esconde a mensagem de vitória ao iniciar

    const spinDuration = 2000; // Tempo da rotação em milissegundos
    const startTime = Date.now();

    // Toca o som de giro
    spinSound.currentTime = 0;
    spinSound.play();

    // Função de animação de rotação
    function spinAnimation() {
      let elapsedTime = Date.now() - startTime;

      if (elapsedTime < spinDuration) {
        // Durante o tempo de rotação, atualiza as imagens dos slots
        const randomSymbol1 = symbols[Math.floor(Math.random() * symbols.length)];
        const randomSymbol2 = symbols[Math.floor(Math.random() * symbols.length)];
        const randomSymbol3 = symbols[Math.floor(Math.random() * symbols.length)];

        slot1.src = randomSymbol1;
        slot2.src = randomSymbol2;
        slot3.src = randomSymbol3;

        requestAnimationFrame(spinAnimation);  // Chama a função novamente para continuar a animação
      } else {
        stopSpin();  // Parar a rotação após o tempo limite
      }
    }

    spinAnimation(); // Chama a animação do giro
  }

  function stopSpin() {
    spinSound.pause();  // Pausa o som de giro
    spinSound.currentTime = 0;  // Reseta o tempo do som

    // Chance de ganhar (80% de chance de vitória)
    if (Math.random() < 0.8) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      document.getElementById('slot1').src = randomSymbol;
      document.getElementById('slot2').src = randomSymbol;
      document.getElementById('slot3').src = randomSymbol;

      deposit += 10;  // Incrementa o depósito
      depositElement.textContent = `$${deposit}`;

      document.getElementById('win-message').style.display = 'block';  // Mostra a mensagem de vitória
      winSound.currentTime = 0;  // Reseta o som de vitória
      winSound.play();  // Toca o som de vitória
    } else {
      document.getElementById('win-message').style.display = 'none';  // Esconde a mensagem se não ganhou
    }

    spinButton.disabled = false;  // Reativa o botão de girar
  }
});
