document.querySelector('#reset-btn').style.display = 'none';

game_time = 25 // seconds for game

const timeLeft = document.querySelector('#time-left')

timeLeft.textContent = game_time


function runBoard(start_time, reset_score){


    // try{
    //     clearTimeout(myTimeout);
    // }



    
    const square = document.querySelectorAll('.square')

    const mole = document.querySelectorAll('.mole')

    //const timeLeft = document.querySelector('#time-left')

    //alert(parseInt(timeLeft.innerText))

    if ( parseInt(timeLeft.innerText) <  start_time | parseInt(timeLeft.innerText > 0) ){ // prevent running runBoard while game is going
        return;
    }

    let score = document.querySelector('#score')

    let result = 0

    if (reset_score === true) {

        //alert(reset_score)
        score.textContent = 0
    }
    else{


        result = document.querySelector('#score').innerText
        result = parseInt(result)
        //alert(result)

    }

    function moleRemove(){
        square.forEach(className => {
            className.classList.remove('mole')
        })
        } 

    

    let currentTime = start_time //timeLeft.textContent

    let last_square = null // save to make sure square is not the same as before

    function randomSquare(){

        if (currentTime <= 0){

            clearInterval(timerIdMove)
        
            }

        

        moleRemove()

        function grabRand(){

            
            randNum = Math.floor(Math.random() * 9)
            
            let randomPosition = square[Math.floor(Math.random() * 9)]


            if (last_square  === randomPosition.id){

               

                console.log('===')

                randomPosition = grabRand()

            }
            return  randomPosition

        }

        randPos = grabRand()


        randPos.classList.add('mole')
        // assign the id of the rand posti to hit position for the use later

        hitPostion = randPos.id

        last_square = randPos.id

    }

    square.forEach(id => {

        id.addEventListener('mouseup', ()=> {

            if(id.id == hitPostion & currentTime > 0){
            result = result + 1
            score.textContent = result
        }
        })
        
    })

    function moveMole(){
        let timerIdMove = null
        this.timerIdMove = this.setInterval(randomSquare, 850)

    }


    moveMole()

    function countDown(){
        currentTime--
        timeLeft.textContent = currentTime

        if (currentTime === 0){

            clearInterval(timerIdMove)
            clearInterval(timerId)
            alert('Game Over!!! Your final score is '+ result)
            moleRemove()

            start_btn.textContent = "Play Again"
            

            myTimeout = setTimeout(()=>{timeLeft.textContent = start_time}, 1250);

            document.querySelector('#reset-btn').style.display = "inline";


        }
    }


    let timerId = setInterval(countDown, 1000)

}


const start_btn = document.querySelector("#start-btn")


  start_btn.addEventListener('click', function(e){
       
        runBoard(game_time, false)  // runBoard(start_time, reset_score)
      
})



const reset_btn = document.querySelector("#reset-btn")

    reset_btn.addEventListener('click', function(e){
    
        runBoard(game_time, true)  // runBoard(start_time, reset_score)
    
})
