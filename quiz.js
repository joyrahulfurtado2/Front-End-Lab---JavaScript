function Quiz(questions){
    this.questions = questions;
    this.score=0;
    this.quesIndex =0;
}

function Question(questionText, options, answer){
    this.questionText=questionText;
    this.options=options;
    this.answer=answer;
}

let questions = [
    new Question("JavaScript supports ____",["Functions", "XHTML","HTML","CSS"],"Functions"),
    new Question("CSS stands for ___",["Cascading Style Sheet", "Cascading style script", "Class Style Sheet","Color Style Sheet"],"Cascading Style Sheet"),
    new Question("An HTML document can contain ___",["Attributes","Tags","Raw text","All of the above"],"All of the above"),
    new Question("A page designed in HTML is called ___",["Application","Cover page","Front-end","Web Page"],"Web Page"),
    new Question("An HTML document is saved with the ____ extension",[".htl",".htl",".hml",".html"],".html")
]

let quiz = new Quiz(questions)

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.quesIndex];
}

Quiz.prototype.checkUserAttempt = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.quesIndex++;
}

Question.prototype.isCorrectAnswer = function(choice){
    return choice === this.answer
}

Quiz.prototype.isEnded = function() {
    return this.quesIndex === this.questions.length;
}

function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    } else {
        let elem = document.getElementById("question");
        elem.innerHTML = quiz.getQuestionByIndex().questionText;

        let options = quiz.getQuestionByIndex().options;
        for(let i=0;i<options.length; i++){
            let eachOption = document.getElementById("choice" + i);
            eachOption.innerText = options[i];
            handleOptionBtn("btn"+i, options[i]);
        }
        showProgress();
    }
}

function showScores() {
    let endResult = "<h1>Result</h1>";
    endResult += "<h2 id='score'> Your score is :"+ quiz.score +" and Percentage is: "+ (quiz.score/questions.length*100) + "%</h2>";
    let elem = document.getElementById("quiz");
    elem.innerHTML = endResult;
}

function handleOptionBtn(id, currentOption) {
    let btn = document.getElementById(id);
    btn.onclick = function() {
        quiz.checkUserAttempt(currentOption);
        loadQuestions();
    }
}

function showProgress(){
    let currentQuestionNumber = quiz.quesIndex+1;
    let elem = document.getElementById("progress");
    elem.innerHTML = "Question "+ currentQuestionNumber + " of "+ quiz.questions.length
}

loadQuestions();