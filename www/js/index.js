(function(){

    var data = {
        quizContent: [
            {
                question: "What does a nosey pepper do?",
                answer1: "Sneeze",
                answer2: "Annoys the pepper family",
                answer3: "Gets Ja-la-peno business",
                fact:"Gets Ja-la-peno business",
                correctAnswer: 3
            },
            {
                question: "Whats the difference between a guitar and a fish?",
                answer1: "You can't tuna fish",
                answer2: "Fish smells",
                answer3: "Fish don't get played",
                fact:"You can't tuna fish",
                correctAnswer: 1
            },
            {
                question:  "What do you get from a pampered cow?",
                answer1: "Milk Shake",
                answer2: "Spoiled Milk",
                answer3: "Moo-ouse",
                fact:"Spoiled Milk",
                correctAnswer: 2
            },
            {
                question: "What do you call security guards working outside Samsung shops?",
                answer1: "sleeping guards",
                answer2: "Guardians of the Galaxy",
                answer3: "Guards on duty",
                fact:"Guardians of the Galaxy",
                correctAnswer: 2
            },
            {
                question  : "Where did the computer go to dance?",
                answer1: "Software club",
                answer2: "Silicon Valley",
                answer3: "To a Disc-o",
                fact:"To a Disc-o",
                correctAnswer: 3
            }
        ],
        points: 0
    };
    
    var display = {
        getApp: document.getElementById('app'),

        // Updates DOM on start/restart of the quiz
        mainPage: function() {
            var newEl = '<div class="quest-number"><p id="questNumber"></p></div><h1 id="questionDisplay" class="h3"></h1>';
                newEl += '<ul><li><label><input type="radio" name="answers" id="input1" value="1"><span class="outer"><span class="inner"></span></span><div id="answerDisplay1"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input2" value="2"><span class="outer"><span class="inner"></span></span><div id="answerDisplay2"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input3" value="3"><span class="outer"><span class="inner"></span></span><div id="answerDisplay3"></div></label></li></ul>';

                newEl += '<div class="points-wrap"><p id="currentPoints"></p></div>';

            this.getApp.innerHTML = newEl;
        },

        // Updates DOM with each question
        updateMainPage: function() {
            var getQuestNumber = document.getElementById('questNumber'),
                getQuestion = document.getElementById('questionDisplay'),
                getAnswer1 = document.getElementById('answerDisplay1'),
                getAnswer2 = document.getElementById('answerDisplay2'),
                getAnswer3 = document.getElementById('answerDisplay3'),

                getCurrentPoints = document.getElementById('currentPoints'),
                sumOfQuestions = data.quizContent.length;
                
            getQuestNumber.innerHTML = control.count + 1 + '/' + sumOfQuestions;
            getQuestion.innerHTML = data.quizContent[control.count].question;
            getAnswer1.innerHTML = data.quizContent[control.count].answer1;
            getAnswer2.innerHTML = data.quizContent[control.count].answer2;
            getAnswer3.innerHTML = data.quizContent[control.count].answer3;

            getCurrentPoints.innerHTML = 'Points:' + ' ' + data.points;
            this.newElement('button', 'submit', 'Submit Answer');
        },
        addAnswer: function(showMessage) {
            var sumOfQuestions = data.quizContent.length;

            if(showMessage === 'correct') {
                this.newElement('p', 'showAnswer', 'You got that riii...gghhht!HAHA');
            } else {
                
                var x=data.quizContent[control.count].fact
              
                
                
                this.newElement('p', 'showAnswer', 'Awww ! Sorry it is '+x+' .HAHA !' );
            }

            if (control.count < sumOfQuestions - 1) {
                this.newElement('button', 'nextQuest', 'Next question');
            } else {
                this.newElement('button', 'result', 'See your result');
            }
        },
        removeAnswer: function(event) {
            var getShowAnswer = document.getElementById('showAnswer');
            var getShowAnswerParent = getShowAnswer.parentNode;
            getShowAnswerParent.removeChild(getShowAnswer);
            var clickedEl = event.target;
            var clickedElParent = clickedEl.parentNode;
            clickedElParent.removeChild(clickedEl);
            var radioButtons = document.getElementsByName('answers');
            var allRadioButtons = radioButtons.length;
            var i;

            for(i = 0; i < allRadioButtons; i++) {
                radioButtons[i].checked = false;
            }
        },

        // Displays final page of the quiz
        resultPage: function() {
            this.getApp.innerHTML = '<h1 class="h3">You have ' + data.points + ' question(s) answered correctly</h1>';
            this.newElement('button', 'restart', 'Restart Quiz');
        },
        newElement: function(elem, elemId, elemText) {
            var newElem = document.createElement(elem);
            var newElemText = document.createTextNode(elemText);
            newElem.appendChild(newElemText);
            newElem.id = elemId;
            this.getApp.appendChild(newElem);
        }
    };

    var control = {
        init: function() {
            var start = document.getElementById('start') || document.getElementById('restart');
            start.addEventListener('click', function() {
                display.mainPage();
                control.update();
            }, false);
        },
        update: function() {
            display.updateMainPage();
            var submit = document.getElementById('submit');
            submit.addEventListener('click', this.checkAnswer, false);
        },

        /**
        * Alerts if none of the radios is checked on submit 
        * Verifies correct/incorrect answer
        * Directs quiz to the next question or to the final page
        */
        checkAnswer: function(event) {
            var radioButtons = document.getElementsByName('answers'),
                allRadioButtons = radioButtons.length,
                isChecked = false,
                checkedRadio,
                clickedEl = event.target,
                clickedElParent = clickedEl.parentNode,
                i;

            for (i = 0; i < allRadioButtons; i++) {
                if (radioButtons[i].checked) {
                    isChecked = true;
                    checkedRadio = +radioButtons[i].value;
                }
            }

            if (isChecked === false) {
                alert('Please choose the answer!');
            } else {
                clickedElParent.removeChild(clickedEl);
                if (checkedRadio === data.quizContent[control.count].correctAnswer) {
                    display.addAnswer('correct');
                    data.points++;
                } else {
                    display.addAnswer();
                }

                var nextQuestion = document.getElementById('nextQuest'),
                    result = document.getElementById('result');

                if (nextQuestion) {
                    nextQuestion.addEventListener('click', function(event) {
                        control.count++;
                        display.removeAnswer(event);
                        control.update();
                    }, false);
                } else {
                    result.addEventListener('click', function() {
                        display.resultPage();
                        control.init();
                        control.count = 0;
                        data.points = 0;
                    }, false);
                }
            }
        },

        // Used for incrementing/looping through the quiz questions and answers
        count: 0
    };

    control.init();

})();
