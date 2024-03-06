let history = []; // Array to store spoken text history

function speak() {
    let text = document.getElementById('textarea').value.trim(); // Trim whitespace
    let speakingMessage = document.getElementById('speakingMessage');
    let enterTextMessage = document.getElementById('enterTextMessage');

    if (text === '') {
        enterTextMessage.style.display = 'block'; // Display the "Please enter text" message
        speakingMessage.style.display = 'none'; // Hide the "Speaking..." message
        speakText('Please enter the text.'); // Speak the message

        // Hide the message after 3 seconds
        setTimeout(function() {
            enterTextMessage.style.display = 'none';
        }, 1500);
        return;
    }

    speakingMessage.style.display = 'block'; // Display the "Speaking..." message
    enterTextMessage.style.display = 'none'; // Hide the "Please enter text" message

    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(text);
    let voices = synth.getVoices();
    console.log(voices);
    voice.voice = voices[0]; // You may want to choose a specific voice from the list

    // Hide the "Speaking..." message when speech ends
    voice.onend = function() {
        speakingMessage.style.display = 'none';
    };

    synth.speak(voice);

    // Add spoken text to history
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
    historyList.innerHTML = ''; // Clear previous history

    history.forEach(function(item) {
        let li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = []; // Clear history array
    updateHistory(); // Update history list
}

window.onload = function() {
    document.getElementById('textarea').value = ''; // Clear the input field

    // Listen for the Enter key press event on the textarea
    document.getElementById('textarea').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            speak(); // Speak the entered text
        }
    });
};
