const questions = [
    {
        type: "multiple-choice",
        question: "1. What is TypeScript?",
        options: [
            "A typed superset of JavaScript",
            "A database system",
            "A CSS framework",
            "An operating system"
        ],
        correctAnswer: 0,
        explanation: "TypeScript builds on JavaScript and adds static typing."
    },
    {
        type: "multiple-choice",
        question: "2. Which file extension is normally used for TypeScript files?",
        options: [".html", ".css", ".ts", ".txt"],
        correctAnswer: 2,
        explanation: "TypeScript source files normally use the .ts extension."
    },
    {
        type: "multiple-choice",
        question: "3. Which type stores text such as a person's name?",
        options: ["number", "string", "boolean", "void"],
        correctAnswer: 1,
        explanation: "The string type represents text."
    },
    {
        type: "multiple-choice",
        question: "4. Which declaration correctly stores the number 20?",
        options: [
            "let age: string = 20;",
            "let age: boolean = 20;",
            "let age: number = 20;",
            'let age: number = "20";'
        ],
        correctAnswer: 2,
        explanation: "The number type matches the numeric value 20."
    },
    {
        type: "multiple-choice",
        question: "5. What is the main purpose of an interface in TypeScript?",
        options: [
            "To style a web page",
            "To describe the structure of an object",
            "To create a database automatically",
            "To compile CSS into HTML"
        ],
        correctAnswer: 1,
        explanation: "An interface describes expected properties and their types."
    },
    {
        type: "boolean",
        question: "6. The boolean type represents true or false values.",
        options: [true, false],
        correctAnswer: true,
        explanation: "Boolean represents the logical values true and false."
    },
    {
        type: "boolean",
        question: "7. TypeScript source files normally use the .css extension.",
        options: [true, false],
        correctAnswer: false,
        explanation: "TypeScript files normally use .ts; CSS files use .css."
    },
    {
        type: "boolean",
        question: "8. The type string[] can represent an array of strings.",
        options: [true, false],
        correctAnswer: true,
        explanation: "String[] represents an array whose elements are strings."
    },
    {
        type: "boolean",
        question: "9. Running tsc script.ts can compile TypeScript into JavaScript.",
        options: [true, false],
        correctAnswer: true,
        explanation: "The tsc command runs the TypeScript compiler."
    },
    {
        type: "boolean",
        question: "10. TypeScript can detect some type-related errors before a program runs.",
        options: [true, false],
        correctAnswer: true,
        explanation: "Type checking can identify many type mismatches before runtime."
    }
];
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");
const progressFill = document.getElementById("progressFill");
const feedbackElement = document.getElementById("feedback");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const quizArea = document.getElementById("quizArea");
const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("finalScore");
const messageElement = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
let currentQuestion = 0;
let score = 0;
let selectedAnswerIndex = null;
let answerSubmitted = false;
function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;
    scoreElement.textContent = `Score: ${score}`;
    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";
    feedbackElement.className = "";
    selectedAnswerIndex = null;
    answerSubmitted = false;
    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        
        button.textContent =
            typeof option === "boolean"
                ? option ? "True" : "False"
                : option;
        button.addEventListener("click", () => {
            if (answerSubmitted) {
                return;
            }
            selectedAnswerIndex = index;
            document.querySelectorAll(".option-btn").forEach((item) => {
                item.classList.remove("selected");
            });
            button.classList.add("selected");
        });
        optionsElement.appendChild(button);
    });
    submitBtn.hidden = false;
    nextBtn.hidden = true;
}
function checkAnswer() {
    if (selectedAnswerIndex === null) {
        feedbackElement.textContent = "Please select an answer first.";
        feedbackElement.className = "incorrect";
        return;
    }
    if (answerSubmitted) {
        return;
    }
    const q = questions[currentQuestion];
    let isCorrect;
    if (q.type === "multiple-choice") {
        isCorrect = selectedAnswerIndex === q.correctAnswer;
    }
    else {
        isCorrect =
            q.options[selectedAnswerIndex] === q.correctAnswer;
    }
    if (isCorrect) {
        score++;
        feedbackElement.textContent =
            `Correct! ${q.explanation}`;
        feedbackElement.className = "correct";
    }
    else {
        feedbackElement.textContent =
            `Incorrect. ${q.explanation}`;
        feedbackElement.className = "incorrect";
    }
    scoreElement.textContent = `Score: ${score}`;
    answerSubmitted = true;
    document.querySelectorAll(".option-btn").forEach((item, index) => {
        const button = item;
        let isCorrectOption;
        if (q.type === "multiple-choice") {
            isCorrectOption = index === q.correctAnswer;
        }
        else {
            isCorrectOption =
                q.options[index] === q.correctAnswer;
        }
        if (isCorrectOption) {
            button.classList.add("correct");
        }
        else if (index === selectedAnswerIndex) {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    submitBtn.hidden = true;
    nextBtn.hidden = false;
    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "View Results"
            : "Next Question";
}
function nextQuestion() {
    if (!answerSubmitted) {
        return;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    }
    else {
        showResults();
    }
}
function showResults() {
    quizArea.hidden = true;
    resultElement.hidden = false;
    finalScoreElement.textContent =
        `You scored ${score} out of ${questions.length}!`;
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
        messageElement.textContent =
            "Excellent work! You understand TypeScript well.";
    }
    else if (percentage >= 50) {
        messageElement.textContent =
            "Good effort! Keep practising TypeScript.";
    }
    else {
        messageElement.textContent =
            "Keep learning! Review the questions and try again.";
    }
}
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswerIndex = null;
    answerSubmitted = false;
    resultElement.hidden = true;
    quizArea.hidden = false;
    loadQuestion();
}
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);
loadQuestion();
export {};
