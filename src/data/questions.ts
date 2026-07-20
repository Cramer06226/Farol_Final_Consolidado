export interface Question {
  id: number;
  question: string;
  answer: string;
}

export interface Deck {
  id: number;
  name: string;
  questions: Question[];
}

export const decks: Deck[] = [
  {
    id: 1,
    name: "História Geral",
    questions: [
      { id: 1, question: "Qual era o nome do líder mongol que criou o maior império contíguo da história?", answer: "Genghis Khan" },
      { id: 2, question: "Em que ano caiu o Império Romano do Ocidente?", answer: "476 d.C." },
      { id: 3, question: "Quem foi o primeiro homem a pisar na Lua?", answer: "Neil Armstrong" },
      { id: 4, question: "Qual dinastia chinesa construiu a Grande Muralha?", answer: "Dinastia Ming" },
      { id: 5, question: "Quem foi o faraó responsável pela construção da Grande Pirâmide de Gizé?", answer: "Quéops" },
      { id: 6, question: "Em que ano teve início a Revolução Francesa?", answer: "1789" },
      { id: 7, question: "Qual foi a principal causa da Primeira Guerra Mundial?", answer: "Assassinato do arquiduque Franz Ferdinand" },
      { id: 8, question: "Quem fundou a cidade de Alexandria no Egito?", answer: "Alexandre, o Grande" },
    ],
  },
  {
    id: 2,
    name: "Geografia",
    questions: [
      { id: 1, question: "Qual é o rio mais extenso do mundo?", answer: "Rio Amazonas" },
      { id: 2, question: "Em qual continente fica o deserto do Saara?", answer: "África" },
      { id: 3, question: "Qual é a capital da Austrália?", answer: "Camberra" },
      { id: 4, question: "Quantos países formam a América do Sul?", answer: "12 países" },
      { id: 5, question: "Qual é a montanha mais alta do mundo?", answer: "Monte Everest" },
      { id: 6, question: "Em que país fica o lago Baikal, o mais profundo do mundo?", answer: "Rússia" },
      { id: 7, question: "Qual oceano banha a costa oeste dos Estados Unidos?", answer: "Oceano Pacífico" },
      { id: 8, question: "Qual é o menor país do mundo em área?", answer: "Vaticano" },
    ],
  },
  {
    id: 3,
    name: "História da Música",
    questions: [
      { id: 1, question: "Quem compôs a 'Nona Sinfonia', conhecida como 'Coral'?", answer: "Ludwig van Beethoven" },
      { id: 2, question: "Qual movimento musical surgiu na década de 1950 nos EUA, misturando blues e country?", answer: "Rock and Roll" },
      { id: 3, question: "Quem foi o compositor austríaco do 'Requiem' em Ré menor?", answer: "Wolfgang Amadeus Mozart" },
      { id: 4, question: "Qual gênero musical nasceu no Brasil com influência africana e portuguesa no século XIX?", answer: "Samba" },
      { id: 5, question: "Quem é considerado o 'Rei do Pop'?", answer: "Michael Jackson" },
      { id: 6, question: "Quais são os 'Quarto B' do jazz (pioneiros do bebop)?", answer: "Bud Powell, Max Roach, Charlie Parker, Dizzy Gillespie" },
      { id: 7, question: "Em que cidade nasceu o Jazz?", answer: "Nova Orleans" },
      { id: 8, question: "Qual compositor russo criou o balé 'O Lago dos Cisnes'?", answer: "Tchaikovsky" },
    ],
  },
  {
    id: 4,
    name: "História da Pintura",
    questions: [
      { id: 1, question: "Quem pintou a 'Mona Lisa'?", answer: "Leonardo da Vinci" },
      { id: 2, question: "Qual movimento artístico foi liderado por Pablo Picasso e Georges Braque?", answer: "Cubismo" },
      { id: 3, question: "Quem pintou o teto da Capela Sistina?", answer: "Michelangelo" },
      { id: 4, question: "Qual artista holandês é conhecido pela obra 'A Noite Estrelada'?", answer: "Vincent van Gogh" },
      { id: 5, question: "Qual movimento brasileiro teve Tarsila do Amaral como principal figura?", answer: "Antropofagia" },
      { id: 6, question: "Quem pintou 'O Grito'?", answer: "Edvard Munch" },
      { id: 7, question: "Qual artista espanhol criou 'Guernica', denunciando a Guerra Civil Espanhola?", answer: "Pablo Picasso" },
      { id: 8, question: "Quem foi o principal representante do Impressionismo francês com 'Impressão, Sol Nascente'?", answer: "Claude Monet" },
    ],
  },
  {
    id: 5,
    name: "Instrumentos Musicais",
    questions: [
      { id: 1, question: "Qual instrumento de cordas possui 47 cordas e é tocado com os dedos?", answer: "Harpa" },
      { id: 2, question: "Qual instrumento de sopro é feito de metal e possui um tubo cônico longo?", answer: "Trompa" },
      { id: 3, question: "Qual instrumento africano de percussão foi trazido ao Brasil pelos escravizados?", answer: "Atabaque" },
      { id: 4, question: "Quantas cordas possui um violino padrão?", answer: "4 cordas" },
      { id: 5, question: "Qual instrumento de teclas teve sua invenção atribuída a Bartolomeo Cristofori?", answer: "Piano" },
      { id: 6, question: "Qual é o maior instrumento de uma orquestra sinfônica?", answer: "Tímpano" },
      { id: 7, question: "Qual instrumento de sopro tem palheta dupla e é comum em orquestras sinfônicas?", answer: "Oboé" },
      { id: 8, question: "Qual instrumento brasileiro de percussão é feito de arame e corpo de madeira?", answer: "Pandeiro" },
    ],
  },
  {
    id: 6,
    name: "Ciência",
    questions: [
      { id: 1, question: "Qual é a fórmula química da água?", answer: "H2O" },
      { id: 2, question: "Qual cientista propôs a teoria da relatividade?", answer: "Albert Einstein" },
      { id: 3, question: "Quantos ossos tem o corpo humano adulto?", answer: "206 ossos" },
      { id: 4, question: "Qual é o maior órgão interno do corpo humano?", answer: "Fígado" },
      { id: 5, question: "Qual é o elemento químico mais abundante no universo?", answer: "Hidrogênio" },
      { id: 6, question: "Qual é a velocidade da luz no vácuo?", answer: "299.792 km/s" },
      { id: 7, question: "Quem descobriu a penicilina?", answer: "Alexander Fleming" },
      { id: 8, question: "Quantos planetas existem no Sistema Solar?", answer: "8 planetas" },
    ],
  },
  {
    id: 7,
    name: "Literatura",
    questions: [
      { id: 1, question: "Quem escreveu 'Dom Quixote'?", answer: "Miguel de Cervantes" },
      { id: 2, question: "Qual escritor brasileiro é autor de 'Dom Casmurro'?", answer: "Machado de Assis" },
      { id: 3, question: "Quem foi a primeira mulher a receber o Nobel de Literatura?", answer: "Selma Lagerlöf" },
      { id: 4, question: "Qual autor inglês escreveu 'Orgulho e Preconceito'?", answer: "Jane Austen" },
      { id: 5, question: "Quem escreveu 'O Pequeno Príncipe'?", answer: "Antoine de Saint-Exupéry" },
      { id: 6, question: "Qual movimento literário brasileiro apresentou o manifesto 'Poesia Pau-Brasil'?", answer: "Modernismo" },
      { id: 7, question: "Quem é o autor de 'Cem Anos de Solidão'?", answer: "Gabriel García Márquez" },
      { id: 8, question: "Qual poeta português escrieu 'Mensagem'?", answer: "Fernando Pessoa" },
    ],
  },
  {
    id: 8,
    name: "Astronomia",
    questions: [
      { id: 1, question: "Qual planeta é conhecido como o 'Planeta Vermelho'?", answer: "Marte" },
      { id: 2, question: "Qual é a estrela mais próxima da Terra?", answer: "Sol" },
      { id: 3, question: "Quantas galáxias existem no Grupo Local?", answer: "Mais de 80 galáxias" },
      { id: 4, question: "Qual é o maior planeta do Sistema Solar?", answer: "Júpiter" },
      { id: 5, question: "Quem propôs o modelo heliocêntrico do Sistema Solar?", answer: "Nicolau Copérnico" },
      { id: 6, question: "Qual planeta possui os anéis mais visíveis?", answer: "Saturno" },
      { id: 7, question: "O que é uma supernova?", answer: "Explosão de uma estrela no final de sua vida" },
      { id: 8, question: "Qual é o nome do primeiro satélite artificial da Terra?", answer: "Sputnik 1" },
    ],
  },
  {
    id: 9,
    name: "Cinema",
    questions: [
      { id: 1, question: "Quem dirigiu 'Cidadão Kane' (1941)?", answer: "Orson Welles" },
      { id: 2, question: "Qual é a linguagem técnica usada para indicar movimento de câmera?", answer: "Travelling" },
      { id: 3, question: "Quais são os principais festivais de cinema do mundo?", answer: "Cannes, Veneza, Berlim" },
      { id: 4, question: "Quem dirigiu o filme 'O Poderoso Chefão'?", answer: "Francis Ford Coppola" },
      { id: 5, question: "Quem criou o estilo 'Cinema Novo' no Brasil?", answer: "Glauber Rocha" },
      { id: 6, question: "Qual diretor argentino venceu o Oscar de 'O Segredo dos Seus Olhos'?", answer: "Juan José Campanella" },
      { id: 7, question: "Quem dirigiu 'Psicose' (1960)?", answer: "Alfred Hitchcock" },
      { id: 8, question: "Qual famoso ator brasileiro esteve em 'Pixote'?", answer: "Fernando Ramos da Silva" },
    ],
  },
  {
    id: 10,
    name: "Mitologia",
    questions: [
      { id: 1, question: "Quem é o deus grego do trovão e rei dos deuses?", answer: "Zeus" },
      { id: 2, question: "Qual herói grego matou a Medusa?", answer: "Perseu" },
      { id: 3, question: "Quem foi a deusa egípcia protetora dos lares e dos filhos?", answer: "Bastet" },
      { id: 4, question: "Qual é a divindade africana das águas venerada no Candomblé?", answer: "Oxum" },
      { id: 5, question: "Qual criatura da mitologia grega era metade homem e metade cavalo?", answer: "Centauro" },
      { id: 6, question: "Qual figura do folclore brasileiro protege a floresta?", answer: "Caipora" },
      { id: 7, question: "Na mitologia nórdica, que ser é o filho de Loki, meio deus, meio gigante?", answer: "Baldur" },
      { id: 8, question: "Qual herói da mitologia grega realizou os 'Doze Trabalhos'?", answer: "Hércules" },
    ],
  },
];
