const btn = document.querySelector('#searchBtn')
const input = document.querySelector('#searchInput')

btn.addEventListener('click', function () {
	const text = input.value

	$.ajax({
		url: 'https://latinwordnet.exeter.ac.uk/api/lemmas/virtus/n/',
		jsonp: '$jsonp',
		dataType: 'jsonp',
		success: function (response, data) {
			console.log(response) // server response
			console.log(data)
		}
	})
})

const getRoot = async word => {
	const result = await fetch(`https://latinwordnet.exeter.ac.uk/lemmatize/${word}`, {
		headers: {
			'x-requested-with': 'XMLHttpRequest',
			Origin: '*'
		}
	})
	const resJson = await result.json()
	console.log(resJson)
	const root = resJson[0].lemma.lemma
	console.log(root)
	return root
}

const getTranslation = async word => {
	const result = await fetch(`https://www.online-latin-dictionary.com/latin-english-dictionary.php?parola=${word}`, {
		headers: {
			'x-requested-with': 'XMLHttpRequest',
			Origin: '*'
		}
	})
	const resText = await result.text()
	let matches = resText.match(/(?<=<span class="english">).*(?=<\/span>)/gi)
	const shouldntMatch = matches[0].match(/<span class="paradigma">/gi)
	if (!matches) {
		throw new Error()
	}
	if (shouldntMatch) {
		if (matches.length > 1) {
			matches = matches.slice(1)
		} else {
			throw new Error()
		}
	}
	const translationObj = {
		words: matches
	} //matches.map(el => ({word: el}));
	const content = {
		latinWord: word,
		translations: [translationObj]
	}
	return content
}

const checkTranslation = async (selection, tab) => {
	let translated
	const latinWord = selection.trim()

	if (latinWord.split(' ').length > 1) {
		chrome.extension.getBackgroundPage().console.log('I can translate only one word at the time')
		console.log('I can translate only one word at the time')
		return
	}

	try {
		const root = await getRoot(latinWord)
		translated = await getTranslation(root)
	} catch (err) {
		console.log(err)
		translated = await altTranslation(latinWord)
	}
	console.log(selection)
	console.log(latinWord)
	console.table(translated)
	console.dir(tab)
	console.log(tab.id)
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const tabb = tabs[0]
		chrome.tabs.sendMessage(tabb.id, { name: 'showTooltip', translated })
	})
}
