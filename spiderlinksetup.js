function handleInstalled(details) {
    console.log("Spider Link installing...");
    browser.menus.create({
        id: "spider_link",
        title: "Spider Link",
        // selection links the selected text, page links the text of the clicked text element (bubble up) or fails, link acts as page does.
        contexts: ["selection", "page", "link"],
        icons:  {
            16: "icons/spiderlink.svg"
        }
    });
    console.log("Spider Link installed!");
}

function handleMenuButton(info, tab) {
    // console.log("info, tab:")
    // console.dir(info, tab);
    // console.log("target element id: ", info.targetElementId);
    
    if (info.selectionText) { // check if targetElementId is not undefined
        browser.tabs.sendMessage(tab.id, {messageType: "selectedText", selectedText: info.selectionText});
    } else if (info.targetElementId >= 0) {
        browser.tabs.sendMessage(tab.id, {messageType: "findTextByElement", targetElementId: info.targetElementId, bubbling: true});
    } else {
        browser.tabs.sendMessage(tab.id, {messageType: "error", errorInfo: "no valid target (inferred by setup script)"});
    }
}

browser.menus.onClicked.addListener(handleMenuButton);

browser.runtime.onInstalled.addListener(handleInstalled);