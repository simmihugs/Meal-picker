import { getRandomInt } from './mathstuff.js'

function contains (data, item) {
  return data
    .map(element => {
      return element.name === item.name
    })
    .includes(true)
}

function removeDuplicates (data) {
  let unique = []
  data.forEach(element => {
    if (!contains(unique, element)) {
      console.log(element)
      unique.push(element)
    }
  })
  return unique
}

async function loadPictures () {
  let pictures = await fetch('./config.json')
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data['listArr']
    })
  return removeDuplicates(pictures)
}

function update_opacity (active, active_opacity, inactive_opacity) {
  for (var j = 0; j < 9; j++) {
    let card = document.getElementById(`card${j}`)

    if (j === active) {
      card.style.opacity = active_opacity
      card.style.filter = 'blur(0px)'
    } else {
      card.style.filter = 'blur(5px)'
      card.style.opacity = inactive_opacity
    }
  }
}

function create_card_grid (pictures) {
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 3; i++) {
      let index = i * 3 + j
      let item = pictures[index]
      document
        .querySelector(`#column${i + 1}`)
        .insertAdjacentHTML(
          'beforeend',
          `<div id="card${index}" class="item" ` +
            `style="height: 250px; width:250px;` +
            `border-radius: 5px;` +
            `background-image: url(${item.image});` +
            `background-size: 500px;">` +
            `<h1>${item.name}</h1>` +
            `${item.message}` +
            `</div>`
        )
    }
  }
}

async function playgrid () {
  let mbutton = document.getElementById('mbutton')
  mbutton.style.opacity = 0
  create_card_grid(await loadPictures())

  let active = getRandomInt(9)
  for (var i = 0; i < 50; i++) {
    update_opacity(active, 1, 0.5)
    await new Promise(resolve => {
      setTimeout(resolve, 50)
    })
    active = getRandomInt(9)
  }

  update_opacity(active, 1, 0.15)

  let card = document.getElementById(`card${active}`)

  for (var i = 0; i < 15; i++) {
    switch (active) {
      case 0:
        console.log(active)
        card.style.transform =
          `scale(${0.2 * i})` +
          `translateX(${7.5 * i}px) translateY(${7 * i}px)`
        break
      case 1:
        console.log(active)
        card.style.transform = `scale(${0.2 * i})` + `translateX(${7.5 * i}px)`
        break
      case 2:
        console.log(active)
        card.style.transform =
          `scale(${0.2 * i})` +
          `translateX(${7.5 * i}px) translateY(-${7 * i}px)`
        break
      case 3:
        console.log(active)
        card.style.transform = `scale(${0.2 * i})` + `translateY(${7 * i}px)`
        break
      case 5:
        console.log(active)
        card.style.transform = `scale(${0.2 * i})` + `translateY(-${7 * i}px)`
        break
      case 4:
        console.log(active)
        card.style.transform = `scale(${0.2 * i})`
        break
      case 6:
        console.log(active)
        card.style.transform =
          `scale(${0.2 * i})` +
          `translateX(-${7.5 * i}px) translateY(${7 * i}px)`
        break
      case 7:
        console.log(active)
        card.style.transform = `scale(${0.2 * i})` + `translateX(-${7.5 * i}px)`
        break
      case 8:
        console.log(active)
        card.style.transform =
          `scale(${0.2 * i})` +
          `translateX(-${7.5 * i}px) translateY(-${7 * i}px)`
        break
      default:
        console.log(active)
        break
    }

    await new Promise(resolve => {
      setTimeout(resolve, 20)
    })
  }
}

function main () {
  let mbutton = document.getElementById('mbutton')
  mbutton.onclick = playgrid
}

main()
