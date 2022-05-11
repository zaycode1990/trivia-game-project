document.addEventListener("DOMContentLoaded", () =>
{const game = document.getElementById('game-interface')
 const scoreDisplay = document.getElementById('score')

 let scoreCount = 0
 const nerdTopicArr = [
     {
         name: 'Computers',
         id: '18'
     },

     {
        name: 'Math',
        id: '19'

     },

     {
         name: 'Video Games',
         id: '15'
     },

     {
         name: 'Anime/Manga',
         id: "31"
     }
 ]
 const difficulty = ['easy', 'medium', 'hard']
//  array to set diffulty to interpolate into the fetch url that I will use to generate cards
 function addTopic(arr) {
    const column = document.createElement('div')
    column.classList = "genre-column"
    column.style.textAlign = "center"
    column.textContent = arr.name
    game.append(column)
    /*addTopic function will create a column that will hold the four generated cards in it's own div
    I used flexbox  display: flex;
    flex-direction: column;
    text-align: center;
    to create the column, a method I learned from Scrimba
    I had to align the text within the function for some reason it wasn't working when I did it in CSS
    */
    

    difficulty.forEach(diff =>{ 
         const card = document.createElement('div')
         card.classList.add('game-card')
        column.append(card)

        if(diff === 'easy') {
            card.innerText = 100
            card.style.color = "black"
        }
        if(diff === 'medium') {
            card.innerText = 200
            card.style.color = "black"
        }

        if(diff === 'hard') {
            card.innerText = 300
            card.style.color = "black"
        }
        /* this for each creates a card and adds a class of 'game-card' to add style from CSS
         the card is binded to the array of difficulty levels in order to create potential points
         to user in relation to the difficulty on the webpage */
        fetch(`https://opentdb.com/api.php?amount=1&category=${arr.id}&difficulty=${diff}&type=boolean`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            card.setAttribute("game-question",data.results[0].question)
            card.setAttribute("game-answer", data.results[0].correct_answer)
            card.setAttribute("points", card.innerText.substring(0,3))
            card.addEventListener('click', revealCard)
        })
        /* we fetch each time and for each card created we create a column of cards with each assign an id for a different topic via 
        the nerdTopicArr  then we setAtrribute to get the question found in the data array of object with .dot notation,
        same with the game answer and the points. the substring is there to let points atrribute only be the string of numbers
        The eventListener will be assigned to each card and the click will have a function that will reveal the question
        present true and false buttons*/
    })
}

nerdTopicArr.forEach(topic => addTopic(topic))
// For each card this sets the id of the nerdTopicArr to the fetch url category

function revealCard() {
    console.log('clicked')
    const questionDisplay = document.createElement('div')
    const trueBtn = document.createElement('button')    
    const falseBtn = document.createElement('button')
    questionDisplay.innerHTML = this.getAttribute("game-question")
    trueBtn.textContent = 'True'
    falseBtn.textContent = 'False'
    trueBtn.addEventListener('click', getResult)
    falseBtn.addEventListener('click', getResult)
    this.append(questionDisplay, trueBtn, falseBtn)

    /* in the reveal card we use the getAttribute method to display the data we receive from the json
    into the card, the user will respond to the question with a click of the true or false button */

   const allCards = Array.from(document.querySelectorAll('.game-card'))
   allCards.forEach(gameCard =>gameCard.removeEventListener('click',revealCard))
    
}
 function getResult() {
const allCards = Array.from(document.querySelectorAll('.game-card'))
allCards.forEach(card => card.addEventListener('click', revealCard))
    
     
     const buttonParent = this.parentNode
     
     if (buttonParent.getAttribute("game-answer") === this.textContent) {
         scoreCount = scoreCount + parseInt(buttonParent.getAttribute('points'))
         scoreDisplay.textContent = scoreCount
         buttonParent.classList.add("correct_answer")
         console.log(buttonParent)

         setTimeout(()=> {
            while (buttonParent.firstChild) {
                buttonParent.removeChild(buttonParent.lastChild)
            }
            buttonParent.innerHTML = buttonParent.getAttribute('data-value')
        }, 100)
     } else {
         buttonParent.classList.add('wrong_answer')
         setTimeout(()=>{
             while(buttonParent.firstChild) {
                 buttonParent.removeChild(buttonParent.lastChild)
             }
         }, 100)
         
     }
 buttonParent.removeEventListener('click',revealCard)
    
}

 
})
 
