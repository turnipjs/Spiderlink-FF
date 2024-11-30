function message(type, message) {
    // todo: make this nicer ig idk
    alert(type + ":\n"+message);
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
        ({selectedText} = message);
    } else if (message.messageType === "findTextByElement") {
        let {targetElementId, bubbling} = message;

        //TODO: get selected text by target element id
        selectedText = "TBI, please select text before using spiderlink";
    }
    let uriNoHash = document.URL.split("#")[0]; // fragment is always last, after query so we don't have to worry about that
    let newUri = uriNoHash + "#:~:text=" + encodeURIComponent(selectedText); // add lil spider face uwu (and rest of new fragment)
    console.log("updating clipboard with: ", newUri)
    updateClipboard(newUri);
}

browser.runtime.onMessage.addListener(handleMessage);
