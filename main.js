const settingsBtn = document.getElementById("settings-btn")
const settingsModal = document.getElementById("settings-modal")
const timer = document.getElementById("timer")
const pomodoroSetting = document.getElementById("pomodoro")
const shortBreakSetting = document.getElementById("shortBreak")
const longBreakSetting = document.getElementById("longBreak")
const form = document.getElementById("settings-form")
const modeBtns = document.getElementsByClassName("tab")
const actionBtns = document.getElementsByClassName("action")
const startBtn = document.getElementById("start-btn")
let pomodoroApp = {
    activeMode: 2,
    modes: [
        {mode:"pomodoro", setTime: [25,0], remTime:[25,0]},
        {mode:"shortBreak", setTime: [5,0], remTime:[5,0]},
        {mode:"longBreak", setTime: [15,0], remTime:[15,0]}
    ],
    activeColor:1,
    colors: [
        {color: "red", code:"hsl(var(--red-400))"},
        {color: "cyan", code:"hsl(var(--cyan-300))"},
        {color: "purple", code:"hsl(var(--purple-400))"}
    ],
    activeFont:0,
    fonts:[
        {font:"font-sans",classes:{timer:"tp1f1",action:"tp2f1",tab:"tp3f1"}},
        {font:"font-serif",classes:{timer:"tp1f2",action:"tp2f2",tab:"tp3f2"}},
        {font: "font-mono",classes:{timer:"tp1f3",action:"tp2f3",tab:"tp3f3"}}

    ]
}
let interval




//How about we pseudo code first
//1. First we check if modes are already stored with previous values
    if(JSON.parse(localStorage.getItem("pomodoroAppModes")) != null){
    pomodoroApp = JSON.parse(localStorage.getItem("pomodoroAppModes"))
    console.log(pomodoroApp.modes[0])
}
//LATER PART - 2. check if settings are stored


//3. load settings
pomodoroSetting.value = pomodoroApp.modes[0].setTime[0]
shortBreakSetting.value = pomodoroApp.modes[1].setTime[0]
longBreakSetting.value = pomodoroApp.modes[2].setTime[0]
form.font.value = pomodoroApp.activeFont
form.color.value = pomodoroApp.activeColor




// 4. Load active mode (default 0)
switchMode(pomodoroApp.modes[pomodoroApp.activeMode].slice)
document.getElementById("progress-bar").style.stroke = pomodoroApp.colors[pomodoroApp.activeColor].code
updateFonts()
    //apply mode values to DOM in the function










//event listeners for tabs buttons
Array.from(modeBtns).forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event){

        if(event.target.id == "short-break-btn"){
        //shortBreakMode()
        switchMode(1)
    } else if(event.target.id == "long-break-btn"){
        switchMode(2)
    } else if(event.target.id == "pomodoro-btn"){
        //pomodoroMode()
        switchMode(0)
    }
}






//event listeners for action buttons
Array.from(actionBtns).forEach(button => {button.addEventListener("click", handleAction)})
Array.from(actionBtns).forEach(button => {button.addEventListener("mouseover", actionhovercolor)})
Array.from(actionBtns).forEach(button => {button.addEventListener("mouseout", mouseoutcolor)})

function mouseoutcolor(event){
    document.getElementById(event.target.id).style.color = "hsl(var(--blue-100))"

}

function actionhovercolor(event){
    console.log(event.target.id)
    document.getElementById(event.target.id).style.color = pomodoroApp.colors[pomodoroApp.activeColor].code

}

//start timer
function startTimer(){
    console.log("time counting")
    if(pomodoroApp.modes[pomodoroApp.activeMode].remTime[1] > 0 || pomodoroApp.modes[pomodoroApp.activeMode].remTime[0] > 0){
        reduceASecond()
interval = setInterval(reduceASecond,1000)
    }
    
}

function reduceASecond(){
    if (pomodoroApp.modes[pomodoroApp.activeMode].remTime[1] > 0){
        pomodoroApp.modes[pomodoroApp.activeMode].remTime[1]--
    }else if(pomodoroApp.modes[pomodoroApp.activeMode].remTime[1] == 0 && pomodoroApp.modes[pomodoroApp.activeMode].remTime[0] >= 1){
        pomodoroApp.modes[pomodoroApp.activeMode].remTime[0]--
        pomodoroApp.modes[pomodoroApp.activeMode].remTime[1] = 59

    }else if (pomodoroApp.modes[pomodoroApp.activeMode].remTime[1] == 0 && pomodoroApp.modes[pomodoroApp.activeMode].remTime[0] == 0){
        clearInterval(interval)
        save()
        updateState()
    }

    displayTime(pomodoroApp.modes[pomodoroApp.activeMode].remTime)
    
}


//Function to return the correct time format to display as a string

function displayTime(timearray){
    let seconds = ""
    let minutes = ""
    if(timearray[1] < 10){
        seconds = "0" + timearray[1]
    } else {
        seconds = timearray[1]
    }

        if(timearray[0] < 10){
        minutes = "0" + timearray[0]
    } else {
        minutes = timearray[0]
    }

    updateProgress()

    timer.innerText =  minutes +":"+ seconds
}
// END of time format function


//counter states management
function handleAction(event){
    //hide the clicked button
    document.getElementById(event.target.id).style.display = "none"
if(event.target.id == "start-btn"){
    startTimer()
    document.getElementById("pause-btn").style.display = "block"
    document.getElementById("restart-btn").style.display = "none"
    
}
if(event.target.id == "pause-btn"){
    pausetimer()
    document.getElementById("start-btn").style.display = "block"
    document.getElementById("restart-btn").style.display = "block"
}

if(event.target.id == "restart-btn"){
     if(pomodoroApp.modes[pomodoroApp.activeMode].remTime != pomodoroApp.modes[pomodoroApp.activeMode].setTime)
        {
         (pomodoroApp.modes[pomodoroApp.activeMode].remTime = pomodoroApp.modes[pomodoroApp.activeMode].setTime.slice())
     }

    displayTime(pomodoroApp.modes[pomodoroApp.activeMode].remTime)
    document.getElementById("start-btn").style.display = "block"
    save()
}
}
// END of counter states management

//In case of a pause or a restart event
function pausetimer(){
    clearInterval(interval)
    save()
}




//A function that switched mode
function switchMode(mID){
    if(interval){
        pausetimer()
    }
    // will use default of no mID is passed
    if (mID !== undefined && mID !== null){pomodoroApp.activeMode =  mID}
    //Display the remaining time if its not equal the actaul set time
    if(pomodoroApp.modes[pomodoroApp.activeMode].remTime != pomodoroApp.modes[pomodoroApp.activeMode].setTime){
        displayTime(pomodoroApp.modes[pomodoroApp.activeMode].remTime)
    }else{
        displayTime(pomodoroApp.modes[pomodoroApp.activeMode].setTime)
    }
    
    updateState()
    updatetabs(pomodoroApp.activeMode)
    save()

}

//Progress bar percentage updater
function updateProgress(){
    let elapsedCalc = ((pomodoroApp.modes[pomodoroApp.activeMode].remTime[0]*60)+(pomodoroApp.modes[pomodoroApp.activeMode].remTime[1]))
                / ((pomodoroApp.modes[pomodoroApp.activeMode].setTime[0]*60)+(pomodoroApp.modes[pomodoroApp.activeMode].setTime[1]));

    let percentage = (elapsedCalc*100).toFixed(2)
    document.getElementById("progress-bar").style.strokeDasharray = percentage+","+(100-percentage)


}

function updateState(){
        //Mode if finished timer - remaining = 0
   if (pomodoroApp.modes[pomodoroApp.activeMode].remTime[1] == 0 && pomodoroApp.modes[pomodoroApp.activeMode].remTime[0] == 0){
        document.getElementById("start-btn").style.display = "none"
        document.getElementById("restart-btn").style.display = "block"
        document.getElementById("pause-btn").style.display = "none"
   }
   
        //Mode if remaining timer - set > remaining
    else if(JSON.stringify(pomodoroApp.modes[pomodoroApp.activeMode].remTime) != JSON.stringify(pomodoroApp.modes[pomodoroApp.activeMode].setTime)){
        document.getElementById("start-btn").style.display = "block"
        document.getElementById("restart-btn").style.display = "block"
        document.getElementById("pause-btn").style.display = "none"

        //Mode if new timer - set = remaining
    }else if (JSON.stringify(pomodoroApp.modes[pomodoroApp.activeMode].remTime) == JSON.stringify(pomodoroApp.modes[pomodoroApp.activeMode].setTime)){
        document.getElementById("start-btn").style.display = "block"
        document.getElementById("restart-btn").style.display = "none"
        document.getElementById("pause-btn").style.display = "none"
    }
}



//opening and closing modal
settingsBtn.addEventListener("click", function () { settingsModal.style.display = "block" })
function closeModal (){
    settingsModal.style.display = "none"
}







//disabling default behaviour of form button
form.addEventListener("submit", function(e){
    e.preventDefault();
    updateSettings(e)
    settingsModal.style.display ='none'
})

function updateSettings(e){

    if(e.target.pomodoro.value != pomodoroApp.modes[0].setTime[0]){
        pomodoroApp.modes[0].setTime[0] = e.target.pomodoro.value
        pomodoroApp.modes[0].remTime[0] = e.target.pomodoro.value
        pomodoroApp.modes[0].remTime[1] = 0
        save()
    } 

    if(e.target.shortBreak.value != pomodoroApp.modes[1].setTime[0]){
        pomodoroApp.modes[1].setTime[0] = e.target.shortBreak.value
        pomodoroApp.modes[1].remTime[0] = e.target.shortBreak.value
        pomodoroApp.modes[1].remTime[1] = 0
        save()
    }
    if(e.target.longBreak.value != pomodoroApp.modes[2].setTime[0]){
        pomodoroApp.modes[2].setTime[0] = e.target.longBreak.value
        pomodoroApp.modes[2].remTime[0] = e.target.longBreak.value
        pomodoroApp.modes[2].remTime[1] = 0
        save()
    }  

    if(e.target.color.value != pomodoroApp.activeColor){
        pomodoroApp.activeColor = e.target.color.value
        switchMode()
        document.getElementById("progress-bar").style.stroke = pomodoroApp.colors[pomodoroApp.activeColor].code
    }





    displayTime(pomodoroApp.modes[pomodoroApp.activeMode].remTime)
    updateState()

         
        if(e.target.font.value != pomodoroApp.activeFont){
        pomodoroApp.activeFont = e.target.font.value
        save()
        window.location.reload()
    }
    

}

function updatetabs(target){

        //switch active tab
    for (let btn of modeBtns){
        btn.classList.remove("active")
        btn.style.backgroundColor = 'inherit'

    }

    if(target == 0){
        document.getElementById("pomodoro-btn").classList.add("active")
        document.getElementById("pomodoro-btn").style.backgroundColor = pomodoroApp.colors[pomodoroApp.activeColor].code

    } else if(target == 1){
        document.getElementById("short-break-btn").classList.add("active")
        document.getElementById("short-break-btn").style.backgroundColor = pomodoroApp.colors[pomodoroApp.activeColor].code
    } else if(target ==2){
        document.getElementById("long-break-btn").classList.add("active")
        document.getElementById("long-break-btn").style.backgroundColor = pomodoroApp.colors[pomodoroApp.activeColor].code

    }


}


// function to set the font for elements of changable font based on user preference
function updateFonts(){
    console.log(pomodoroApp.fonts[pomodoroApp.activeFont].classes)
    timer.classList.add(pomodoroApp.fonts[pomodoroApp.activeFont].classes.timer)


    for (let btn of modeBtns){
        btn.classList.add(pomodoroApp.fonts[pomodoroApp.activeFont].classes.tab)
    }

    for (let btn of actionBtns){
        btn.classList.add(pomodoroApp.fonts[pomodoroApp.activeFont].classes.action)
    }
}

function save(){
    localStorage.setItem("pomodoroAppModes",JSON.stringify(pomodoroApp))
}