
const FLEX = document.querySelector('.flex')
const CARDS = document.querySelectorAll('.card')
const BTN = document.querySelectorAll('.btn')

BTN.forEach(btn => btn.addEventListener('click', (e) => {
	e.preventDefault()

	play(1)
	fechar()
}))

abrir()

function abrir() {
	play(2)
	time1(
		virar(true, 30, null,
			setTimeout(() => time2(), 2000)
		)
	)
}

function fechar() {
	virar(false)
	time1()
}

function play(a=2) {
	var audio = new Audio(`/public/media/sound/${a}.mp3`);
	audio.play();
}

// setTimeout(() => virar(false, 30, null, virar(true, 90)), 5000)
// setTimeout(() => virar(true, 30), 5000)

window['virar'] = virar;
window['time1'] = time1;
window['abrir'] = abrir;
window['fechar'] = fechar;
window['time2'] = time2;
window['xxplay'] = play;


function virar(o = true, t = 100, c = null, callback) {
	if (null == c) c = CARDS.length
	t = ++t
	if (c > CARDS.length || !c) {
		if ('function' == typeof callback) callback()
		return false;
	}
	CARDS[c - 1].classList[o ? 'add' : 'remove']('active')
	setTimeout(() => virar(o, t, c - 1), t)
}

function time1(callback) {
	FLEX.style.width = '300px'
	FLEX.style.marginTop = '-440px'
	var r = 27
	CARDS.forEach(c => {
		c.style.marginTop = (r == 27 ? 0 : -300) + 'px'
		c.style.transform = `rotate(${r}deg) translate(${r * 4}px, ${r * 10}px)`
		c.style.display = 'flex'
		r -= 3
	})

	if ('function' == typeof callback) callback()
}

function time2() {
	play(3)
	CARDS.forEach(c => {
		c.style.marginTop = '0'
		c.style.transform = 'none'
	})
	FLEX.style.marginTop = 'auto'
	FLEX.style.width = 'auto'
	FLEX.style.height = 'auto'
}