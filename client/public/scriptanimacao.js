const animeCharacter = document.getElementById('animeCharacter');
const opinionInput = document.getElementById('opinion');
const charLimitMessage = document.getElementById('charLimitMessage');
const nomeinput = document.querySelector("#nome");
const url = "https://jsonplaceholder.typicode.com/posts";
const urlsearchparams = new URLSearchParams(window.location.search);
const postid = urlsearchparams.get("id")
const divpost = document.querySelector("#posts")


let selectedStars = 0;

// Função para definir a classificação
function rate(stars) {
    if (stars === selectedStars) {
        selectedStars = 0;
    } else {
        selectedStars = stars;
    }
    // Remove todas as classes de expressão facial
    animeCharacter.classList.remove('happy', 'neutral', 'sad');

    // Adiciona a classe correspondente à expressão facial
    if (selectedStars < 3) {
        animeCharacter.classList.add('happy');
    } else if (selectedStars === 3) {
        animeCharacter.classList.add('neutral');
    } else {
        animeCharacter.classList.add('sad');
    }

    // Exibe o personagem após clicar na avaliação
    animeCharacter.style.display = 'inline-block';

    // Preenche as estrelas
    const allStars = document.querySelectorAll('.star');
    allStars.forEach((star, index) => {
        if (index < selectedStars) {
            star.innerHTML = '&#9733;'; // Estrela preenchida
        } else {
            star.innerHTML = '&#9734;'; // Estrela vazia
        }
    });
}

// Função para enviar a opinião
function submitOpinion() {
    const opinion = opinionInput.value;
    const nome = nomeinput.value;
    if (opinion.length === 0) {
        alert("Por favor, digite algo.");
    } else if (opinion.length > 500) {
        alert("Você excedeu o limite de 500 caracteres!");
    } else {
        console.log('Nome:', nome )
        console.log('Opinião:', opinion);
        console.log('Classificação:', selectedStars + " Estrelas");

        addOpinionToPage(nome, opinion, selectedStars)
        opinionInput.value = '';
        nomeinput.value = '';
        selectedStars = 0;
        alert("Obrigado pela sua avaliação")
    }
}

function addOpinionToPage(nome, opinion, stars) {
    const opinionsContainer = document.getElementById('container3');
    
    const opinionDiv = document.createElement('div');
    opinionDiv.className = 'opinion';
    
    const opinionHeader = document.createElement('h3');
    opinionHeader.textContent = nome + " - " + stars + " Estrelas";
    
    const opinionContent = document.createElement('p');
    opinionContent.textContent = opinion;
    
    opinionDiv.appendChild(opinionHeader);
    opinionDiv.appendChild(opinionContent);
    
    opinionsContainer.appendChild(opinionDiv);
}

// Ajusta a altura da caixa de entrada conforme o conteúdo inserido
opinionInput.addEventListener('input', () => {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Função para animação ao passar o mouse sobre as estrelas
function mouseOver(starIndex) {
    const allStars = document.querySelectorAll('.star');
    allStars.forEach((star, index) => {
        if (index < starIndex) {
            star.style.color = '#fe8cf7'; // Muda a cor para rosa
            star.style.animation = 'bounce 0.5s forwards';
        }
    });
}

// Função para remover a animação ao tirar o mouse das estrelas
function mouseLeave(starIndex) {
    const allStars = document.querySelectorAll('.star');
    allStars.forEach((star, index) => {
        if (index < starIndex) {
            if (index < selectedStars) {
                star.style.color = '#fe8cf7'; // Mantém a cor rosa para as estrelas preenchidas ou selecionadas
            } else {
                star.style.color = '#968892'; // Mantém a cor preta para as estrelas não preenchidas
            }
            star.style.animation = 'none';
        }
    });
}

// Função para atualizar o contador de caracteres
function updateCharCount() {
    const maxLength = 500;
    const opinion = opinionInput.value;
    const charCountElement = document.getElementById('charCount');
    
    charCountElement.textContent = opinion.length + '/' + maxLength;
    
    if (opinion.length > maxLength) {
        charCountElement.style.color = 'red';
        charLimitMessage.style.display = 'block';
    } else {
        charCountElement.style.color = 'black';
        charLimitMessage.style.display = 'none';
    }
}
