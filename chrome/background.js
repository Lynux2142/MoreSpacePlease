const defaultData = {
	charsRange: 0.0,
	wordsRange: 0.0,
	linesRange: 1.5
}

chrome.storage.local.get(['rangeData'], items => {
	if (typeof items.rangeData == 'undefined') {
		chrome.storage.local.set({'rangeData': defaultData});
	}
});

const updateData = (data) => {
	chrome.storage.local.set({'rangeData': data});
	chrome.tabs.query({}, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(tab.id, data, () => {chrome.runtime.lastError});
		}
	});
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	chrome.storage.local.get(['rangeData'], (items) => {
		switch (request.message) {
			case "updateCharsRange":
				items.rangeData.charsRange = request.value;
				updateData(items.rangeData);
				break;
			case "updateWordsRange":
				items.rangeData.wordsRange = request.value;
				updateData(items.rangeData);
				break;
			case "updateLinesRange":
				items.rangeData.linesRange = request.value;
				updateData(items.rangeData);
				break;
			case "giveData":
				sendResponse(items.rangeData);
				break;
			case "reset":
				chrome.storage.local.clear();
				updateData(defaultData);
				sendResponse(defaultData);
				break;
		}
	});
	return (true);
});

chrome.tabs.onUpdated.addListener((tabsId, changeInfo, tab) => {
	chrome.storage.local.get(['rangeData'], items => {
		if (typeof items.rangeData == 'undefined') {
			chrome.storage.local.set({'rangeData': defaultData});
			updateData(defaultData);
		} else {
			updateData(items.rangeData);
		}
	});
	return (true);
});
