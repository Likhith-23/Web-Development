const questions = [
    { q: "What is the capital of France?", options: ["Paris", "London", "Rome"], answer: "Paris" },
    { q: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth"], answer: "Mercury" },
    { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
    { q: "CSS is used for?", options: ["Styling", "Programming", "Database"], answer: "Styling" },
    { q: "JavaScript is a ___ language.", options: ["Programming", "Markup", "Styling"], answer: "Programming" },
    { q: "Water boils at what temperature (°C)?", options: ["90", "100", "120"], answer: "100" },
    { q: "The Moon is a planet. True or False?", options: ["True", "False"], answer: "False" },
    { q: "Select the fruit:", options: ["Potato", "Apple", "Carrot"], answer: "Apple" },
    { q: "Which is a JavaScript framework?", options: ["React", "Laravel", "Django"], answer: "React" },
    { q: "What is 5 + 3?", options: ["7", "8", "9"], answer: "8" }
];

let currentQuestion = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    quizEl.innerHTML = "";
    const question = questions[currentQuestion];
    const qEl = document.createElement("h3");
    qEl.textContent = question.q;
    quizEl.appendChild(qEl);

    question.options.forEach(opt => {
        const btn = document.createElement("div");
        btn.classList.add("option");
        btn.textContent = opt;
        btn.addEventListener("click", () => selectOption(opt));
        quizEl.appendChild(btn);
    });
}

function selectOption(selected) {
    const correct = questions[currentQuestion].answer;
    if (selected === correct) score++;
    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        showResult();
    }
});

function showResult() {
    document.querySelector(".quiz-container").classList.add("hidden");
    resultEl.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hidden");
    document.querySelector(".quiz-container").classList.remove("hidden");
    loadQuestion();
    nextBtn.style.display = "none";
});

nextBtn.style.display = "none";
loadQuestion();
