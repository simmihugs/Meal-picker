var listArr = [{
	"name": "Käsekuchen",
	"image": "images/cake.png",
	"message": "Hurra! heute ist cheat day!"
},
{
	"name": "Obstquark",
	"image": "images/obstquark.png",
	"message": "Nom nom nom nom..."
},
{
	"name": "Nudeln mit Tomatensoße",
	"image": "images/nudeln.jpg",
	"message": "Lecker!"
},
{
	"name": "Bohnenburger",
	"image": "images/Veganer-Kidneybohnen-Burger.webp",
	"message": "Lecker!"
},
{
	"name": "Fächerkartoffeln",
	"image": "images/faecherkartoffeln.jpg",
	"message": "Lecker!"
},
{
	"name": "Porrigde",
	"image": "images/porrigde_mit_apfel_und_heidelbeeren.jpg",
	"message": "Lecker!"
},
{
	"name": "Quinoa bowl",
	"image": "images/quinoasalat.webp",
	"message": "Lecker!"
},
{
	"name": "Kichererbsen Curry",
	"image": "images/kichererbsencurry.webp",
	"message": "Sehr gut."
},
{
	"name": "Couscous",
	"image": "images/couscous-salat-lecker-wuerzig.jpg",
	"message": ""
},
{
	"name": "Linseneintopf",
	"image": "images/linseneintopf.jpg",
	"message": "Der Klassiker."
},
{
	"name": "Quinoa bowl",
	"image": "images/quinoasalat.webp",
	"message": "Lecker!"
},
{
	"name": "Kichererbsen Curry",
	"image": "images/kichererbsencurry.webp",
	"message": "Sehr gut."
},
{
	"name": "Obstquark",
	"image": "images/obstquark.png",
	"message": "Nom nom nom nom..."
}
];

var strHTML = '';
listArr.forEach(function (item) {
	strHTML += `<div class="item">
		  <h1>${item.name}</h1>
		  <img class="bild" src="${item.image}" alt="Dinosaur" />
		  Lecker!
		</div>`;
})
document.querySelector("#slider").insertAdjacentHTML("beforeend", strHTML);


let items = document.querySelectorAll('.slider .item');

const MAXTIME = 20;
let max = items.length;
let active = getRandomInt();
let popup = true;

function getRandomInt() {
	return Math.floor(Math.random() * max);
}

function loadShow() {
	for (var r = 0; r < max; r++) {
		items[r].style.opacity = 0;
	}

	let other_r = [];
	while (other_r.length < 6) {
		let r = getRandomInt();
		if (r != active) {
			other_r.push(r);
		}
	}

	for (var i = 1; i < 4; i++) {
		let r = other_r[i - 1];
		items[r].style.transform = `translateX(${-120 * i}px) scale(${1 - 0.2 * i}) perspective(16px) rotateY(1deg)`;
		//items[r].style.transform = `translateX(${-120 * i}px) scale(1 - (* -0.2 i)) perspective(16px) rotateY(1deg)`;
		items[r].style.filter = 'blur(5px)';
		items[r].style.opacity = 0.6;
	}
	for (var i = 4; i < 6; i++) {
		let r = other_r[i - 1];
		let j = i - 3;
		items[r].style.transform = `translateX(${+120 * j}px) scale(${1 - 0.2 * j}) perspective(16px) rotateY(1deg)`;
		items[r].style.filter = 'blur(5px)';
		items[r].style.opacity = 0.6;
	}

	items[active].style.transform = `none`;
	items[active].style.zIndex = 1;
	items[active].style.filter = 'none';
	items[active].style.opacity = 1;

}
loadShow();

let mbutton = document.getElementById('mbutton');
mbutton.onclick = async function myFunction() {
	popup = false;
	for (var i = 0; i < MAXTIME; i++) {

		active = getRandomInt();
		loadShow();

		mbutton.firstChild.data = `${MAXTIME - i}`;

		await new Promise(resolve => {
			setTimeout(resolve, 300);
		});
	}

	// Make winner stand out
	for (var r = 0; r < max; r++) {
		if (r != active)
			items[r].style.opacity = 0;
		else
			items[active].style.opacity = 1;
	}
	popup = true;
	mbutton.firstChild.data = "Winner!";
}

