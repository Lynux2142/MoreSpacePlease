const defaultData = {
	charsRange: 0.0,
	wordsRange: 0.0,
	linesRange: 1.5
}

browser.storage.local.get(['rangeData'], items => {
	if (typeof items.rangeData == 'undefined') {
		browser.storage.local.set({'rangeData': defaultData});
	}
});

const updateData = (data) => {
	browser.storage.local.set({'rangeData': data});
	browser.tabs.query({}, (tabs) => {
		for (let tab of tabs) {
			browser.tabs.sendMessage(tab.id, data, () => {browser.runtime.lastError});
		}
	});
};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	browser.storage.local.get(['rangeData'], (items) => {
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
				browser.storage.local.clear();
				updateData(defaultData);
				sendResponse(defaultData);
				break;
		}
	});
	return (true);
});

browser.tabs.onUpdated.addListener((tabsId, changeInfo, tab) => {
	browser.storage.local.get(['rangeData'], items => {
		if (typeof items.rangeData == 'undefined') {
			browser.storage.local.set({'rangeData': defaultData});
			updateData(defaultData);
		} else {
			updateData(items.rangeData);
		}
	});
	return (true);
});
