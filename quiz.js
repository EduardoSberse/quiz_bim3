const perguntasFaceis = [
    {
        pergunta: "Onde Elon Musk nasceu?",
        opcoes: ["Canadá", "Estados Unidos", "África do Sul", "França"],
        correta: 2
    },
    {
        pergunta: "Qual empresa Elon Musk fundou relacionada a carros elétricos?",
        opcoes: ["Nissan", "Tesla", "BMW", "Chevrolet"],
        correta: 1
    },
    {
        pergunta: "Qual o nome da empresa de foguetes de Elon Musk?",
        opcoes: ["Blue Origin", "NASA", "SpaceX", "Virgin Galactic"],
        correta: 2
    },
    {
        pergunta: "Qual o primeiro nome de Elon Musk?",
        opcoes: ["Mark", "Jeff", "Elon", "Tony"],
        correta: 2
    },
    {
        pergunta: "Qual o nome da rede de internet via satélite de Elon Musk?",
        opcoes: ["SkyNet", "Starlink", "GalaxyWeb", "AstroNet"],
        correta: 1
    },
    {
        pergunta: "Em que ano Elon Musk nasceu?",
        opcoes: ["1971", "1980", "1969", "1975"],
        correta: 0
    },
    {
        pergunta: "Qual o nome da empresa de túneis de Elon Musk?",
        opcoes: ["TunnelTech", "Boring Company", "UndergroundX", "Musk Digs"],
        correta: 1
    },
    {
        pergunta: "Qual empresa Elon Musk comprou em 2022?",
        opcoes: ["Facebook", "Instagram", "Twitter", "Snapchat"],
        correta: 2
    },
    {
        pergunta: "Qual é a nacionalidade original de Elon Musk?",
        opcoes: ["Sul-africana", "Americana", "Canadense", "Britânica"],
        correta: 0
    },
    {
        pergunta: "Qual linguagem Elon Musk aprendeu a programar quando criança?",
        opcoes: ["C", "Python", "BASIC", "JavaScript"],
        correta: 2
    }
];

const perguntasDificeis = [
    {
        pergunta: "Qual foi o primeiro software que Elon Musk vendeu?",
        opcoes: ["Zip2", "PayPal", "Blastar", "SolarCity"],
        correta: 2
    },
    {
        pergunta: "Qual a formação universitária de Elon Musk?",
        opcoes: ["Engenharia Mecânica", "Economia e Física", "Matemática e Computação", "Química e Física"],
        correta: 1
    },
    {
        pergunta: "Qual nome da empresa que deu origem ao PayPal?",
        opcoes: ["Zip2", "X.com", "MuskBank", "NetFinance"],
        correta: 1
    },
    {
        pergunta: "Qual o objetivo da empresa Neuralink?",
        opcoes: ["Transporte elétrico", "Colonização de Marte", "Interface cérebro-computador", "Energia solar"],
        correta: 2
    },
    {
        pergunta: "Quantos filhos Elon Musk tem (2024)?",
        opcoes: ["5", "8", "10", "11"],
        correta: 3
    },
    {
        pergunta: "Qual o nome da inteligência artificial criada por Elon Musk?",
        opcoes: ["X.AI", "NeuralAI", "MuskGPT", "OpenAI"],
        correta: 0
    },
    {
        pergunta: "Onde Elon Musk estudou antes de ir para a Penn?",
        opcoes: ["MIT", "Stanford", "Queen's University", "UCLA"],
        correta: 2
    },
    {
        pergunta: "Qual empresa de Elon Musk pretende perfurar o subsolo?",
        opcoes: ["Tesla Tunnel", "Boring Company", "DeepLink", "Musk Digger"],
        correta: 1
    },
    {
        pergunta: "Qual o nome da nave que pretende ir a Marte?",
        opcoes: ["Dragon", "Falcon Heavy", "Orion", "Starship"],
        correta: 3
    },
    {
        pergunta: "Em que país Elon Musk tentou abrir a Tesla primeiro, mas não conseguiu?",
        opcoes: ["Índia", "China", "Alemanha", "Brasil"],
        correta: 0
    }
];

let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;

window.onload = () => {
    const url = new URL(window.location.href);
    const dificuldade = url.searchParams.get("dificuldade");

    if (dificuldade === "facil") {
        perguntas = [...perguntasFaceis];
    } else {
        perguntas = [...perguntasDificeis];
    }

    perguntas = embaralhar(perguntas).slice(0, 10);
    mostrarPergunta();

    document.getElementById("botaoProximo").addEventListener("click", passarTela);
};

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function mostrarPergunta() {
    if (perguntaAtual >= perguntas.length) {
        window.location.href = `final.html?pontuacao=${pontuacao}`;
        return;
    }

    const pergunta = perguntas[perguntaAtual];
    respostaSelecionada = null;

    document.querySelector("h1").innerText = `Pergunta ${perguntaAtual + 1}`;
    document.querySelector(".perguntinha h2").innerText = pergunta.pergunta;

    const container = document.querySelector("fieldset");
    container.innerHTML = "";

    pergunta.opcoes.forEach((opcao, index) => {
        const id = `resposta${index}`;
        container.innerHTML += `
            <div class="resposta">
                <input type="radio" id="${id}" name="resposta" onclick="selecionarResposta(${index})">
                <label for="${id}">${opcao}</label>
            </div>
        `;
    });

    const botao = document.getElementById("botaoProximo");
    botao.textContent = perguntaAtual === perguntas.length - 1 ? "Finalizar" : "Próxima";
}

function selecionarResposta(indice) {
    respostaSelecionada = indice;
}

function passarTela(event) {
    event.preventDefault();

    if (respostaSelecionada === null) {
        alert("Selecione algo");
        return;
    }

    const correta = perguntas[perguntaAtual].correta;
    if (respostaSelecionada === correta) {
        pontuacao += 10;
    }

    perguntaAtual++;
    mostrarPergunta();
}
