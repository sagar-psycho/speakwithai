let history = JSON.parse(localStorage.getItem('history')) || []; // Retrieve history from local storage

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
    
    // Add count to each item in history
    history.forEach(function(item, index) {
        let li = document.createElement('li');
        li.textContent = `${index + 1}. ${item}`;
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
window.onload = function() {
    document.getElementById('textarea').value = ''; // Clear the input field
    updateHistory();
};
//copy text
function copytext(){
    var textarea = document.getElementById("textarea");
    var textcopy = document.getElementById("textcopy");
    
    if (textarea.value.trim() === "") {
        alert("Please enter text before copying.");
    } else {
        textarea.select();
        document.execCommand("copy");
        textcopy.innerHTML = "Copied";

        setTimeout(function() {
            textcopy.innerHTML = "Copy text";
        }, 1000); // Change back to "Copy text" after 5 seconds (5000 milliseconds)
    }
}
function copytex(){
    var output = document.getElementById("output");
    var textco = document.getElementById("textco");
    
    if (output.value.trim() === "") {
        alert("Please enter text before copying.");
    } else {
        output.select();
        document.execCommand("copy");
        textco.innerHTML = "Copied";

        setTimeout(function() {
            textco.innerHTML = "Copy text";
        }, 1000); // Change back to "Copy text" after 5 seconds (5000 milliseconds)
    }
}
//Speach
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const statusDiv = document.getElementById("status");

startBtn.addEventListener("click", () => {
    recognition.start();
    statusDiv.textContent = "Listening... Start speaking";
});

stopBtn.addEventListener("click", () => {
    recognition.stop();
    statusDiv.textContent = "Recognition stopped.";
});

recognition.onresult = event => {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
    document.getElementById("output").value = transcript;
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    statusDiv.textContent = 'Error: ' + event.error;
};
