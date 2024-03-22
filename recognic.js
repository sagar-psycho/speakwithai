window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    const startBtn = document.getElementById("start-btn");
    const stopBtn = document.getElementById("stop-btn");
    const statusDiv = document.getElementById("status");
    const statuDiv = document.getElementById("statu");
    const outputTextarea = document.getElementById("output");
    const clearHistoryBtn = document.getElementById("clear-history-btn");

    let currentTranscript = "";
    let speakingMessageTimeout;

    function speak(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    function displayStatusMessage(message, duration) {
        // Clear any previous timeout for speaking message
        clearTimeout(speakingMessageTimeout);

        // Clear the statusDiv content
        statusDiv.textContent = "";

        // Display the new message
        statusDiv.textContent = message;
        speak(message);

        // Set timeout to clear the message after duration
        speakingMessageTimeout = setTimeout(() => {
            statusDiv.textContent = "";
        }, duration);
    }

    startBtn.addEventListener("click", () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                displayStatusMessage("Microphone access granted. Listening... Start speaking.", 5000);
                recognition.start();
            })
            .catch(function(err) {
                console.error('Error accessing microphone:', err);
                statu.textContent = "Error: Microphone access denied.";
            });
    });

    stopBtn.addEventListener("click", () => {
        recognition.stop();
        clearTimeout(speakingMessageTimeout);
        displayStatusMessage("Recording stopped.", 2000);
        if (currentTranscript.trim() !== "") {
            addToHistory(currentTranscript);
        }
    });

    recognition.onresult = event => {
        currentTranscript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join("");
        outputTextarea.value = currentTranscript;
    };