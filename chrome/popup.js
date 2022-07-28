document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('CharsRange').addEventListener("input", (e) => {
		chrome.runtime.sendMessage({message: "updateCharsRange", value: e.target.value}, () => chrome.runtime.lastError);
	});
	document.getElementById('WordsRange').addEventListener("input", (e) => {
		chrome.runtime.sendMessage({message: "updateWordsRange", value: e.target.value}, () => chrome.runtime.lastError);
	});
	document.getElementById('LinesRange').addEventListener("input", (e) => {
		chrome.runtime.sendMessage({message: "updateLinesRange", value: e.target.value}, () => chrome.runtime.lastError);
	});
	document.getElementById('reset').addEventListener('click', (e) => {
		console.log('bonjour');
		chrome.runtime.sendMessage({message: "reset"}, res => {
			document.getElementById('CharsRange').value = res.charsRange;
			document.getElementById('WordsRange').value = res.wordsRange;
			document.getElementById('LinesRange').value = res.linesRange;
		});
	});
	return (true);
});

window.onload = () => {
	console.log('bonjour');
	chrome.runtime.sendMessage({message: "giveData"}, data => {
		document.getElementById('CharsRange').value = data.charsRange;
		document.getElementById('WordsRange').value = data.wordsRange;
		document.getElementById('LinesRange').value = data.linesRange;
	});
};
