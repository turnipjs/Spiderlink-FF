// const { text } = require("stream/consumers");

function message(type, message) {
    // TODO: make this nicer ig idk
    alert(type + ":\n"+message);
}

function toast(message) {
    // TODO
}

function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
        () => {
            /* clipboard successfully set */
            //TODO: toast user with message saying link in clipboard
            console.log("clipboard updated with requested link")
        },
        () => {
            /* clipboard write failed */
            //TODO: toast user with message saying clipboard write failed, display link in mono or code block or something.
            console.log("clipboard update failed")
        },
    );
}

function handleMessage(message, sender, sendResponse) {
    console.log("content script recieved message: ", message.messageType);
    let selectedText;
    if (message.messageType === "selectedText") {
        //TODO handle case when text spans multiple elements
        ({selectedText} = message);
        selectedText = encodeURIComponent(selectedText);
    } else if (message.messageType === "findTextByElement") {
        let {targetElementId, bubbling} = message;

        //TODO: get selected text by target element id
        selectedText = "TBI, please select text before using spiderlink";
        targetElement = browser.menus.getTargetElement(message.targetElementId);
        targetText = targetElement.textContent;
        // begin:bodge to deal with text fragment links only handling intact words
        targetText = targetText.split(" ");
        textStart = targetText.slice(0,3).join(" "); // first 3 words
        textEnd = targetText.slice(-3).join(" "); // last 3 words
        // end: bodge
        selectedText = encodeURIComponent(textStart) + "," + encodeURIComponent(textEnd); // you cannot encode this comma in the middle
    }
    // todo: partial word selection detector, this is a limitation of text fragment links not supporting partial words.
    // detector should toast user saying to not expect link to work with partial words
    let uriNoHash = document.URL.split("#")[0]; // fragment is always last, after query so we don't have to worry about that
    let newUri = uriNoHash + "#:~:text=" + selectedText; // add lil spider face uwu (and rest of new fragment)
    console.log("updating clipboard with: ", newUri)
    updateClipboard(newUri);
}

browser.runtime.onMessage.addListener(handleMessage);
