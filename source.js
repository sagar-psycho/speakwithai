function speak() {
    let text = document.getElementById('textarea').value.trim();
    let speakingMessage = document.getElementById('speakingMessage');
    let errorMessage = document.getElementById('errorMessage');

    if (text === '') {
        errorMessage.style.display = 'block'; // Display error message
        speakingMessage.style.display = 'none'; // Hide speaking message
        return;
    }

    speakingMessage.style.display = 'block'; // Display speaking message
    errorMessage.style.display = 'none'; // Hide error message

    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(text);
    let voices = synth.getVoices();
    voice.voice = voices[0]; // You may want to choose a specific voice from the list

    synth.speak(voice);

    setTimeout(function() {
        speakingMessage.style.display = 'none'; // Hide speaking message after 1 second
    }, 1000);
}

window.onload = function() {
    document.getElementById('textarea').value = ''; // Clear the input field
};
