browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const paragraphs = document.querySelectorAll('p,article,h1,h2,h3');
	for (let paragraph of paragraphs) {
		paragraph.setAttribute(
			"style",
			`letter-spacing: ${request.charsRange}em;
			word-spacing: ${request.wordsRange}em;
			line-height: ${request.linesRange}em;`
		);
	}
});
