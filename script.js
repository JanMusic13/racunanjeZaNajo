const racunText = document.querySelector("#racun")
const potrdi = document.querySelector("#potrdi")
const preveri = document.querySelector("#preveri")
const correctOrNotText = document.querySelector("#correctOrNot")
const startText = document.querySelector("#start")
let vnosRacunaUserja = null
let inputKolikoRacunov = 0
let izracun = null
let isActive = false
let isStarting = true
let isWrong = false
let fullRacun = ""
let userAnswer = null
let steviloRacuna = 0
let correctAnswer = 0
let allRacuni = []
/////////////////////////////////////////////// TO V REPEAT POL
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

potrdi.addEventListener("click", kokRacunov)

function kokRacunov() {
    potrdi.removeEventListener("click", kokRacunov)
    potrdi.style.display = "none"
    startText.textContent = "Spodaj vnesi odgovor in nato klikni zeleni gumb"
    setTimeout(() => {
        preveri.style.backgroundColor = "#06d606c7"
        inputKolikoRacunov = document.querySelector("input").value
        isActive = true
        calculate()
        return
    }, 2000)
}

///////////////////////////////////////////////////////////

preveri.addEventListener("click", () => {
    if (isActive) {
        if (isWrong) {
            Game()
        }
        else {
            Game()
        }
    }
})
//////////////////////////////////////////////////

function calculate() {
    let plusOrMinus = Math.floor(Math.random() * 2) + 1
    let normalenOrPoseben = Math.floor(Math.random() * 2) + 1
    let prvoAliDrugoMesto = Math.floor(Math.random() * 2) + 1
    let num1 = null
    let num2 = null
    if (normalenOrPoseben === 1) {
        if (plusOrMinus === 1) {
            do {
                num1 = Math.floor(Math.random() * 21)
                num2 = Math.floor(Math.random() * 21)
                izracun = num1 + num2
            } while (izracun >= 20); fullRacun = racunText.textContent = `${num1} + ${num2} = ?`; console.log("1, 1"); console.log(izracun); return
        }
        else {
            do {
                num1 = Math.floor(Math.random() * 21)
                num2 = Math.floor(Math.random() * 21)
                izracun = num1 - num2
            } while (izracun <= 0); fullRacun = racunText.textContent = `${num1} - ${num2} = ?`; console.log("1, 2"); console.log(izracun); return
        } /////////////////////////////////////////////////////////////////////////
    } else { //////////////////////// TO JE ZDJ POSEBEN
        if (prvoAliDrugoMesto === 1) {
            if (plusOrMinus === 1) {
                do {
                    num1 = Math.floor(Math.random() * 21)
                    num2 = Math.floor(Math.random() * 21)
                    izracun = num2 - num1
                } while (izracun <= 0); fullRacun = racunText.textContent = `? + ${num1} = ${num2}`; console.log("2, 1, 1"); console.log(izracun); return
            }
            else {
                let num1 = null
                let num2 = null
                do {
                    num1 = Math.floor(Math.random() * 21)
                    num2 = Math.floor(Math.random() * 21)
                    izracun = num1 + num2
                } while (izracun > 20); fullRacun = racunText.textContent = `? - ${num1} = ${num2}`; console.log("2, 1, 2"); console.log(izracun); return
            }
        } else {
            if (plusOrMinus === 1) {
                let num1 = null
                let num2 = null
                do {
                    num1 = Math.floor(Math.random() * 21)
                    num2 = Math.floor(Math.random() * 21)
                    izracun = num2 - num1
                } while (izracun < 0); fullRacun = racunText.textContent = `${num1} + ? = ${num2}`; console.log("2, 2, 1"); console.log(izracun); return
            } else {
                let num1 = null
                let num2 = null
                do {
                    num1 = Math.floor(Math.random() * 21)
                    num2 = Math.floor(Math.random() * 21)
                    izracun = num1 - num2
                } while (izracun < 0); fullRacun = racunText.textContent = `${num1} - ? = ${num2}`; console.log("2, 2, 2"); console.log(izracun); return
            }
        }
    }
}

/////////////////////////////////////////////////

function Game() {
    if (steviloRacuna < inputKolikoRacunov) {
        racunText.textContent = fullRacun
        userAnswer = document.querySelector("input").value
        console.log("Odgovor uporabnika:", userAnswer)
        if (!isWrong) {
            steviloRacuna++
        }
        console.log("stevilo racunov:", steviloRacuna)
        if (userAnswer == izracun) {
            list(true)
            correctAnswer++
            correctOrNotText.textContent = "PRAVILNO!"
            racunText.textContent = ""
            isWrong = false
            setTimeout(() => {
                if (steviloRacuna < inputKolikoRacunov) {
                    calculate()
                } else { gameOver() }
                correctOrNotText.textContent = ""
            }, 3000);
            return
        } else {
            list(false)
            incorrect()
            return
        }
    } else {
        isActive = false
        console.log("game over")
        gameOver();
    }
}
function incorrect() {
    correctOrNotText.textContent = "Narobe! še enkrat!"
    racunText.textContent = ""
    setTimeout(() => {
        correctOrNotText.textContent = ""
        racunText.textContent = fullRacun
        isWrong = true
        return
    }, 3000)
}

function gameOver() {
    let finalTextPravilni = ""
    let finalTextNapacni = ""
    for (let i = 0; i < allRacuni.length; i++) {
        if (allRacuni[i].isPravilen) {
            finalTextPravilni += `${allRacuni[i].racun}; `
        } else {
            finalTextNapacni += `${allRacuni[i].racun}; `
        }
        document.body.innerHTML = `<p style="font-size: 30px; text-align: start;">Pravilni računi: ${finalTextPravilni}<br> Narobe rešeni računi: ${finalTextNapacni}<br> Skupno pravilnih racunov: ${correctAnswer} od ${inputKolikoRacunov}</p>`
    }
}

function list(isPravilen) {
    let racunObject = {
        racun: fullRacun.replace("?", izracun),
        odgovorUporabnika: userAnswer,
        isPravilen: isPravilen
    }
    allRacuni.push(racunObject)
    return
}