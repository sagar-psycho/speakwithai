let history = JSON.parse(localStorage.getItem('history')) || [];

function speak() {
    let text = document.getElementById('textarea').value.trim();
    let speakingMessage = document.getElementById('speakingMessage');
    let enterTextMessage = document.getElementById('enterTextMessage');

    if (text === '') {
        enterTextMessage.style.display = 'block';
        speakingMessage.style.display = 'none';
        speakText('Please enter the text.');

        setTimeout(function() {
            enterTextMessage.style.display = 'none';
        }, 3000);
        return;
    }

    speakingMessage.style.display = 'block';
    enterTextMessage.style.display = 'none';

    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(text);
    let voices = synth.getVoices();
    voice.voice = voices[0];

    voice.onend = function() {
        speakingMessage.style.display = 'none';
    };

    synth.speak(voice);

    history.push(text);
    updateHistory();
}

function speakText(text) {
    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(text);
    synth.speak(voice);
}

function updateHistory() {
    let historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    history.forEach(function(item, index) {
        let li = document.createElement('li');
        li.textContent = `${index + 1}. ${item}`;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    updateHistory();
    localStorage.removeItem('history');
}

window.onload = function() {
    document.getElementById('textarea').value = '';
    updateHistory();
};

function copytext() {
    var textarea = document.getElementById("textarea");
    if (textarea.value.trim() === "") {
        alert("Please enter text before copying.");
    } else {
        textarea.select();
        document.execCommand("copy");
        alert("Text copied to clipboard.");
    }
}

function copytex() {
    var output = document.getElementById("output");
    if (output.value.trim() === "") {
        alert("Please speak or enter text before copying.");
    } else {
        output.select();
        document.execCommand("copy");
        alert("Text copied to clipboard.");
    }
}

clearHistoryBtn.addEventListener("click", () => {
    clearHistory();
});
