let questoes = [];
let index = 0;
let pontuacao = 0;
let acertos = 0;
let erros = 0;
let tempo = 0;
let timer;

fetch('questoes.json')
    .then(response => response.json())
    .then(data => {
        questoes = data;
        iniciarJogo();
    });

function iniciarJogo() {
    mostrarQuestao();
    timer = setInterval(() => {
        tempo++;
        document.getElementById('tempo').innerText = `Tempo: ${tempo}s`;
    }, 1000);
}

function mostrarQuestao() {
    if (index < questoes.length) {
        const questaoAtual = questoes[index];
        document.getElementById('questao').innerText = questaoAtual.pergunta;
        const alternativasDiv = document.getElementById('alternativas');
        alternativasDiv.innerHTML = '';

        questaoAtual.alternativas.forEach(alternativa => {
            const button = document.createElement('button');
            button.innerText = alternativa;
            button.onclick = () => verificarResposta(alternativa);
            alternativasDiv.appendChild(button);
        });
    } else {
        finalizarJogo();
    }
}

function verificarResposta(resposta) {
    const questaoAtual = questoes[index];
    if (resposta === questaoAtual.resposta) {
        pontuacao++;
        acertos++;
    } else {
        erros++;
    }
    document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacao}`;
    index++;
    mostrarQuestao();
}

function finalizarJogo() {
    clearInterval(timer);
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').innerText = `Você acertou ${acertos} questões e errou ${erros} questões. Sua pontuação foi de ${pontuacao} pontos em ${tempo}s.`;
    document.getElementById('nextButton').style.display = 'none';
}
