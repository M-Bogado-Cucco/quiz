/*
Which is the most widely spoken language in the world ?
Spanish, Mandarin, English, German  (Mandarin)


"Which is the only continent in the world without a desert ?"
"North America", "Asia", "Africa", "Europe"  (Europe)

"Who invented Computer ?"
"Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"
("Charles Babbage")

*/

// const quizDisplay = document.getElementById("display")
let timeLeft = document.querySelector(".time-left")
let quizContainer = document.getElementById("container")
let nextBtn = document.getElementById("next-button")
let countOfQuestion = document.querySelector(".number-of-question")
let displayContainer = document.getElementById("display-container")
let scoreContainer = document.querySelector(".score-container")
let restart = document.getElementById("restart")
let userScore = document.getElementById("user-score")
let startScreen = document.querySelector(".start-screen")
let startButton = document.getElementById("start-button")
let questionCount
let scoreCount = 0
let count = 21
let countdown


// Questions and Options array
const quizArray = [
  {id: "0", question: "Which is the most widely spoken language in the world ?", options: ["Spanish", "Mandarin", "English", "German"], correct: "Mandarin"},
  {id: "1", question: "Which is the only continent in the world without a desert ?", options: ["North America", "Asia", "Africa", "Europe"], correct: "Europe"},
  {id: "2", question: "Who invented Computer ?", options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"], correct: "Charles Babbage"}
]

//restart quiz
restart.addEventListener("click", () => {
  initial()
  displayContainer.classList.remove("hide")
  scoreContainer.classList.add("hide")
})

//next button
nextBtn.addEventListener("click", (displayNext = () => {
    questionCount++
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide")
      scoreContainer.classList.remove("hide")
      //user score
      userScore.innerHTML = "Você conseguiu " + scoreCount + " acertos de " + quizArray.length + " perguntas" 
    }
    else {
      //if not last question
      countOfQuestion.innerHTML = questionCount+1 + " de " + quizArray.length + " questões"

      //display quiz
      quizDisplay(questionCount)
      count = 21
      clearInterval(countdown)
      timerDisplay()
    }
  })
)

// timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--
    timeLeft.innerHTML = `${count}s`
    if (count === 0) {
      clearInterval(countdown)
      displayNext()
    }
  }, 1000)
}

// display quiz
const quizDisplay = questionCount => {
  let quizCards = document.querySelectorAll(".container-mid")
  //hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide")
  })
  //display current question card
  quizCards[questionCount].classList.remove("hide")
}


//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5)
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5)
    // quiz card creation
    let div = document.createElement("div")
    div.classList.add("container-mid", "hide")
    //question number
    countOfQuestion.innerHTML = 1 + " de " + quizArray.length + " questões"
    //question
    let question_DIV = document.createElement("p")
    question_DIV.classList.add("question")
    question_DIV.innerHTML = i.question
    div.appendChild(question_DIV)
    //options
    div.innerHTML += `
      <button class="option-div" onclick="checker(this)">${i.options[0]}
      </button>
      <button class="option-div" onclick="checker(this)">${i.options[1]}
      </button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}
      </button>
      <button class="option-div" onclick="checker(this)">${i.options[3]}
      </button>
    `
    quizContainer.appendChild(div)
  }
}

// checker function -> to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText
  let question = document.getElementsByClassName("container-mid")[questionCount]
  let options = question.querySelectorAll(".option-div")
  
  //if choicer user == correct option
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct")
    scoreCount++
  }
  else {
    userOption.classList.add("incorrect")
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct")
      }
    })
  } 
  //clear Interval (stop timer)
  clearInterval(countdown)
  //disable all options
  options.forEach((element) => {
    element.disabled = true
  })
}



//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0
  scoreCount = 0
  count = 21
  clearInterval(countdown)
  timerDisplay()
  quizCreator();
  quizDisplay(questionCount)
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide")
  displayContainer.classList.remove("hide")
  initial()
})


//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide")
  displayContainer.classList.add("hide")
}