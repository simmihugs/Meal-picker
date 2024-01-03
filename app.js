import { listArr } from "./config.js"

var strHTML = ''
listArr.forEach(function (item) {
  strHTML += `<div class="item" style="background-image: url('${item.image}'); background-size: 500px;">
		  <h1>${item.name}</h1>
		  ${item.message}
		</div>`
})
document.querySelector('#slider').insertAdjacentHTML('beforeend', strHTML)

let items = document.querySelectorAll('.slider .item')

const MAXTIME = 30
const MAX = items.length
let active = getRandomInt()
let popup = true

function getRandomInt () {
  return Math.floor(Math.random() * MAX)
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

function between (i, x, y) {
  return x <= i && x < y
}

function abs (i) {
  return i < 0 ? -i : i
}

function dec (i) {
  return i - 1
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
  item.style.opacity = 0.6
}

function loadShow () {
  hide_cards()
  active = getRandomInt()

  let other_items = getOtherItems(14)
  let half = other_items.length / 2
  for (const [index, item] of other_items.entries()) {
    let j = between(index, 0, half) ? -1 * (half - index) : index - dec(half)
    showOtherItem(item, j)
  }
  showActiveItem()
}
loadShow()

async function pick_a_recipe () {
  for (var i = 0; i < MAXTIME; i++) {
    loadShow()

    mbutton.firstChild.data = `${MAXTIME - i}`
    await new Promise(resolve => {
      setTimeout(resolve, 200)
    })
  }

  hide_cards()
  //items[active].style.opacity = 1
  //items[active].onclick = pick_a_recipe
  showActiveItem()
  mbutton.firstChild.data = 'Winner!'
}

let mbutton = document.getElementById('mbutton')
mbutton.onclick = pick_a_recipe
items[active].onclick = pick_a_recipe
