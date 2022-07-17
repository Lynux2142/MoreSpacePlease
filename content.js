browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const elements = document.querySelectorAll('p,article,h1,h2,h3');
	for (let elem of elements) {
		elem.style.letterSpacing = `${request.charsRange}em`;
		elem.style.wordSpacing = `${request.wordsRange}em`;
		elem.style.lineHeight = `${request.linesRange}em`;
	}
});
