import {joinRoom as trystero} from './depend/trystero-torrent.min.js'

const defaultRoom = trystero({appId: 'slchat'}, 'default')

const [sendChat, getChat] = defaultRoom.makeAction("chat") 

defaultRoom.onPeerJoin(id => writeText(`-> ${id} connected`))
defaultRoom.onPeerLeave(id => writeText(`<- ${id} disconnected`))

getChat((chat, peer) => {
    var text = `[${peer}] ${chat}`

    console.log(text)
    writeText(text)
})

function selfChat(msg) {
    var text = `[YOU] ${msg}`

    console.log(text)
    writeText(text)
    sendChat(msg)
}

function writeText(text) {
    var textArea = document.getElementById("text-area");

    textArea.insertAdjacentText("beforeend", text)
    textArea.appendChild(document.createElement('br'))
}

function processInput() {
    var inputText = document.getElementById("inputText").value;

    if (inputText == "") {
        return
    }

    document.getElementById("inputText").value = ""
    selfChat(inputText);
}

document.getElementById("inputText").addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        processInput();
    }
})