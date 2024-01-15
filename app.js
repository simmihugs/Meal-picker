import { abs, between, getRandomInt } from './mathstuff.js';

let filename = './config.json'
let items = []
let active = 0
const MAXTIME = 10

async function loadConfig () {
  await fetch(filename)
    .then(res => {
      return res.json()
    })
    .then(data => {
      data['listArr'].forEach(function (item) {
        document.querySelector('#slider').insertAdjacentHTML(
          'beforeend',
          `<div class="item" style="background-image: url('${item.image}'); background-size: 500px;">
          <h1>${item.name}</h1>
                ${item.message}
                </div>`
        )
      })
    })
  items = document.querySelectorAll('.slider .item')
  active = getRandomInt(items.length)
}

function hide_cards () {
  items.forEach(item => {
    item.style.opacity = 0
  })
}

function getOtherItems (length) {
  return Object.values(items)
    .filter(item => {
      return item != items[active]
    })
    .sort(() => 0.5 - Math.random())
    .splice(0, length)
}

function showActiveItem () {
  items[active].style.transform = `none`
  items[active].style.zIndex = 1
  items[active].style.filter = 'none'
  items[active].style.opacity = 1
  items[active].onclick = pick_a_recipe
}

function showOtherItem (item, index) {
  item.style.transform =
    `translateX(${120 * index}px)` +
    `scale(${1 - 0.2 * abs(index)})` +
    `perspective(16px) rotateY(1deg)`
  item.style.filter = 'blur(5px)'
  item.style.opacity = 0.3
}

function loadShow () {
  hide_cards()
  active = getRandomInt(items.length)

  let other_items = getOtherItems(14)
  let half = other_items.length / 2
  for (const [index, item] of other_items.entries()) {
    let j = between(index, 0, half) ? -1 * (half - index) : index - dec(half)
    showOtherItem(item, j)
  }
  showActiveItem()
}

async function pick_a_recipe () {
  questionmark.style.opacity = 0

  for (var i = 0; i < MAXTIME; i++) {
    loadShow()

    mbutton.firstChild.data = `${MAXTIME - i}`
    await new Promise(resolve => {
      setTimeout(resolve, 400)
    })
  }

  hide_cards()
  showActiveItem()
  mbutton.firstChild.data = 'Winner!'
}

async function main () {
  await loadConfig()
  hide_cards()
  items[active].style.opacity = 0
  let mbutton = document.getElementById('mbutton')
  mbutton.onclick = pick_a_recipe
  questionmark.onclick = pick_a_recipe
}

await main()
