const settingsBtn = document.getElementById("settings-btn")
const settingsModal = document.getElementById("settings-modal")
const timer = document.getElementById("timer")
const pomodoroSetting = document.getElementById("pomodoro")
const form = document.getElementById("settings-form")
const modeBtns = document.getElementsByClassName("tab")
const startBtn = document.getElementById("start-btn")

startBtn.addEventListener("click", startTimer)


//event listeners for tabs buttons
Array.from(modeBtns).forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

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
let pomodoro = 23
let shortBreak = 5
let longBreak = 15
let color = 'red'
let font = "font-sans"

let seconds
let currentMode = "pomodoro"


// Load defualt on opening
timer.innerText = pomodoro + ":00"





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
    timer.innerText = pomodoro + ":00"
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
}