const settingsBtn = document.getElementById("settings-btn")
const settingsModal = document.getElementById("settings-modal")
const timer = document.getElementById("timer")
const pomodoroSetting = document.getElementById("pomodoro")
const form = document.getElementById("settings-form")


//DEFAULT values
let pomodoro = 23
let shortBreak = 5
let longBreak = 15
let color = 'red'
let font = 1
let seconds

//opening and closing modal
settingsBtn.addEventListener("click", function () { settingsModal.style.display = "block" })
function closeModal (){
    settingsModal.style.display = "none"
}

//Loading values
timer.innerText = pomodoro + ":00"
pomodoroSetting.value = pomodoro

//disabling default behaviour of form button
form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log(e.target.color.value)
})