const settingsBtn = document.getElementById("settings-btn")
const settingsModal = document.getElementById("settings-modal")
const timer = document.getElementById("timer")
const pomodoroSetting = document.getElementById("pomodoro")
const form = document.getElementById("settings-form")
const modeBtns = document.getElementsByClassName("tab")
const actionBtns = document.getElementsByClassName("action")
const startBtn = document.getElementById("start-btn")

startBtn.addEventListener("click", startTimer)

//modes as an array
let modes = [
    {mode:"pomodoro", time: [3,3]},
    {mode:"shortBreak", time: [4,4]},
    {mode:"longBreak", time: [5,5]}
]


//event listeners for tabs buttons
Array.from(modeBtns).forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

//event listeners for action buttons
Array.from(actionBtns).forEach(button => {button.addEventListener("click", handleAction)})

function handleButtonClick(event){
    console.log(event.target.id)


    //switch active tab
    for (let btn of modeBtns){
        btn.classList.remove("active")
    }

    document.getElementById(event.target.id).classList.add("active")


        if(event.target.id == "short-break-btn"){
        shortBreakMode()
    } else if(event.target.id == "long-break-btn"){
        longBreakMode()
    } else if(event.target.id == "pomodoro-btn"){
        pomodoroMode()
    }

}


//DEFAULT values
let currentTimer = []
let pomodoro = [3,3]
let shortBreak = 5
let longBreak = 15
let color = 'red'
let font = "font-sans"

let seconds
let currentMode = "pomodoro"
let interval;


// Load defualt on opening
currentTimer = pomodoro
displayTime(pomodoro)
//timer.innerText = displayTime(pomodoro)





//opening and closing modal
settingsBtn.addEventListener("click", function () { settingsModal.style.display = "block" })
function closeModal (){
    settingsModal.style.display = "none"
}

//Loading values
//If stored in local storage


//Else create a local storage record with refault presets




//Pomodoro mode
function pomodoroMode(){
    currentTimer = pomodoro
    displayTime(currentTimer)
}

//Short break mode
function shortBreakMode(){
timer.innerText = shortBreak+":00"
}

//Long break Mode
function longBreakMode(){
timer.innerText = longBreak+":00"
}




//disabling default behaviour of form button
form.addEventListener("submit", function(e){
    e.preventDefault();
    updateSettings(e)
    settingsModal.style.display ='none'
})


function updateSettings(e){


        console.log(e.target.color.value)
    console.log(e.target.font.value)
    console.log(e.target.pomodoro.value)
    console.log(e.target.shortBreak.value)
    console.log(e.target.longBreak.value)
}

//start timer
function startTimer(){
    console.log("time counting")
    if(currentTimer[1] > 0 || currentTimer[0] > 0){
        reduceASecond()
interval = setInterval(reduceASecond,1000)
    }
    
}

function reduceASecond(){
    console.log("counting")
    if (currentTimer[1] > 0){
        currentTimer[1]--
    }else if(currentTimer[1] == 0 && currentTimer[0] >= 1){
        currentTimer[0]--
        currentTimer[1] = 59

    }else if (currentTimer[1] == 0 && currentTimer[0] == 0){
        clearInterval(interval)
    }

    displayTime(currentTimer)
}


//Function to return the correct time format to display as a string

function displayTime(timearray){
    let seconds = ""
    if(timearray[1] < 10){
        seconds = "0" + timearray[1]
    } else {
        seconds = timearray[1]
    }

    timer.innerText =  timearray[0] +":"+ seconds
}

//counter states management
function handleAction(event){
    //hide the clicked button
    document.getElementById(event.target.id).style.display = "none"
if(event.target.id == "start-btn"){
    document.getElementById("pause-btn").style.display = "block"
    document.getElementById("restart-btn").style.display = "none"
    
}
if(event.target.id == "pause-btn"){
    clearInterval(interval)
    document.getElementById("start-btn").style.display = "block"
    document.getElementById("restart-btn").style.display = "block"
    
}
}