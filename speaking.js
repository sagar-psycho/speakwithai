let history = JSON.parse(localStorage.getItem('history')) || [];

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

function addToHistory(text) {
    history.push(text);
    updateHistory();
    localStorage.setItem('history', JSON.stringify(history));
}

window.onload = function() {
    document.getElementById('textarea').value = '';
    updateHistory();
};

function speak() {
    let text = document.getElementById('textarea').value.trim();

    if (text === '') {
        alert('Please enter text before speaking.');
        return;
    }

    let speakingMessage = document.getElementById('speakingMessage');
    speakingMessage.style.display = 'block';
    
    speakText(text);

    speakingMessage.style.display = 'none';

    addToHistory(text);
}

// Copy text function
function copyText() {
    var textarea = document.getElementById("textarea");
    if (textarea.value.trim() === "") {
        alert("Please enter text before copying.");
    } else {
        textarea.select();
        document.execCommand("copy");
        alert("Text copied to clipboard.");
    }
}
