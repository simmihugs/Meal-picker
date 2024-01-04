export function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

export function between (i, x, y) {
  return x <= i && x < y
}

export function abs (i) {
  return i < 0 ? -i : i
}

export function dec (i) {
  return i - 1
}
