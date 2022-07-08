document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('CharsRange').addEventListener("input", (e) => {
		browser.runtime.sendMessage({message: "updateCharsRange", value: e.target.value});
	});
	document.getElementById('WordsRange').addEventListener("input", (e) => {
		browser.runtime.sendMessage({message: "updateWordsRange", value: e.target.value});
	});
	document.getElementById('LinesRange').addEventListener("input", (e) => {
		browser.runtime.sendMessage({message: "updateLinesRange", value: e.target.value});
	});
	document.getElementById('clear').addEventListener('click', (e) => {
		browser.storage.local.clear();
	});
	return (true);
});

window.onload = () => {
	browser.runtime.sendMessage({message: "giveData"}, data => {
		document.getElementById('CharsRange').value = data.charsRange;
		document.getElementById('WordsRange').value = data.wordsRange;
		document.getElementById('LinesRange').value = data.linesRange;
	});
};
