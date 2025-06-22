// Função para gerar uma posição aleatória
function gerarPosicaoAleatoria() {
    const larguraTela = window.innerWidth - 200; // Subtrai a largura do rosto
    const alturaTela = window.innerHeight - 200; // Subtrai a altura do rosto
    const x = Math.random() * larguraTela;
    const y = Math.random() * alturaTela;
    return { x, y };
}

// Função para mover a pupila dentro do olho
function moverPupila(olho, pupila, mouseX, mouseY) {
    const rect = olho.getBoundingClientRect();
    const olhoX = rect.left + rect.width / 2;
    const olhoY = rect.top + rect.height / 2;

    const deltaX = mouseX - olhoX;
    const deltaY = mouseY - olhoY;
    const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const angulo = Math.atan2(deltaY, deltaX);

    const maxDistancia = 10;
    const distanciaLimitada = Math.min(distancia, maxDistancia);

    const deslocamentoX = Math.cos(angulo) * distanciaLimitada;
    const deslocamentoY = Math.sin(angulo) * distanciaLimitada;

    pupila.style.transform = `translate(${deslocamentoX}px, ${deslocamentoY}px)`;
}

// Função para mover o rosto de gato aleatoriamente
function moverRostoAleatorio(Emoji) {
    const { x, y } = gerarPosicaoAleatoria();
    Emoji.style.left = `${x}px`;
    Emoji.style.top = `${y}px`;
}

// Função de animação para os gatos
function adicionarComportamentoDeEmoji(EmojiId) {
    const Emoji = document.getElementById(EmojiId);

    // Inicializa a posição aleatória do gato
    const { x, y } = gerarPosicaoAleatoria();
    Emoji.style.left = `${x}px`;
    Emoji.style.top = `${y}px`;

    // Evento de movimento do mouse para as pupilas
    document.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const olhos = Emoji.querySelectorAll(".olho");
        olhos.forEach((olho) => {
            const pupila = olho.querySelector(".pupila");
            moverPupila(olho, pupila, mouseX, mouseY);
        });
    });

    // Adiciona o evento de clique para desaparecer e mudar a posição do rosto
    Emoji.addEventListener("click", () => {
        Emoji.style.opacity = "0"; // Faz o rosto desaparecer
        setTimeout(() => {
            moverRostoAleatorio(Emoji);
            Emoji.style.opacity = "1"; // Faz o rosto reaparecer
        }, 500); // Tempo de transição de desaparecimento
    });
}

// Adiciona o comportamento para os 3 gatos
adicionarComportamentoDeEmoji("Emoji1");
adicionarComportamentoDeEmoji("Emoji2");
adicionarComportamentoDeEmoji("Emoji3");
