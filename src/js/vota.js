
const _e = {},
_ = (e, b = false) => {
	if (_e[e]) return _e[e]
	let x = document[`querySelector${b ? 'All' : ''}`](e) || false
	if (x) return _e[e] = x
},
_a = e => _(e, true)

const FLEX = _('.flex')
const CARDS = _a('.card')
const BTN = _a('.btn')

BTN.forEach(btn => btn.addEventListener('click', (e) => {
	e.preventDefault()
	votar(e.currentTarget.id.replace('cardbtn-', ''))
}))

let C = 0
glass(true)
CARDS.forEach(e => {
	C += 150
	setTimeout(() => e.classList.add('active'), C)	
})

C += 450
setTimeout(() => glass(false), C)

function play(a = 2) {
	var audio = new Audio(`/public/media/sound/${a}.mp3`);
	audio.play();
}

function glass(active = true) {
	_('.glass').classList[active ? 'add' : 'remove']('on')
}

function votar(id) {
	play('pin')
	glass(false)
	fetch('/votar', {
		method: 'POST',
		body: JSON.stringify({id})
	}).then(r => r.json()).then(r => {
		show(id)
		if (r.error) {
			glass(true)
			return alert(r.error)
		}
		alert(r.msg)
		location.reload()
	}).catch(e => {
		glass(false)
		console.log(e)
		show(id)
	})

}

function show(id) {
	glass(true)
	let C = 0
	CARDS.forEach(e => {
		C += 50
		setTimeout(() => e.classList.remove('active'), C)
	})

	C += 50
	setTimeout(() => 
		CARDS.forEach(e => e.id == `cardid-${id}` ? 
			e.classList.add('show') : 
			e.remove()), 
	C)

}

