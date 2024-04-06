
const FLEX = document.querySelector('.flex')
const CARDS = document.querySelectorAll('.card')
const BTN = document.querySelectorAll('.btn')

const _e = {},
	_ = (e, b = false) => {
		if (_e[e]) return _e[e]
		let x = document[`querySelector${b ? 'All' : ''}`](e) || false
		if (x) return _e[e] = x
	},
	_a = e => _(e, true)

BTN.forEach(btn => btn.addEventListener('click', (e) => {
	e.preventDefault()
	fechar(e.currentTarget.id.replace('cardbtn-', ''))
}))

abrir()

function abrir() {
	glass()
	play(2)
	time1(virar(true, 100, null, setTimeout(() => time2(() => glass(false)), 2000)))
}

function fechar(card) {
	glass()
	play(1)
	virar(false, 100, null, setTimeout(() => {
		glass(false)
		play('pop')
		show(card)
	}, 1100))
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
window['glass'] = glass;
window['_'] = _;
window['_a'] = _a;


function virar(o = true, t = 100, c = null, callback) {
	if (null === c) c = CARDS.length
	t = ++t

	console.log(o, t, c)
	if (c == 0 || c > CARDS.length || !c) {
		if ('function' == typeof callback) callback()
		return false;
	}
	CARDS[c - 1].classList[o ? 'add' : 'remove']('active')
	setTimeout(() => virar(o, t, c - 1, callback), t)
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

function time2(callback) {
	play(3)
	CARDS.forEach(c => {
		c.style.marginTop = '0'
		c.style.transform = 'none'
	})
	FLEX.style.marginTop = 'auto'
	FLEX.style.width = 'auto'
	FLEX.style.height = 'auto'

	if ('function' == typeof callback) callback()
}

function show(card) {
	_(`#cardid-${card}`).classList.add('show')
	_(`#cardid-${card}`).style = ''
}

function glass (active = true){
	_('.glass').classList[active ? 'add' : 'remove']('on')
}

//function _(e) { return document.querySelector(e) }
//function _a(e) { return document.querySelectorAll(e) }



