const angleInput = document.querySelector("#angleInput")
const radiusInput = document.querySelector("#radiusInput")
const nailingDistInput = document.querySelector("#nailingDist")
const caculateBtn = document.querySelector("#calculateBtn")
const answersContainer = document.querySelector("#answers")
const tableContainer = document.querySelector("#tableCont")

function computeAnswers(I, R, answers) {
  answers.T = (R * Math.tan(I / 2)).toFixed(3)
  answers.L = (R * I).toFixed(3)
  answers.Lc = (2 * R * Math.sin(I / 2)).toFixed(3)
  answers.E = (answers.T * Math.tan(I / 4)).toFixed(3)
  answers.M = (R * (1 - Math.cos(I / 2))).toFixed(3)
  answers.D = (572.96 / R).toFixed(1)
}

function showAnswers(answers) {
  answersContainer.innerHTML = ""
  let p = document.createElement("p")
  p.innerHTML = `T = ${answers.T}m <br>L = ${answers.L}m <br>Lc = ${answers.Lc}m <br>E = ${answers.E}m <br>M = ${answers.M}m <br>D = ${answers.D}&#xb0 <br>`
  answersContainer.appendChild(p)
  answersContainer.style.visibility = "visible"
}

function createTable(la, ga, lc) {
  tableContainer.innerHTML = ""
  tableContainer.style.visibility = "visible"
  let table = document.createElement("table")
  lables = ["Local Angles", "Global Angles", "Lcs"]
  let tr = document.createElement("tr")
  for (let i = 0; i < 3; i++) {
    let td = document.createElement("td")
    td.innerText = lables[i]
    tr.appendChild(td)
  }
  table.appendChild(tr)

  for (let i = 0; i < la.length; i++) {
    let tr = document.createElement("tr")
    for (let j = 0; j < 3; j++) {
      let td = document.createElement("td")
      switch (j) {
        case 0:
          td.innerText = la[i]
          break
        case 1:
          td.innerText = ga[i]
          break
        case 2:
          td.innerText = lc[i]
      }
      tr.appendChild(td)
    }

    table.appendChild(tr)
  }
  tableContainer.appendChild(table)

  table.style.visibility = "visiable"
}

caculateBtn.addEventListener("click", () => {
  const I = (Number(angleInput.value) * Math.PI) / 180
  const R = Number(radiusInput.value)
  if (isNaN(I) || isNaN(R) || I === 0 || R === 0) {
    alert("Please enter a valid number!!")
    return
  }
  const answers = {}
  computeAnswers(I, R, answers)
  showAnswers(answers)
  if (Number(nailingDistInput.value) != 0 && nailingDistInput.value != "") {
    const nailingDist = Number(nailingDistInput.value)
    const kg = Math.floor(answers.L / nailingDist)
    const deltaInRad = (0.5 * nailingDist) / R
    const deltaInDeg = (deltaInRad * 180) / Math.PI
    let localAngles = []
    let globalAngles = []
    let lcs = []
    localAngles.push(0)
    globalAngles.push(0)
    lcs.push(0)
    for (let i = 1; i <= kg; i++) {
      localAngles.push(deltaInDeg.toFixed(3))
      globalAngles.push((i * deltaInDeg).toFixed(3))
      lcs.push((2 * R * Math.sin(i * deltaInRad)).toFixed(3))
    }
    const rem = answers.L - kg * nailingDist
    localAngles.push(((((0.5 * rem) / R) * 180) / Math.PI).toFixed(3))
    globalAngles.push((0.5 * ((I * 180) / Math.PI)).toFixed(3))
    lcs.push(answers.Lc)
    createTable(localAngles, globalAngles, lcs)
  }
})
