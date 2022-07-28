chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const elem = document.querySelector('body');
	elem.style.letterSpacing = `${request.charsRange}em`;
	elem.style.wordSpacing = `${request.wordsRange}em`;
	elem.style.lineHeight = `${request.linesRange}em`;
});
